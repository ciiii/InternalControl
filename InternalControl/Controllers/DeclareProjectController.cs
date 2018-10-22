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
    /// 申报项目
    /// </summary>
    public class DeclareProjectController : BaseController
    {
        private int FlowTemplateIdOfDeclareProject { get { return Config.GetValue<int>("FlowTemplateId:DeclareProject"); } }

        /// <summary>
        /// 根据归口部门id,得到可以选择的年份
        /// </summary>
        /// <param name="RelevantDepartmentsId"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<IEnumerable<int>> GetYearsCanChoose(int RelevantDepartmentsId)
        {
            var model = await Db.GetModelByIdSpAsync<RelevantDepartmentsSetting>(RelevantDepartmentsId);
            var thisYear = DateTime.Now.Year;
            if (model != null && model.IsCanChooseThisYear)
            {
                return new List<int>() { thisYear, thisYear + 1 };
            }
            else
            {
                return new List<int>() { thisYear + 1 };
            }
        }

        /// <summary>
        /// 新增一个申报项目,同时开始一个申报流程;
        /// </summary>
        /// <param name="modelWithIsHold"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddDeclareProject([FromBody]ModelWithIsHold<PredefindedModelList<DeclareProject, Package>> modelWithIsHold)
        {
            modelWithIsHold.Data.Model.CreatorId = CurrentUser.Id;
            await MyWorkFlowBusiness.InitFlow(
                FlowTemplateIdOfDeclareProject,
                new SPDeclareProjectMerge
                {
                    List = modelWithIsHold.Data.Model.ToDataTable(),
                    PackageList = modelWithIsHold.Data.List.ToDataTable()
                },
                CurrentUser.Id,
                modelWithIsHold.IsHold);
        }

        /// <summary>
        /// 完善一个申报项目的资料
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task EditDeclareProject([FromBody]StepDone<PredefindedModelList<DeclareProject, Package>> stepDone)
        {
            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(new SPDeclareProjectMerge
            {
                List = stepDone.Data.Model.ToDataTable(),
                PackageList = stepDone.Data.List.ToDataTable()
            });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList,
                stepDone.IsHold
                );
        }

        /// <summary>
        /// 申请人可以看到的分页申报项目列表,包括每个申报项目的流程信息和包信息.
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        //[HttpGet]
        //async public Task<object> GetPagingDeclareProjectListByCreator(Paging paging, DeclareProjectFilter filter)
        //{
        //    var filterExtend = Tool.ModelToModel<DeclareProjectExtendFilter, DeclareProjectFilter>(filter);
        //    filterExtend.CreatorId = CurrentUser.Id;
        //    return await GetPagingDeclareProjectList(paging, filterExtend);
        //}

        /// <summary>
        /// 分页申报项目列表,包括每个申报项目的流程信息和包信息.
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingDeclareProjectList(Paging paging, DeclareProjectFilter filter)
        {
            var listOfPaging = await Db.GetPagingListSpAsync<VTFNDeclareProject, DeclareProjectFilter>(
                paging,
                filter,
                $"TFNDeclareProject({CurrentUser.Id})");

            var listOfPackage = await Db.GetListSpAsync<VPackageOfDeclareProject, PackageOfDeclareProjectFilter>(
                new PackageOfDeclareProjectFilter()
                {
                    WhereInDeclareProjectId = listOfPaging.List.Select(i => i.Id).ToStringIdWithSpacer()
                });

            return new
            {
                listOfPaging.Total,
                List = from item in listOfPaging.List
                       select new
                       {
                           DeclareProject = item,
                           Package = from itemOfPackage
                                     in listOfPackage
                                     where itemOfPackage.DeclareProjectId.Equals(item.Id)
                                     select itemOfPackage,
                       }
            };
        }

        /// <summary>
        /// 归口部门可以看到的分页申报项目列表,包括每个申报项目的流程信息和包信息.
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        //[HttpGet]
        //async public Task<object> GetPagingDeclareProjectListByRelevantDepartment(Paging paging, DeclareProjectFilter filter)
        //{
        //    var filterExtend = Tool.ModelToModel<DeclareProjectExtendFilter, DeclareProjectFilter>(filter);
        //    filterExtend.RelevantDepartmentId = CurrentUser.DepartmentId;
        //    return await GetPagingDeclareProjectList(paging, filterExtend);
        //}

        /// <summary>
        /// 申请项目审核通过
        /// </summary>
        /// <param name="modelWithIsHold"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassAuditDeclareProject([FromBody]StepDoneSimple stepDone)
        {
            //SPBudgetProjectInit
            //这里感觉不应该用StepDoneSimple而是应该用带BudgetProjectId的StepDone<int>
            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(new SPBudgetProjectInit
            {
                StepId = stepDone.StepId,
                CreatorId = CurrentUser.Id
            });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList);
        }

        /// <summary>
        /// 申请项目审核不通过
        /// </summary>
        /// <param name="modelWithIsHold"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task BackAuditDeclareProject([FromBody]StepDoneSimple stepDone)
        {
            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Back),
                CurrentUser.Id);
        }

    }
}