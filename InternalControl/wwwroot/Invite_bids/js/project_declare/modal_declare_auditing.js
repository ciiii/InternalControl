$(function () {
    window.shenHevm = null;
    avalon.ready(function () {
        window.shenHevm = avalon.define({
            $id: 'shenHe',
            url: '',
            model: {
                StepId: vm.stepId,
                Remark: '',
            },
            clickPass: function (data) {
                Declare.passAuditDeclareProject('post', data, function passAuditDeclareProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功！');
                        shenHevm.clickBtnReturn();
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickNonPass: function (data) {
                Declare.backAuditDeclareProject('post', data, function backAuditDeclareProjectListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功！');
                        shenHevm.clickBtnReturn();
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickSubmit: function (val) {
                if (val == 1) {
                    shenHevm.clickPass(shenHevm.model.$model)
                } else {
                    shenHevm.clickNonPass(shenHevm.model.$model)
                }
            },
            getUrl: function (url) {
                return decodeURI(encodeURI(encodeURI(url)));
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        $('.modal-body').mCustomScrollbar({
            theme: 'dark-3',
        });
        avalon.scan(document.body);
    });
});