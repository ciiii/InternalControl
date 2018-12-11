$(function () {
    isOverdue(1000 * 60 * 60 * 3);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 16,
                OrderType: true,
                LikeName: '',
                RelevantDepartmentId: '',
                BeginDateOfEarlyWarning: '',
                EndDateOfEarlyWarning: ''
            },
            relevantDepartment: [],
            total: '',
            model: [],
            endTime: '',
            nothing: false,
            loaded: false,
            allchecked: false,
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Notice.GetPagingExecuteProjectWarning('get', vm.req.$model, function GetPagingExecuteProjectWarningListener(success, obj, strErro) {
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
                                obj[i].day = '还剩' + obj[i].DayDiffOfEarlyWarning + '天';
                                if (obj[i].DayDiffOfEarlyWarning == 0) {
                                    obj[i].day = '今天'
                                }
                                if (obj[i].DayDiffOfEarlyWarning < 0) {
                                    obj[i].day = '已过期'
                                }
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
                        console.info('获取任务预警列表失败！');
                        console.info(strErro);
                    }
                });
            },
            GetRelevantDepartmentList: function () {
                Department.GetRelevantDepartmentList('get', function GetRelevantDepartmentListListener(success, obj, strErro) {
                    if (success) {
                        vm.relevantDepartment = obj;
                    } else {
                        console.info('获取归口部门失败！');
                        console.info(strErro);
                    }
                })
            },
            search: function () {
                vm.req.Index = 1;
                if (vm.endTime != '') {
                    vm.req.EndDateOfEarlyWarning = vm.endTime + ' 23:59:59';
                }
                vm.query();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    vm.query();
                }
            },
            getClass: function (e) {
                if (e == vm.req.type) {
                    return 'active';
                }
            },
            clickType: function (e) {
                vm.req.type = e.target.dataset.id;
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
            clickBtnUp: function (index) {
                vm.activeMoneyIndex = index;
                vm.req.OrderType = true;
                vm.search();
            },
            clickBtnDown: function (index) {
                vm.activeMoneyIndex = index;
                vm.req.OrderType = false;
                vm.search();
            },
            getMoneyClass: function (index) {
                if (index == vm.activeMoneyIndex) {
                    return 'btn-primary'
                }
            },
            getClass: function (el) {
                if (el.DayDiffOfEarlyWarning < 3) {
                    return 'state-over'
                }
                if (el.DayDiffOfEarlyWarning >= 3 && el.DayDiffOfEarlyWarning < 6) {
                    return 'state-auditing'
                }
            },
            changeDepartment: function (e) {
                vm.req.RelevantDepartmentId = e.target.value;
                vm.search();
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
        vm.GetRelevantDepartmentList();
        vm.query();
        avalon.scan(document.body);
    });
});