$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            model: vm.selectList,
            BudgetTypeName: vm.BudgetTypeName,
            clickRemove: function (index, el) {
                for (var i = 0; i < vm.model.length; i++) {
                    if (vm.model[i].BudgetProject.Id == el.BudgetProject.Id) {
                        vm.model[i].checked = false;
                    }
                }
                $('.modal-add .table tbody tr:eq(' + index + ')').remove();
                vm.sortFrontThree();
            },
            clickSubmit: function () {
                var list = [];
                for (var i = 0; i < addVm.model.length; i++) {
                    if (vm.model[i].checked == true) {
                        list.push(vm.model[i].BudgetProject.Id);
                    }
                }
                var data = {
                    listOfId: list,
                    BudgetTypeName: addVm.BudgetTypeName
                }
                addVm.getExportWhenBudgetProjectOfEnter(data);
            },
            getExportWhenBudgetProjectOfEnter: function (data) {
                Budget.getExportWhenBudgetProjectOfEnter('get', data, function getExportWhenBudgetProjectOfEnterListener(success, obj, strErro) {
                    if (success) {
                        downloadFile('/' + obj);
                        vm.selectList = [];
                        vm.clickBtnReturn();
                        vm.query();
                    } else {
                        $.oaNotify.error(' 导出文件失败：' + strErro);
                    }
                });
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        avalon.scan(document.body);
    });
});