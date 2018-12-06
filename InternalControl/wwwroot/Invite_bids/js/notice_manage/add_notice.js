$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    UM.delEditor('UMContent');
    var um = UM.getEditor('UMContent');
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            model: {},
            editType: false,
            types: [],
            departments: [],
            mUserInfo: mUserInfo,
            model: {
                Model: {
                    Id: 0,
                    Type: '',
                    SendorId: mUserInfo.user.Id,
                    Name: '',
                    FilePath: '',
                    Content: '',
                    IsEnabled: true,
                    CreateDatetime: formatDate(new Date(), 'YY-MM-DD hh:mm:ss'),
                    Remark: ''
                },
                List: [
                    {
                        NoticeId: 0,
                        Type: 0,
                        ReceiverId: 0
                    }
                ]
            },
            onLoad: function () {
                if (oa.getUrlParam('editType') == 'true') {
                    vm.editType = true;
                    var myDetails = JSON.parse(sessionStorage.myDetails);
                    vm.model = {
                        Model: {
                            Id: myDetails.Id,
                            Type: myDetails.Type,
                            SendorId: myDetails.SendorId,
                            Name: myDetails.Name,
                            FilePath: myDetails.FilePath,
                            Content: myDetails.Content,
                            IsEnabled: myDetails.IsEnabled,
                            CreateDatetime: myDetails.CreateDatetime,
                            Remark: myDetails.Remark
                        },
                        List: [
                            {
                                NoticeId: 0,
                                Type: 0,
                                ReceiverId: 0
                            }
                        ]
                    }
                    um.ready(function () {
                        um.setContent(myDetails.Content);
                    });
                } else {
                    vm.editType = false;
                }
            },
            uploadNoticeFlie: function (e) {
                var data = new FormData();
                data.append('file', e.target.files[0]);
                fileUpload(data, function (success, data, resulstMsg) {
                    if (success) {
                        vm.model.Model.FilePath = data;
                        $.oaNotify.ok(resulstMsg);
                    } else {
                        $.oaNotify.error('上传失败：' + resulstMsg);
                    }
                })
            },
            getHtmlDocName: function (url) {
                if (url) {
                    var arr = url.split('\\');
                    return arr[arr.length - 1];
                }
            },
            clickSubmit: function () {
                vm.model.Model.Content = um.getContent();
                var model = vm.model.Model;
                if (model.Name == '') {
                    $.oaNotify.error(' 【通知标题】不能为空！');
                    return;
                }
                if (model.Type == '') {
                    $.oaNotify.error(' 请选择【通知类型】！');
                    return;
                }

                if (model.Content == '') {
                    $.oaNotify.error(' 填写【通知内容】！');
                    return;
                }
                vm.AddOrUpdateNotice(vm.model.$model);
            },
            AddOrUpdateNotice: function (data) {
                Notice.AddOrUpdateNotice('post', data, function AddOrUpdateNoticeListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 提交成功!');
                        vm.clickBtnReturn();
                    } else {
                        $.oaNotify.error(' 提交失败：' + strErro);
                    }
                });
            },
            clickBtnReturn: function () {
                location.href = '/Invite_bids/views/notice_manage/notice_list.html';
            },
        });
        $('.menuContent').mCustomScrollbar({
            theme: 'dark-3'
        });
        $('.form-hour').datetimepicker({
            format: 'yyyy-mm-dd hh:00:00',
            showMeridian: true,
            autoclose: true,
            minView: 1,
            todayBtn: true,
            startDate: new Date(),
            language: 'zh-CN'
        });
        vm.onLoad();
        avalon.scan(document.body);
    });
});