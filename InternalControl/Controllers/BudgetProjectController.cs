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
using System.IO;
using System.IO.Compression;

namespace InternalControl.Controllers
{
    /// <summary>
    /// 预算项目
    /// </summary>
    public class BudgetProjectController : BaseController
    {
        private int FlowTemplateIdOfBudgetProject { get { return Config.GetValue<int>("FlowTemplateId:BudgetProject"); } }

        /// <summary>
        /// 获取某预算项目详情
        /// </summary>
        /// <param name="budgetProjectId"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetBudgetProjectDetail(int budgetProjectId)
        {
            var budgetProject = await Db.GetModelByIdSpAsync<VTFNBudgetProject>(
                budgetProjectId,
                $"TFNBudgetProject({CurrentUser.Id})");

            var packageOfDeclareProjectBaseInfo = await Db.GetListSpAsync<VPackageOfDeclareProject, PackageFilter>(
                new PackageFilter()
                {
                    BudgetProjectId = budgetProjectId
                });
            var packageFilter = new PackageFilter()
            {
                WhereInId = packageOfDeclareProjectBaseInfo.Select(i => i.Id).ToStringIdWithSpacer()
            };

            return new
            {
                BudgetProject = new
                {
                    BudgetProject = budgetProject,
                    BudgetProjectOfArgument = await Db.GetModelByIdSpAsync<BudgetProjectOfArgument>(budgetProjectId),
                    BudgetProjectOfEnter = await Db.GetModelByIdSpAsync<BudgetProjectOfEnter>(budgetProjectId),
                    BudgetProjectOfExecute = await Db.GetModelByIdSpAsync<BudgetProjectOfExecute>(budgetProjectId)
                },

                BudgetPackage = new
                {
                    PackageOfDeclare = packageOfDeclareProjectBaseInfo,
                    PackageOfBudget = await Db.GetListSpAsync<VPackageOfBudgetProject, PackageFilter>(packageFilter),
                    PackageOfExcuteBudget = await Db.GetListSpAsync<VPackageOfExcuteBudget, PackageFilter>(packageFilter)
                }
            };
        }

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
                            typeof(T).Name,
                             orderStr: nameof(VBudgetProject.TotalDeclareAmount));
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
        /// 论证时,导出各个项目的包信息;
        /// 注意是使用BudgetProjectExtendFilter来筛选VBudgetProjectNotInFlow
        /// TODO:这里可能需要重构一下
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="listOfId">勾选的项目,传空则表示所有符合条件的预算项目都要导出</param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> ExportWhenBudgetProjectOfArgument(BudgetProjectFilter filter, IEnumerable<int> listOfId)
        {
            //后台指定归口部门的过滤条件;
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.RelevantDepartmentId = CurrentUser.DepartmentId;
            filterExtend.WhereInId = listOfId.Count() == 0 ? null : listOfId.ToStringIdWithSpacer();

            var list = (await Db.GetListSpAsync<VBudgetProjectNotInFlow, BudgetProjectExtendFilter>(filterExtend)).ToList();

            var listOfPackage = (await Db.GetListSpAsync<VPackageOfDeclareProject, PackageOfBudgetProjectFilter>(
                new PackageOfBudgetProjectFilter()
                {
                    WhereInBudgetProjectId = list.Select(i => i.Id).ToStringIdWithSpacer()
                })).ToList();

            var zipFileName = $"导出待论证项目_{DateTime.Now.ToString("yyyyMMddHHmmss")}";
            var zipPathName = MyPath.Combine(Env.WebRootPath, "Download", zipFileName);
            Directory.CreateDirectory(zipPathName);

            zipFileName = $"{zipFileName}.zip";
            var zipPathFileName = MyPath.Combine(Env.WebRootPath, "Download", zipFileName);

            for (int i = 0, countOfList = list.Count(); i < countOfList; i++)
            {
                var item = list[i];
                var itemName = $"{item.Name}-{item.MergeTypeWhenBudget}";
                var zipChildPathName = MyPath.Combine(zipPathName, itemName);
                Directory.CreateDirectory(zipChildPathName);
                //如果是集采-货物,则生成一个容纳了各个包为ExportWhenBudgetProjectOfArgumentCaseGoods的excel
                if (item.IsCenterPurchase && item.ProjectType == "货物")
                {
                    var packages = from itemOfPackage in listOfPackage
                                   where itemOfPackage.BudgetProjectId.Equals(item.Id)
                                   select Tool.ModelToModel<ExportWhenBudgetProjectOfArgumentCaseGoods, VPackageOfDeclareProject>(itemOfPackage);

                    MyXls.Export(zipChildPathName, packages, itemName);
                }
                else
                {
                    var packages = (from itemOfPackage in listOfPackage
                                    where itemOfPackage.BudgetProjectId.Equals(item.Id)
                                    select Tool.ModelToModel<ExportWhenBudgetProjectOfArgumentCaseOther, VPackageOfDeclareProject>(itemOfPackage)).ToList();

                    for (int j = 0, countOfPackages = packages.Count(); j < countOfPackages; j++)
                    {
                        var itemOfPackage = packages[j];
                        itemOfPackage.Id = j + 1;
                        //itemOfPackage.Attachment = Path.GetFileName(itemOfPackage.Attachment);

                        System.IO.File.Copy(
                            MyPath.Combine(Env.WebRootPath, itemOfPackage.Attachment),
                            MyPath.Combine(zipChildPathName, $"第{itemOfPackage.Id }包-{Path.GetFileName(itemOfPackage.Attachment)}"));
                    }

                    MyXls.Export(zipChildPathName, packages, itemName);
                }
            }
            ZipFile.CreateFromDirectory(zipPathName, zipPathFileName);
            return zipPathFileName;
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
        /// 认证不通过的预算项目
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingQuitedBudgetProjectOfArgumentList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.State = (int)StepState.Quit;
            return await GetPagingBudgetProjectList(paging, filterExtend);
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
        /// <param name="list"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddOrUpdateBudget([FromBody]IEnumerable<Budget> list)
        {
            await Db.ExecuteSpAsync(new SPBudgetAdd() { List = list.ToDataTable() });
        }

        /// <summary>
        /// 分页获取预算项目列表,包括每个预算项目的流程信息和包信息.
        /// 对于每个项目,只有相应的归口部门的人可以看到;
        /// </summary>
        /// <param name="paging"></param>
        /// <returns></returns>
        async private Task<object> GetPagingBudgetProjectList(Paging paging, BudgetProjectExtendFilter filterExtend)
        {
            //TODO:仅保留这个地方的使用FilterExtend的方式的规律"只有归口部门"条件,其他的数据过滤都放到tfn里面了,哪种方便日后再说;
            //var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
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
        /// 进入预算时,选中的项目导出
        /// </summary>
        /// <param name="listOfId">勾选的项目,不能传空</param>
        /// <param name="BudgetTypeName">预算类型名称</param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> ExportWhenBudgetProjectOfEnter(IEnumerable<int> listOfId,string BudgetTypeName)
        {
            if (listOfId.Count() == 0)
                throw new Exception("没有选中项目");

            //后台指定归口部门的过滤条件;
            var filterExtend = new BudgetProjectExtendFilter
            {
                WhereInId = listOfId.ToStringIdWithSpacer()
            };

            var list = (await Db.GetListSpAsync<VBudgetProject, BudgetProjectExtendFilter>(filterExtend)).ToList();
            var listOfExportWhenBudgetProjectOfEnter = new List<ExportWhenBudgetProjectOfEnter>();

            for (int i = 0,count = list.Count(); i < count; i++)
            {
                var vBudgetProject = list[i];
                var exportWhenBudgetProjectOfEnter = Tool.ModelToModel<ExportWhenBudgetProjectOfEnter, VBudgetProject>(vBudgetProject);
                exportWhenBudgetProjectOfEnter.Id = i + 1;
                exportWhenBudgetProjectOfEnter.IsCenterPurchase = vBudgetProject.IsCenterPurchase == true ? "是" : "否";
                exportWhenBudgetProjectOfEnter.BudgetTypeName = BudgetTypeName;
                listOfExportWhenBudgetProjectOfEnter.Add(exportWhenBudgetProjectOfEnter);
            }
            var fileName =  $"导出进入预算项目_{DateTime.Now.ToString("yyyyMMddHHmmss")}.xlsx";
            var filePath = MyPath.Combine(Env.WebRootPath, "Download");

            var result = MyXls.Export(filePath, listOfExportWhenBudgetProjectOfEnter, fileName);

            return MyPath.Combine(filePath, result);
        }

        /// <summary>
        /// 分页获取待进入预算的项目列表,包括每个预算项目的流程信息和包信息.
        /// 对于每个项目,只有相应的归口部门的人可以看到;
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingBudgetProjectOfEnterList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.State = (int)StepState.Stay;
            filterExtend.LastStepTemplateId = Config.GetValue<int>("StepTemplateId:BudgetProjectOfEnter");
            return await GetPagingBudgetProjectList(paging, filterExtend);
        }

        /// <summary>
        /// 未进入预算的预算项目,
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingUnfinishedBudgetProjectOfEnterList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            //整个项目未完成,在210以及之前的
            filterExtend.State = (int)StepState.Stay;
            filterExtend.EndLastStepTemplateId = Config.GetValue<int>("StepTemplateId:BudgetProjectOfEnter");
            return await GetPagingBudgetProjectList(paging, filterExtend);
        }

