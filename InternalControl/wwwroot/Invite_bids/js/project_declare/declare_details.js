$(function () {
    window.vmDetails = null;
    avalon.ready(function () {
        window.vmDetails = avalon.define({
            $id: 'details',
            model: vm.myDetails,
            declareNumber: '',
            allName: '',
            name:'',
            isGoods: true,
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
                    vmDetails.name='项目概况';
                    if (vmDetails.isGoods) {
                        vmDetails.countCollectionPrice();
                    } else {
                        vmDetails.countNonCollectionPrice();
                    }
                } else {
                    vmDetails.name='采购需求';
                    vmDetails.countNonCollectionPrice();
                }
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
                var numbers = 0;
                for (var i = 0; i < vmDetails.model.Package.length; i++) {
                    var number = vmDetails.model.Package[i].DeclareNumber;
                    if (number == '') {
                        number = 0;
                    }
                    var number = parseInt(vmDetails.model.Package[i].DeclareNumber);
                    numbers += number;
                }
                vmDetails.declareNumber = numbers;
            },
            countCollectionPrice: function () {
                var funds = 0;
                for (var i = 0; i < vmDetails.model.Package.length; i++) {
                    var price = vmDetails.model.Package[i].DeclareUnitPrice;
                    if (price == '') {
                        price = 0;
                    }
                    var price = parseInt(price) * parseInt(vmDetails.model.Package[i].DeclareNumber);
                    funds += price;
                }
                vmDetails.allPrice = funds;
            },
            countNonCollectionPrice: function () {
                var funds = 0;
                for (var i = 0; i < vmDetails.model.Package.length; i++) {
                    var price = vmDetails.model.Package[i].DeclareUnitPrice;
                    if (price == '') {
                        price = 0;
                    }
                    funds += parseInt(price);
                }
                vmDetails.allPrice = funds;
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