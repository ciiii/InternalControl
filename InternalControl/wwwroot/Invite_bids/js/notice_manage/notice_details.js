$(function () {
    window.detailsVm = null;
    avalon.ready(function () {
        window.detailsVm = avalon.define({
            $id: 'details',
            model: vm.myDetails,
            nocticeId:vm.nocticeId,
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
            getDetail: function () {
                Notice.GetNoticeDetail('get', detailsVm.nocticeId, function GetNoticeDetailListener(success, obj, strErro) {
                    if (success) {
                        console.info('标记已读');
                    }
                });
            }
        });
        detailsVm.getDetail();
        avalon.scan(document.body);
    });
});