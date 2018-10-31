$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 16,
                OrderType: false,
                LikeName: '',
                IsCenterPurchase: '',
                MergeTypeWhenBudget: '',
                Year: new Date().getFullYear() + 1,
            },
            reqType: {
                Index: 1,
                Size: 10,
                OrderType: false,
                IsCenterPurchase: true,
                LikeMergeTypeWhenBudget: ''
            },
            userInfo: mUserInfo,
            purchaseMetho: [],
            total: '',
            model: [],
            nothing: false,
            loaded: false,
            allchecked: false,
            myDetails: {},
            activeMoneyIndex: 0,
            typesTotal: 0,
            isShowDel: false,
            projecId:'',
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingBudgetProjectListNotInFlowAndWithPackage('get', vm.req.$model, function getPagingBudgetProjectListNotInFlowAndWithPackageListener(success, obj, strErro) {
                    if (success) {
                        vm.loaded = true;
                        vm.total = obj.Total;
                        if (obj == null || obj.List.length == 0) {
                            $('.personnel-box .pager').hide();
                            vm.model = [];
                            vm.nothing = true;
                            return;
                        } else {
                            obj = obj.List;
                            var number = (vm.req.Index - 1) * vm.req.Size + 1;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].number = number;
                                obj[i].checked = false;
                                obj[i].BudgetProject.budgetAmount = 0;
                                obj[i].BudgetProject.budgetAmount = obj[i].Package.reduce(function (total, item) {
                                    return total + item.DeclareNumber * item.DeclareUnitPrice;
                                }, 0)
                                number++;
                            }

                            vm.model = obj;
                            console.info(obj);
                            $('.personnel-box .pager').show();
                            vm.nothing = false;
                            vm.allchecked = false;
                        }
                        $('.personnel-box .pager').mamPager({
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
                        console.info('获取还没有进入预算项目失败！');
                        console.info(strErro);
                    }
                });
            },
            getTypes: function () {
                Set.getPagingVMergeTypeWhenBudgetList('get', vm.reqType.$model, function getPagingVMergeTypeWhenBudgetListListener(success, obj, strErro) {
                    if (success) {
                        vm.typesTotal = obj.Total;
                        obj = obj.List;
                        if (obj.length == 0) {
                            obj = ['无数据'];
                        }
                        vm.initMultiselect('.screen-box .left-types');
                        var options = [];
                        for (var i = 0; i < obj.length; i++) {
                            var option = {
                                label: obj[i],
                                title: obj[i],
                                value: obj[i]
                            }
                            options.push(option);
                        }

                        $('.screen-box .left-types').multiselect('dataprovider', options);

                        $('.screen-box .multiselect-search').val(vm.reqType.LikeMergeTypeWhenBudget);
                        $('.screen-box .multiselect-search').focus();
                        var pager = $('<li><div class="page paging text-center">' +
                            '<div class="pager paging"></div></div></li>');

                        $('.screen-box .type-box .pager').remove();
                        $('.screen-box .multiselect-container.dropdown-menu').append(pager);

                        $('.screen-box .multiselect-search').on('keyup', debounce(function () {
                            vm.reqType.LikeMergeTypeWhenBudget = $(this).val();
                            vm.reqType.Index = 1;
                            vm.getTypes();
                        }, 500));
                        $('.screen-box .pager').mamPager({
                            pageSize: vm.reqType.Size,              //页大小
                            pageIndex: vm.reqType.Index,            //当前页
                            recordTotal: vm.leftTotal,                  //数据总数
                            type: 1,
                            prevText: "&laquo;",                        //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                vm.reqType.Index = index;
                                vm.getTypes();
                            }
                        });

                    } else {
                        console.info('获取预算类型失败！');
                        console.info(strErro);
                    }
                });
            },
            initMultiselect: function (obj) {
                $(obj).multiselect({
                    multiple: true,
                    buttonWidth: '100%',
                    maxHeight: 360,
                    nonSelectedText: '请选择',
                    enableFiltering: true,//是否显示搜索
                    filterPlaceholder: '输入关键字...',
                    onChange: function (option, checked, select) {
                        if (obj.indexOf('.screen-box') != -1) {
                            vm.req.Index = 1;
                            vm.req.MergeTypeWhenBudget = $(option).text();
                            vm.isShowDel = true;
                            vm.query();
                        }
                    },
                });
            },
            search: function () {
                vm.req.Index = 1;
                vm.query();
            },
            searchAll: function () {
                vm.reqType.LikeMergeTypeWhenBudget = '';
                vm.isShowDel = false;
                $('.screen-box .left-types').multiselect('deselect', [vm.req.MergeTypeWhenBudget]);
                vm.req.MergeTypeWhenBudget = '';
                vm.search();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    vm.query();
                }
            },
            batchExport: function () {
                $('.btn-export').attr('href', '');
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
            changeCenterPurchase: function (e) {
                vm.req.IsCenterPurchase = e.target.value;
                vm.search();
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
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
        vm.getTypes();
        vm.query();
        avalon.scan(document.body);
    });
});