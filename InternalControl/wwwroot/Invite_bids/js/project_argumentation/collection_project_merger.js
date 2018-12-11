$(function () {
    isOverdue(1000 * 60 * 60 * 3);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 16,
                OrderType: false,
                LikeName: '',
                IsCenterPurchase: true,
                MergeTypeWhenBudget: '',
                Year: new Date().getFullYear() + 1,
            },
            reqTwo: {
                MergeTypeWhenBudget: '全部'
            },
            reqLeftType: {
                Index: 1,
                Size: 10,
                OrderType: false,
                IsCenterPurchase: true,
                LikeMergeTypeWhenBudget: ''
            },
            reqRightType: {
                Index: 1,
                Size: 10,
                OrderType: false,
                IsCenterPurchase: true,
                LikeMergeTypeWhenBudget: ''
            },
            userInfo: mUserInfo,
            total: '',
            LeftTotal: '',
            rightTotal: '',
            model: [],
            selectedModel: [],
            nothing: false,
            loaded: false,
            allcheckedLeft: false,
            allcheckedRight: false,
            myDetails: {},
            isLeft: false,
            projecId:'',
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Budget.getPagingCollectionOrNonBudgetProjectMergeableList('get', vm.req.$model, function getPagingCollectionOrNonBudgetProjectMergeableListListener(success, obj, strErro) {
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
                                obj[i].BudgetProject.allNumber = 0;
                                for (var j = 0; j < obj[i].Package.length; j++) {
                                    var item = obj[i].Package[j];
                                    obj[i].BudgetProject.budgetAmount += (item.DeclareUnitPrice * item.DeclareNumber);
                                    obj[i].BudgetProject.allNumber += item.DeclareNumber;
                                }
                                if (vm.selectedModel.length != 0) {
                                    for (var a = 0; a < vm.selectedModel.length; a++) {
                                        if (obj[i].BudgetProject.Id == vm.selectedModel[a].BudgetProject.Id) {
                                            obj[i].checked = true;
                                        }
                                    }
                                }
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
                        console.info('获取集采预算可合并列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getLeftTypes: function () {
                Set.getPagingVMergeTypeWhenBudgetList('get', vm.reqLeftType.$model, function getPagingVMergeTypeWhenBudgetListListener(success, obj, strErro) {
                    if (success) {
                        vm.leftTotal = obj.Total;
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
                            vm.reqTwo.MergeTypeWhenBudget = $(option).text();
                            vm.selectedModel = [];
                            vm.allcheckedLeft = false;
                            vm.query();
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
                var arr = [];
                for (var i = 0; i < vm.model.length; i++) {
                    if (vm.model[i].checked === true) {
                        var exsit = vm.doWithAddProject(vm.model[i]);
                        if (!exsit) {
                            arr.push(vm.model[i]);
                        }
                    }
                }
                vm.allcheckedLeft = false;
                vm.selectedModel = vm.selectedModel.concat(arr);
                if (vm.selectedModel.length == 0) {
                    $.oaNotify.error('请先选择需要合并的项目！');
                    return
                }
            },
            doWithAddProject: function (project) {
                var exsit = false;
                for (var i = 0; i < vm.selectedModel.length; i++) {
                    if (vm.selectedModel[i].BudgetProject.Id == project.BudgetProject.Id) {
                        exsit = true;
                        break;
                    }
                }
                return exsit;
            },
            addModel: function (el) {
                vm.allcheckedLeft = false
                vm.model.forEach(function (item) {
                    if (item.BudgetProject.Id == el.BudgetProject.Id) {
                        item.checked = false;
                    }
                });
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
                sessionStorage.myDetails = JSON.stringify(el.$model);
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
                vm.projecId = el.BudgetProject.Id;
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
            vm.allcheckedLeft = false;
            vm.selectedModel = [];
        });

        vm.query();
        vm.getLeftTypes();
        avalon.scan(document.body);
    });
});