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
    /// 执行项目
    /// </summary>
    public class ExecuteProjectController : BaseController
    {
        private int FlowTemplateIdOfExecuteProject { get { return Config.GetValue<int>("FlowTemplateId:ExecuteProject"); } }

        /// <summary>
        /// 获取执行项目列表,带流程,带包
        /// 还没有进入执行流程的执行项目也会选取出来,方便"开始实施"
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingExecuteProjectList(Paging paging, ExecuteProjectFilter filter, bool IsOrderByCreateTime)
        {
            //这个不需要后台指定过滤条件;
            var listOfPaging = await Db.GetPagingListSpAsync<VTFNExecuteProject, ExecuteProjectFilter>(
                            paging,
                            filter,
                            $"TFNExecuteProject({CurrentUser.Id})",
                            orderStr: IsOrderByCreateTime ? "" : nameof(VTFNExecuteProject.TotalExecuteAmount));

            var listOfPackage = await Db.GetListSpAsync<VPackageOfExcuteBudget, PackageFilter>(
                new PackageFilter()
                {
                    WhereInExecuteProjectId = listOfPaging.List.Select(i => i.Id).ToStringIdWithSpacer()
                });

            return new
            {
                listOfPaging.Total,
                List = from item in listOfPaging.List
                       select new
                       {
                           ExecuteProject = item,
                           Package = from itemOfPackage in listOfPackage where itemOfPackage.ExecuteProjectId.Equals(item.Id) select itemOfPackage,
                       }
            };
        }

        /// <summary>
        /// 获取还没有进入执行流程的执行项目,用于合并
        /// </summary>
        /// <param name="paging"></param>
        /// <param name="filter"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetPagingExecuteProjectListNotInFlowAndWithPackage(Paging paging, ExecuteProjectFilter filter)
        {
            //后台指定归口部门的过滤条件;
            //var filterExtend = Tool.ModelToModel<ExecuteProjectExtendFilter, ExecuteProjectFilter>(filter);
            //filterExtend.RelevantDepartmentId = CurrentUser.DepartmentId;
            filter.RelevantDepartmentId = CurrentUser.DepartmentId;

            //返回的始终是VBudgetProject
            var listOfPaging = await Db.GetPagingListSpAsync<VExecuteProjectNotInFlow, ExecuteProjectFilter>(
                            paging,
                            filter);

            var listOfPackage = await Db.GetListSpAsync<VPackageOfExcuteBudget, PackageFilter>(
                new PackageFilter()
                {
                    WhereInId = listOfPaging.List.Select(i => i.Id).ToStringIdWithSpacer()
                });

            return new
            {
                listOfPaging.Total,
                List = from item in listOfPaging.List
                       select new
                       {
                           ExecuteProject = item,
                           Package = from itemOfPackage in listOfPackage where itemOfPackage.ExecuteProjectId.Equals(item.Id) select itemOfPackage,
                       }
            };
        }

        /// <summary>
        /// 根据执行项目id,获取执行项目所有的信息,所有可能的步骤,已经走过的步骤,当前的步骤,是否可以执行当前的步骤
        /// </summary>
        /// <param name="executeProjectId">执行项目id</param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetExecuteProjectDetail(int executeProjectId)
        {
            //某个执行项目的基本信息.来自TFNExecuteProject所以带流程信息
            var executeProjectBaseInfo = await Db.GetModelByIdSpAsync<VTFNExecuteProject>(
                executeProjectId,
                $"TFNExecuteProject({CurrentUser.Id})");

            if (executeProjectBaseInfo == null) throw new Exception("没有找到该执行项目");

            var packageOfExecuteProjectBaseInfo = await Db.GetListSpAsync<VTFNPackageOfExcuteBudget, PackageFilter>(
                new PackageFilter()
                {
                    ExecuteProjectId = executeProjectId
                },
                $"TFNPackageOfExcuteBudget({CurrentUser.Id})");

            //如果还没开始实施,则当前步骤为flowTemplateid=>中第一个stepTemplateId,是个神奇的数字
            var currentStepTemplateId = executeProjectBaseInfo.LastStepTemplateId ?? FlowTemplateIdOfExecuteProject;

            //已经走过的步骤的步骤模板唯一集合;
            var listOfStepTemplateHavePassed = (await Db.GetListSpAsync<StepTemplate>(
                $"TFNGetStepTemplateHavePassed({executeProjectBaseInfo.LastStepId ?? 0})")).ToList();

            //当前所有应该显示出来的步骤模板名称;ExecutionModeId==null时视为0
            var stepTemplateOfExecute =
                Config.GetValue<string>($"StepTemplateOfExecute:{executeProjectBaseInfo.ExecutionModeId ?? 0}").Split(",");

            var isNotInFlow = listOfStepTemplateHavePassed.Count() == 0;
            //TODO:如果还没有开始流程,那么往里面加一条第一个步骤,这个很讨厌;
            //不应该加这个,为了适应这个,加了
            if (listOfStepTemplateHavePassed.Count() == 0)
            {
                listOfStepTemplateHavePassed.Add(
                    new StepTemplate()
                    {
                        Id = currentStepTemplateId,
                        Name = stepTemplateOfExecute.FirstOrDefault()
                    });
            }

            //左侧菜单
            var menu = from item in stepTemplateOfExecute
                       join itemPassed in listOfStepTemplateHavePassed on item equals itemPassed.Name into joinedList
                       from joinedItem in joinedList.DefaultIfEmpty()
                       select new MenuOfExecuteProject
                       {
                           //StepTemplateId = joinedItem?.Id,  没有发生的暂时取不到这个玩意儿
                           StepTemplateName = item,
                           IsPassed = joinedItem?.Name == null ? false : true,
                           //当state=0时,才有当前步骤
                           ISCurrentStepTemplate = (executeProjectBaseInfo.State== null ||  executeProjectBaseInfo.State == (int)StepState.Stay) ?
                                                   (currentStepTemplateId == joinedItem?.Id) : false,
                           //如果此步骤是前步骤,且当前步骤为可执行(如果当前步骤是否可执行IsCanOperate为null,则说明是还没开始实施,则判断当前 登录人是否为可执行项目的归口部门),则为可执行的状态;
                           IsCanOperate = currentStepTemplateId == joinedItem?.Id &&
                                        (executeProjectBaseInfo.IsCanOperate ??
                                        (CurrentUser.DepartmentId == executeProjectBaseInfo.RelevantDepartmentId))
                       };
            var ListOfMenu = menu.ToList();

            //TODO:这块是否可以更正|投诉写的太复杂了.
            //更正是否可以使用
            var isCanOperateWhenCorrection = false;
            //执行方式为社会代理机构,而登录人是代理机构角色时,可以操作
            if (Config.GetValue<int>("ExecutionModeId:社会代理机构") == executeProjectBaseInfo.ExecutionModeId)
            {
                isCanOperateWhenCorrection = CurrentUser.RoleId == Config.GetValue<int>("RoleId:Agency");
            }
            else
            //执行方式不是社会代理机构时,登录人是采购中心角色,可以操作
            {
                isCanOperateWhenCorrection = CurrentUser.RoleId == Config.GetValue<int>("RoleId:PurchasingCenter");
            }

            //最后,自主采购都不能操作;
            if (Config.GetValue<int>("ExecutionModeId:自主采购") == executeProjectBaseInfo.ExecutionModeId)
            {
                isCanOperateWhenCorrection = false;
            }

            ListOfMenu.Add(
                new MenuOfExecuteProject()
                {
                    StepTemplateName = "更正情况",
                    //步骤经过360之后,就可以使用
                    IsPassed = executeProjectBaseInfo.LastStepTemplateId >= Config.GetValue<int>("StepTemplateId:ExecuteProjectOfBidEvaluation") ? true : false,
                    ISCurrentStepTemplate = false,
                    IsCanOperate = isCanOperateWhenCorrection
                });

            //质疑是否可以使用
            var isCanOperateWhenQuestion = false;
            //执行方式为社会代理机构,而登录人是代理机构角色时,可以操作
            if (Config.GetValue<int>("ExecutionModeId:社会代理机构") == executeProjectBaseInfo.ExecutionModeId)
            {
                isCanOperateWhenQuestion = CurrentUser.RoleId == Config.GetValue<int>("RoleId:Agency");
            }
            //不论什么执行方式,登录人是采购中心角色,可以操作
            if (CurrentUser.RoleId == Config.GetValue<int>("RoleId:PurchasingCenter"))
            {
                isCanOperateWhenQuestion = true;
            }

            //最后,自主采购都不能操作;
            if (Config.GetValue<int>("ExecutionModeId:自主采购") == executeProjectBaseInfo.ExecutionModeId)
            {
                isCanOperateWhenQuestion = false;
            }

            ListOfMenu.Add(
            new MenuOfExecuteProject()
            {
                StepTemplateName = "质疑投诉",
                IsPassed = executeProjectBaseInfo.LastStepTemplateId >= Config.GetValue<int>("StepTemplateId:ExecuteProjectOfBidEvaluation") ? true : false,
                ISCurrentStepTemplate = false,
                IsCanOperate = isCanOperateWhenQuestion
            });

            var packageFilter = new PackageFilter()
            {
                WhereInId = packageOfExecuteProjectBaseInfo.Select(i => i.Id).ToStringIdWithSpacer()
            };

            var packageFilterWithExecuteProjectId = new PackageFilter()
            {
                WhereInExecuteProjectId = executeProjectId.ToString()
            };
            return new DetailOfExecuteProject
            {
                ExecuteProject = new MultiPartOfExecuteProject()
                {
                    ExecuteProject = executeProjectBaseInfo,
                    ExecuteProjectOfGetRunMode = await Db.GetModelByIdSpAsync<VExecuteProjectOfGetRunMode>(executeProjectId),
                    ExecuteProjectOfArgument = await Db.GetModelByIdSpAsync<ExecuteProjectOfArgument>(executeProjectId),
                    ExecuteProjectOfConfirm = await Db.GetModelByIdSpAsync<ExecuteProjectOfConfirm>(executeProjectId),
                    ExecuteProjectOfInvitation = await Db.GetModelByIdSpAsync<ExecuteProjectOfInvitation>(executeProjectId),
                    ExecuteProjectOfBidEvaluation = await Db.GetModelByIdSpAsync<ExecuteProjectOfBidEvaluation>(executeProjectId),
                    ExecuteProjectExperts = await Db.GetListSpAsync<VExecuteProjectExperts, PackageFilter>(
                         packageFilterWithExecuteProjectId),
                    ExecuteProjectOfResultNotice = await Db.GetModelByIdSpAsync<ExecuteProjectOfResultNotice>(executeProjectId),
                    ExecuteProjectOfQuestion = await Db.GetListSpAsync<ExecuteProjectOfQuestion, PackageFilter>(packageFilterWithExecuteProjectId),
                    ExecuteProjectOfCorrection = await Db.GetListSpAsync<ExecuteProjectOfCorrection, PackageFilter>(packageFilterWithExecuteProjectId)
                },

                ExecutePackage = new MultiPartOfExecutePackage()
                {
                    PackageOfExcuteBudget = packageOfExecuteProjectBaseInfo,
                    PackageOfTechnicalConfirmation = await Db.GetListSpAsync<PackageOfTechnicalConfirmation, PackageFilter>(packageFilter),
                    PackageOfInvitation = await Db.GetListSpAsync<PackageOfInvitation, PackageFilter>(packageFilter),
                    PackageOfBidEvaluation = await Db.GetListSpAsync<PackageOfBidEvaluation, PackageFilter>(packageFilter),
                    PackageOfResultNotice = await Db.GetListSpAsync<PackageOfResultNotice, PackageFilter>(packageFilter),
                    PackageOfDrawUpContract = await Db.GetListSpAsync<PackageOfDrawUpContract, PackageFilter>(packageFilter),
                    PackageOfContractSigning = await Db.GetListSpAsync<PackageOfContractSigning, PackageFilter>(packageFilter),
                    PackageOfContractPublicity = await Db.GetListSpAsync<PackageOfContractPublicity, PackageFilter>(packageFilter),
                    PackageOfAcceptanceCheckAndAcceptance = await Db.GetListSpAsync<PackageOfAcceptanceCheckAndAcceptance, PackageFilter>(packageFilter)

                },
                RejectedPackage = await Db.GetListSpAsync<VPackageOfRejected, PackageFilter>(packageFilterWithExecuteProjectId),
                Menu = ListOfMenu,
                //CurrentStepTemplateId = currentStepTemplateId,

                ////而是否可执行则定为是否当前归口部门的人
                //IsCanOperate = executeProjectBaseInfo.IsCanOperate ?? (CurrentUser.DepartmentId == executeProjectBaseInfo.RelevantDepartmentId)
            };
        }

        /// <summary>
        /// 开始执行,同时可能会合并多个符合条件的执行项目;
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task BeginExecuteProject([FromBody]PredefindedModelList<ExecuteProject, int> data)
        {
            await MyWorkFlowBusiness.InitFlow(
                FlowTemplateIdOfExecuteProject,
                new SPExecuteProjectMerge()
                {
                    List = data.Model.ToDataTable(),
                    ListOfMergeExecuteProjectId = data.List.ToPredefindedKeyFieldsList().ToDataTable()
                }, CurrentUser.Id);
        }

        /// <summary>
        /// 执行方式,IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassExecuteProjectOfGetRunMode([FromBody]StepDone<ExecuteProjectOfGetRunMode> stepDone)
        {
            stepDone.Data.CreatorId = CurrentUser.Id;

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPExecuteProjectOfGetRunModeMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            //await Db.ExecuteSpAsync(
            //    new SPExecuteProjectOfGetRunModeMerge()
            //    {
            //        List = stepDone.Data.ToDataTable(),
            //    });
            //var spList = new List<PredefindedSPStructure>();

            #region 暂时放到[FNIsEmployeeCanOperateStep]去做了;
            ////TODO:日后考虑移到sp
            //var executeProject = await Db.GetModelByIdSpAsync<ExecuteProject>(stepDone.Data.Id);
            //如果是自主采购or非集采,则指定执行人为申报相关人
            //if (stepDone.Data.ExecutionModeId == 1 || !executeProject.ISCenterPurchase)
            //{
            //    var listOfPackageOfExecute = await Db.GetListSpAsync<VPackageOfExcuteBudget, PackageOfExecuteProjectFilter>(
            //        new PackageOfExecuteProjectFilter() { WhereInExecuteProjectId = stepDone.Data.Id.ToString() }
            //        );
            //    spList.AddItem(new SPStepAssignedEmployeeAdd()
            //    {
            //        //NextStepId
            //        EmpIdList = listOfPackageOfExecute.Select(i => i.DeclareCreatorId).ToPredefindedKeyFieldsList().ToDataTable()
            //    });
            //} 
            #endregion

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList, stepDone.IsHold);
        }

        /// <summary>
        /// 技术确认
        /// 如果全部包的技术确认都结束了,返回true,方便前台跳转/刷新
        /// IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<bool> PassPackageOfTechnicalConfirmation([FromBody]StepDone<IEnumerable<PackageOfTechnicalConfirmation>> stepDone)
        {
            var result = await Db.QuerySpAsync<SPIsPackageOfTechnicalConfirmationWillDone, bool>(new SPIsPackageOfTechnicalConfirmationWillDone()
            {
                IdList = stepDone.Data.Select(i => i.Id).ToPredefindedKeyFieldsList().ToDataTable()
            });

            //返回false表示还没有完全结束,则需要hold
            var isHold = !result.FirstOrDefault();

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPPackageOfTechnicalConfirmationMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList,
                isHold || stepDone.IsHold);

            //如果全部结束了,返回true,方便前台跳转/刷新
            return !isHold;
        }

        /// <summary>
        /// 执行论证通过,IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassExecuteProjectOfArgument([FromBody] StepDone<ExecuteProjectOfArgument> stepDone)
        {
            stepDone.Data.CreatorId = CurrentUser.Id;

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPExecuteProjectOfArgumentMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList, stepDone.IsHold);
        }
        /// <summary>
        /// 采购确认通过,IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassExecuteProjectOfConfirm([FromBody] StepDone<ExecuteProjectOfConfirm> stepDone)
        {
            stepDone.Data.CreatorId = CurrentUser.Id;

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPExecuteProjectOfConfirmMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList, stepDone.IsHold);
        }

        /// <summary>
        /// 采购邀请,IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassExecuteProjectOfInvitation(
            [FromBody]StepDone<PredefindedModelList<ExecuteProjectOfInvitation, PackageOfInvitation>> stepDone)
        {
            stepDone.Data.Model.CreatorId = CurrentUser.Id;

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPExecuteProjectOfInvitationMerge()
                {
                    List = stepDone.Data.Model.ToDataTable(),
                    ListOfPackageOfInvitation = stepDone.Data.List.ToDataTable()
                });

            await MyWorkFlowBusiness.DoneStep(
               stepDone.ToSimple((int)StepState.Forward),
               CurrentUser.Id,
               spList, stepDone.IsHold);
        }

        /// <summary>
        /// 开标评标
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassExecuteProjectOfBidEvaluation(
            [FromBody]StepDone<PredefindedModelList<ExecuteProjectOfBidEvaluation, PackageOfBidEvaluation>> stepDone)
        {
            stepDone.Data.Model.CreatorId = CurrentUser.Id;

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPExecuteProjectOfBidEvaluationMerge()
                {
                    List = stepDone.Data.Model.ToDataTable(),
                    ListOfPackageOfBidEvaluation = stepDone.Data.List.ToDataTable()
                });

            await MyWorkFlowBusiness.DoneStep(
               stepDone.ToSimple((int)StepState.Forward),
               CurrentUser.Id,
               spList,
               stepDone.IsHold);
        }

        /// <summary>
        /// 抽取专家,Id是执行项目的id,数组是专家id构成的数组
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassExecuteProjectExperts([FromBody]StepDone<EMExecuteProjectExperts> stepDone)
        {
            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPExecuteProjectExpertsMerge()
                {
                    ExecuteProjectId = stepDone.Data.ExecuteProjectId,
                    IdListOfExecuteProjectExperts = stepDone.Data.IdListOfExecuteProjectExperts.ToPredefindedKeyFieldsList().ToDataTable(),
                    BackupIdListOfExecuteProjectExperts = stepDone.Data.BackupIdListOfExecuteProjectExperts.ToPredefindedKeyFieldsList().ToDataTable()
                });

            await MyWorkFlowBusiness.DoneStep(
               stepDone.ToSimple((int)StepState.Forward),
               CurrentUser.Id,
               spList,
               stepDone.IsHold);
        }

        /// <summary>
        /// 结果信息
        /// TODO:还没有考虑废标的情况
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<bool> PassExecuteProjectOfResultNotice(
            [FromBody]StepDone<ModelOfPassExecuteProjectOfResultNotice> stepDone)
        {
            stepDone.Data.ModelOfExecuteProjectOfResultNotice.CreatorId = CurrentUser.Id;

            //是否在这次操作后,处理完这个项目所有包的结果信息;
            //var listOfId = stepDone.Data.ListOfPackageOfResultNotice.Select(i => i.Id).Union(stepDone.Data.ListOfRejectPackageId);
            var isAllWillBeDone = (await Db.QuerySpAsync<SPIsPackageOfResultNoticeWillDone, bool>(new SPIsPackageOfResultNoticeWillDone()
            {
                IdList = stepDone.Data.ListOfPackageOfResultNotice.Select(i => i.Id).ToPredefindedKeyFieldsList().ToDataTable()
            })).FirstOrDefault();

            var isAllWillBeRejected = (await Db.QuerySpAsync<SPIsPackageOfResultNoticeWillDone, bool>(new SPIsPackageOfResultNoticeWillDone()
            {
                IdList = stepDone.Data.ListOfRejectPackageId.ToPredefindedKeyFieldsList().ToDataTable()
            })).FirstOrDefault();

            bool isHold = (!isAllWillBeDone) || isAllWillBeRejected;

            var spList = new List<PredefindedSPStructure>();

            //2018-11-16 所有的包都可以继续增改
            spList.AddItem(
                    new SPExecuteProjectOfResultNoticeMerge()
                    {
                        List = stepDone.Data.ModelOfExecuteProjectOfResultNotice.ToDataTable(),
                        ListOfPackageOfResultNotice = stepDone.Data.ListOfPackageOfResultNotice.ToDataTable()
                    });

            //如果有废包
            if (stepDone.Data.ListOfRejectPackageId.Count() > 0)
            {
                spList.AddItem(
               new SPRejectPackage()
               {
                   EmpId = CurrentUser.Id,
                   ExecuteProjectId = stepDone.Data.ModelOfExecuteProjectOfResultNotice.Id,
                   PackageIdList = stepDone.Data.ListOfRejectPackageId.ToPredefindedKeyFieldsList().ToDataTable()
               });
            }

            //2018-11-16 所有的包都可以继续增改
            ////如果有正常包.则完成这个步骤
            ////如果没有正常包,则意味着所有的包都被废了,也会造成项目废标.这里继续执行只会提示错误;
            //if (stepDone.Data.ListOfPackageOfResultNotice.Count() > 0)
            //{
            //    spList.AddItem(
            //        new SPExecuteProjectOfResultNoticeMerge()
            //        {
            //            List = stepDone.Data.ModelOfExecuteProjectOfResultNotice.ToDataTable(),
            //            ListOfPackageOfResultNotice = stepDone.Data.ListOfPackageOfResultNotice.ToDataTable()
            //        });
            //}

            await MyWorkFlowBusiness.DoneStep(
               stepDone.ToSimple((int)StepState.Forward),
               CurrentUser.Id,
               spList,
               isHold);

            //项目是否被推进了;
            return isHold;
        }

        //2018-10-13 为结果信息增加废包前;
        //[HttpPost]
        //async public Task<bool> PassExecuteProjectOfResultNotice(
        //    [FromBody]StepDone<PredefindedModelList<ExecuteProjectOfResultNotice, PackageOfResultNotice>> stepDone)
        //{
        //    var result = await Db.QuerySpAsync<SPIsPackageOfResultNoticeWillDone, bool>(new SPIsPackageOfResultNoticeWillDone()
        //    {
        //        IdList = stepDone.Data.List.Select(i => i.Id).ToPredefindedKeyFieldsList().ToDataTable()
        //    });

        //    //返回false表示还没有完全结束,则需要hold
        //    var isHold = !result.FirstOrDefault();

        //    stepDone.Data.Model.CreatorId = CurrentUser.Id;

        //    var spList = new List<PredefindedSPStructure>();
        //    spList.AddItem(
        //        new SPExecuteProjectOfResultNoticeMerge()
        //        {
        //            List = stepDone.Data.Model.ToDataTable(),
        //            ListOfPackageOfResultNotice = stepDone.Data.List.ToDataTable()
        //        });

        //    await MyWorkFlowBusiness.DoneStep(
        //       stepDone.ToSimple((int)StepState.Forward),
        //       CurrentUser.Id,
        //       spList,
        //       isHold || stepDone.IsHold);

        //    return isHold;
        //}

        /// <summary>
        /// 拟定合同
        /// 如果全部包的拟定合同都结束了,返回true,方便前台跳转/刷新
        /// IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<bool> PassPackageOfDrawUpContract([FromBody]StepDone<IEnumerable<PackageOfDrawUpContract>> stepDone)
        {
            var result = await Db.QuerySpAsync<SPIsPackageOfDrawUpContractWillDone, bool>(new SPIsPackageOfDrawUpContractWillDone()
            {
                IdList = stepDone.Data.Select(i => i.Id).ToPredefindedKeyFieldsList().ToDataTable()
            });

            //返回false表示还没有完全结束,则需要hold
            var isHold = !result.FirstOrDefault();

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPPackageOfDrawUpContractMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList,
                isHold || stepDone.IsHold);

            //如果全部结束了,返回true,方便前台跳转/刷新
            return !isHold;
        }

        /// <summary>
        /// 合同签订
        /// 如果全部包的合同签订都结束了,返回true,方便前台跳转/刷新
        /// IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<bool> PassPackageOfContractSigning([FromBody]StepDone<IEnumerable<PackageOfContractSigning>> stepDone)
        {
            var result = await Db.QuerySpAsync<SPIsPackageOfContractSigningWillDone, bool>(new SPIsPackageOfContractSigningWillDone()
            {
                IdList = stepDone.Data.Select(i => i.Id).ToPredefindedKeyFieldsList().ToDataTable()
            });

            //返回false表示还没有完全结束,则需要hold
            var isHold = !result.FirstOrDefault();

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPPackageOfContractSigningMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList,
                isHold || stepDone.IsHold);

            //如果全部结束了,返回true,方便前台跳转/刷新
            return !isHold;
        }

        /// <summary>
        /// 合同公示
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task PassPackageOfContractPublicity([FromBody]StepDone<IEnumerable<PackageOfContractPublicity>> stepDone)
        {
            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPPackageOfContractPublicityMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList,
                stepDone.IsHold);

        }

        /// <summary>
        /// 履约验收
        /// 如果全部包的合同签订都结束了,返回true,方便前台跳转/刷新
        /// IsHold设为false,目前没有暂存的功能
        /// </summary>
        /// <param name="stepDone"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task<bool> PassPackageOfAcceptanceCheckAndAcceptance([FromBody]StepDone<IEnumerable<PackageOfAcceptanceCheckAndAcceptance>> stepDone)
        {
            var result = await Db.QuerySpAsync<SPIsPackageOfAcceptanceCheckAndAcceptanceWillDone, bool>(new SPIsPackageOfAcceptanceCheckAndAcceptanceWillDone()
            {
                IdList = stepDone.Data.Select(i => i.Id).ToPredefindedKeyFieldsList().ToDataTable()
            });

            //返回false表示还没有完全结束,则需要hold
            var isHold = !result.FirstOrDefault();

            var spList = new List<PredefindedSPStructure>();
            spList.AddItem(
                new SPPackageOfAcceptanceCheckAndAcceptanceMerge()
                {
                    List = stepDone.Data.ToDataTable(),
                });

            await MyWorkFlowBusiness.DoneStep(
                stepDone.ToSimple((int)StepState.Forward),
                CurrentUser.Id,
                spList,
                isHold || stepDone.IsHold);

            //如果全部结束了,返回true,方便前台跳转/刷新
            return !isHold;
        }

        /// <summary>
        /// 增改质疑
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task QuestionExecuteProject([FromBody]ExecuteProjectOfQuestion model)
        {
            model.CreatorId = CurrentUser.Id;
            await Db.ExecuteSpAsync(new SPExecuteProjectOfQuestionMerge()
            {
                List = model.ToDataTable()
            });
        }


        /// <summary>
        /// 根据更正id,获取这个更正的详情
        /// </summary>
        /// <param name="executeProjectOfCorrectionId"></param>
        /// <returns></returns>
        [HttpGet]
        async public Task<object> GetExecuteProjectOfCorrectionById(int executeProjectOfCorrectionId)
        {
            return new
            {
                ExecuteProjectOfCorrection = await Db.GetModelByIdSpAsync<ExecuteProjectOfCorrection>(executeProjectOfCorrectionId),
                ListOfPackageOfResultNoticeOfCorrection =
                await Db.GetListSpAsync<PackageOfResultNoticeOfCorrection, PackageOfResultNoticeOfCorrectionFilter>(
                    new PackageOfResultNoticeOfCorrectionFilter()
                    {
                        ExecuteProjectOfCorrectionId = executeProjectOfCorrectionId
                    })
            };
        }

        /// <summary>
        /// 新增更正,注意没有修改和删除;
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        [HttpPost]
        async public Task AddExecuteProjectOfCorrection([FromBody]DataOfExecuteProjectOfCorrection data)
        {
            await Db.ExecuteSpAsync(new SPExecuteProjectOfCorrectionMerge()
            {
                List = data.ModelOfExecuteProjectOfCorrection.ToDataTable(),
                ListOfPackageOfResultNoticeOfCorrection = data.ListOfPackageOfResultNoticeOfCorrection.ToDataTable(),
                RejectPackageIdList = data.ListOfRejectPackageId.ToPredefindedKeyFieldsList().ToDataTable()
            });
        }
    }
}