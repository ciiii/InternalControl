$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            model: [],
            getTemplateFileList: function () {
                Set.getTemplateFileList('get', '', function getTemplateFileListListener(success, obj, strErro) {
                    if (success) {
                        vm.model = obj;
                    } else {
                        console.info('获取模板文件列表失败！');
                        console.info(strErro);
                    }
                })
            },
            upload: function (e, item) {
                var id = '#' + e.target.id;
                fileChange(id, item);
            },
            btnDel: function (item) {
                item.Url = null;
                item.FileName = null;
            },
            clickSubmit: function () {
                var data = vm.model.$model;
                var newData = [];
                for (var i = 0; i < data.length; i++) {
                    for (var j = 0; j < data[i].Type.length; j++) {
                        var item = {
                            Id: data[i].Type[j].Id,
                            Name: data[i].Type[j].Name,
                            FileName: data[i].Type[j].FileName,
                            Type: data[i].Name,
                            Url: data[i].Type[j].Url,
                            Remark: data[i].Type[j].Remark
                        }
                        newData.push(item);
                    }
                }
                console.info(newData);
                vm.updateTemplateFile(newData);
            },
            updateTemplateFile: function (data) {
                Set.updateTemplateFile('post', data, function updateTemplateFileListener(success, obj, strErro) {
                    if (success) {
                        $.oaNotify.ok(' 保存成功!');
                    } else {
                        $.oaNotify.error(' 保存失败：' + strErro);
                    }
                });
            },
            clickBtnReturn: function () {
                vm.getTemplateFileList();
            }
        });
        vm.getTemplateFileList();
        avalon.scan(document.body);
    });
});