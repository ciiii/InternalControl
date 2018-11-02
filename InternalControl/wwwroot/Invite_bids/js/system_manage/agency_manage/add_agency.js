$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            model: {},
            editType: vm.editType,
            title: '',
            categorys: [],
            users: [],
            info: {
                Id: 0,
                Name: '',
                LinkmanId: '',
                LinkmanName: '',
                ContactWay: '',
                ContactNumber: '',
                Address: '',
                ProxyMode: '',
                BeginDatetimeOfAgent: '',
                EndDatetimeOfAgent: '',
                ComprehensiveScore: ''
            },
            onLoad: function () {
                if (addVm.editType) {
                    addVm.title = '修改代理机构';
                    addVm.info = vm.myDetails;
                    for (var i in addVm.info) {
                        if (addVm.info[i] == null || addVm.info[i] == 'undefined') {
                            addVm.info[i] = '';
                        }
                    }
                    console.info(addVm.info);
                    addVm.info.BeginDatetimeOfAgent = formatDate(addVm.info.BeginDatetimeOfAgent, 'YY-MM-DD');
                    addVm.info.EndDatetimeOfAgent = formatDate(addVm.info.EndDatetimeOfAgent, 'YY-MM-DD');

                } else {
                    addVm.title = '添加代理机构';
                }
                addVm.getCategoryDictionary();
                addVm.getUsersList();
            },
            getCategoryDictionary: function () {
                Dictionary.getCategoryDictionary('get', '代理方式', function getCategoryDictionaryListener(success, obj, strErro) {
                    if (success) {
                        addVm.categorys = obj;
                    } else {
                        console.info('获取代理方式失败！');
                        console.info(strErro);
                    }
                })
            },
            getUsersList: function () {
                User.getUsersList('get', '', function getUsersListListener(success, obj, strErro) {
                    if (success) {
                        addVm.users = obj;
                        $('.modal-add .contact').val(addVm.info.LinkmanId);
                    } else {
                        console.info('获取所有用户列表失败！');
                        console.info(strErro);
                    }
                })
            },
            changePrincipalId: function (e) {
                addVm.info.LinkmanId = e.target.value;
            },
            getHtmlDocName: function (url) {
                var arr = url.split('\\');
                return arr[arr.length - 1];
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
                var unitName = addVm.inputVal('.modal-add .unit-name');
                var contact = addVm.inputVal('.modal-add .contact');
                if (!unitName) {
                    $.oaNotify.error(' 单位名称不能为空！');
                    return;
                }
                if (!contact) {
                    $.oaNotify.error(' 请选择联系人！');
                    return;
                }
                addVm.info.LinkmanId = parseInt(addVm.info.LinkmanId);
                addVm.addOrEditAgency(addVm.info.$model);

            },
            addOrEditAgency: function (data) {
                Set.addOrEditAgency('post', data, function addOrEditAgencyListener(success, obj, strErro) {
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
        $('.modal-add .form-time').datetimepicker({
            format: 'yyyy-mm-dd',
            minView: "month",
            todayBtn: 1,
            autoclose: 1,
            language: 'zh-CN'
        });
        addVm.onLoad();
        avalon.scan(document.body);
    });
});