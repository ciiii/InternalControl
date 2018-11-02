$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                OwnDepartmentsId: mUserInfo.user.DepartmentId,
                Year: new Date().getFullYear()
            },
            model: [],
            specialModel: [],
            otherModel: [],
            getBudgetList: function () {
                Budget.getBudgetList('get', vm.req.$model, function getBudgetListListener(success, obj, strErro) {
                    if (success) {
                        var isSpecial = false;
                        var isOther = false;
                        obj = obj.reverse();
                        vm.model = [];
                        for (var i = 0; i < obj.length; i++) {
                            var newObj = {
                                Id: obj[i].Id,
                                Year: obj[i].Year,
                                OwnDepartmentsId: obj[i].OwnDepartmentsId,
                                BudgetTypeId: obj[i].BudgetTypeId,
                                Name: obj[i].Name,
                                BudgetAmount: obj[i].BudgetAmount,
                                BudgetApproval: obj[i].BudgetApproval,
                                Remark: obj[i].Remark
                            }
                            if (obj[i].BudgetTypeId == 1) {
                                newObj.Name = '常规预算';
                            }
                            if (obj[i].BudgetTypeId == 2) {
                                isSpecial = true;
                            }
                            if (obj[i].BudgetTypeId == 3) {
                                isOther = true;
                            }
                            vm.model.push(newObj);
                        }
                        if (!isSpecial) {
                            var obj = {
                                Id: 0,
                                Year: vm.req.Year,
                                OwnDepartmentsId: mUserInfo.user.DepartmentId,
                                BudgetTypeId: 2,
                                Name: '',
                                BudgetAmount: 0,
                                BudgetApproval: '',
                                Remark: ''
                            }
                            vm.model.push(obj);
                        }
                        if (!isOther) {
                            var obj = {
                                Id: 0,
                                Year: vm.req.Year,
                                OwnDepartmentsId: mUserInfo.user.DepartmentId,
                                BudgetTypeId: 3,
                                Name: '',
                                BudgetAmount: 0,
                                BudgetApproval: '',
                                Remark: ''
                            }
                            vm.model.push(obj);
                        }
                    } else {
                        console.info('获取当前归口部门的某年度的预算失败！');
                        console.info(strErro);
                    }
                })
            },
            btnDel: function (item) {
                item.BudgetApproval = null;
            },
            addSpecial: function () {
                var newObj = {
                    Id: 0,
                    Year: vm.req.Year,
                    OwnDepartmentsId: mUserInfo.user.DepartmentId,
                    BudgetTypeId: 2,
                    Name: '',
                    BudgetAmount: 0,
                    BudgetApproval: '',
                    Remark: ''
                }
                vm.model.push(newObj);
            },
            addOther: function () {
                var newObj = {
                    Id: 0,
                    Year: vm.req.Year,
                    OwnDepartmentsId: mUserInfo.user.DepartmentId,
                    BudgetTypeId: 3,
                    Name: '',
                    BudgetAmount: 0,
                    BudgetApproval: '',
                    Remark: ''
                }
                vm.model.push(newObj);
            },
            ClickLeft: function () {
                vm.req.Year--;
                vm.getBudgetList();
            },
            ClickRight: function () {
                vm.req.Year++;
                vm.getBudgetList();
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    return true;
                } else {
                    return false;
                }
            },
            postData: function () {
                var isRoutine = true;
                var isSpecial = true;
                var isOther = true;
                for (var i = 0; i < vm.model.length; i++) {
                    vm.model[i].BudgetAmount = parseInt(vm.model[i].BudgetAmount);
                    if (vm.model[i].BudgetTypeId == 1) {
                        if (vm.model[i].BudgetAmount == 0 || vm.model[i].Name == '' || vm.model[i].BudgetApproval == '') {
                            isRoutine = false;
                        }
                    }
                    if (vm.model[i].BudgetTypeId == 2) {
                        if (vm.model[i].BudgetAmount == 0 || vm.model[i].Name == '' || vm.model[i].BudgetApproval == '') {
                            isSpecial = false;
                        }
                    }
                    if (vm.model[i].BudgetTypeId == 3) {
                        if (vm.model[i].BudgetAmount == 0 || vm.model[i].Name == '' || vm.model[i].BudgetApproval == '') {
                            isOther = false;
                        }
                    }
                }
                if (!isRoutine) {
                    $.oaNotify.error('【常规预算】：预算名称、金额、附件均不能为空！');
                    return
                }
                if (!isSpecial) {
                    $.oaNotify.error('【专项预算】：预算名称、金额、附件均不能为空！');
                    return
                }
                if (!isOther) {
                    $.oaNotify.error('【其他预算】：预算名称、金额、附件均不能为空！');
                    return
                }
                vm.addOrUpdateBudget(vm.model.$model);
            },
            clickSubmit: function () {
                vm.postData();
            },
            addOrUpdateBudget: function (data) {
                Budget.addOrUpdateBudget('post', data, function addOrUpdateBudgetListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.getBudgetList();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item,true);
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            clickBtnCancel: function () {
                location.href = '/Invite_bids/views/project_declare/declare_list.html';
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.form-year').datetimepicker({
            format: 'yyyy',
            todayBtn: 1,
            autoclose: 1,
            startView: 4,
            minView: 4,
            language: 'zh-CN',
        });
        vm.getBudgetList();
        avalon.scan(document.body);
    });
});