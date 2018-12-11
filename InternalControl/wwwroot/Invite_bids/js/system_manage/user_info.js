$(function () {
    isOverdue(1000 * 60 * 60 * 3);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            model: {},
            onLoad: function () {
                var users = mUserInfo.user;

                for (var i in users) {
                    if (users[i] == null || users[i] == 'undefined') {
                        users[i] = '';
                    }
                }
                vm.model = users;
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
                var fullName = vm.inputVal('.full-name');
                var workNumber = vm.inputVal('.work-number');
                if (!fullName) {
                    $.oaNotify.error(' 姓名不能为空！');
                    return;
                }
                if (!workNumber) {
                    $.oaNotify.error(' 工号不能为空！');
                    return;
                }
                vm.addOrEditUsers(vm.model.$model);
            },
            addOrEditUsers: function (data) {
                User.addOrEditUsers('post', data, function addOrEditUsersListener(success, obj, strErro) {
                    var icon;
                    if (success) {
                        icon = 'icon-chenggong1';
                        popover(icon, '保存成功');
                        setTimeout(function () {
                            $('.popover').remove();
                        }, 3000);
                    } else {
                        icon = 'icon-shibai1';
                        popover(icon, '保存失败' + strErro);
                        setTimeout("$('.popover').remove()", 4000);
                    }
                });
            }
        });
        vm.onLoad();
        avalon.scan(document.body);
    });
});