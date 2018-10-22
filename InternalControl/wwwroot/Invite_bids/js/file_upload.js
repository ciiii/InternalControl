//文件上传前处理
function fileChange(inputFile, item) {
    var format;
    var fileName;
    var fileInfo;
    $(inputFile).on('change', function () {
        var $this = $(this);
        var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器

        if (isIE) {
            var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            var fIEVersion = parseFloat(RegExp["$1"]);

            if (fIEVersion == 8 || fIEVersion == 9) {
                fileInfo = $(this).val().split("\\");
                fileName = fileInfo[2];
            } else {
                getfileInfo($this);
            }
        } else {
            getfileInfo($this);
        }
        item.FileName = fileName;
        var data = new FormData();
        data.append('file', $(inputFile).get(0).files[0]);
        $(inputFile).parent().find('.loading').show();
        fileUpload(data, inputFile, item);
    });

    function getfileInfo($this) {
        fileInfo = $this.get(0).files[0];
        format = getFileExtName(fileInfo.name);
        fileName = fileInfo.name;
        // return fileInfo;
    }

    //获取文件后缀。
    function getFileExtName(b) {
        var ExtName = b.lastIndexOf(".");
        return b.substring(ExtName + 1);
    }
}

function fileUpload(data, inputFile, item) {
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
                $.oaNotify.error(' 上传失败：' + e.error);
            } else {
                $.oaNotify.ok(' 上传成功!');

                var data = e.data[0];
                item.Url = data;
                item.Attachment = data;
                item.FileName = getHtmlDocName(data);
            }
            $(inputFile).parent().find('.loading').hide();

        }, error: function (e) {
            e = JSON.parse(e);
            $(inputFile).parent().find('.loading').hide();
            $.oaNotify.error('上传失败：' + e.error);
        }
    });
}

function getHtmlDocName(url) {
    var arr = url.split('\\');
    return arr[arr.length - 1];
}