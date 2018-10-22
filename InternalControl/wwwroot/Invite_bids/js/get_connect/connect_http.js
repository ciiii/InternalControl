var Connect_Http = {
    httpDatas: function (type, url, data, callBackListener) {

        if (type == 'get') {
            if (data != null) {
                var nowTime = new Date().getTime();
                url += '?time=' + nowTime+'&';
                for (var filed in data) {
                    url += filed + '=' + data[filed] + '&';
                }
                url = url.substring(0, url.length - 1);
            }
        }
        var xhr;

        /*var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
        var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
        var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion == 8 || fIEVersion == 9) {
            xhr = new XDomainRequest();

            xhr.onerror = function () {
                callBackListener(false, null, '错啦');
            };
            xhr.onload = function () {
                Connect_Http.callBack(xhr.responseText, callBackListener);
            }

            var url = encodeURI(url);
            console.info(decodeURI(url));
            xhr.open(type, url);
            var sendStr = null;
            if (data != null && data.length != 0) {
                sendStr = JSON.stringify(data);
            }
            if (type == 'get') {
                xhr.send(null);
            } else {
                xhr.send(sendStr);
            }
        } else {*/
        if (window.XMLHttpRequest) {
            xhr = new XMLHttpRequest();
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                var status = xhr.status;
                if (status >= 200 && status < 300) {
                    Connect_Http.callBack(xhr.responseText, callBackListener);
                } else {
                    callBackListener(false, '', '错误代码: ' + xhr.status);
                }
            }
        }

        var url = encodeURI(encodeURI(url));
        xhr.open(type, decodeURI(url), true);
        xhr.setRequestHeader('Content-Type', 'application/json;charset=utf-8');
        data = JSON.stringify(data);

        if (type == 'get') {
            xhr.send(null);
        } else {
            xhr.send(data);
        }
        // }
    },
    getAjaxFormData: function (formData) {
        var obj = new Object();
        for (var i = 0; i < formData.length; i++) {
            var a = (formData[i].name);
            obj[a] = formData[i].value;
        }
        return obj;
    },
    ajaxData: function (url, type, data, callBackListener) {
        $.ajax({
            url: url,
            type: type,
            data: data,
            dataType: 'json',
            contentType: 'application/json',
            success: function (e) {
                e = JSON.stringify(e);
                Connect_Http.callBack(e, callBackListener);
            },
            error: function () {
                callBackListener(false, '', '请求失败');
            }

        })
    },
    callBack: function (strDatas, callBackListener) {
        var code = 0;
        var strErro = null;
        if (strDatas != null && strDatas.charAt(0) == '{' && strDatas.charAt(strDatas.length - 1) == '}') {
            strDatas = JSON.parse(strDatas);
            strErro = strDatas.error;
            if (strErro != null && strErro.length > 0) {
                code = 1;
            }
        }
        if (code == 0) {
            var oDatas = strDatas;
            callBackListener(true, oDatas, '');

        } else {
            callBackListener(false, strDatas, strErro);
        }
    },

    judgeSuccess: function (strDatas) {
        var code = 0;
        var strErro = null;
        if (strDatas != null && strDatas.charAt(0) == '{' && strDatas.charAt(strDatas.length - 1) == '}') {

            strErro = strDatas.error;
            if (strErro != null && strErro.length > 0) {
                code = 1;
            }
        }
        if (code == 0) {
            return true;

        } else {
            return false;
        }
    }
}
