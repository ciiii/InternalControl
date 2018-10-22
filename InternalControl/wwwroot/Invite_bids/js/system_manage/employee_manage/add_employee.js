$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            req: {
                Index: 1,
                Size: 10,
                OrderType: false,
                LikeName: ''
            },
            model: {},
            editType: vm.editType,
            title: '',
            info: {
                Id: 0,
                WorkNumber: '',
                Password: '',
                Name: '',
                Sex: '',
                Phone: '',
                DutyName: '',
                PostName: '',
                PostType: '',
                Remark: ''
            },
            onLoad: function () {
                if (addVm.editType) {
                    addVm.title = '修改账号';
                    addVm.info = vm.myDetails;
                    for (var i in addVm.info) {
                        if (addVm.info[i] == null || addVm.info[i] == 'undefined') {
                            addVm.info[i] = '';
                        }
                    }
                    console.info(addVm.info);
                } else {
                    addVm.title = '添加账号';
                }
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    $(name).next().hide();
                    $(name).removeClass('error-input');
                    return true;
                } else {
                    $(name).next().show();
                    $(name).addClass('error-input');
                    return false;
                }
            },
            clickSubmit: function () {
                var fullName = addVm.inputVal('.full-name');
                var workNumber = addVm.inputVal('.work-number');
                var password = addVm.inputVal('.password');
                if (!fullName) {
                    $.oaNotify.error(' 姓名不能为空！');
                    return;
                }
                if (!workNumber) {
                    $.oaNotify.error(' 工号不能为空！');
                    return;
                }
                if (!addVm.editType) {
                    if (!password) {
                        $.oaNotify.error(' 密码不能为空！');
                        return;
                    }
                }

                addVm.addOrEditUsers(addVm.info.$model);
            },
            addOrEditUsers: function (data) {
                User.addOrEditUsers('post', data, function addOrEditUsersListener(success, obj, strErro) {
                    postBack(success, strErro, '提交成功！', '提交失败：', '.modal-add', function callBack() {
                        vm.query();
                    });
                });
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });
        addVm.onLoad();
        avalon.scan(document.body);
    });
});