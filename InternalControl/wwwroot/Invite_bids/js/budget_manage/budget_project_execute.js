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
            query: function () {
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
                                for (var j = 0; j < obj[i].Package.length; j++) {
                                    var item = obj[i].Package[j];
                                    obj[i].BudgetProject.allNumber += item.BudgetNumber;
                                }
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
                        console.info('获取可执行预算列表失败！');
                        console.info(strErro);
                    }
                });
            },
            search: function () {
                vm.req.Index = 1;
                vm.query();
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
                    case '项目审核通过':
                        return 'state-pass';
                    case '审核不通过':
                        return 'state-over';
                    case '审核已终止':
                        return 'state-over';
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
            clickBtnEdit: function (el) {
                vm.clickInfo(el);
                var url = el.BudgetProject.LastEditStepComponentName;
                location.href = '/Invite_bids/views/' + url;

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
        vm.query();
        avalon.scan(document.body);
    });
});