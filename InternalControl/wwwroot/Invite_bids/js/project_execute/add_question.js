$(function () {
    window.addVm = null;
    avalon.ready(function () {
        window.addVm = avalon.define({
            $id: 'Add',
            myMenu: vm.myMenu,
            model: {
                Id: 0,
                ExecuteProjectId: vm.ExecuteProject.Id,
                QuestionerName: '',
                QuestioningTime: '',
                QuestionAttachment: '',
                QuestionedPersonName: '',
                QuestionReplyTime: '',
                QuestionReplyAttachment: '',
                QuestionType: '',
                QuestionConclusion: '',
                IsThereScomplaint: false,
                ComplainantName: '',
                ComplainantTime: '',
                ComplainantAttachment: '',
                RespondentName: '',
                ComplainantReplyDepartment: '',
                ComplainantReplyTime: '',
                ComplainantReplyAttachment: '',
                ComplainantPublicityAddress: '',
                ComplainantPublicityWebsite: '',
                CreatorId: vm.ExecuteProject.CreatorId,
                CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
            },
            onLoad: function () {
                var myMenu = addVm.myMenu;
                for (var i = 0; i < myMenu.length; i++) {
                    if (myMenu[i].StepTemplateName == '结果信息') {
                        if (myMenu[i].IsPassed && !myMenu[i].ISCurrentStepTemplate) {
                            addVm.model.QuestionType = '质疑结果';
                            break;
                        } else {
                            addVm.model.QuestionType = '质疑流程';
                            break;
                        }
                    }
                }
                addVm.getTime();
            },
            getClass: function (value) {
                if (addVm.model.IsThereScomplaint == value) {
                    return 'active';
                }
            },
            clickThereScomplaint: function (value) {
                addVm.model.IsThereScomplaint = value;
                if (addVm.model.IsThereScomplaint) {
                    addVm.getTime();
                }
            },
            uploadQuestionAttachment: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.QuestionAttachment = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadQuestionReplyAttachment: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.QuestionReplyAttachment = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadComplainantAttachment: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.ComplainantAttachment = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            uploadComplainantReplyAttachment: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        addVm.model.ComplainantReplyAttachment = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            clickSubmit: function () {
                if (addVm.model.QuestionerName == '') {
                    $.oaNotify.error(' 【质疑人】不能为空！');
                    return;
                }
                if (addVm.model.QuestioningTime == '') {
                    $.oaNotify.error(' 【质疑时间】不能为空！');
                    return;
                }
                if (addVm.model.QuestionAttachment == '') {
                    $.oaNotify.error(' 请上传【质疑附件】！');
                    return;
                }
                if (addVm.model.QuestionedPersonName == '') {
                    $.oaNotify.error(' 【被质疑人】不能为空！');
                    return;
                }
                if (addVm.model.QuestionReplyTime == '') {
                    $.oaNotify.error(' 【回复时间】不能为空！');
                    return;
                }
                if (addVm.model.QuestionReplyAttachment == '') {
                    $.oaNotify.error(' 请上传【回复附件】！');
                    return;
                }
                if (addVm.model.QuestionConclusion == '') {
                    $.oaNotify.error(' 【质疑结论】不能为空！');
                    return;
                }
                if (addVm.model.IsThereScomplaint) {
                    if (addVm.model.ComplainantName == '') {
                        $.oaNotify.error(' 【投诉人】不能为空！');
                        return;
                    }
                    if (addVm.model.ComplainantTime == '') {
                        $.oaNotify.error(' 【投诉时间】不能为空！');
                        return;
                    }
                    if (addVm.model.ComplainantAttachment == '') {
                        $.oaNotify.error(' 请上传【投诉附件】！');
                        return;
                    }
                    if (addVm.model.RespondentName == '') {
                        $.oaNotify.error(' 【被投诉人】不能为空！');
                        return;
                    }
                    if (addVm.model.ComplainantReplyDepartment == '') {
                        $.oaNotify.error(' 【回复部门】不能为空！');
                        return;
                    }
                    if (addVm.model.ComplainantReplyTime == '') {
                        $.oaNotify.error(' 【回复时间】不能为空！');
                        return;
                    }
                    if (addVm.model.ComplainantReplyAttachment == '') {
                        $.oaNotify.error(' 请上传【回复附件】！');
                        return;
                    }
                    if (addVm.model.ComplainantPublicityAddress == '') {
                        $.oaNotify.error(' 请填写【投诉公示地址】！');
                        return;
                    }
                    if (addVm.model.ComplainantPublicityWebsite == '') {
                        $.oaNotify.error(' 请填写【投诉公示网站】！');
                        return;
                    }
                }
                console.info(addVm.model.$model);
                addVm.questionExecuteProject(addVm.model.$model);
            },
            questionExecuteProject: function (data) {
                ProjectExecute.questionExecuteProject('post', data, function questionExecuteProjectListener(success, obj, strErro) {
                    postBack(success, strErro, '提交成功！', '提交失败：', '.modal-add', function callBack() {
                        vm.ExecuteProjectOfQuestion.push(addVm.model.$model);
                        vm.clickBtnReturn();
                    });
                });
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            getTime: function () {
                $('.form-hour').datetimepicker({
                    format: 'yyyy-mm-dd hh:00:00',
                    showMeridian: true,
                    autoclose: true,
                    minView: 1,
                    todayBtn: true,
                    language: 'zh-CN'
                });
            }
        });
        $('.modal-add .tab-pane').mCustomScrollbar({
            theme: 'dark-3',
        });

        addVm.onLoad();
        avalon.scan(document.body);
    });
});