$(function () {
    $.fn.extend({
        animateCss: function (animationName, callback) {
            var animationEnd = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
            $(this).addClass("animated " + animationName).one(animationEnd, function () {
                $(this).removeClass("animated " + animationName);
                if (callback != null)
                    callback();
            });
        }
    });
});

//提示组件
(function () {

    function seniorTimer(callback, delay) {
        var timerId, start, remaining = delay;

        this.pause = function () {
            window.clearTimeout(timerId);
            remaining -= new Date() - start;
        };

        this.resume = function () {
            start = new Date();
            window.clearTimeout(timerId);
            timerId = window.setTimeout(callback, remaining);
        };

        this.resume();
    }

    function notify(options) {
        var self = this;
        var timer;
        this.opts = $.extend({}, $.oaNotify.defaultOptions, options);

        function initContainer() {
            if (self.opts.element instanceof $) {
                self.container = self.opts.element.parent().css("position", "relative");
            } else {
                self.container = $("." + self.opts.containerClassName + "");
                if (self.container.length == 0) {
                    self.container = $("<div class='" + self.opts.containerClassName + "'></div>");
                    $("body").append(self.container);
                }
            }
        }

        function initNotify() {
            var className = self.opts.className;
            if (self.opts.state != '' && self.opts.state != null)
                className = className + ' ' + className + '-' + self.opts.state;
            self.notify = $("<div class='" + className + "'>" + self.opts.content + "</div>");
            self.container.append(self.notify);
            if (self.opts.element instanceof $)
                self.setPosition();
        }

        function initEvent() {
            if (self.opts.clickToClose)
                self.notify.on("click", self.close.bind(self));
            if (self.opts.closeDelay != 0) {
                timer = new seniorTimer(self.close.bind(self), self.opts.closeDelay);
                self.notify.on('mouseenter', function () {
                    timer.pause();
                }).on('mouseleave', function () {
                    timer.resume();
                });
            }

        }

        initContainer();
        initNotify();
        initEvent();

        this.open();
    }

    notify.prototype.container = {};
    notify.prototype.notify = {};
    notify.prototype.open = function () {
        if (this.opts.openClassName == "")
            this.notify.fadeIn();
        else
            this.notify.animateCss(this.opts.openClassName);
    }
    notify.prototype.close = function () {
        if (this.opts.closeClassName == "")
            this.notify.fadeOut(this.destroy.bind(this));
        else
            this.notify.animateCss(this.opts.closeClassName, this.destroy.bind(this));
    }
    notify.prototype.destroy = function () {
        this.notify.remove();
        //是否删除父容器
        if (this.container.children().length == 0) {
            this.container.remove();
        }
        this.opts.closeCallback();
    }
    notify.prototype.setPosition = function () {
        var pos = this.opts.element.position();

        var w1 = this.opts.element.outerWidth();
        var m = this.opts.element.css('marginLeft');
        if (m != null)
            w1 += parseInt(m);
        m = this.opts.element.css('marginRigth');
        if (m != null)
            w1 += parseInt(m);
        var h1 = this.opts.element.outerHeight();
        var w2 = this.notify.outerWidth();
        var h2 = this.notify.outerHeight();
        var top = 0;
        var left = 0;
        switch (this.opts.position) {
            case "top":
                top = pos.top - h2;
                if (w2 > w1)
                    left = -((w2 - w1) / 2);
                else
                    left = (w2 - w1) / 2;
                break;
            case "bottom":
                top = pos.top + h1;
                left = pos.left - (w2 - w1) / 2;
                break;
            case "left":
                top = pos.top - (h2 - h1) / 2;
                left = pos.left - w2;
                break;
            case "rigth":
                top = pos.top - (h2 - h1) / 2;
                left = pos.left + w1;
                break;
            default:
        }
        this.notify.css({position: "absolute", top: top, left: left});
    }

    function createNotify(content, options, state) {
        return new notify($.extend({}, {content: content, state: state}, options));
    }

    $.oaNotify = {
        info: function (content, options) {
            return createNotify(content, options, '');
        },
        ok: function (content, options) {
            return createNotify(content, options, 'ok');
        },
        error: function (content, options) {
            return createNotify(content, options, 'error');
        }
    }

    $.fn.oaNotify = function (content, options) {
        $(this).each(function () {
            new notify($.extend({}, {element: $(this), content: content}, options));
        });
        return this;
    }

    $.oaNotify.defaultOptions = {
        containerClassName: "oa-notify-container",
        className: "oa-notify",
        state: '',

        openClassName: "",

        closeDelay: 4000,
        clickToClose: true,
        closeClassName: "",
        closeCallback: function () {
        },

        content: "",

        element: null,
        position: "top"
    }
    $.oaNotify.defaults = function (options) {
        $.oaNotify.defaultOptions = $.extend({}, $.oaNotify.defaultOptions, options);
    }
})();


