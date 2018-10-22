$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 2,
                OrderType: false,
                LikeName: '',
                ISCenterPurchase: true,
                MergeTypeWhenBudget: '',
                Year: new Date().getFullYear() + 1,
            },
            reqTwo: {
                Year: new Date().getFullYear() + 1,
                MergeTypeWhenBudget: ''
            },
            reqLeftType: {
                Index: 1,
                Size: 10,
                OrderType: false,
                ISCenterPurchase: true,
                LikeMergeTypeWhenBudget: ''
            },
            reqRightType: {
                Index: 1,
                Size: 10,
                OrderType: false,
                ISCenterPurchase: true,
                LikeMergeTypeWhenBudget: ''
            },
            userInfo: mUserInfo,
            total: '',
            LeftTotal: '',
            rightTotal: '',
            model: [],
            selectedModel: [],
            selectedModelCopy: [],
            nothing: false,
            loaded: false,
            allcheckedLeft: false,
            allcheckedRight: false,
            myDetails: {},
            isLeft: false,
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingCollectionOrNonBudgetProjectMergeableList('get', vm.req.$model, function getPagingCollectionOrNonBudgetProjectMergeableListListener(success, obj, strErro) {
                    if (success) {
                        vm.loaded = true;
                        vm.total = obj.Total;
                        if (obj == null || obj.List.length == 0) {
                            $('.item-left .pager').hide();
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
                                obj[i].BudgetProject.allNumber = 0;
                                for (var j = 0; j < obj[i].Package.length; j++) {
                                    var item = obj[i].Package[j];
                                    obj[i].BudgetProject.budgetAmount += (item.DeclareUnitPrice * item.DeclareNumber);
                                    obj[i].BudgetProject.allNumber += item.DeclareNumber;
                                }
                                number++;
                            }
                            vm.model = obj;
                            console.info(obj);
                            $('.item-left .pager').show();
                            vm.nothing = false;
                            vm.allchecked = false;
                        }
                        $('.item-left .pager').mamPager({
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
                        console.info('获取集采预算可合并列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getLeftTypes: function () {
                Set.getPagingVMergeTypeWhenBudgetList('get', vm.reqLeftType.$model, function getPagingVMergeTypeWhenBudgetListListener(success, obj, strErro) {
                    if (success) {
                        vm.leftTotal = obj.Total;
                        console.info('obj.Total ' + obj.Total);
                        console.info('vm.leftTotal ' + vm.leftTotal);
                        obj = obj.List;
                        if (obj.length == 0) {
                            obj = ['无数据'];
                        }
                        vm.initMultiselect('.item-left .left-types');
                        var options = [];
                        for (var i = 0; i < obj.length; i++) {
                            var option = {
                                label: obj[i],
                                title: obj[i],
                                value: obj[i]
                            }
                            options.push(option);
                        }

                        $('.item-left .left-types').multiselect('dataprovider', options);

                        $('.item-left .multiselect-search').val(vm.reqLeftType.LikeMergeTypeWhenBudget);
                        $('.item-left .multiselect-search').focus();
                        var pager = $('<li><div class="page paging text-center">' +
                            '<div class="pager paging"></div></div></li>');

                        $('.item-left .type-box .pager').remove();
                        $('.item-left .multiselect-container.dropdown-menu').append(pager);

                        $('.item-left .multiselect-search').on('keyup', debounce(function () {
                            vm.reqLeftType.LikeMergeTypeWhenBudget = $(this).val();
                            vm.reqLeftType.Index = 1;
                            vm.getLeftTypes();
                        }, 500));
                        $('.item-left .type-box .pager').mamPager({
                            pageSize: vm.reqLeftType.Size,              //页大小
                            pageIndex: vm.reqLeftType.Index,            //当前页
                            recordTotal: vm.leftTotal,                  //数据总数
                            type: 1,
                            prevText: "&laquo;",                        //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                vm.reqLeftType.Index = index;
                                vm.getLeftTypes();
                            }
                        });
                        console.info('vm.LeftTotal: ' + vm.LeftTotal);

                    } else {
                        console.info('获取预算类型失败！');
                        console.info(strErro);
                    }
                });
            },
            getRightTypes: function () {
                Set.getPagingVMergeTypeWhenBudgetList('get', vm.reqRightType.$model, function getPagingVMergeTypeWhenBudgetListListener(success, obj, strErro) {
                    if (success) {
                        vm.rightTotal = obj.Total;
                        obj = obj.List;
                        if (obj.length == 0) {
                            obj = ['无数据'];
                        }
                        vm.initMultiselect('.item-right .right-types');
                        var options = [];
                        for (var i = 0; i < obj.length; i++) {
                            var option = {
                                label: obj[i],
                                title: obj[i],
                                value: obj[i]
                            }
                            options.push(option);
                        }
                        $('.item-right .right-types').multiselect('dataprovider', options);
                        $('.item-right .multiselect-search').val(vm.reqRightType.LikeMergeTypeWhenBudget);
                        $('.item-right .multiselect-search').focus();
                        var pager = $('<li><div class="page paging text-center">' +
                            '<div class="pager paging"></div></div></li>');

                        $('.item-right .type-box .page').remove();
                        $('.item-right .multiselect-container.dropdown-menu').append(pager);

                        $('.item-right .multiselect-search').on('keyup', debounce(function () {
                            vm.reqRightType.LikeMergeTypeWhenBudget = $(this).val();
                            vm.reqRightType.Index = 1;
                            vm.getRightTypes();
                        }, 500));
                        $('.item-right  .type-box .pager').mamPager({
                            pageSize: vm.reqRightType.Size,              //页大小
                            pageIndex: vm.reqRightType.Index,            //当前页
                            recordTotal: vm.rightTotal,                  //数据总数
                            type: 1,
                            prevText: "&laquo;",                        //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                vm.reqRightType.Index = index;
                                vm.getRightTypes();
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
                        if (obj.indexOf('.item-left') != -1) {
                            vm.req.Index = 1;
                            vm.req.MergeTypeWhenBudget = $(option).text();
                            vm.query();
                        } else {
                            vm.selectedModel = vm.selectedModelCopy.concat();
                            vm.selectedModel.forEach(function (el) {
                                if (el.BudgetProject.MergeTypeWhenBudget != $(option).text()) {
                                    vm.selectedModel.remove(el);
                                }
                            })
                        }

                    }
                });
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
            checkAll: function (e, model) {
                var checked = e.target.checked;
                model.forEach(function (el) {
                    el.checked = checked
                })
            },
            checkOneLeft: function (e) {
                var checked = e.target.checked
                if (checked === false) {
                    vm.allcheckedLeft = false
                } else {
                    vm.allcheckedLeft = vm.model.every(function (el) {
                        return el.checked
                    })
                }
            },
            checkOneRight: function (e) {
                var checked = e.target.checked
                if (checked === false) {
                    vm.allcheckedRight = false
                } else {
                    vm.allcheckedRight = vm.selectedModel.every(function (el) {
                        return el.checked
                    })
                }
            },
            clickAdd: function () {
                vm.model.forEach(function (el) {
                    if (el.checked) {
                        vm.selectedModel.push(el);
                        vm.selectedModelCopy = vm.selectedModel.concat();
                        vm.model.remove(el);
                        vm.allcheckedLeft = false;
                    }
                });
                if (vm.selectedModel.length == 0) {
                    $.oaNotify.error('请先选择需要合并的项目！');
                    return
                }
            },
            clickAdd: function () {
                var arr = [];
                var num = 0;
                vm.allcheckedLeft = false;
                for (var i = 0; i < vm.model.length; i++) {
                    if (vm.model[i].checked === true) {
                        vm.model[i].checked = false;
                        arr.push(vm.model[i]);
                        vm.model.removeAt(i);
                        i--;
                        num++;
                    }
                }
                vm.selectedModel = vm.selectedModel.concat(arr);
                vm.selectedModelCopy = vm.selectedModel.concat();
                if (vm.selectedModel.length == 0) {
                    $.oaNotify.error('请先选择需要合并的项目！');
                    return
                }
            },
            addModel: function (el) {
                vm.model.push(el);
                vm.allcheckedRight = false
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
                sessionStorage.myDetails = JSON.stringify(el.$model);
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
            },
            clickSubmit: function () {
                if (vm.selectedModel.length <= 1) {
                    $.oaNotify.error('请选择至少2个需要合并的项目！');
                    return
                }
                var type = vm.selectedModel[0].BudgetProject.MergeTypeWhenBudget;
                var year = vm.selectedModel[0].BudgetProject.Year;
                var isnext = true;
                for (var i = 0; i < vm.selectedModel.length; i++) {
                    if (vm.selectedModel[i].BudgetProject.MergeTypeWhenBudget != type) {
                        isnext = false;
                        return $.oaNotify.error('所选项目【预算类型】不一致，不能合并！');
                    }
                    if (vm.selectedModel[i].BudgetProject.Year != year) {
                        isnext = false;
                        return $.oaNotify.error('所选项目【年度】不一致，不能合并！');
                    }
                }

                if (isnext) {
                    changeUrlNew('/Invite_bids/views/project_argumentation/add_merge.html')
                    $('.modal-add').modal('show');
                }
            },
            clickBtnReturn: function () {
                $('.modal-add').modal('hide');
            },
        });
        $('.personnel-list').mCustomScrollbar({
            theme: 'dark-3',
        });
        $('.item-left .form-year').datetimepicker({
            format: 'yyyy',
            todayBtn: 1,
            autoclose: 1,
            startView: 4,
            minView: 4,
            language: 'zh-CN',
        }).on('changeDate', function () {
            vm.search();
        });

        $('.item-right .form-year').datetimepicker({
            format: 'yyyy',
            todayBtn: 1,
            autoclose: 1,
            startView: 4,
            minView: 4,
            language: 'zh-CN',
        }).on('changeDate', function () {
            vm.selectedModel = vm.selectedModelCopy.concat();
            vm.selectedModel.forEach(function (el) {
                if (el.BudgetProject.Year != vm.reqTwo.Year) {
                    vm.selectedModel.remove(el);
                }
            })
        });

        vm.query();
        vm.getLeftTypes();
        vm.getRightTypes();
        avalon.scan(document.body);
    });
});