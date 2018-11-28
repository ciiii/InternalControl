$(function () {
    window.detailsVm = null;
    avalon.ready(function () {
        window.detailsVm = avalon.define({
            $id: 'details',
            model: vm.myDetails,
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        avalon.scan(document.body);
    });
});