(function () {
    window.oa = {};
    //获取到 url地址中的参数
    oa.getUrlParam = function (key) {
        key = key.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + key + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(window.location.href);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }
    //获取url中的文件名
    oa.getHtmlDocName = function (url) {
        var str = url;
        str = str.substring(str.lastIndexOf("/") + 1);
        str = str.substring(0, str.lastIndexOf("."));
        return str;
    }
    oa.headerHeight = function () {
        var height = $('.page-header').height();
        $('.page-conmmon').css('margin-top', height + 'px');
    }

})();

//时间组件设置
$(function () {
    (function ($) {
        $.fn.datetimepicker.dates['zh-CN'] = {
            days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
            daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
            daysMin: ["日", "一", "二", "三", "四", "五", "六", "日"],
            months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
            today: "今天",
            suffix: [],
            meridiem: ["上午", "下午"]
        };
    }(jQuery));

    //获取当前时间
    function getnowtime() {
        var mydate = new Date();
        var year = mydate.getFullYear();
        var month = mydate.getMonth() + 1;
        var time = year + '-' + month;

        $("#datetimepicker").val(time);
    }

    getnowtime();

    // //时间选择
    $('.form-time').datetimepicker({
        format: 'yyyy-mm-dd',
        minView: "month", //选择日期后，不会再跳转去选择时分秒
        todayBtn: 1,
        autoclose: 1,
        language: 'zh-CN'
    });
    // $('#datetimepicker').datetimepicker({
    //     format: 'yyyy-mm',
    //     weekStart: 1,
    //     autoclose: true,
    //     startView: 3,
    //     minView: 3,
    //     forceParse: false,
    //     language: 'zh-CN',
    //     linkField: "mirror_field"
    // });
    // $('.form-datetime').datetimepicker({
    //     format: 'yyyy-mm-dd hh:ii:00',
    //     showMeridian: true,
    //     autoclose: true,
    //     todayBtn: true,
    //     language: 'zh-CN'
    // });
    // $('.form-time-all').datetimepicker({
    //     format: 'yyyy-mm-dd 00:00:00',
    //     minView: "month", //选择日期后，不会再跳转去选择时分秒
    //     todayBtn: 1,
    //     autoclose: 1,
    //     language: 'zh-CN'
    // });
    $('.form-year').datetimepicker({
        format: 'yyyy',
        todayBtn: 1,
        autoclose: 1,
        startView: 4,
        minView: 4,
        language: 'zh-CN',
    });
    // $('.form-his').datetimepicker({
    //     format: 'hh:ii:00',
    //     weekStart: 1,
    //     todayBtn: 1,
    //     todayHighlight: 1,
    //     startView: 1,
    //     minView: 0,
    //     maxView: 1,
    //     forceParse: 0,
    //     showMeridian: true,
    //     autoclose: true,
    //     language: 'zh-CN'
    // });
});


//成功、失败提示框
function popover(status, msg) {
    var popover = '<div class="popover fade right in" role="tooltip" id="popover984305">' +
        '<div class="arrow"></div><div class="popover-content">' +
        '<i class="icon iconfont ' + status + '"></i><span>' + msg + '</span></div></div>';

    $('.tip-box').append(popover);
};

function changeUrl(a) {
    var url = $(a).attr('href');
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            $('.modal-add .modal-dialog').html('');
            $('.modal-add .modal-dialog').append(data);
        }
    });
}

function changeUrlNew(url) {
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            $('.modal-add .modal-dialog').html('');
            $('.modal-add .modal-dialog').append(data);
        }
    });
}

function changeUrlMin(a) {
    var url = $(a).attr('href');
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            $('.modal-min .modal-dialog').html('');
            $('.modal-min .modal-dialog').append(data);
        }
    });
}

function changeUrlChoice(a, modal) {
    var url = $(a).attr('href');
    $.ajax({
        url: url,
        type: 'get',
        success: function (data) {
            $(modal).find('.modal-dialog').html('');
            $(modal).find('.modal-dialog').append(data);
        }
    });
}

