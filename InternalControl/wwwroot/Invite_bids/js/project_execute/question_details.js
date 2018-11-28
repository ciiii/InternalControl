$(function () {
    window.detailsVm = null;
    avalon.ready(function () {
        window.detailsVm = avalon.define({
            $id: 'details',
            model: {},
            onLoad: function () {
                detailsVm.model = vm.getPackage(vm.questionId, vm.ExecuteProjectOfQuestion);
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });

        detailsVm.onLoad();
        avalon.scan(document.body);
    });
});