$(function () {
    isOverdue(1000 * 60 * 60 * 3);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 10,
                OrderType: false,
                LikeAllName: ''
            },
            relevantDepartment: [],
            purchaseMetho: [],
            items: [],
            editType: false,
            activeText: '货物',
            apply: {
                Url: '',
                FileName: '',
            },
            allPrice: 0,
            declareNumber: 0,
            allName: '',
            modelIndex: '',
            isGoods: true,
            year: new Date().getFullYear(),
            nextYear: new Date().getFullYear() + 1,
            thisYaer: false,
            yearList: [],
            allPriceDX: '零',
            model: {
                Data: {
                    Model: {
                        Id: 0,
                        Year: new Date().getFullYear() + 1,
                        Name: '',
                        ProjectType: '货物',
                        RelevantDepartmentId: '',
                        LinkmanName: '',
                        LinkmanPhone: '',
                        IsCenterPurchase: true,
                        PlanPurchaseMethod: '',
                        DateOfPlanToImplement: '',
                        Reason: '',
                        Attachment: '',
                        CreatorId: 0,
                        CreateDatetime: new Date(),
                        Remark: ''
                    },
                    List: [
                        {
                            Id: 0,
                            Name: '',
                            DeclareProjectId: 0,
                            BudgetProjectId: 0,
                            ExecuteProjectId: 0,
                            ItemId: 0,
                            ItemName: '请选择品目',
                            IsImported: false,
                            DeclareTechnicalRequirements: '',
                            DeclareNumber: 1,
                            DeclareUnitPrice: 0,
                            LimitOfPrice: 0,
                            Unit: '',
                            Attachment: '',
                            Remark: ''
                        }
                    ]
                },
                IsHold: true
            },
            onLoad: function () {
                if (oa.getUrlParam('editType') == 'true') {
                    vm.editType = true;
                } else {
                    vm.editType = false;
                }
                if (vm.editType) {
                    var myDetails = JSON.parse(sessionStorage.myDetails);
                    vm.model.Data.Model = myDetails.DeclareProject;
                    vm.model.Data.List = myDetails.Package;
                    vm.model.Data.Model.DateOfPlanToImplement = formatDate(vm.model.Data.Model.DateOfPlanToImplement, 'YY-MM');
                    vm.apply.Url = vm.model.Data.Model.Attachment;
                    vm.apply.FileName = vm.getHtmlDocName(vm.model.Data.Model.Attachment);
                    vm.allPrice = vm.model.Data.Model.TotalDeclareAmount;
                    vm.allPriceDX = numberDX(vm.allPrice);

                }
                vm.GetRelevantDepartmentList();
                vm.getCategoryDictionary();
                if (vm.model.Data.Model.ProjectType == '货物') {
                    vm.isGoods = true;
                } else {
                    vm.isGoods = false;
                }
                vm.countNumber();
                vm.changeAllName();

                if (vm.model.Data.Model.Year == vm.year) {
                    vm.thisYaer = true;
                } else {
                    vm.thisYaer = false;
                }
            },
            changeAllName: function () {
                var names = [];
                for (var i = 0; i < vm.model.Data.List.length; i++) {
                    var name = vm.model.Data.List[i].ItemName;
                    if (name != '') {
                        names.push(name);
                    }
                }
                if (names.length > 0) {
                    names = isRepeat(names);
                }
                vm.allName = names.join();
                if(vm.allName=='请选择品目'){
                    vm.allName='';
                }
            },
            countNumber: function () {
                vm.declareNumber = 0;
                vm.declareNumber = vm.model.Data.List.reduce(function (total, item) {
                    if (item.DeclareNumber == '') {
                        item.DeclareNumber = 0;
                    }
                    return total + parseInt(item.DeclareNumber);
                }, 0);
                vm.countCollectionPrice();
            },
            countCollectionPrice: function () {
                vm.allPrice = 0;
                vm.allPrice = vm.model.Data.List.reduce(function (total, item) {
                    if (item.DeclareUnitPrice == '') {
                        item.DeclareUnitPrice = 0;
                    }
                    return total + parseInt(item.DeclareNumber) * parseInt(item.DeclareUnitPrice);
                }, 0)
                vm.allPriceDX = numberDX(vm.allPrice);
            },
            selectText: function (e) {
                e.target.select();
            },
            removeCollectionEl: function (el) {
                vm.model.Data.List.remove(el);
                vm.countNumber();
                vm.countCollectionPrice();
            },
            GetRelevantDepartmentList: function () {
                Department.GetRelevantDepartmentList('get', function GetRelevantDepartmentListListener(success, obj, strErro) {
                    if (success) {
                        vm.relevantDepartment = obj;
                        $('.relevant-department').val(vm.model.Data.Model.RelevantDepartmentId);
                        if (vm.editType) {
                            vm.relevantDepartment.forEach(function (el) {
                                if (vm.model.Data.Model.RelevantDepartmentId == el.Id) {
                                    vm.yearList = {
                                        DeclareBeginDatetime: el.DeclareBeginDatetime,
                                        DeclareEndDatetime: el.DeclareEndDatetime,
                                        IsCanChooseThisYear: el.IsCanChooseThisYear,
                                        SupplementBeginDatetime: el.SupplementBeginDatetime,
                                        SupplementEndDatetime: el.SupplementEndDatetime
                                    }
                                    return false;
                                }
                            });
                        }

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
            getClass: function (type) {
                if (vm.model.Data.Model.IsCenterPurchase == type) {
                    return 'active'
                }
            },
            clickType: function (type) {
                vm.model.Data.Model.IsCenterPurchase = type;
                for (var i = 0; i < vm.model.Data.List.length; i++) {
                    vm.model.Data.List[i].ItemId = 0;
                    vm.model.Data.List[i].ItemName = '请选择品目';
                    vm.model.Data.List[i].DeclareNumber = 1;
                    vm.model.Data.List[i].DeclareUnitPrice = 0;
                }
                vm.declareNumber = 1;
                vm.allPrice = 0;
                vm.allPriceDX = '零';
                vm.allName = '';
                vm.model.Data.Model.ProjectType = '货物';
                if (type) {
                    vm.model.Data.Model.PlanPurchaseMethod = null;
                }
            },
            changeIsImported: function (e, el) {
                el.IsImported = e.target.value;
            },
            changeDepartment: function (e) {
                vm.model.Data.Model.RelevantDepartmentId = e.target.value;
                var thisYear = $('.relevant-department').find("option:selected").attr('data-time');
                if (thisYear == 'true') {
                    vm.thisYaer = true;
                    vm.model.Data.Model.Year = '';
                } else {
                    vm.thisYaer = false;
                }
                vm.relevantDepartment.forEach(function (el) {
                    if (vm.model.Data.Model.RelevantDepartmentId == el.Id) {
                        vm.yearList = el;
                        return
                    }
                })
            },
            changePurchaseMetho: function (e) {
                vm.model.Data.Model.PlanPurchaseMethod = e.target.value;
            },
            changeItems: function (index) {
                vm.modelIndex = index;
                console.info(vm.modelIndex);
            },
            limitOfPrice: function (el, style) {
                if (el.DeclareUnitPrice > 0 && el.LimitOfPrice > 0) {
                    if (el.DeclareUnitPrice > el.LimitOfPrice) {
                        return style;
                    } else {
                        return '';
                    }
                }
            },
            btnDel: function (item) {
                item.Url = null;
                item.FileName = null;
            },
            addCollection: function () {
                var obj = {
                    Id: 0,
                    Name: '',
                    DeclareProjectId: 0,
                    BudgetProjectId: 0,
                    ExecuteProjectId: 0,
                    ItemId: 0,
                    ItemName: '请选择品目',
                    IsImported: false,
                    DeclareTechnicalRequirements: '',
                    DeclareNumber: 1,
                    DeclareUnitPrice: 0,
                    LimitOfPrice: 0,
                    Unit: '',
                    Attachment: '',
                    Remark: ''
                }
                vm.model.Data.List.push(obj);
                vm.countNumber();
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    return true;
                } else {
                    return false;
                }
            },
            compareTime: function (beginTme, endTime, nowTime) {
                beginTme = new Date(beginTme).getTime();
                endTime = new Date(endTime).getTime();
                nowTime = nowTime.getTime();
                if (nowTime > beginTme && nowTime < endTime) {
                    return true;
                } else {
                    return false;
                }
            },
            postData: function () {
                var projectName = vm.inputVal('.project-name');
                var relevantDepartment = vm.inputVal('.relevant-department');
                var implementTime = vm.inputVal('.implement-time');
                var declareReason = vm.inputVal('.declare-reason');
                var declareYear = vm.inputVal('.declare-year');
                if (!projectName) {
                    $.oaNotify.error('项目名称不能为空！');
                    return;
                }
                if (!relevantDepartment) {
                    $.oaNotify.error('请选择归口部门！');
                    return;
                }
                if (!vm.model.Data.Model.LinkmanName || vm.model.Data.Model.LinkmanName == '') {
                    $.oaNotify.error('项目联系人不能为空！');
                    return;
                }
                if (!vm.model.Data.Model.LinkmanPhone || vm.model.Data.Model.LinkmanPhone == '') {
                    $.oaNotify.error('联系电话不能为空！');
                    return;
                }
                if (!implementTime) {
                    $.oaNotify.error('项目拟实施时间不能为空！');
                    return;
                }
                if (vm.allPrice <= 0) {
                    $.oaNotify.error('预算金额必须大于0！');
                    return;
                }
                if (!vm.apply.Url || vm.apply.Url == '') {
                    $.oaNotify.error('请上传申报申请！');
                    return;
                }
                if (!declareReason) {
                    $.oaNotify.error('申报原因不能为空！');
                    return;
                }
                if (!declareYear) {
                    $.oaNotify.error('请选择申报年度！');
                    return;
                }
                if (vm.model.Data.List.length == 0) {
                    $.oaNotify.error('至少添加一个包！');
                    return;
                } else {
                    var isNotItem = true;
                    var i;
                    vm.model.Data.List.forEach(function (el, index) {
                        if (el.DeclareNumber == '') {
                            el.DeclareNumber = 0;
                        }
                        if (el.Unit == '') {
                            el.Unit = '个';
                        }
                        if (el.ItemId == 0) {
                            isNotItem = false;
                            i = index;
                            return false;
                        }
                    })
                    if (!isNotItem) {
                        $.oaNotify.error('第' + (i + 1) + '包没有选择品目！');
                        return;
                    }
                }
                var isTime, beginTime, endTime;

                if (vm.model.Data.Model.Year == new Date().getFullYear()) {
                    beginTime = vm.yearList.SupplementBeginDatetime;
                    endTime = vm.yearList.SupplementEndDatetime;

                } else {
                    beginTime = vm.yearList.DeclareBeginDatetime;
                    endTime = vm.yearList.DeclareEndDatetime;
                }

                if (!beginTime || !endTime) {
                    $.oaNotify.error('申报时间设置不正确！');
                    return;
                }

                isTime = vm.compareTime(beginTime, endTime, new Date());

                if (!isTime) {
                    $.oaNotify.error('没有在申报时间内，申报时间为：【' + beginTime + ' 至 ' + endTime + '】');
                    return;
                }

                vm.model.Data.Model.Attachment = vm.apply.Url;
                if (vm.editType) {
                    var postData = {
                        StepId: vm.model.Data.Model.LastStepId,
                        IsHold: vm.model.IsHold,
                        Remark: '',
                        Data: vm.model.Data
                    }
                    vm.editDeclareProject(postData);
                } else {
                    vm.addDeclareProject(vm.model.$model);
                }
            },
            clickSubmit: function () {
                vm.model.IsHold = false;
                vm.postData();
            },
            temporary: function () {
                vm.model.IsHold = true;
                vm.postData();
            },
            addDeclareProject: function (data) {
                Declare.addDeclareProject('post', data, function addDeclareProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.clickBtnCancel();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            editDeclareProject: function (data) {
                Declare.editDeclareProject('post', data, function editDeclareProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.clickBtnCancel();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item, true);
            },
            getObjClass: function (text) {
                if (vm.model.Data.Model.ProjectType == text) {
                    return 'active';
                }
            },
            clickObjType: function (e) {
                vm.model.Data.Model.ProjectType = e.target.innerText;
            },
            changeDeclareYear: function () {
                $('.form-month').val('');
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            clickBtnCancel: function () {
                location.href = '/Invite_bids/views/project_declare/declare_list.html';
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
        });
        $('.form-month').datetimepicker({
            format: 'yyyy-mm',
            weekStart: 1,
            autoclose: true,
            startView: 3,
            minView: 3,
            forceParse: false,
            language: 'zh-CN',
            linkField: "mirror_field"
        }).on('show', function (ev) {
            $('.form-month').datetimepicker('setStartDate', vm.model.Data.Model.Year + '-01');
            $('.form-month').datetimepicker('setEndDate', vm.model.Data.Model.Year + '-12');
        }).on('changeDate', function () {
            vm.model.Data.Model.DateOfPlanToImplement = getLastDayTime(vm.model.Data.Model.DateOfPlanToImplement)
        });
        vm.onLoad();
        avalon.scan(document.body);
    });
});