$(function () {
    var myDetails = JSON.parse(sessionStorage.myDetails);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            items: [],
            modelIndex: '',
            apply: {
                Url: '',
                FileName: '',
            },
            model: myDetails,
            newModal: {},
            allName: '',
            purchaseMetho: [],
            BudgetType: '常规预算',
            onLoad: function () {
                console.info(vm.model);
                vm.newModal = {
                    StepId: vm.model.BudgetProject.LastStepId,
                    IsHold: false,
                    Remark: '',
                    Data: {
                        Model: {
                            Id: vm.model.BudgetProject.Id,
                            IsGovernmentPurchase: true,
                            IsMSE: true,
                            TimeToImplement: vm.model.BudgetProject.TimePlanToImplement,
                            Reply: '',
                            CreatorId: vm.model.BudgetProject.CreatorId,
                            CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                            PurchaseMethod: vm.model.BudgetProject.PurchaseMethod,
                            Remark: ''
                        },
                        List: []
                    }
                }

                if (vm.model.BudgetProject.ProjectType == '货物') {
                    vm.isGoods = true;
                } else {
                    vm.isGoods = false;
                }
                vm.changeAllName();
            },
            changeAllName: function () {
                var names = [];
                for (var i = 0; i < vm.model.Package.length; i++) {
                    var name = vm.model.Package[i].ItemName;
                    if (name != '') {
                        names.push(name);
                    }
                }
                vm.allName = names.join();
            },
            countCollectionPrice: function () {
                vm.model.BudgetProject.TotalBudgetAmount = 0;
                vm.model.BudgetProject.TotalBudgetAmount = vm.model.Package.reduce(function (total, item) {
                    if (item.BudgetUnitPrice == '') {
                        item.BudgetUnitPrice = 0;
                    }
                    return parseInt(total + parseInt(item.BudgetNumber) * parseInt(item.BudgetUnitPrice));
                }, 0)
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
            getClass: function (type) {
                if (vm.newModal.Data.Model.IsGovernmentPurchase == type) {
                    return 'active'
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
                        vm.clickBtnCancel();
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
            clickBtnCancel: function () {
                location.href = '/Invite_bids/views/budget_manage/budget_project_execute.html';
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
        vm.onLoad();
        avalon.scan(document.body);
    });
});