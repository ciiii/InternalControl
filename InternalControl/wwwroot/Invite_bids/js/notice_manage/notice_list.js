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
                Type: '',
                LikeName: '',
                LikeSendorName:'',
                BeginCreateDatetime: '',
                EndCreateDatetime: '',

            },
            userInfo: mUserInfo,
            total: '',
            endTime: '',
            model: [],
            nothing: false,
            loaded: false,
            editType: false,
            allchecked: false,
            text: '',
            types: [],
            nocticeId: '',
            myDetails: {},
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Notice.GetPagingNoticeForManageList('get', vm.req.$model, function GetPagingNoticeForManageListListener(success, obj, strErro) {
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
                        console.info('获取自己发送的通知列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '通知类型', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        vm.types = obj;

                    } else {
                        console.info('获取通知类型失败！');
                        console.info(strErro);
                    }
                })
            },
            search: function () {
                vm.req.Index = 1;
                if (vm.endTime != '') {
                    vm.req.EndCreateDatetime = vm.endTime + ' 23:59:59';
                }
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
            changeTypes: function (e) {
                vm.req.Type = e.target.value;
                vm.search();
            },
            getclass: function (value) {
                if (value) {
                    return 'btn-enable'
                } else {
                    return 'btn-disable'
                }
            },
            getStatusClass: function (status) {
                if (!status)
                    return 'disable';
            },
            clickBtnDisable: function (el) {
                if (el.IsEnabled) {
                    vm.text = '禁用';
                } else {
                    vm.text = '启用';
                }
                vm.clickInfo(el);
            },
            clickBtnEdit: function (el) {
                vm.clickInfo(el);
                location.href = '/Invite_bids/views/notice_manage/add_notice.html?editType=true';
            },
            clickInfo: function (el) {
                vm.myDetails = el.$model;
                sessionStorage.myDetails = JSON.stringify(el.$model);
            },
            clickDetails: function (el) {
                vm.nocticeId = el.Id;
                vm.myDetails = el.$model;
            },
            confirmDel: function () {
                var data = {
                    Model: !vm.myDetails.IsEnabled,
                    List: [vm.myDetails.Id]
                }
                vm.SwitchNoctice(data);
            },
            SwitchNoctice: function (data) {
                Notice.SwitchNoctice('post', data, function SwitchNocticeListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.clickBtnReturn();
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });
        vm.getCategoryDictionary();
        vm.query();
        avalon.scan(document.body);
    });
});