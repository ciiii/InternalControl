using System;
using System.Data;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;

using Dapper;

using InternalControl.Infrastucture;
using InternalControl.Models;
using MyLib;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace InternalControl.Business
{
    /// <summary>
    /// 操作流程中步骤的代号
    /// </summary>
    public enum StepState
    {
        Stay = 0, Forward = 1, Back = -1, Quit = -2
    }

    /// <summary>
    /// 工作流静态方法
    /// 事务要是能挂载到db下就好了
    /// 事务要是能动态构成就更好了
    /// 
    /// </summary>
    public class WorkFlowBusiness
    {
        private const string _nextStepIdPropName = "NextStepId";

        /// <summary>
        /// 
        /// </summary>
        /// <param name="dbConnectionString"></param>
        public WorkFlowBusiness(string dbConnectionString) { _dbConnectionString = dbConnectionString; }

        private string _dbConnectionString { get; set; }

        #region flow
        /// <summary>
        /// 执行一个将返回新建项目编号的sp,同时生成一个流程,再根据这个流程返回的步骤编号完成第一个步骤;
        /// 如果不完成第一个步骤,其实就相当于暂存;
        /// </summary>
        /// <param name="FlowTemplateId"></param>
        /// <param name="model"></param>
        /// <param name="OperatorId"></param>
        /// <param name="isHold"></param>
        /// <param name="State"></param>
        /// <param name="CreatorId">不是有项目发起人发起的流程时,需要填写一下发起人,比如纵向立项登记时</param>
        /// <returns></returns>
        async public Task InitFlow<T>(
            int FlowTemplateId,
            T model,
            int OperatorId,
            bool isHold = false,
            int State = (int)StepState.Forward,
            int? CreatorId = null)
            where T : class
        {
            using (var dbForTransaction = new SqlConnection(_dbConnectionString))
            {
                dbForTransaction.Open();
                using (var transaction = dbForTransaction.BeginTransaction())
                {
                    try
                    {
                        //这个sp,必须返回一个int类型的编号,作为流程的项目编号
                        var resultOfNewProject = await dbForTransaction.QuerySpAsync<T, int>(
                            model,
                            transaction);
                        var SourceId = resultOfNewProject.FirstOrDefault();
                        if (SourceId == 0)
                        {
                            throw new Exception("发起流程出错:项目生成失败");
                        }

                        //发起流程 
                        var resultNewWorkFlow = await dbForTransaction.QuerySpAsync<SPFlowInit, int>(new SPFlowInit
                        {
                            FlowTemplateId = FlowTemplateId,
                            SourceId = SourceId,
                            CreatorId = CreatorId ?? OperatorId
                        }, transaction);
                        var StepId = resultNewWorkFlow.FirstOrDefault();
                        if (StepId == 0)
                        {
                            throw new Exception("发起流程出错:流程生成失败");
                        }

                        if (!isHold)
                        {
                            //完成这个步骤
                            await dbForTransaction.ExecuteSpAsync(new SPStepDone
                            {
                                StepId = StepId,
                                State = State,
                                OperatorId = OperatorId,
                                Remark = string.Empty
                            }, transaction);
                        }
                        transaction.Commit();
                    }
                    catch (Exception e)
                    {
                        transaction.Rollback();
                        throw e;
                    }
                }
            }
        }

        #endregion

        #region step
        /// <summary>
        /// 没有附加动作的完成步骤
        /// </summary>
        /// <param name="step"></param>
        /// <param name="OperatorId"></param>
        /// <returns></returns>
        async public Task<int> DoneStep(StepDone step, int OperatorId)
        {
            return await DoneStep(step, OperatorId, new List<PredefindedSPStructure>());
        }

        /// <summary>
        /// 完成一个步骤,返回下一个步骤的id,返回0则表示没有下一步了;
        /// 可以多个附加动作;
        /// </summary>
        /// <param name="step"></param>
        /// <param name="OperatorId"></param>
        /// <param name="model"></param>
        /// <param name="isHold"></param>
        /// <returns></returns>
        async public Task<int> DoneStep(
            StepDone step,
            int OperatorId,
            List<PredefindedSPStructure> SPList,
            bool isHold = false)
        {
            using (var dbForTransaction = new SqlConnection(_dbConnectionString))
            {
                dbForTransaction.Open();
                using (var transaction = dbForTransaction.BeginTransaction())
                {
                    try
                    {
                        //如果没有有下一步骤编号这个参数;则在推进step之前执行
                        foreach (var model in SPList)
                        {
                            if (!model.ContainProperty(_nextStepIdPropName))
                            {
                                await dbForTransaction.ExecuteAsync(
                                    model.Name,
                                    model.Parameter,
                                    transaction,
                                    commandType: CommandType.StoredProcedure);
                            }
                        }

                        var NextStepId = 0;

                        if (!isHold)   //可以完成步骤,即不暂存;
                        {
                            var result = await dbForTransaction.QuerySpAsync<SPStepDone, int>(new SPStepDone
                            {
                                StepId = step.StepId,
                                State = step.State,
                                Remark = step.Remark,
                                OperatorId = OperatorId
                            }, transaction);

                            NextStepId = result.FirstOrDefault();
                        }

                        //如果sp有下一步骤编号这个需要的参数;比如设置下一步的可执行人
                        foreach (var model in SPList)
                        {
                            if (model.ContainProperty(_nextStepIdPropName))
                            {
                                if (isHold)
                                {
                                    continue;
                                    //throw new Exception("需要设置下一步骤的操作不能暂存");
                                }

                                //确实有下一步步骤id传回,则传入这个参数;
                                if (NextStepId > 0)
                                {
                                    model.SetValueByPropertyName(_nextStepIdPropName, NextStepId);
                                }
                                else
                                {
                                    throw new Exception("生成下一步骤失败");
                                }
                                await dbForTransaction.ExecuteAsync(
                                    model.Name,
                                    model.Parameter,
                                    transaction,
                                    commandType: CommandType.StoredProcedure);
                            }
                        }
                        transaction.Commit();

                        return NextStepId;
                    }
                    catch (Exception e)
                    {
                        transaction.Rollback();
                        throw e;
                    }
                }
            }
        }

        #endregion

    }
}
