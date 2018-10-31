$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 16,
                OrderType: true,
                LikeName: '',
                IsCenterPurchase: '',
                RelevantDepartmentId: '',
                PlanPurchaseMethod: '',
                IsGovernmentPurchase: '',
                ProjectType: '',
                Year: new Date().getFullYear() + 1,
                State: '',
            },
            userInfo: mUserInfo,
            relevantDepartment: [],
            purchaseMetho: [],
            total: '',
            model: [],
            nothing: false,
            loaded: false,
            allchecked: false,
            myDetails: {},
            activeIndex: 0,
            activeMoneyIndex: 0,
            stepId: '',
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                ProjectExecute.getPagingExecuteProjectList('get', vm.req.$model, function getPagingExecuteProjectListListener(success, obj, strErro) {
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
                        console.info('获取申报项目列表失败！');
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
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '采购方式', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.purchaseMetho = obj;
                    } else {
                        console.info('获取计划采购方式失败！');
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
            clickState: function (e, index, val) {
                vm.activeIndex = index;
                vm.req.State = val
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
            changeDepartment: function (e) {
                vm.req.RelevantDepartmentId = e.target.value;
                vm.search();
            },
            changeGovernmentPurchase: function (e) {
                vm.req.IsGovernmentPurchase = e.target.value;
                vm.search();
            },
            changeProjectType: function (e) {
                vm.req.ProjectType = e.target.value;
                vm.search();
            },
            changebudget: function (e) {

                console.info(e.target.value);

            }
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
        vm.getCategoryDictionary();
        vm.query();
        avalon.scan(document.body);
    });
});