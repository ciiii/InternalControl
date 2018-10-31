$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 10,
                OrderType: false,
                LikeName: '',
                IsCenterPurchase: '',
                ProjectType: '',
                BeginTotalBudgetAmount: '',
                EndTotalBudgetAmount: '',
                Year: new Date().getFullYear() + 1,
            },
            userInfo: mUserInfo,
            total: '',
            model: [],
            nothing: false,
            loaded: false,
            allchecked: false,
            myDetails: {},
            projecId: '',
            activeIndex: 0,
            getPagingBudgetProjectOfExecuteList: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingBudgetProjectOfExecuteList('get', vm.req.$model, function getPagingBudgetProjectOfExecuteListListener(success, obj, strErro) {
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
                                obj[i].BudgetProject.allNumber = 0;
                                number++;
                            }
                            vm.model = obj;
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
                        console.info('获取已进入预算的项目列表失败！');
                        console.info(strErro);
                    }
                });
            },
            //待论证
            getPagingBudgetProjectListNotInFlowAndWithPackage: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingBudgetProjectListNotInFlowAndWithPackage('get', vm.req.$model, function getPagingBudgetProjectListNotInFlowAndWithPackageListener(success, obj, strErro) {
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
                                obj[i].BudgetProject.allNumber = 0;
                                number++;
                            }
                            vm.model = obj;
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
                        console.info('获取待论证预算项目列表失败！');
                        console.info(strErro);
                    }
                });
            },
            //论证通过、待进入预算
            getPagingBudgetProjectOfEnterList: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingBudgetProjectOfEnterList('get', vm.req.$model, function getPagingBudgetProjectOfEnterListListener(success, obj, strErro) {
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
                                obj[i].BudgetProject.allNumber = 0;
                                number++;
                            }
                            vm.model = obj;
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
                        console.info('获取论证通过的预算项目列表失败！');
                        console.info(strErro);
                    }
                });
            },
            //论证不通过
            getPagingQuitedBudgetProjectOfArgumentList: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingQuitedBudgetProjectOfArgumentList('get', vm.req.$model, function getPagingQuitedBudgetProjectOfArgumentListListener(success, obj, strErro) {
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
                                obj[i].BudgetProject.allNumber = 0;
                                number++;
                            }
                            vm.model = obj;
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
                        console.info('获取论证不通过的预算项目列表失败！');
                        console.info(strErro);
                    }
                });
            },
            //已完成预算
            getPagingFinishedBudgetProjectOfExecuteList: function () {
                vm.loaded = false;
                $.support.cors = true;

                Budget.getPagingFinishedBudgetProjectOfExecuteList('get', vm.req.$model, function getPagingFinishedBudgetProjectOfExecuteListListener(success, obj, strErro) {
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
                        console.info('获取已完成预算执行的项目失败！');
                        console.info(strErro);
                    }
                });
            },

            search: function () {
                vm.req.Index = 1;
                switch (vm.activeIndex) {
                    case 0:
                        vm.getPagingBudgetProjectListNotInFlowAndWithPackage();
                        break;
                    case 1:
                        vm.getPagingBudgetProjectOfEnterList();
                        break;
                    case 2:
                        vm.getPagingQuitedBudgetProjectOfArgumentList();
                        break;
                    case 3:
                        vm.getPagingBudgetProjectOfExecuteList();
                        break;
                    case 4:
                        vm.getPagingFinishedBudgetProjectOfExecuteList();
                        break;
                }
            },
            submit: function () {
                if (event.keyCode == 13) {
                    vm.search();
                }
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
            clickState: function (e, index) {
                vm.activeIndex = index;
                vm.search();
            },
            getClass: function (index) {
                if (index == vm.activeIndex) {
                    return 'active'
                }
            },
            changeCenterPurchase: function (e) {
                vm.req.IsCenterPurchase = e.target.value;
                vm.search();
            },
            changeProjectType: function (e) {
                vm.req.ProjectType = e.target.value;
                vm.search();
            },
            getFlowClass: function (name) {
                if (name.indexOf('待预算执行') != -1) {
                    return 'btn-edit';
                } else {
                    return 'btn-examine';
                }
            },
            getStateClass: function (statue) {
                switch (statue) {
                    case '预算执行完成':
                        return 'state-pass';
                    case '论证不通过':
                        return 'state-over';
                    case '必要性论证不通过':
                        return 'state-over';
                    case '待论证':
                        return 'state-remind';
                    case '待进入预算':
                        return 'state-remind';
                    case '待预算执行':
                        return 'state-remind';
                    case '待项目审核':
                        return 'state-auditing';
                    default:
                        return '';
                }
            },
            clickInfo: function (el) {
                sessionStorage.myDetails = JSON.stringify(el.$model);
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
                vm.projecId = el.BudgetProject.Id;
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
        }).on('changeDate', function () {
            vm.search();
        });
        vm.search();
        avalon.scan(document.body);
    });
});