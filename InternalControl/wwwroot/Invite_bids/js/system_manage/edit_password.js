$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            model: {
                OldPassword: '',
                NewPassword: ''
            },
            password: function (name) {
                //限制密码格式为数字和字母组合，不能为中文;
                var re = /^[a-zA-Z0-9]{6,20}$/;
                var nubmer = $(name).val();
                if (!re.test(nubmer)) {
                    $(name).next().next().show();
                    $(name).addClass('error-input');
                    return false;
                } else {
                    $(name).next().next().hide();
                    $(name).removeClass('error-input');
                    return true;
                }
            },
            userEditPassword: function (data) {
                User.userEditPassword('post', data, function userChangePasswordListener(success, obj, strErro) {
                    var icon;
                    if (success) {
                        icon = 'icon-chenggong1';
                        popover(icon, '提交成功');
                        setTimeout(function () {
                            $('.popover').remove();
                        }, 3000);
                        vm.model.OldPassword = '';
                        vm.model.NewPassword = '';
                    } else {
                        icon = 'icon-shibai1';
                        popover(icon, '提交失败' + strErro);
                        setTimeout("$('.popover').remove()", 4000);
                    }
                });
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
                // var password = vm.password('.password');
                if (vm.model.OldPassword == '' || vm.model.NewPassword == '') {
                    $.oaNotify.error(' 旧密码和新密码不能为空！');
                }

                if (vm.model.OldPassword && vm.model.NewPassword) {
                    vm.userEditPassword(vm.model.$model);
                }
            }
        });
        avalon.scan(document.body);
    });
});