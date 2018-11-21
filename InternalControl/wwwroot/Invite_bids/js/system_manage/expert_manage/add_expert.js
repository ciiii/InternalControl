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