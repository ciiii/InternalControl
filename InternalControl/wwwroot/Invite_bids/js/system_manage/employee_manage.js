$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 16,
                OrderType:false,
                LikeWorkNumber:'',
                LikePhone:'',
                LikeName:'',
                DepartmentId:'',
                LikeDutyName:'',
                LikePostName:'',
                LikePostType:''
            },
            userInfo: mUserInfo,
            total:'',
            model:[],
            departments:[],
            nothing: false,
            loaded: false,
            editType: false,
            allchecked:false,
            myDetails:{},
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                User.getPagingUsersList('get', vm.req.$model,function getPagingUsersListListener(success, obj, strErro) {
                    if (success) {
                        vm.loaded = true;
                        vm.total = obj.Total;
                        if (obj == null || obj.List.length == 0) {
                            $('.pager').hide();
                            vm.model = [];
                            vm.nothing = true;
                            return;
                        } else {
                            obj = obj.List;
                            var number = (vm.req.Index - 1) * vm.req.Size + 1;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].number = number;
                                obj[i].checked = false;
                                number++;
                            }
                            vm.model = obj;
                            console.info(obj);
                            $('.pager').show();
                            vm.nothing = false;
                            vm.allchecked = false;
                        }
                        $('.pager').mamPager({
                            pageSize: vm.req.Size,                       //页大小
                            pageIndex: vm.req.Index,                     //当前页
                            recordTotal: vm.total,                       //数据总数
                            type: 1,
                            prevText: "&laquo;",                         //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                vm.req.Index = index;
                                vm.loaded = false;
                                vm.nothing = false;
                                vm.query();
                            }
                        });
                        $('.bs-tooltip').tooltip();
                    } else {
                        console.info('获取账号列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getDepartmentList: function () {
                Department.getDepartmentList('get', '', function getDepartmentListListener(success, obj, strErro) {
                    if (success) {
                        vm.departments = obj;
                    } else {
                        console.info('获取部门列表失败！');
                        console.info(strErro);
                    }
                })
            },
            search: function () {
                vm.req.Index = 1;
                vm.query();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    vm.query();
                }
            },
            changeDepartments:function () {
                vm.req.DepartmentId = $('.screen-box .departments').val()
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
            clickInfo:function (el) {
                vm.myDetails = el.$model;
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
        vm.getDepartmentList();
        vm.query();
        avalon.scan(document.body);
    });
});