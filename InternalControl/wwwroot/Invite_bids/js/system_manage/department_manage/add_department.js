$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            model: {},
            editType: vm.editType,
            roles: vm.roles,
            title: '',
            users: [],
            info: {
                Id: 0,
                ParentId: 0,
                Name: '',
                RoleId: '',
                PrincipalId: '',
                Sort: 0,
                Remark: ''
            },
            onLoad: function () {
                if (addVm.editType) {
                    addVm.title = '修改部门';
                    addVm.info = vm.myDetails;
                    for (var i in addVm.info) {
                        if (addVm.info[i] == null || addVm.info[i] == 'undefined') {
                            addVm.info[i] = '';
                        }
                    }
                    $('.modal-add .principal').val(addVm.info.PrincipalId);
                    $("input[name='roles'][value='" + addVm.info.RoleId + "']").attr('checked', true);
                } else {
                    addVm.title = '添加部门';
                }
                console.info(addVm.info);
                console.info(addVm.info.RoleId);

            },
            getUsersList: function () {
                User.getUsersList('get', '', function getUsersListListener(success, obj, strErro) {
                    if (success) {
                        addVm.users = obj;
                        addVm.onLoad();
                    } else {
                        console.info('获取所有用户列表失败！');
                        console.info(strErro);
                    }
                })
            },
            changePrincipalId: function (e) {
                addVm.info.PrincipalId = e.target.value;
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
                var unitName = addVm.inputVal('.modal-add .department-name');
                var principal = addVm.inputVal('.modal-add .principal');
                var role = $("input[type='radio']:checked").val();
                if (!unitName) {
                    $.oaNotify.error(' 部门名称不能为空！');
                    return;
                }
                if (!role || role == '') {
                    $.oaNotify.error(' 部门类型不能为空！');
                    return;
                }
                if (!principal) {
                    $.oaNotify.error(' 请选择负责人！');
                    return;
                }
                addVm.info.PrincipalId = parseInt(addVm.info.PrincipalId);
                addVm.info.RoleId = parseInt(role);
                addVm.addOrEditDepartment(addVm.info.$model);

            },
            addOrEditDepartment: function (data) {
                Department.addOrEditDepartment('post', data, function addOrEditDepartmentListener(success, obj, strErro) {
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
        addVm.getUsersList();
        avalon.scan(document.body);
    });
});