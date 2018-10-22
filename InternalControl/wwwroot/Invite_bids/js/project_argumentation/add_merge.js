$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            items: [],
            allPrice: 0,
            declareNumber: 0,
            modelIndex: '',
            selectedModel: vm.selectedModel,
            purchaseMetho: [],
            setInfo: {},
            model: {
                Model: {
                    Id: 0,
                    SourcePackageId: 0,
                    Year: 0,
                    ProjectType: '',
                    MergeTypeWhenBudget: '',
                    Name: '',
                    RelevantDepartmentId: vm.userInfo.user.DepartmentId,
                    LinkmanName: '',
                    LinkmanPhone: '',
                    ISCenterPurchase: vm.req.ISCenterPurchase,
                    PurchaserName: '',
                    PurchaserAddress: '',
                    PurchaseMethod: '',
                    TimePlanToImplement: '',
                    MergeTimes: 0,
                    CreatorId: vm.userInfo.user.Id,
                    CreateDatetime: new Date(),
                    Remark: ''
                },
                List: []
            },
            onLoad: function () {
                addVm.getCategoryDictionary();
                addVm.getInfo();
                addVm.model.Model.Year = addVm.selectedModel[0].BudgetProject.Year;
                addVm.model.Model.MergeTypeWhenBudget = addVm.selectedModel[0].BudgetProject.MergeTypeWhenBudget;
                addVm.model.Model.ProjectType = addVm.selectedModel[0].BudgetProject.ProjectType;
                for (var i = 0; i < addVm.selectedModel.length; i++) {
                    addVm.model.List.push(addVm.selectedModel[i].BudgetProject.Id);

                    addVm.selectedModel[i].BudgetProject.budgetAmount = 0;
                    addVm.selectedModel[i].BudgetProject.allNumber = 0;
                    for (var j = 0; j < addVm.selectedModel[i].Package.length; j++) {
                        var item = addVm.selectedModel[i].Package[j];
                        addVm.selectedModel[i].BudgetProject.budgetAmount += (item.DeclareUnitPrice * item.DeclareNumber);
                        addVm.selectedModel[i].BudgetProject.allNumber += item.DeclareNumber;
                    }
                    addVm.allPrice += addVm.selectedModel[i].BudgetProject.budgetAmount;
                }
            },
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '采购方式', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        addVm.purchaseMetho = obj;
                    } else {
                        console.info('获取计划采购方式失败！');
                        console.info(strErro);
                    }
                })
            },
            getInfo: function () {
                Set.getSetting('get', function getSettingListener(success, obj, strErro) {
                    if (success) {
                        addVm.setInfo = obj;
                        addVm.model.Model.PurchaserName = obj.CompanyName;
                        addVm.model.Model.PurchaserAddress = obj.CompanyAddress;
                    } else {
                        console.info('获取系统设置失败！');
                        console.info(strErro);
                    }
                });
            },
            clickObjType: function (e) {
                addVm.model.Model.ProjectType = e.target.innerText;
            },
            changePurchaseMetho: function (e) {
                addVm.model.Model.PlanPurchaseMethod = e.target.value;
            },
            btnDel: function (item) {
                item.Url = null;
                item.FileName = null;
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    return true;
                } else {
                    return false;
                }
            },
            postData: function () {
                var projectName = addVm.inputVal('.modal-add .project-name');
                var implementTime = addVm.inputVal('.modal-add .implement-time');
                var purchaser = addVm.inputVal('.modal-add .purchaser');
                var roles = addVm.inputVal('.modal-add .roles');
                if (!projectName) {
                    $.oaNotify.error('项目名称不能为空！');
                    return;
                }
                if (!implementTime) {
                    $.oaNotify.error('项目拟实施时间不能为空！');
                    return;
                }
                if (!purchaser) {
                    $.oaNotify.error('采购人不能为空！');
                    return;
                }
                if (!purchaser) {
                    $.oaNotify.error('采购人地址不能为空！');
                    return;
                }
                if (!roles) {
                    $.oaNotify.error('请选择采购方式！');
                    return;
                }

                addVm.combineBudgetProject(addVm.model.$model);
            },
            combineBudgetProject: function (data) {
                Budget.combineBudgetProject('post', data, function combineBudgetProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        addVm.clickBtnReturn();
                        vm.selectedModel = [];
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
            },
            clickSubmit: function () {
                addVm.postData();
            },
            getObjClass: function (text) {
                if (addVm.model.Model.ProjectType == text) {
                    return 'active';
                }
            },
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
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
        addVm.onLoad();
        avalon.scan(document.body);
    });
});