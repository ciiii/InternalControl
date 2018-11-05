$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            req: {
                Index: 1,
                Size: 16,
                OrderType: false,
                LikeName: '',
                ProjectType: vm.modelOne.Model.ProjectType,
                IsCenterPurchase: vm.modelOne.Model.IsCenterPurchase,
                IsGovernmentPurchase: vm.modelOne.Model.IsGovernmentPurchase,
                MergeTypeWhenBudget: vm.modelOne.Model.MergeTypeWhenExecute,
                PurchaseMethod: vm.modelOne.Model.PurchaseMethod,
                Year: vm.modelOne.Model.Year,
            },
            total: '',
            model: [],
            selectedModel: vm.selectedModel,
            nothing: false,
            loaded: false,
            oneselfId: vm.oneselfId,
            query: function () {
                addVm.loaded = false;
                $.support.cors = true;
                console.info(addVm.selectedModel);
                ProjectExecute.getPagingExecuteProjectListNotInFlowAndWithPackage('get', addVm.req.$model, function getPagingExecuteProjectListNotInFlowAndWithPackageListener(success, obj, strErro) {
                    if (success) {
                        addVm.loaded = true;
                        addVm.total = obj.Total;
                        if (obj == null || obj.List.length == 0) {
                            $('.add-project-merge .pager').hide();
                            addVm.model = [];
                            addVm.nothing = true;
                            return;
                        } else {
                            obj = obj.List;
                            var number = (addVm.req.Index - 1) * addVm.req.Size + 1;
                            addVm.nothing = false;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].number = number;
                                obj[i].checked = false;
                                if (obj[i].ExecuteProject.Id == addVm.oneselfId) {
                                    addVm.nothing = true;
                                }
                                if (addVm.selectedModel && addVm.selectedModel.length != 0) {
                                    for (var a = 0; a < addVm.selectedModel.length; a++) {
                                        if (obj[i].ExecuteProject.Id == addVm.selectedModel[a].ExecuteProject.Id) {
                                            obj[i].checked = true;
                                        }
                                    }
                                } else {
                                    addVm.selectedModel = [];
                                }

                                number++;
                            }
                            addVm.model = obj;
                            console.info(obj);
                            $('.add-project-merge .pager').show();
                        }
                        $('.add-project-merge .pager').mamPager({
                            pageSize: addVm.req.Size,                       //页大小
                            pageIndex: addVm.req.Index,                     //当前页
                            recordTotal: addVm.total,                       //数据总数
                            type: 1,
                            prevText: "&laquo;",                         //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                addVm.req.Index = index;
                                addVm.loaded = false;
                                addVm.nothing = false;
                                addVm.query();
                            }
                        });
                        $('.bs-tooltip').tooltip();
                    } else {
                        console.info('获取还没有进入执行流程的执行项目列表失败！');
                        console.info(strErro);
                    }
                });
            },
            search: function () {
                addVm.req.Index = 1;
                addVm.query();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    addVm.query();
                }
            },
            clickAdd: function (el) {
                el.checked = !el.checked;
                if (el.checked === true) {
                    var exsit = addVm.doWithAddProject(el);
                    if (!exsit) {
                        addVm.selectedModel.push(el);
                    }
                } else {
                    addVm.selectedModel.remove(el);
                }
            },
            doWithAddProject: function (project) {
                var exsit = false;
                if (addVm.selectedModel && addVm.selectedModel.length > 0) {
                    for (var i = 0; i < addVm.selectedModel.length; i++) {
                        if (addVm.selectedModel[i].ExecuteProject.Id == project.ExecuteProject.Id) {
                            exsit = true;
                            break;
                        }
                    }
                }
                return exsit;
            },
            addModel: function (el) {
                addVm.model.forEach(function (item) {
                    if (item.ExecuteProject.Id == el.ExecuteProject.Id) {
                        item.checked = false;
                    }
                });
                addVm.selectedModel.remove(el);
            },
            clickDetails: function (el) {
                vm.projecId = el.ExecuteProject.Id;
            },
            clickSubmit: function () {
                if (addVm.selectedModel.length == 0) {
                    $.oaNotify.error('请选择要添加的项目！');
                    return
                }
                vm.selectedModel = addVm.selectedModel;
                for (var i = 0; i < addVm.selectedModel.length; i++) {
                    var arr = addVm.selectedModel[i].Package;
                    var exsit = addVm.doWithAddPackage(addVm.selectedModel[i]);

                    for (var j = 0; j < arr.length; j++) {
                        arr[j].ProjectName = addVm.selectedModel[i].ExecuteProject.Name;
                        if (!exsit) {
                            vm.myDetails.ExecutePackage.PackageOfExcuteBudget.push(arr);
                        }
                    }
                }
                vm.changeAllName();
                addVm.clickBtnReturn();
            },
            doWithAddPackage: function (project) {
                var exsit = false;
                if (vm.myDetails.ExecutePackage.PackageOfExcuteBudget && vm.myDetails.ExecutePackage.PackageOfExcuteBudget.length > 0) {
                    for (var i = 0; i < vm.myDetails.ExecutePackage.PackageOfExcuteBudget.length; i++) {
                        if (vm.myDetails.ExecutePackage.PackageOfExcuteBudget.ExecuteProjectId == project.ExecuteProject.Id) {
                            exsit = true;
                            break;
                        }
                    }
                }
                return exsit;
            },
            clickBtnReturn: function () {
                $('.modal-add').modal('hide');
            },
        });
        $('.personnel-list').mCustomScrollbar({
            theme: 'dark-3',
        });
        addVm.query();
        avalon.scan(document.body);
    });
});