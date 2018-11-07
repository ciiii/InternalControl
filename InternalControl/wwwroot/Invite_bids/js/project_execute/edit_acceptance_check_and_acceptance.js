$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    var projectId = oa.getUrlParam('projectId');
    parent.vm.toggle = true;
    parent.vm.isFlow = true;
    parent.$('.parent-li ul').hide();
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            myDetails: {},
            modelIndex: '',
            apply: {
                Url: '',
                FileName: '',
            },
            menu: [],
            activeText: '',
            isFirst: true,
            isEdit: false,
            selectModel: [],
            allName: '',
            fileArr: [],
            isGoods: true,
            newTimeToImplement: '',
            projecId: '',
            oneselfId: '',
            executionMode: [],
            agencyList: [],
            tabActive: 0,
            modelOne: {
                Model: {
                    Id: 0,
                    SourceBudgetProjectId: 0,
                    Year: 0,
                    Name: '',
                    ProjectType: '',
                    MergeTypeWhenExecute: '',
                    RelevantDepartmentId: 0,
                    TimeToImplement: '',
                    IsCenterPurchase: true,
                    IsGovernmentPurchase: true,
                    PurchaseMethod: '',
                    PurchaserName: '',
                    PurchaserAddress: '',
                    LinkmanName: '',
                    LinkmanPhone: '',
                    CeilingPrice: 0,
                    InspectionMethods: '',
                    ContractTerms: '',
                    CreatorId: 0,
                    CreateDatetime: '',
                    TotalExecuteAmount: 0,
                    Remark: ''
                },
                List: []
            },
            modelTwo: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: {}
            },
            modelThree: {
                StepId: 0,
                IsHold: false,
                Remark: '',
                Data: []
            },
            onLoad: function () {
                if (vm.activeText == '开始实施') {
                    vm.modelOne.Model = matchingProperty(vm.modelOne.Model, vm.myDetails.ExecuteProject.ExecuteProject);
                    vm.modelOne.Model.CeilingPrice = vm.modelOne.Model.TotalExecuteAmount;
                    vm.modelOne.Model.InspectionMethods = vm.myDetails.ExecuteProject.ExecuteProject.InspectionMethods;
                    vm.newTimeToImplement = vm.modelOne.Model.TimeToImplement;
                    if (vm.modelOne.Model.ContractTerms && vm.modelOne.Model.ContractTerms != '') {
                        vm.fileArr = vm.modelOne.Model.ContractTerms.split(',');
                    }
                    if (vm.modelOne.Model.ProjectType == '货物') {
                        vm.isGoods = true;
                    } else {
                        vm.isGoods = false;
                    }
                    vm.changeAllName();
                }
                if (vm.activeText == '执行方式') {
                    var ExecuteProject = vm.myDetails.ExecuteProject.ExecuteProject;
                    vm.modelTwo.StepId = ExecuteProject.LastStepId;
                    vm.modelTwo.Data = {
                        Id: ExecuteProject.Id,
                        ExecutionModeId: ExecuteProject.ExecutionModeId,
                        AgencyId: 0,
                        CreatorId: ExecuteProject.CreatorId,
                        CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                        Remark: ''
                    }

                    vm.getExecutionMode();
                    vm.getAgencyList();
                }
                if (vm.activeText == '技术确认') {
                    vm.modelThree.Data =[];
                    var Package = vm.myDetails.ExecutePackage.PackageOfExcuteBudget;
                    var Project = vm.myDetails.ExecuteProject.ExecuteProject;
                    if (Package && Package.length > 0) {
                        for (var i = 0; i < Package.length; i++) {
                            var data = {
                                Id: Package[i].Id,
                                IsMSE: true,
                                BiddingMethod: '总价招标',
                                IsCanOperate:Package[i].IsCanOperate,
                                IsAcceptCombo: true,
                                IsTakeBidBond: true,
                                BidBond: 0,
                                IsTakePerformanceBond: true,
                                PerformanceBond: 0,
                                LinkmanName: '',
                                LinkmanPhone: '',
                                BudgetTypeName:Package[i].BudgetTypeName,
                                ExecuteUnitPrice:Package[i].ExecuteUnitPrice,
                                IsImported:Package[i].IsImported,
                                TermOfService: '合同签订生效之日起______日内',
                                Prerequisites: '一、《中华人民共和国政府采购法》第二十二条规定：\n' +
                                '1.具有独立承担民事责任的能力；\n' +
                                '2.具有良好的商业信誉和健全的财务会计制度；\n' +
                                '3.具有履行合同所必需的设备和专业技术能力；\n' +
                                '4.有依法缴纳税收和社会保障资金的良好记录；\n' +
                                '5.参加政府采购活动前三年内，在经营活动中没有重大违法记录；\n' +
                                '6.法律、行政法规规定的其他条件。\n' +
                                '二、根据本项目所拟定的特定资格条件：\n' +
                                '1.',
                                PaymentMethod: '合同签订生效之日起_____日内支付合同总金额的_____%，' +
                                '项目验收合格之日起__________支付合同总金额的_____%，剩余_____%作为质量' +
                                '保证金，验收合格之日起无约定的质量问题，_____日内无质量问题支付。',
                                ProjectOverview: Package[i].ExecuteTechnicalRequirements,
                                Attachment: Package[i].Attachment,
                                GradingStandard: '',
                                Remark: ''
                            }
                            vm.modelThree.Data.push(data);
                        }
                    }
                }
                console.info(vm.modelOne);
            },
            getExecuteProjectDetail: function () {
                ProjectExecute.getExecuteProjectDetail('get', projectId, function getExecuteProjectDetailListener(success, obj, strErro) {
                    if (success) {
                        for (var i = 0; i < obj.ExecutePackage.PackageOfExcuteBudget.length; i++) {
                            obj.ExecutePackage.PackageOfExcuteBudget[i].ProjectName = obj.ExecuteProject.ExecuteProject.Name;
                        }
                        vm.myDetails = obj;
                        vm.menu = obj.Menu;
                        vm.onLoad();
                    } else {
                        console.info('获取执行项目所有的信息失败！');
                        console.info(strErro);
                    }
                });
            },
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '采购方式', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.purchaseMethoOne = obj;
                    } else {
                        console.info('获取计划采购方式失败！');
                        console.info(strErro);
                    }
                })
            },
            getExecutionMode: function () {
                Set.getExecutionMode('get', function getExecutionModeListener(success, obj, strErro) {
                    if (success) {
                        if (vm.myDetails.ExecuteProject.ExecuteProject.TotalExecuteAmount >= 50000) {
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Name == '自主采购') {
                                    obj.splice(i, 1);
                                }
                            }
                        }
                        if (!vm.myDetails.ExecuteProject.ExecuteProject.IsGovernmentPurchase) {
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Name == '政府采购中心') {
                                    obj.splice(i, 1);
                                }
                                if (obj[i].Name == '网上竞价') {
                                    obj.splice(i, 1);
                                }
                                if (obj[i].Name == '商城直购') {
                                    obj.splice(i, 1);
                                }
                            }
                        } else {
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Name == '自主采购') {
                                    obj.splice(i, 1);
                                }
                            }
                        }
                        vm.executionMode = obj;
                    } else {
                        console.info('获取执行方式失败！');
                        $.oaNotify.error(strErro);
                    }
                });
            },
            getAgencyList: function () {
                Set.getAgencyList('get', function getAgencyListListener(success, obj, strErro) {
                    if (success) {
                        vm.agencyList = obj;
                    } else {
                        console.info('获取代理机构失败！');
                        $.oaNotify.error(strErro);
                    }
                });
            },
            changeAgencyId: function (e) {
                vm.modelTwo.Data.AgencyId = parseInt(e.target.value);
            },
            getActive: function (el, index) {
                if (vm.activeText == el.StepTemplateName) {
                    if (el.ISCurrentStepTemplate) {
                        if (el.IsCanOperate) {
                            vm.isEdit = true;
                        } else {
                            vm.isEdit = false;
                        }
                    } else {
                        vm.isEdit = false;
                    }
                    return 'state-active';
                } else {
                    if (vm.isFirst) {
                        if (el.ISCurrentStepTemplate) {
                            if (el.IsCanOperate) {
                                vm.isEdit = true;
                                vm.activeText = el.StepTemplateName;
                                vm.isFirst = false;
                                return 'state-active';
                            } else {
                                vm.activeText = '开始实施';
                                vm.isEdit = false;
                                vm.isFirst = false;
                            }
                        }
                    }
                }
            },
            getClass: function (el) {
                if (el.ISCurrentStepTemplate) {
                    return 'state-current'
                } else {
                    if (el.IsPassed) {
                        return 'state-passed'
                    } else {
                        return 'state-not-started'
                    }
                }
            },
            clickLi: function (index, el) {
                vm.activeText = el.StepTemplateName;

                if (el.ISCurrentStepTemplate) {
                    if (el.IsCanOperate) {
                        vm.isEdit = true;
                    } else {
                        vm.activeText == '开始实施'
                        vm.isEdit = false;
                    }
                }
                if (el.IsPassed && !el.ISCurrentStepTemplate) {
                    vm.isEdit = false;
                }

                if (vm.activeText == '开始实施') {
                    vm.changeAllName();
                }
            },
            getTabClass: function (title) {
                if (vm.activeText == title) {
                    return 'active';
                }
            },
            changeAllName: function () {
                var names = [];
                for (var i = 0; i < vm.myDetails.ExecutePackage.PackageOfExcuteBudget.length; i++) {
                    var name = vm.myDetails.ExecutePackage.PackageOfExcuteBudget[i].ItemName;
                    if (name != '') {
                        names.push(name);
                    }
                }
                vm.allName = names.join();
            },
            changeCeilingPrice: function () {
                if (vm.modelOne.Model.CeilingPrice > vm.modelOne.Model.TotalExecuteAmount) {
                    $.oaNotify.error('【最高限价】只能小于等于【预算金额】！');
                    vm.modelOne.Model.CeilingPrice = vm.modelOne.Model.TotalExecuteAmount;
                }
            },
            getClassMethod: function (text) {
                if (!vm.modelOne.Model.InspectionMethods || vm.modelOne.Model.InspectionMethods == '') {
                    vm.modelOne.Model.InspectionMethods = '综合评分';
                }
                if (vm.modelOne.Model.InspectionMethods == text) {
                    return 'active'
                }
            },
            clickMethod: function (e) {
                vm.modelOne.Model.InspectionMethods = e.target.innerText;
            },
            changePurchaseMethoOne: function (e) {
                vm.modelOne.Model.PurchaseMethod = e.target.value;
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item, false);
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    return true;
                } else {
                    return false;
                }
            },
            changeTime: function () {
                var isTime = vm.compareTime(vm.modelOne.Model.TimeToImplement, vm.newTimeToImplement);
                if (!isTime) {
                    $.oaNotify.error('【实施截止时间】只能在' + vm.modelOne.Model.TimeToImplement + '以内！');
                    vm.newTimeToImplement = vm.modelOne.Model.TimeToImplement;
                    return;
                }
            },
            compareTime: function (oldTime, newTime) {
                oldTime = new Date(oldTime).getTime();
                newTime = new Date(newTime).getTime();
                if (newTime > oldTime) {
                    return false;
                } else {
                    return true;
                }
            },
            postData: function () {
                vm.modelOne.Model.TimeToImplement = vm.newTimeToImplement;
                if (vm.fileArr.length != 0) {
                    vm.modelOne.Model.ContractTerms = vm.fileArr.join();
                }
                vm.modelOne.List = [];
                if (vm.selectModel.length != 0) {
                    for (var i = 0; i < vm.selectModel.length; i++) {
                        var id = vm.selectModel[i].ExecuteProject.Id;
                        vm.modelOne.List.push(id);
                    }
                }
                if (!vm.modelOne.Model.PurchaseMethod || vm.modelOne.Model.PurchaseMethod == '') {
                    $.oaNotify.error('请选择采购方式！');
                    return;
                }
                vm.modelOne.Model.CreateDatetime = formatDate(new Date(), 'YY-MM-DD hh:mm:ss');
                vm.beginExecuteProject(vm.modelOne.$model);
            },
            beginExecuteProject: function (data) {
                ProjectExecute.beginExecuteProject('post', data, function beginExecuteProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            countCollectionPrice: function () {
                vm.modelOne.Model.TotalExecuteAmount = 0;
                vm.modelOne.Model.TotalExecuteAmount = vm.selectModel.reduce(function (total, item) {
                    if (item.ExecuteUnitPrice == '') {
                        item.ExecuteUnitPrice = 0;
                    }
                    return total + parseInt(item.ExecuteNumber) * parseInt(item.ExecuteUnitPrice);
                }, 0)
            },
            clickAddMerge: function () {
                vm.oneselfId = vm.modelOne.Model.Id;
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
            },
            clickSubmitOne: function () {
                vm.postData();
            },
            getObjClass: function (text) {
                if (vm.model.Data.Model.ProjectType == text) {
                    return 'active';
                }
            },
            getClassExecutionMode: function (id) {
                if (vm.modelTwo.Data.ExecutionModeId == id) {
                    return 'active'
                }
            },
            changeExecutionMode: function (e) {
                vm.modelTwo.Data.ExecutionModeId = parseInt(e.target.dataset.id);
            },
            clickSubmitTwo: function () {
                if (vm.modelTwo.Data.ExecutionModeId) {
                    if (vm.modelTwo.Data.ExecutionModeId == 4) {
                        if (vm.modelTwo.Data.AgencyId == '' || vm.modelTwo.Data.AgencyId == 0) {
                            $.oaNotify.error('请选择代理机构！');
                        } else {
                            vm.passExecuteProjectOfGetRunMode(vm.modelTwo.$model);
                        }
                    } else {
                        vm.passExecuteProjectOfGetRunMode(vm.modelTwo.$model);
                    }
                } else {
                    $.oaNotify.error('请选择执行方式！');
                }

            },
            passExecuteProjectOfGetRunMode: function (data) {
                ProjectExecute.passExecuteProjectOfGetRunMode('post', data, function passExecuteProjectOfGetRunModeListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.getExecuteProjectDetail();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            tabClass: function (index) {
                console.info(index);
                if (vm.tabActive == index) {
                    return 'active';
                }
            },
            clickTabClass: function (index) {
                vm.tabActive = index;
            },
            getClassInviteTenders: function (text,selectText) {
                if (selectText == text) {
                    return 'active'
                }
            },
            clickInviteTenders: function (text,selectText) {
                selectText = text;
            },
            changeBidBond:function () {

            },
            changePerformanceBond:function () {

            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
            clickBtnCancel: function () {
                parent.vm.toggle = false;
                parent.vm.isFlow = false;
                location.href = '/Invite_bids/views/project_execute/execute_list.html';
            },
        });
        $('.form-year').datetimepicker({
            format: 'yyyy',
            todayBtn: 1,
            autoclose: 1,
            startView: 4,
            minView: 4,
            language: 'zh-CN',
        });
        $('.form-month').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN',
            linkField: "mirror_field"
        });
        vm.getCategoryDictionary();
        vm.getExecuteProjectDetail();
        avalon.scan(document.body);
    });
});