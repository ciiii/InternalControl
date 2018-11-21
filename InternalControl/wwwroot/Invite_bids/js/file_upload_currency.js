function fileUpload(data, result) {
    $.ajax({
        url: Code.URL_POST_UPLOAD_FILE,
        type: "POST",
        processData: false,
        contentType: false,
        data: data,
        dataType: 'text',
        success: function (e) {
            e = JSON.parse(e);
            if (e.error) {
                result(false, null, e.error);
            } else {
                var data = e.data[0];
                result(true, data, '上传成功！');
            }
        }, error: function (e) {
            e = JSON.parse(e);
            result(false, null, e);
        }
    });
}
