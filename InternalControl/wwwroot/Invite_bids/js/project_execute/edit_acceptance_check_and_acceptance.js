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
            activeText: '开始实施',
            isEdit: false,
            selectModel: [],
            allName: '',
            fileArr: [],
            isGoods: true,
            newTimeToImplement: '',
            projecId:'',
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
                    CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                    TotalExecuteAmount: 0,
                    Remark: ''
                },
                List: []
            },

            onLoad: function () {
                vm.modelOne.Model = matchingProperty(vm.modelOne.Model, vm.myDetails.ExecuteProject.ExecuteProject);
                vm.selectModel = vm.myDetails.ExecutePackage.PackageOfExcuteBudget;
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
            getClass: function (index, el) {
                if (el.ISCurrentStepTemplate) {
                    if (el.IsCanOperate) {
                        vm.isEdit = true;
                        vm.activeText = el.StepTemplateName;
                        return 'state-active state-current'
                    } else {
                        vm.activeText = '开始实施';
                        vm.isEdit = false;
                        return 'state-current'
                    }
                }
                if (vm.activeText == el.StepTemplateName) {
                    if (el.IsPassed) {
                        return 'state-active state-passed'
                    }
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
                if (el.IsCanOperate && el.ISCurrentStepTemplate) {
                    vm.isEdit = true;
                }
                if (el.IsPassed && !el.ISCurrentStepTemplate) {
                    vm.isEdit = false;
                }
            },
            getTabClass: function (title) {
                if (vm.activeText == title) {
                    return 'active';
                }
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
                vm.newModal.Data.Model.Reply = vm.fileArr.join();
                if (vm.newModal.Data.Model.Reply == '') {
                    $.oaNotify.error(' 请上传合同主要条款文件！');
                }
                vm.newModal.Data.List = [];
                for (var i = 0; i < vm.model.Package.length; i++) {
                    var obj = vm.model.Package[i];
                    var data = {
                        Id: obj.Id,
                        ExecuteTechnicalRequirements: obj.BudgetTechnicalRequirements,
                        SerialNumber: 0,
                        ExecuteNumber: obj.BudgetNumber,
                        ExecuteUnitPrice: obj.BudgetUnitPrice,
                        Attachment: obj.Attachment,
                        Remark: obj.Remark
                    }
                    vm.newModal.Data.List.push(data);
                }
                console.info(vm.newModal.$model);
                vm.passBudgetProjectOfExecute(vm.newModal.$model);
            },
            passBudgetProjectOfExecute: function (data) {
                Budget.passBudgetProjectOfExecute('post', data, function passBudgetProjectOfExecuteListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.clickBtnReturn();
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
            clickDetails: function (el) {
                vm.myDetails = el.$model;
            },
            clickSubmit: function () {
                vm.newModal.IsHold = false;
                vm.postData();
            },
            temporary: function () {
                vm.newModal.IsHold = true;
                vm.postData();
            },
            getObjClass: function (text) {
                if (vm.model.Data.Model.ProjectType == text) {
                    return 'active';
                }
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