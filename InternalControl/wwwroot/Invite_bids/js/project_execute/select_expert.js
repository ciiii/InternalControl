$(function () {
    window.choiceVm = null;
    avalon.ready(function () {
        window.choiceVm = avalon.define({
            $id: 'choiceRoot',
            req: {
                Index: 1,
                Size: 10,
                LikeAllName: '',
                LikeCompany: ''
            },
            total: '',
            model: [],
            selectArr: [],
            allchecked: false,
            loaded: false,
            departmentName: '',
            avoidExpert: vm.avoidExpert,
            query: function () {
                choiceVm.loaded = false;
                $.support.cors = true;
                Set.getPagingExpertList('get', choiceVm.req.$model, function getPagingExpertListListener(success, obj, strErro) {
                    if (success) {
                        choiceVm.loaded = true;
                        choiceVm.total = obj.Total;
                        if (obj == null || obj.List.length == 0) {
                            $('.modal-choice .pager').hide();
                            choiceVm.model = [];
                            return;
                        } else {
                            obj = obj.List;
                            var number = (choiceVm.req.Index - 1) * choiceVm.req.Size + 1;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].number = number;
                                obj[i].checked = false;
                                number++;
                                if (choiceVm.avoidExpert && choiceVm.avoidExpert.length != 0) {
                                    for (var a = 0; a < choiceVm.avoidExpert.length; a++) {
                                        if (obj[i].Id == choiceVm.avoidExpert[a].Id) {
                                            obj[i].checked = true;
                                        }
                                    }
                                }
                            }
                            choiceVm.model = obj;
                            $('.modal-choice .pager').show();
                        }
                        $('.modal-choice .pager').mamPager({
                            pageSize: choiceVm.req.Size,                           //页大小
                            pageIndex: choiceVm.req.Index,                     //当前页
                            recordTotal: choiceVm.total,                      //数据总数
                            type: 1,
                            prevText: "&laquo;",                       //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                choiceVm.req.Index = index;
                                choiceVm.loaded = false;
                                choiceVm.allchecked = false;
                                choiceVm.query();
                            }
                        });
                        $('.modal-choice .bs-tooltip').tooltip();
                    } else {
                        console.info('获取专家列表失败！');
                        console.info(strErro);
                    }
                });
            },
            search: function () {
                choiceVm.req.Index = 1;
                choiceVm.query();
            },
            submit: function () {
                if (event.keyCode == 13) {
                    choiceVm.search();
                }
            },
            checkAll: function (e) {
                var checked = e.target.checked
                choiceVm.model.forEach(function (el) {
                    el.checked = checked;
                    if (el.checked) {
                        choiceVm.avoidExpert.ensure(el);
                    } else {
                        choiceVm.removeEl(el);
                    }
                })
            },
            removeEl: function (el) {
                if (choiceVm.avoidExpert.length != 0) {
                    for (var a = choiceVm.avoidExpert.length - 1; a >= 0; a--) {
                        if (choiceVm.avoidExpert[a].Id == el.Id) {
                            choiceVm.avoidExpert.remove(choiceVm.avoidExpert[a]);
                            break;
                        }
                    }
                }
            },
            checkOne: function (e, el) {
                var checked = e.target.checked
                if (checked === false) {
                    choiceVm.allchecked = false;
                    choiceVm.removeEl(el);
                } else {
                    choiceVm.avoidExpert.ensure(el);
                    choiceVm.allchecked = choiceVm.model.every(function (el) {
                        return el.checked
                    });
                }
            },
            batchChoice: function () {
                var arr = [];
                for (var a = 0; a < choiceVm.avoidExpert.length; a++) {
                    arr.push(choiceVm.avoidExpert[a].Name);
                }
                vm.avoidExpertNames = arr.join();
                vm.avoidExpert = choiceVm.avoidExpert;
                if (choiceVm.avoidExpert.length != 0) {
                    $('.modal-choice').modal('hide');
                } else {
                    $.oaNotify.error('请先勾选！');
                }
            },
        })
        $('.modal-choice .modal-body,.menuContent').mCustomScrollbar({
            theme: 'dark-3',
        });
        choiceVm.query();
        avalon.scan(document.body);
    });
});