        /// <summary>
        /// 已经进入预算的预算项目,
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingFinishedBudgetProjectOfEnterList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            //整个项目,在220以及之后的
            //filterExtend.State = (int)StepState.Stay;
            filterExtend.BeginLastStepTemplateId = Config.GetValue<int>("StepTemplateId:BudgetProjectOfExecute");
            return await GetPagingBudgetProjectList(paging, filterExtend);
        }

        /// <summary>
        /// 获取当前勾选的项目按部门统计后,再按本次已经进入预算的总额排序的项目id列表
        /// </summary>
        /// <param name="filter"></param>
        /// <param name="listOfSelectedId">当前选中的id列表</param>
        /// <param name="numberOfTake">获取几个</param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetOrderOfProjectOfEnter(BudgetProjectFilter filter, IEnumerable<int> listOfSelectedId, int numberOfTake)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.State = (int)StepState.Stay;
            filterExtend.LastStepTemplateId = Config.GetValue<int>("StepTemplateId:BudgetProjectOfEnter");
            filterExtend.RelevantDepartmentId = CurrentUser.DepartmentId;
            var budgetProjectList = await Db.GetListSpAsync<VTFNBudgetProject, BudgetProjectExtendFilter>(filterExtend, $"TFNBudgetProject({CurrentUser.Id})");
            var listOfId = budgetProjectList.Select(i => i.Id);


            var result = await Db.QuerySpAsync<SPOrderOfProjectOfEnter, OrderOfProjectOfEnter>(new SPOrderOfProjectOfEnter()
            {
                listOfId = listOfId.ToPredefindedKeyFieldsList().ToDataTable(),
                listOfSelectedId = listOfSelectedId.ToPredefindedKeyFieldsList().ToDataTable()
            });

            return new
            {
                TopIn = result.Where(i => i.TotolBudgetAmountByDempartment > 0).Take(numberOfTake),
                TopNotIn = result.Reverse().Take(numberOfTake)
            };
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
        /// 分页获取待预算执行的项目列表,包括每个预算项目的流程信息和包信息.
        /// 对于每个项目,只有相应的归口部门的人可以看到;
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingBudgetProjectOfExecuteList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.State = (int)StepState.Stay;
            filterExtend.LastStepTemplateId = Config.GetValue<int>("StepTemplateId:BudgetProjectOfExecute");
            return await GetPagingBudgetProjectList(paging, filterExtend);
        }

        /// <summary>
        /// 未完成预算执行的预算项目
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingUnfinishedBudgetProjectOfExecuteList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.State = (int)StepState.Stay;
            return await GetPagingBudgetProjectList(paging, filterExtend);
        }

        /// <summary>
        /// 已完成预算执行的预算项目
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingFinishedBudgetProjectOfExecuteList(Paging paging, BudgetProjectFilter filter)
        {
            var filterExtend = Tool.ModelToModel<BudgetProjectExtendFilter, BudgetProjectFilter>(filter);
            filterExtend.State = (int)StepState.Forward;
            return await GetPagingBudgetProjectList(paging, filterExtend);
        }

        /// <summary>
        /// 预算执行,不允许暂存;
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
                spList, false);

            //18-11-6 暂时取消暂存
            //await MyWorkFlowBusiness.DoneStep(
            //    stepDone.ToSimple((int)StepState.Forward),
            //    CurrentUser.Id,
            //    spList, stepDone.IsHold);
        }

    }
}