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
                LikeMessage: '',
                FlowTemplateName: ''
            },
            total: '',
            model: [],
            nothing: false,
            loaded: false,
            allchecked: false,
            myDetails: {},
            type: '全部',
            query: function () {
                vm.loaded = false;
                $.support.cors = true;
                Notice.GetPagingProjectBacklog('get', vm.req.$model, function GetPagingProjectBacklogListener(success, obj, strErro) {
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
                        console.info('获取任务消息列表失败！');
                        console.info(strErro);
                    }
                });
            },
            search: function () {
                vm.req.Index = 1;
                if (vm.type == '全部') {
                    vm.req.FlowTemplateName = '';
                } else {
                    vm.req.FlowTemplateName = vm.type;
                }
                vm.query();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    vm.query();
                }
            },
            getClass: function (e) {
                if (e == vm.type) {
                    return 'active';
                }
            },
            clickType: function (e) {
                vm.type = e.target.innerText;
                vm.search();
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        vm.query();
        avalon.scan(document.body);
    });
});