//时间戳转日期，例如：2015-05-01 10:33:21
Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
}

//任意设置时间模式 ie低版本不支持apply、map；
function formatDate(time, format) {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
};
//如：var date = new Date();
//formatDate(date.getTime());//2017-05-12 10:05:44
//formatDate(date.getTime(),'YY年MM月DD日');//2017年05月12日
//formatDate(date.getTime(),'今天是YY/MM/DD hh:mm:ss');//今天是2017/05/12 10:07:45

function getStrTime(timestamp) {
    var date = new Date();
    date.setTime(timestamp);
    var strTime = date.format('yyyy-MM-dd hh:mm:ss')
    return strTime;
}

function getTime(val) {
    var morningStamp = Date.parse(new Date(new Date().setHours(0, 0, 0, 0)));
    var time = {
        beginTime: '',
        endTime: ''
    }
    switch (val) {
        case 0:
            time.beginTime = '2018-01-01 00:00:00';
            time.endTime = getStrTime(Date.parse(new Date()));
            return time;
            break;
        case 1:
            time.beginTime = getStrTime(morningStamp);
            time.endTime = getStrTime(Date.parse(new Date()));
            return time;
            break;
        case 2:
            time.beginTime = getWeekStartAndEnd(0).beginTime;
            time.endTime = getStrTime(Date.parse(new Date()));

            return time;
            break;
        case 3:
            time.beginTime = getWeekStartAndEnd(-1).beginTime;
            time.endTime = getWeekStartAndEnd(-1).endTime;
            return time;
            break;

        case 4:
            time.beginTime = getMonthStartAndEnd(0).beginTime;
            time.endTime = getStrTime(Date.parse(new Date()));
            return time;
            break;

        case 5:
            time.beginTime = getMonthStartAndEnd(-1).beginTime;
            time.endTime = getMonthStartAndEnd(-1).endTime;
            return time;
            break;

        case 6:
            time.beginTime = getMonthStartAndEnd(-3).beginTime;
            time.endTime = getStrTime(Date.parse(new Date()));
            return time;
            break;
        case 7:
            time.beginTime = getMonthStartAndEnd(-6).beginTime;
            time.endTime = getStrTime(Date.parse(new Date()));
            return time;
            break;
        case 8:
            time.beginTime = getMonthStartAndEnd(-11).beginTime;
            time.endTime = getStrTime(Date.parse(new Date()));
            return time;
            break;
    }
}

function getWeekStartAndEnd(AddWeekCount) {
    var millisecond = 24 * 60 * 60 * 1000;
    var currentDate = new Date();
    var currentDate = new Date(currentDate.getTime() + (millisecond * 7 * AddWeekCount));
    var thisWeek = currentDate.getDay();
    var minusDay = thisWeek != 0 ? thisWeek - 1 : 6;
    var currentWeekFirstDay = new Date(new Date(currentDate.getTime() - (millisecond * minusDay)).setHours(0, 0, 0, 0));
    var currentWeekLastDay = new Date(new Date(currentWeekFirstDay.getTime() + (millisecond * 6)).setHours(23, 59, 59, 59));

    beginTime = getStrTime(Date.parse(currentWeekFirstDay));
    endTime = getStrTime(Date.parse(currentWeekLastDay));
    var time = {
        beginTime: beginTime,
        endTime: endTime
    }
    return time;
}

function getMonthStartAndEnd(AddMonthCount) {
    var currentDate = new Date();
    var month = currentDate.getMonth() + AddMonthCount;
    if (month < 0) {
        var n = parseInt((-month) / 12);
        month += n * 12;
        currentDate.setFullYear(currentDate.getFullYear() - n);
    }
    currentDate = new Date(currentDate.setMonth(month));
    var currentMonth = currentDate.getMonth();
    var currentYear = currentDate.getFullYear();
    var currentMonthFirstDay = new Date(currentYear, currentMonth, 1);
    var currentMonthLastDay = new Date(currentYear, currentMonth + 1, 0);
    currentMonthFirstDay = new Date(new Date(currentMonthFirstDay).setHours(0, 0, 0, 0));
    currentMonthLastDay = new Date(new Date(currentMonthLastDay).setHours(23, 59, 59, 59));
    beginTime = getStrTime(Date.parse(currentMonthFirstDay));
    endTime = getStrTime(Date.parse(currentMonthLastDay));
    var time = {
        beginTime: beginTime,
        endTime: endTime
    }
    return time;
}

