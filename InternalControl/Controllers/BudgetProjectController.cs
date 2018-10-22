using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MyLib;
using InternalControl.Business;
using InternalControl.Infrastucture;
using InternalControl.Models;
using Microsoft.Extensions.Configuration;

namespace InternalControl.Controllers
{
    /// <summary>
    /// 预算项目
    /// </summary>
    public class BudgetProjectController : BaseController
    {
        private int FlowTemplateIdOfBudgetProject { get { return Config.GetValue<int>("FlowTemplateId:BudgetProject"); } }

        /// <summary>
        /// 获取还没有进入预算流程的预算项目,其中集采类的还没有合并过,用于合并
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingBudgetProjectListCanCombineAndWithPackage(Paging paging, BudgetProjectFilter filter)
        {
            
            return await GetPagingBudgetProjectListNotInFlowAndCanCombineAndWithPackage<VBudgetProjectNotInFlowAndCanCombine>(paging, filter);
        }

        /// <summary>
        /// 获取还没有进入预算流程的预算项目,用于开始必要性认证
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingBudgetProjectListNotInFlowAndWithPackage(Paging paging, BudgetProjectFilter filter)
        {
            return await GetPagingBudgetProjectListNotInFlowAndCanCombineAndWithPackage<VBudgetProjectNotInFlow>(paging, filter);
        }

        private async Task<object> GetPagingBudgetProjectListNotInFlowAndCanCombineAndWithPackage<T>(Paging paging, BudgetProjectFilter filter)
        {
            //后台指定归口部门的过滤条件;
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.RelevantDepartmentId = CurrentUser.DepartmentId;
            //返回的始终是VBudgetProject
            var listOfPaging = await Db.GetPagingListSpAsync<VBudgetProject, BudgetProjectExtendFilter>(
                            paging,
                            filterExtend,
                            typeof(T).Name);
            //注意这里获取的是申报时候的包信息,下面的大意是:由一组预算项目找到对应的包,但是取这组包的申报信息;
            var listOfPackage = await Db.GetListSpAsync<VPackageOfDeclareProject, PackageOfBudgetProjectFilter>(
                new PackageOfBudgetProjectFilter()
                {
                    WhereInBudgetProjectId = listOfPaging.List.Select(i => i.Id).ToStringIdWithSpacer()
                });

            return new
            {
                listOfPaging.Total,
                List = from item in listOfPaging.List
                       select new
                       {
                           BudgetProject = item,
                           Package = from itemOfPackage in listOfPackage where itemOfPackage.BudgetProjectId.Equals(item.Id) select itemOfPackage,
                       }
            };
        }

        /// <summary>
        /// 合并多个未进入流程的
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<object> CombineBudgetProject([FromBody]PredefindedModelList<BudgetProject, int> data)
        {
            return await Db.ExecuteSpAsync(new SPBudgetProjectCombine()
            {
                model = data.Model.ToDataTable(),
                listOfSourceBudgetProjectId = data.List.ToPredefindedKeyFieldsList().ToDataTable(),
                CreatorId = CurrentUser.Id
            });
        }

        /// <summary>
        /// 新增一个预算项目的必要性论证,同时开始一个预算流程,并通过这个论证;
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddAndPassBudgetProjectOfArgument([FromBody] PredefindedModelList<BudgetProjectOfArgument, PackageOfArgumentBudget> data)
        {
            data.Model.CreatorId = CurrentUser.Id;
            await MyWorkFlowBusiness.InitFlow(
                FlowTemplateIdOfBudgetProject,
                new SPBudgetProjectOfArgumentMerge
                {
                    List = data.Model.ToDataTable(),
                    PackageOfArgumentBudgetList = data.List.ToDataTable()
                },
                CurrentUser.Id);
        }

        /// <summary>
        /// 新增一个预算项目的必要性论证,同时开始一个预算流程,并不通过这个论证;注意这个是不通过
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddAndQuitBudgetProjectOfArgument([FromBody] PredefindedModelList<BudgetProjectOfArgument, PackageOfArgumentBudget> data)
        {
            data.Model.CreatorId = CurrentUser.Id;
            await MyWorkFlowBusiness.InitFlow(
                FlowTemplateIdOfBudgetProject,
                new SPBudgetProjectOfArgumentMerge
                {
                    List = data.Model.ToDataTable(),
                    PackageOfArgumentBudgetList = data.List.ToDataTable()
                },
                CurrentUser.Id,
                State: (int)StepState.Quit);
        }

