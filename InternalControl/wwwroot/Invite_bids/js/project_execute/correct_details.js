$(function () {
    window.detailsVm = null;
    avalon.ready(function () {
        window.detailsVm = avalon.define({
            $id: 'details',
            model: {},
            correctId: vm.correctId,
            isScrapBag: false,
            RejectedPackage: vm.myDetails.RejectedPackage,
            getExecuteProjectOfCorrectionById: function () {
                ProjectExecute.getExecuteProjectOfCorrectionById('get', detailsVm.correctId, function getExecuteProjectOfCorrectionByIdListener(success, obj, strErro) {
                    if (success) {
                        var list = obj.ListOfPackageOfResultNoticeOfCorrection;
                        if (obj.ExecuteProjectOfCorrection.Content == '废包') {
                            detailsVm.isScrapBag = true;
                        }
                        for (var j = 0; j < list.length; j++) {
                            var Package
                            if (detailsVm.isScrapBag) {
                                Package = vm.getPackage(list[j].PackageId, vm.ExcuteBudget);
                            } else {
                                Package = vm.getPackage(list[j].PackageId, detailsVm.RejectedPackage);
                            }
                            if (vm.ExecuteProject.IsCenterPurchase) {
                                list[j].ItemName = Package.ItemName;
                            } else {
                                if (Package&&Package.PackageName) {
                                    list[j].ItemName = Package.PackageName;
                                }
                            }
                        }
                        detailsVm.model = obj;

                    } else {
                        console.info('获取更正详情失败：' + strErro);
                    }
                })
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

        detailsVm.getExecuteProjectOfCorrectionById();
        avalon.scan(document.body);
    });
});