function IFrameResize() {
    //弹出当前页面的高度
    var obj = parent.document.getElementById('subpage'); //取得父页面IFrame对象
    obj.height = this.document.body.scrollHeight; //调整父页面中IFrame的高度为此页面的高度
}

//iframe子页面刷新
function refresh() {
    window.location.reload();
}


$(function () {
    $(".btn-refresh").click(function () {
        refresh();
    });
});

//模态框请求返回
function postBack(success, strErro, tipSuccess, tipstrErro, modelName, callBack) {
    var icon;
    if (success) {
        icon = 'icon-chenggong1';
        popover(icon, tipSuccess);
        setTimeout(function () {
            $('.popover').remove();
        }, 2000);
        setTimeout(function () {
            $(modelName).modal('hide');
        }, 500);
        callBack();
    } else {
        icon = 'icon-shibai1';
        popover(icon, tipstrErro + strErro);
        setTimeout("$('.popover').remove()", 4000);
    }
}

//防抖动
function debounce(fn, delay) {

    // 定时器，用来 setTimeout
    var timer

    // 返回一个函数，这个函数会在一个时间区间结束后的 delay 毫秒时执行 fn 函数
    return function () {

        // 保存函数调用时的上下文和参数，传递给 fn
        var context = this
        var args = arguments

        // 每次这个返回的函数被调用，就清除定时器，以保证不执行 fn
        clearTimeout(timer)

        // 当返回的函数被最后一次调用后（也就是用户停止了某个连续的操作），
        // 再过 delay 毫秒就执行 fn
        timer = setTimeout(function () {
            fn.apply(context, args)
        }, delay)
    }
}

//中文url处理
function getUrl(url) {
    return decodeURI(encodeURI(encodeURI(url)));
}


//去掉调试打印
avalon.config({debug: false});

