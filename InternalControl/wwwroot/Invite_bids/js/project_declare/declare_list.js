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
                IsCenterPurchase: '',
                RelevantDepartmentId: '',
                PlanPurchaseMethod: '',
                IsOrderByCreateTime:true,
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
            activeMoneyIndex:'',
            stepId: '',
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Declare.getPagingDeclareProjectList('get', vm.req.$model, function getPagingDeclareProjectListListener(success, obj, strErro) {
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
            clickBtnSum: function (index, value) {
                if (vm.activeMoneyIndex === index) {
                    vm.activeMoneyIndex = '';
                    vm.req.IsOrderByCreateTime = true;
                    vm.req.OrderType = false;
                } else {
                    vm.activeMoneyIndex = index;
                    vm.req.OrderType = value;
                    vm.req.IsOrderByCreateTime = false;
                }
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
            changePurchaseMetho: function (e) {
                vm.req.PlanPurchaseMethod = e.target.value;
                vm.search();
            },
            getFlowClass: function (name) {
                if (name.indexOf('待完善') != -1) {
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
                    case '待完善项目审核资料':
                        return 'state-remind';
                    case '待项目审核':
                        return 'state-auditing';
                    default:
                        return '';
                }
            },
            clickBtnEdit: function (el) {
                vm.clickInfo(el);
                var url = el.DeclareProject.LastEditStepComponentName;
                if (url.indexOf('modal') != -1) {
                    $('.modal-add').modal('show');
                    changeUrlNew('/Invite_bids/views/' + url)
                    vm.stepId = el.DeclareProject.LastStepId;
                } else {
                    location.href = '/Invite_bids/views/' + url + '?editType=true';
                }
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
                sessionStorage.myDetails = JSON.stringify(el.$model);
            },
            clickDetails: function (el) {
                vm.myDetails = el.$model;
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
        vm.getCategoryDictionary();
        vm.query();
        avalon.scan(document.body);
    });
});