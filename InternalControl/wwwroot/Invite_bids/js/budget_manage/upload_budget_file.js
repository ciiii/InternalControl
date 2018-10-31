$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.confirmVm = null;
    avalon.ready(function () {
        window.confirmVm = avalon.define({
            $id: 'upload',
            apply: {
                Url: '',
                FileName: '',
            },
            selectList: vm.selectList,
            model: {
                Model: {
                    BudgetId: vm.BudgetId,
                    AuditReply: '',
                    Remark: ''
                },
                List: []
            },
            postData: function () {
                confirmVm.model.Model.AuditReply = confirmVm.apply.Url;
                if (confirmVm.model.Model.AuditReply == '') {
                    $.oaNotify.error(' 请上传预算审核批复文件！');
                }
                confirmVm.selectList.forEach(function (el) {
                    var data = {
                        StepId: el.BudgetProject.LastStepId,
                        BudgetProjectId: el.BudgetProject.Id,
                    }
                    confirmVm.model.List.push(data);
                })
                confirmVm.passBudgetProjectOfEnter(confirmVm.model.$model);

            },
            clickSubmit: function () {
                confirmVm.postData();
            },
            passBudgetProjectOfEnter: function (data) {
                Budget.passBudgetProjectOfEnter('post', data, function passBudgetProjectOfEnterListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        confirmVm.clickBtnReturn();
                        vm.selectList = [];
                        vm.query();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item);
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        avalon.scan(document.body);
    });
});