(function () {
    window.Common = {};
    Common.getCookie = function (c_name) {
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=")
            if (c_start != -1) {
                c_start = c_start + c_name.length + 1
                c_end = document.cookie.indexOf(";", c_start)
                if (c_end == -1) c_end = document.cookie.length
                return unescape(document.cookie.substring(c_start, c_end))
            }
        }
        return ""
    };
    Common.setCookie = function (c_name, value, expiredays) {
        var exdate = new Date()
        exdate.setDate(exdate.getDate() + expiredays || 24 * 60 * 60 * 1000)
        document.cookie = c_name + "=" + escape(value) +
            ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString()) + ";path=/";
    };
    Common.debounce = function debounce(fn, delay) {
        return function () {
            var context = this,
                args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function () {
                fn.apply(context, args);
            }, delay);
        };
    }

    //防抖动
    Common.throttle = function throttle(fn, threshhold) {

        // 记录上次执行的时间
        var last;
        // 定时器
        var timer;

        // 默认间隔为 250ms
        threshhold || (threshhold = 250);

        // 返回的函数，每过 threshhold 毫秒就执行一次 fn 函数
        return function () {

            // 保存函数调用时的上下文和参数，传递给 fn
            var context = this;
            var args = arguments;

            var now = +new Date();

            // 如果距离上次执行 fn 函数的时间小于 threshhold，那么就放弃
            // 执行 fn，并重新计时
            if (last && now < last + threshhold) {
                clearTimeout(timer);

                // 保证在当前时间区间结束后，再执行一次 fn
                timer = setTimeout(function () {
                    last = now;
                    fn.apply(context, args);
                }, threshhold)

                // 在时间区间的最开始和到达指定间隔的时候执行一次 fn
            } else {
                last = now;
                fn.apply(context, args);
            }
        }
    }

    //除法
    Common.Division = function (arg1, arg2) {
        arg1 = (typeof arg1 == 'string') ? parseFloat(arg1) : arg1;
        arg1 = isNaN(arg1) ? 0 : arg1;

        arg2 = (typeof arg2 == 'string') ? parseFloat(arg2) : arg2;
        arg2 = isNaN(arg2) ? 0 : arg2;
        return parseFloat((arg1 / arg2).toFixed(2));
    }

    //乘法
    Common.Multiplication = function (arg1, arg2) {
        arg1 = (typeof arg1 == 'string') ? parseFloat(arg1) : arg1;
        arg1 = isNaN(arg1) ? 0 : arg1;

        arg2 = (typeof arg2 == 'string') ? parseFloat(arg2) : arg2;
        arg2 = isNaN(arg2) ? 0 : arg2;

        return parseFloat((arg1 * arg2).toFixed(2));
    }
    //加法
    Common.Addition = function (arg1, arg2) {
        arg1 = (typeof arg1 == 'string') ? parseFloat(arg1) : arg1;
        arg1 = isNaN(arg1) ? 0 : arg1;

        arg2 = (typeof arg2 == 'string') ? parseFloat(arg2) : arg2;
        arg2 = isNaN(arg2) ? 0 : arg2;

        return parseFloat((arg1 + arg2).toFixed(2))
    }

    //减法
    Common.Subtraction = function (arg1, arg2) {
        arg1 = (typeof arg1 == 'string') ? parseFloat(arg1) : arg1;
        arg1 = isNaN(arg1) ? 0 : arg1;

        arg2 = (typeof arg2 == 'string') ? parseFloat(arg2) : arg2;
        arg2 = isNaN(arg2) ? 0 : arg2;
        return parseFloat((arg1 - arg2).toFixed(2))
    }
    Common.deepCopy = function (source) {
        var result = {};
        for (var key in source) {
            if (source[key] == null) {
                result[key] = null;
            } else {
                if (source[key] instanceof Date) {
                    result[key] = source[key];
                } else {
                    result[key] = typeof source[key] === 'object' ? Common.deepCopy(source[key]) : source[key];
                }
            }
        }
        return result;
    }
})();
// string的format替换
//  var template1="我是{0}，今年{1}了";
//  var template2="我是{name}，今年{age}了";
//  var result1=template1.format("loogn",22);
//  var result2=template2.format({name:"loogn",age:22});
String.prototype.format = function (args) {
    var result = this;
    if (arguments.length > 0) {
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if (args[key] != undefined) {
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        } else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    //var reg = new RegExp("({[" + i + "]})", "g");//这个在索引大于9时会有问题，谢谢何以笙箫的指出

                    var reg = new RegExp("({)" + i + "(})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};

(function () {
    if (typeof Object.pick != 'function') {
        Object.pick = function (target) {
            if (target == null) {
                target = {};
            }
            // target = Object(target); 这个不知道什么意思,把target转化为一个对象??
            // 上面的写法可能有问题,多次使用target做过滤时,不应在过滤过程中改变target
            target = JSON.parse(JSON.stringify(target));
            for (var index = 1; index < arguments.length; index++) {
                var source = arguments[index];
                if (source != null) {
                    for (var key in source) {
                        if (Object.prototype.hasOwnProperty.call(target, key) && Object.prototype.hasOwnProperty.call(source, key) && source[key] != null) {
                            target[key] = source[key];
                        }
                    }
                }
            }
            return target;
        };
    }
})();

Array.prototype.find = Array.prototype.find ||
    function (fn, context) {
        if (typeof fn === 'function') {
            for (var k = 0, length = this.length; k < length; k++) {
                if (fn.call(context, this[k], k, this)) {
                    return this[k];
                }
            }
        }
        return null;
    };
Array.prototype.findIndex = Array.prototype.findIndex ||
    function (fn, context) {
        if (typeof fn === 'function') {
            for (var k = 0, length = this.length; k < length; k++) {
                if (fn.call(context, this[k], k, this)) {
                    return k;
                }
            }
        }
        return null;
    };

//数组去重复
function isRepeat(newArr) {
    for (var i = 0; i < newArr.length; i++) {
        var targetNode = newArr[i];
        for (var j = 0; j < i; j++) {
            if (targetNode == newArr[j]) {
                newArr.splice(i, 1);
                break;
            }
        }
    }
    return newArr;
}

//只能输入数字格式
function onlyNum(that) {
    that.value = that.value.replace(/\D/g, "");
}

//只能输入中文、字母、数字格式，不能有特殊字符
function onlyOther(that) {
    that.value = that.value.replace(/[^\w\u4E00-\u9FA5]/g, '');
}

//只能输入字母、数字格式
function onlyNumLetter(that) {
    that.value = that.value.replace(/[^\w\.\/]/ig, '');
}

//只能输入正整数
function clearNoNumInt(obj) {
    obj.value = obj.value.replace(/[^\d]/g, ""); //清除"数字"以外的字符
}

//只能输入字母跟空格
function clearNoLetter(obj) {
    obj.value = obj.value.replace(/[^a-z\s?]/ig, "");  //清除"字母跟空格"以外的字符
}

//只能输入汉字
function clearNoChinese(obj) {
    obj.value = obj.value.replace(/[^\u4E00-\u9FA5]/g, "");  //清除"中文汉字"以外的字符
}

//过滤特殊字符
function clearSpecialChar(obj) {
    obj.value = obj.value.replace(/[^[0-9a-zA-Z\-]/g, ""); //清除"字母、数字"以外的字符
}

//身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
function isCardNo(obj, msg) {
    var reg = /(^\d{15}$)|(^\d{17}(\d|X)$)/;
    //如果身份证号码中有字符x则自动转换成X
    obj.value = obj.value.replace("x", "X")
    if (reg.test(obj.value) === false && obj.value != "") {
        //            obj.value = "";
        console.info(msg);
    }
}

//输出字符长度
function len(s) {
    var l = 0;
    var a = s.split("");
    for (var i = 0; i < a.length; i++) {
        if (a[i].charCodeAt(0) < 299) {
            l++;
        } else {
            l += 2;
        }
    }
    return l;
}

//判断登录信息localStorage是否过期
function isOverdue(exp) {
    if (localStorage.getItem('mUserinfo') == null) {
        alert('登录信息已过期，请重新登录！');
        location.href = '/Invite_bids/login.html';
    } else {
        window.mUserInfo = JSON.parse(localStorage.mUserinfo).data;
        console.info(mUserInfo);
        if (new Date().getTime() - mUserInfo.time > exp) {
            localStorage.removeItem('mUserinfo');
            localStorage.removeItem('loginInfo');
            alert('登录信息已过期，请重新登录！');
            location.href = '/Invite_bids/login.html';
        } else {
            parentRefresh(mUserInfo);
        }
    }
}


//父级页面刷新
function parentRefresh(mUserInfo) {
    if (sessionStorage.mUserId) {
        var userId = JSON.parse(sessionStorage.mUserId);
        if (userId != mUserInfo.user.Id) {
            parent.location.reload();
            sessionStorage.mUserId = mUserInfo.user.Id;
        }
    } else {
        location.href = '/Invite_bids/login.html';
    }

}


//获取html文件名
function getHtmlDocName() {
    var str = window.location.href;
    str = str.substring(str.lastIndexOf("/") + 1);
    str = str.substring(0, str.lastIndexOf("."));
    return str;
}

//获取文件名
function getHtmlDocName(url) {
    var arr = url.split('\\');
    return arr[arr.length - 1];
}

//拷贝对象
function copy(obj) {
    var newobj = {};
    for (var attr in obj) {
        newobj[attr] = obj[attr];
    }
    return newobj;
}

//是否为数组
function isArray(obj) {
    return typeof obj == 'object' && obj.constructor == Array
}

//两个数组属性匹配
function matchingProperty(objA, objB) {
    for (var i in objA) {
        objA[i] = objB[i];
    }
    return objA
}

//数字转中文大写
function numberDX(n) {
    var fraction = ['角', '分'];
    var digit = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖'];
    var unit = [['元', '万', '亿'], ['', '拾', '佰', '仟']];
    var head = n < 0 ? '欠' : '';
    n = Math.abs(n);
    var s = '';
    for (var i = 0; i < fraction.length; i++) {
        s += (digit[Math.floor(n * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
    }
    s = s || '整';
    n = Math.floor(n);
    for (var i = 0; i < unit[0].length && n > 0; i++) {
        var p = '';
        for (var j = 0; j < unit[1].length && n > 0; j++) {
            p = digit[n % 10] + unit[1][j] + p;
            n = Math.floor(n / 10);
        }
        s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
    }
    return head + s.replace(/(零.)*零元/, '元').replace(/(零.)+/g, '零').replace(/^整$/, '零元整');
}

//文件下载，通过表单下载
function downloadFile(url) {
    var form = $("<form>");
    form.attr('style', 'display:none');
    form.attr('target', '');
    form.attr('method', 'get');
    form.attr('action', url);
    $("body").append(form);
    form.submit();
}

function getLastDayTime(time) {
    var year = time.slice(0, 4);
    var month = time.slice(5, 7);
    var day = new Date(year, month, 0);
    var lastTime = year + '-' + month + '-' + day.getDate() + ' 23:59:59';
    return lastTime;

}
