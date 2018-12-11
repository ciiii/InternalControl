$(function () {
    window.vmDetails = null;
    avalon.ready(function () {
        window.vmDetails = avalon.define({
            $id: 'details',
            model: vm.myDetails,
            declareNumber: '',
            allName: '',
            name: '',
            isGoods: true,
            allPrice: 0,
            declareNumber: 0,
            onLoad: function () {
                for (var i in vmDetails.model.DeclareProject) {
                    if (vmDetails.model.DeclareProject[i] == null || vmDetails.model.DeclareProject[i] == 'undefined') {
                        vmDetails.model.DeclareProject[i] = '';
                    }
                }
                console.info('vmDetails.model');
                console.info(vmDetails.model);
                if (vmDetails.model.DeclareProject.ProjectType == '货物') {
                    vmDetails.isGoods = true;
                } else {
                    vmDetails.isGoods = false;
                }
                if (vmDetails.model.DeclareProject.IsCenterPurchase) {
                    vmDetails.name = '项目概况';
                } else {
                    vmDetails.name = '采购需求';
                }
                vmDetails.countCollectionPrice();
                vmDetails.countNumber();
                vmDetails.changeAllName();
            },
            changeAllName: function () {
                var names = [];
                for (var i = 0; i < vmDetails.model.Package.length; i++) {
                    var name = vmDetails.model.Package[i].ItemName;
                    if (name != '') {
                        names.push(name);
                    }
                }
                vmDetails.allName = names.join();
            },
            countNumber: function () {
                vmDetails.declareNumber = 0;
                vmDetails.declareNumber = vmDetails.model.Package.reduce(function (total, item) {
                    if (item.DeclareNumber == '') {
                        item.DeclareNumber = 0;
                    }
                    return total + parseInt(item.DeclareNumber);
                }, 0);
                vmDetails.countCollectionPrice();
            },
            countCollectionPrice: function () {
                vmDetails.allPrice = 0;
                vmDetails.allPrice = vmDetails.model.Package.reduce(function (total, item) {
                    if (item.DeclareUnitPrice == '') {
                        item.DeclareUnitPrice = 0;
                    }
                    return total + parseInt(item.DeclareNumber) * parseInt(item.DeclareUnitPrice);
                }, 0)
            },
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        vmDetails.onLoad();
        avalon.scan(document.body);
    });
});