$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            model: {},
            editType: vm.editType,
            title: '',
            items: [],
            departments: [],
            items:[],
            info: {
                Id: 0,
                Name: '',
                ItemName: '',
                Title: '',
                Company: '',
                Phone: '',
                IsOurCompany: true,
                DepartmentId: '',
                Remark: ''
            },
            onLoad: function () {
                if (addVm.editType) {
                    addVm.title = '修改专家';
                    addVm.info = vm.myDetails;
                    for (var i in addVm.info) {
                        if (addVm.info[i] == null || addVm.info[i] == 'undefined') {
                            addVm.info[i] = '';
                        }
                    }
                    console.info(addVm.info);
                } else {
                    addVm.title = '添加专家';
                }
                addVm.getCategoryDictionary();
                addVm.getDepartmentList();
            },
            /*getPagingItemList: function () {
                Set.getPagingItemList('get', addVm.req.$model, function getPagingItemListListener(success, obj, strErro) {
                    if (success) {
                        addVm.total = obj.Total;
                        obj = obj.List;
                        if (obj.length == 0) {
                            obj = [{name: '无数据', id: 0}];
                        }

                        addVm.initMultiselect('.major-item');
                        var options = [];
                        for (var i = 0; i < obj.length; i++) {
                            var option = {
                                label: '【' + obj[i].TopItemName + '】-' + obj[i].ItemKey + ' - ' + obj[i].Name,
                                title: obj[i].Name,
                                value: obj[i].Id
                            }
                            options.push(option);
                        }
                        addVm.templateList = obj;
                        $('.major-item').multiselect('dataprovider', options);
                        if (addVm != 0 && addVm.info.ItemId != null) {
                            $('.major-item').multiselect('select', addVm.info.ItemId);
                        }
                        $('.multiselect-search').val(addVm.req.LikeAllName);
                        $('.multiselect-search').focus();
                        var pager = $('<li><div class="page paging text-center">' +
                            '<div class="pager paging"></div></div></li>');

                        $('.majorItem-box .page').remove();
                        $('.multiselect-container.dropdown-menu').append(pager);

                        $('.multiselect-search').on('keyup', debounce(function () {
                            addVm.req.LikeAllName = $(this).val();
                            addVm.req.Index = 1;
                            addVm.getPagingItemList();
                        }, 500));

                        $('.majorItem-box .pager').mamPager({
                            pageSize: addVm.req.Size,                           //页大小
                            pageIndex: addVm.req.Index,                     //当前页
                            recordTotal: addVm.total,                  //数据总数
                            type: 1,
                            prevText: "&laquo;",                       //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                addVm.req.Index = index;
                                addVm.getPagingItemList();
                            }
                        });
                    } else {
                        console.info('获取专业品目失败！');
                        console.info(strErro);
                    }
                })
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
                        addVm.info.ItemId = $(option).val();
                    }
                });
            },*/
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '专业品目', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        addVm.items = obj;
                        $('.major-item').val(addVm.info.ItemName);

                    } else {
                        console.info('获取专业品目失败！');
                        console.info(strErro);
                    }
                })
            },
            getDepartmentList: function () {
                Department.getDepartmentList('get', '', function getDepartmentListListener(success, obj, strErro) {
                    if (success) {
                        addVm.departments = obj;
                        $('.department').val(addVm.info.DepartmentId);
                    } else {
                        console.info('获取部门列表失败！');
                        console.info(strErro);
                    }
                })
            },
            IsOurCompany: function () {
                if (addVm.info.IsOurCompany == 'true') {
                    addVm.info.IsOurCompany = true;
                    addVm.info.Company = '';
                } else {
                    addVm.info.IsOurCompany = false;
                }
            },
            inputVal: function (name) {
                if ($(name).val() != '') {
                    $(name).next().hide();
                    $(name).removeClass('error-input');
                    return true;
                } else {
                    $(name).next().show();
                    $(name).addClass('error-input');
                    return false;
                }
            },
            clickSubmit: function () {
                var unitName = addVm.inputVal('.expert-name');
                if (!unitName) {
                    $.oaNotify.error(' 专家姓名不能为空！');
                    return;
                }
                addVm.info.DepartmentId = parseInt(addVm.info.DepartmentId);
                addVm.addOrEditExpert(addVm.info.$model);
            },
            addOrEditExpert: function (data) {
                Set.addOrEditExpert('post', data, function addOrEditExpertListener(success, obj, strErro) {
                    postBack(success, strErro, '提交成功！', '提交失败：', '.modal-add', function callBack() {
                        vm.query();
                    });
                });
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });
        addVm.onLoad();
        avalon.scan(document.body);
    });
});