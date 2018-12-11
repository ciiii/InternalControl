$(function () {
    isOverdue(1000 * 60 * 60 * 3);
    var DepartmentId = mUserInfo.user.DepartmentId;
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            thisYear: new Date().getFullYear(),
            nextYear: new Date().getFullYear() + 1,
            model: {
                Id: DepartmentId,
                IsCanChooseThisYear: false,
                DeclareBeginDatetime: '',
                DeclareEndDatetime: '',
                SupplementBeginDatetime: null,
                SupplementEndDatetime: null,
                Remark: ''
            },
            GetRelevantDepartmentsSetting: function () {
                Department.GetRelevantDepartmentsSetting('get', DepartmentId, function GetRelevantDepartmentsSettingListener(success, obj, strErro) {
                    if (success) {
                        if (obj) {
                            vm.model = obj;
                            if (vm.model.DeclareBeginDatetime != null) {
                                vm.model.DeclareBeginDatetime = formatDate(vm.model.DeclareBeginDatetime, 'YY-MM-DD hh:00');
                            } else {
                                vm.model.DeclareBeginDatetime = '';
                            }
                            if (vm.model.DeclareEndDatetime != null) {
                                vm.model.DeclareEndDatetime = formatDate(vm.model.DeclareEndDatetime, 'YY-MM-DD hh:00');
                            } else {
                                vm.model.DeclareEndDatetime = '';
                            }
                            if (vm.model.SupplementBeginDatetime != null) {
                                vm.model.SupplementBeginDatetime = formatDate(vm.model.SupplementBeginDatetime, 'YY-MM-DD hh:00');
                            } else {
                                vm.model.SupplementBeginDatetime = '';
                            }
                            if (vm.model.SupplementEndDatetime != null) {
                                vm.model.SupplementEndDatetime = formatDate(vm.model.SupplementEndDatetime, 'YY-MM-DD hh:00');
                            } else {
                                vm.model.SupplementEndDatetime = '';
                            }
                            vm.setTime();
                        }

                    } else {
                        alert('获取某个归口部门的时间设置失败！');
                        console.info(strErro);
                    }
                })
            },
            AddOreditRelevantDepartmentsSetting: function (data) {
                Department.AddOreditRelevantDepartmentsSetting('post', data, function AddOreditRelevantDepartmentsSettingListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                    } else {
                        $.oaNotify.error('提交失败！');
                    }
                });
            },
            isThisYear: function () {
                if (vm.model.IsCanChooseThisYear == 'true') {
                    vm.model.IsCanChooseThisYear = true;
                    $('.thisYear').show();
                    vm.setTime();
                } else {
                    vm.model.IsCanChooseThisYear = false;
                    $('.thisYear').hide();
                }
            },
            setTime:function () {
                $('.form-hour').datetimepicker({
                    format: 'yyyy-mm-dd hh:00',
                    showMeridian: true,
                    autoclose: true,
                    minView: 1,
                    todayBtn: true,
                    language: 'zh-CN'
                });
            },
            clickSubmit: function () {
                if (vm.model.DeclareBeginDatetime == '' && vm.model.DeclareEndDatetime == '') {
                    $.oaNotify.error(' 申报起止时间不能为空！');
                    return;
                }

                if (!vm.model.IsCanChooseThisYear) {
                    vm.model.SupplementBeginDatetime = '';
                    vm.model.SupplementEndDatetime = '';
                }
                vm.AddOreditRelevantDepartmentsSetting(vm.model.$model);
            }
        });

        vm.setTime();
        vm.GetRelevantDepartmentsSetting();
        avalon.scan(document.body);
    });
});