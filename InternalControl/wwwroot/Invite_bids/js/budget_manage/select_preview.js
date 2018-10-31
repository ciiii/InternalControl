$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            model: vm.selectList,
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
                vm.selectList = [];
                vm.clickBtnReturn();
                vm.query();
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        avalon.scan(document.body);
    });
});