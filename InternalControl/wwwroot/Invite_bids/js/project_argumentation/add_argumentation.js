$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            model: vm.myDetails,
            allName: '',
            name: '',
            apply: {
                Url: '',
                FileName: '',
            },
            isGoods: true,
            allPrice: 0,
            declareNumber: 0,
            newModal: {
                Model: {},
                List: []
            },
            onLoad: function () {
                addVm.newModal.Model = {
                    Id: addVm.model.BudgetProject.Id,
                    ArgumentReport: '',
                    CreatorId: addVm.model.BudgetProject.CreatorId,
                    CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                    Remark: ''
                }
                if (addVm.model.BudgetProject.ProjectType == '货物') {
                    addVm.isGoods = true;
                } else {
                    addVm.isGoods = false;
                }
                addVm.countNumber();
                addVm.countCollectionPrice();
            },
            countNumber: function () {
                addVm.declareNumber = 0;
                addVm.declareNumber = addVm.model.Package.reduce(function (total, item) {
                    return parseInt(total + parseInt(item.DeclareNumber));
                }, 0);
                addVm.countCollectionPrice();
            },
            countCollectionPrice: function () {
                addVm.allPrice = addVm.model.Package.reduce(function (total, item) {
                    return parseInt(total + parseInt(item.DeclareNumber) * parseInt(item.DeclareUnitPrice));
                }, 0)
            },
            limitOfPrice: function (el, style) {
                if (el.DeclareUnitPrice > 0 && el.LimitOfPrice > 0) {
                    if (el.DeclareUnitPrice > el.LimitOfPrice) {
                        return style;
                    } else {
                        return '';
                    }
                }
            },
            btnDel: function (item) {
                item.Url = null;
                item.FileName = null;
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item,true);
            },
            clickPass: function (data) {
                Budget.addAndPassBudgetProjectOfArgument('post', data, function addAndPassBudgetProjectOfArgumentListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功！');
                        addVm.clickBtnReturn();
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickNonPass: function (data) {
                Budget.addAndQuitBudgetProjectOfArgument('post', data, function addAndQuitBudgetProjectOfArgumentListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功！');
                        addVm.clickBtnReturn();
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickSubmit: function (val) {
                addVm.newModal.List = [];
                for (var i = 0; i < addVm.model.Package.length; i++) {
                    var obj = {
                        Id: addVm.model.Package[i].Id,
                        BudgetTechnicalRequirements: addVm.model.Package[i].DeclareTechnicalRequirements,
                        BudgetNumber: parseInt(addVm.model.Package[i].DeclareNumber),
                        BudgetUnitPrice: parseInt(addVm.model.Package[i].DeclareUnitPrice),
                        Attachment: addVm.model.Package[i].Attachment,
                        Remark: addVm.model.Package[i].Remark
                    }
                    addVm.newModal.List.push(obj);
                }
                addVm.newModal.Model.ArgumentReport = addVm.apply.Url;

                if (val == 1) {
                    if (addVm.newModal.Model.ArgumentReport == '' || addVm.newModal.Model.ArgumentReport == null) {
                        $.oaNotify.error('请上传论证报告！');
                        return;
                    }
                    addVm.clickPass(addVm.newModal.$model)
                } else {
                    addVm.clickNonPass(addVm.newModal.$model)
                }
                console.info(addVm.newModal.$model);
            },
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        addVm.onLoad();
        avalon.scan(document.body);
    });
});