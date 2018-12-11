$(function () {
    window.vmDetails = null;
    avalon.ready(function () {
        window.vmDetails = avalon.define({
            $id: 'details',
            model: {},
            allName: '',
            name: '',
            isGoods: true,
            allPrice: 0,
            declareNumber: 0,
            projecId: vm.projecId,
            onLoad: function () {
                for (var i in vmDetails.model.BudgetProject.BudgetProject) {
                    if (vmDetails.model.BudgetProject.BudgetProject[i] == null || vmDetails.model.BudgetProject.BudgetProject[i] == 'undefined') {
                        vmDetails.model.BudgetProject.BudgetProject[i] = '';
                    }
                }
                console.info('vmDetails.model');
                console.info(vmDetails.model);
                if (vmDetails.model.BudgetProject.BudgetProject.ProjectType == '货物') {
                    vmDetails.isGoods = true;
                } else {
                    vmDetails.isGoods = false;
                }
                vmDetails.changeAllName();
            },
            getBudgetProjectDetail: function () {
                Budget.getBudgetProjectDetail('get', vmDetails.projecId, function getBudgetProjectDetailListener(success, obj, strErro) {
                    if (success) {
                        vmDetails.model = obj;
                        console.info('obj-----');
                        console.info(obj);
                        vmDetails.onLoad();
                    } else {
                        console.info('获取预算项目详情失败！');
                        console.info(strErro);
                    }
                })
            },
            getStateClass: function (statue) {
                switch (statue) {
                    case '项目审核通过':
                        return 'state-pass';
                    case '审核不通过':
                        return 'state-over';
                    case '审核已终止':
                        return 'state-over';
                    case '待预算执行':
                        return 'state-remind';
                    case '待项目审核':
                        return 'state-auditing';
                    default:
                        return '';
                }
            },
            changeAllName: function () {
                var names = [];
                for (var i = 0; i < vmDetails.model.BudgetPackage.length; i++) {
                    var name = vmDetails.model.BudgetPackage[i].ItemName;
                    if (name != '') {
                        names.push(name);
                    }
                }
                vmDetails.allName = names.join();
            },
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
            },
            clickBtnReturn: function () {
                $('.modal-details').modal('hide');
            },
        });
        vmDetails.getBudgetProjectDetail();
        avalon.scan(document.body);
    });
});