        /// <summary>
        /// 分页获取预算项目列表,包括每个预算项目的流程信息和包信息.
        /// 对于每个项目,只有相应的归口部门的人可以看到;
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingBudgetProjectList(Paging paging, BudgetProjectFilter filter)
        {
            //TODO:仅保留这个地方的使用FilterExtend的方式的规律"只有归口部门"条件,其他的数据过滤都放到tfn里面了,哪种方便日后再说;
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.RelevantDepartmentId = CurrentUser.DepartmentId;

            var listOfPaging = await Db.GetPagingListSpAsync<VTFNBudgetProject, BudgetProjectExtendFilter>(
                paging,
                filterExtend,
                $"TFNBudgetProject({CurrentUser.Id})");

            var listOfPackage = await Db.GetListSpAsync<VPackageOfBudgetProject, PackageOfBudgetProjectFilter>(
                new PackageOfBudgetProjectFilter()
                {
                    WhereInBudgetProjectId = listOfPaging.List.Select(i => i.Id).ToStringIdWithSpacer()
                });

            return new
            {
                listOfPaging.Total,
                List = from item in listOfPaging.List
                       select new
                       {
                           BudgetProject = item,
                           Package = from itemOfPackage in listOfPackage where itemOfPackage.BudgetProjectId.Equals(item.Id) select itemOfPackage,
                       }
            };

        }

        /// <summary>
        /// 得到当前归口部门的某年度的预算
        /// </summary>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetBudgetList(BudgetFilter filter)
        {
            filter.OwnDepartmentsId = (int)CurrentUser.DepartmentId;
            return await Db.GetListSpAsync<VBudget, BudgetFilter>(filter);
        }

        /// <summary>
        /// 增加预算,不能修改删除哈;
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateBudget([FromBody]Budget model)
        {
            await Db.ExecuteSpAsync(new SPBudgetAdd() { List = model.ToDataTable() });
        }

        /// <summary>
        /// 进入预算
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassBudgetProjectOfEnter([FromBody]PredefindedModelList<EMBudgetProjectOfEnter, StepIdAndBudgetProjectId> data)
        {
            //批量检查一下年份,归口部门id,是否超预算;
            await Db.ExecuteSpAsync(new SPIsExceedBudget()
            {
                BudgetId = data.Model.BudgetId,
                BudgetProjectIdList = data.List.Select(i => i.BudgetProjectId).ToPredefindedKeyFieldsList().ToDataTable()
            });

            foreach (var item in data.List)
            {
                var spList = new List<PredefindedSPStructure>();
                var budgetProjectOfEnter = Tool.ModelToModel<BudgetProjectOfEnter, EMBudgetProjectOfEnter>(data.Model);
                budgetProjectOfEnter.Id = item.BudgetProjectId;
                budgetProjectOfEnter.CreatorId = CurrentUser.Id;

                spList.AddItem(new SPBudgetProjectOfEnterMerge
                {
                    List = budgetProjectOfEnter.ToDataTable()
                });

                var stepDone = new StepDone() { StepId = item.StepId, State = (int)StepState.Forward };

                await MyWorkFlowBusiness.DoneStep(stepDone, CurrentUser.Id, spList);
            }
        }

        /// <summary>
        /// 预算执行
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassBudgetProjectOfExecute([FromBody]StepDone<PredefindedModelList<BudgetProjectOfExecute, PackageOfExcuteBudget>> stepDone)
        {
            //TODO:这个SPBudgetProjectOfExecuteMerge里面,估计也需要判断是否超预算;
            stepDone.Data.Model.CreatorId = CurrentUser.Id;
            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPBudgetProjectOfExecuteMerge()
                {
                    List = stepDone.Data.Model.ToDataTable(),
                    PackageOfExcuteBudgetList = stepDone.Data.List.ToDataTable()
                });
            spList.AddItem(
                new SPExecuteProjectInit()
                {
                    SourceBudgetProjectId = stepDone.Data.Model.Id,
                    CreatorId = CurrentUser.Id
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList, stepDone.IsHold);
        }
    }
}