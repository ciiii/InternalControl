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
            model: {},
            menu: [],
            activeIndex: 0,
            isEdit: false,
            isFirst: true,
            onLoad: function () {
                vm.getExecuteProjectDetail();
            },
            getExecuteProjectDetail: function () {
                ProjectExecute.getExecuteProjectDetail('get', projectId, function getExecuteProjectDetailListener(success, obj, strErro) {
                    if (success) {
                        vm.myDetails = obj;
                        vm.menu = obj.Menu;
                    } else {
                        console.info('获取执行项目所有的信息失败！');
                        console.info(strErro);
                    }
                })
            },
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '采购方式', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.purchaseMetho = obj;
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
                        vm.activeIndex = index;
                        return 'state-active state-current'
                    } else {
                        vm.activeIndex = 0;
                        vm.isEdit = false;
                        return 'state-current'
                    }
                }
                if (vm.activeIndex == index) {
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
                vm.activeIndex = index;
                if (el.IsCanOperate && el.ISCurrentStepTemplate) {
                    vm.isEdit = true;
                }
                if (el.IsPassed && !el.ISCurrentStepTemplate) {
                    vm.isEdit = false;
                }
            },
            getTabClass: function (index) {
                if (vm.activeIndex == index) {
                    return 'active';
                }
            },
            clickType: function (type) {
                vm.newModal.Data.Model.IsGovernmentPurchase = type;
            },
            getClassTwo: function (type) {
                if (vm.newModal.Data.Model.IsMSE == type) {
                    return 'active'
                }
            },
            clickTypeTwo: function (type) {
                vm.newModal.Data.Model.IsMSE = type;
            },
            changePurchaseMetho: function (e) {
                vm.newModal.Data.Model.PlanPurchaseMethod = e.target.value;
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item);
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    return true;
                } else {
                    return false;
                }
            },
            postData: function () {
                var implementTime = vm.inputVal('.implement-time');
                var budgetMoney = vm.model.BudgetProject.TotalBudgetAmount;

                if (!implementTime) {
                    $.oaNotify.error('项目拟实施时间不能为空！');
                    return;
                }
                if (budgetMoney == 0) {
                    $.oaNotify.error('预算金额必须大于0！');
                    return;
                }
                vm.newModal.Data.Model.Reply = vm.apply.Url;
                if (vm.newModal.Data.Model.Reply == '') {
                    $.oaNotify.error(' 请上传预算审核批复文件！');
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
            getsssss: function () {
                ProjectExecute.getDDDDD('get', function getDDDDDListener(success, obj, strErro) {
                    if (success) {
                        console.info(obj);
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
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
        vm.getsssss();
        vm.onLoad();

        avalon.scan(document.body);
    });
});