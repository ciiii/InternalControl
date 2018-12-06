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
            BudgetId: '',
            BudgetTypeName: '',
            budgetList: 0,
            allBudget: 0,
            selectedBudget: 0,
            selectList: [],
            selectFrontThree: [],
            selectAfterThree: [],
            projecId: '',
            topSelectList: [],
            ranking: {},
            query: function () {
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
                                for (var j = 0; j < obj[i].Package.length; j++) {
                                    var item = obj[i].Package[j];
                                    obj[i].BudgetProject.allNumber += item.BudgetNumber;
                                }
                                if (vm.selectList.length != 0) {
                                    for (var a = 0; a < vm.selectList.length; a++) {
                                        if (obj[i].BudgetProject.Id == vm.selectList[a].BudgetProject.Id) {
                                            obj[i].checked = true;
                                        }
                                    }
                                }
                                number++;
                            }
                            vm.calculatingSelectedBudget();
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
                        console.info('获取可进入预算列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getBudgetList: function () {
                var postData = {
                    OwnDepartmentsId: mUserInfo.user.DepartmentId,
                    Year: vm.req.Year
                }
                Budget.getBudgetList('get', postData, function getBudgetListListener(success, obj, strErro) {
                    if (success) {
                        vm.budgetList = obj.reverse();
                        for (var i = 0; i < obj.length; i++) {
                            if (obj[i].BudgetTypeId == 1) {
                                vm.allBudget = obj[i].BudgetAmount - obj[i].TotleAlreadySpent;
                                vm.BudgetId = obj[i].Id
                            }
                        }
                        vm.BudgetName = obj[0].BudgetTypeName;
                        console.info(vm.BudgetName);
                    } else {
                        console.info('获取当前归口部门的某年度的预算失败！')
                        console.info(strErro)
                    }
                })
            },
            getOrderOfProjectOfEnter: function () {
                var postData = copy(vm.req);
                postData.listOfSelectedId = []
                vm.selectList.forEach(function (item) {
                    postData.listOfSelectedId.push(item.BudgetProject.Id);
                });
                postData.numberOfTake = 3;
                Budget.getOrderOfProjectOfEnter('get', postData, function getOrderOfProjectOfEnterListener(success, obj, strErro) {
                    if (success) {
                        vm.ranking = obj;
                    } else {
                        console.info('获取排名失败！')
                        console.info(strErro)
                    }
                })
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
                    el.checked = checked;
                    var exsit = vm.doWithAddProject(el);
                    if (checked === false) {
                        if (exsit) {
                            vm.removeFn(el);
                        }
                    } else {
                        if (!exsit) {
                            vm.selectList.push(el);
                        }
                    }
                });
                vm.calculatingSelectedBudget();
                vm.getOrderOfProjectOfEnter();
            },
            checkOne: function (e, el) {
                var checked = e.target.checked;
                var exsit = vm.doWithAddProject(el);
                if (checked === false) {
                    vm.allchecked = false
                    if (exsit) {
                        vm.removeFn(el);
                    }
                } else {
                    if (!exsit) {
                        vm.selectList.push(el);
                    }
                    vm.allchecked = vm.model.every(function (el) {
                        return el.checked
                    })
                }
                vm.calculatingSelectedBudget()
                vm.getOrderOfProjectOfEnter();
            },
            removeFn: function (el) {
                vm.selectList.forEach(function (itme) {
                    if (itme.BudgetProject.Id == el.BudgetProject.Id) {
                        vm.selectList.remove(itme);
                        return
                    }
                })
                vm.getOrderOfProjectOfEnter();
            },
            calculatingSelectedBudget: function () {
                vm.selectedBudget = vm.selectList.reduce(function (total, item) {
                    return parseInt(total + item.BudgetProject.TotalBudgetAmount);
                }, 0);
            },
            doWithAddProject: function (el) {
                var exsit = false;
                for (var i = 0; i < vm.selectList.length; i++) {
                    if (vm.selectList[i].BudgetProject.Id == el.BudgetProject.Id) {
                        exsit = true;
                        break;
                    }
                }
                return exsit;
            },
            changeCenterPurchase: function (e) {
                vm.req.IsCenterPurchase = e.target.value;
                vm.search();
            },
            changeProjectType: function (e) {
                vm.req.ProjectType = e.target.value;
                vm.search();
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
                sessionStorage.myDetails = JSON.stringify(el.$model);
            },
            changeBudgetList: function (e) {
                vm.BudgetId = e.target.value;
                vm.budgetList.forEach(function (el) {
                    if (vm.BudgetId == el.Id) {
                        vm.allBudget = el.BudgetAmount;
                        vm.BudgetTypeName = el.BudgetTypeName;
                    }
                });
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
                vm.projecId = el.BudgetProject.Id;
            },
            selectPreview: function () {
                if (vm.selectList.length > 0) {
                    $('.modal-add').modal('show');
                    changeUrlChoice('.btn-box .btn-preview', '.modal-add');
                } else {
                    $.oaNotify.error(' 没有已选项，请先勾选！');
                }
            },
            confirmEnter: function () {
                if (vm.selectList.length > 0) {
                    $('.modal-min').modal('show');
                    changeUrlChoice('.btn-box .btn-upload', '.modal-min');
                } else {
                    $.oaNotify.error(' 没有已选项，请先勾选！');
                }
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
        vm.getBudgetList();
        vm.query();
        avalon.scan(document.body);
    });
});