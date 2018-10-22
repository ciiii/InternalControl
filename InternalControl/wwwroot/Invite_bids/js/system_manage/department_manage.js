$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                LikeName:'',
                ParentId:'',
                RoleId:''
            },
            userInfo: mUserInfo,
            model: [],
            nothing: false,
            loaded: false,
            editType: false,
            allchecked: false,
            myDetails: {},
            roles:[],
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Department.getDepartmentList('get',vm.req.$model,function getDepartmentListListener(success, obj, strErro) {
                    if (success) {
                        vm.loaded = true;
                        if (obj == null || obj.length == 0) {
                            vm.model = [];
                            vm.nothing = true;
                            return;
                        } else {
                            var number = 1;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].number = number;
                                obj[i].checked = false;
                                number++;
                            }
                            vm.model = obj;
                            console.info(obj);
                            vm.nothing = false;
                            vm.allchecked = false;
                        }
                        $('.bs-tooltip').tooltip();
                    } else {
                        console.info('获取部门列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getRoleList: function () {
                Role.getRoleList('get', function getRoleListListener(success, obj, strErro) {
                    if (success) {
                        vm.roles = obj;
                    } else {
                        console.info('获取角色列表失败！');
                        console.info(strErro);
                    }
                })
            },
            search: function () {
                vm.query();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    vm.query();
                }
            },
            changeRoles:function () {
                vm.req.RoleId = $('.screen-box .roles').val()
                vm.search();
            },
            checkAll: function (e) {
                var checked = e.target.checked

                vm.model.forEach(function (el) {
                    el.checked = checked
                })
            },
            checkOne: function (e) {
                var checked = e.target.checked
                if (checked === false) {
                    vm.allchecked = false
                } else {
                    vm.allchecked = vm.model.every(function (el) {
                        return el.checked
                    })
                }
            },
            clickBtnAdd: function () {
                vm.editType = false;
            },
            clickBtnEdit: function (el) {
                vm.editType = true;
                vm.clickInfo(el);
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
            },
            getUrl: function (url) {
                return decodeURI(encodeURI(encodeURI(url)));
            },
            clickDetails: function (el) {
                vm.clickInfo(el);
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });
        vm.getRoleList();
        vm.query();
        avalon.scan(document.body);
    });
});