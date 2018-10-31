$(function () {
    // if (localStorage.getItem('info') != null) {
    //     get('info', 1000 * 60 * 20)//过期时间为20分钟
    // }

    // function get(key, exp) {
    //     var data = localStorage.getItem(key);
    //     var dataObj = JSON.parse(data);
    //     if (new Date().getTime() - dataObj.time < exp) {
    //         location.href = '/Invite_bids/index.html';
    //     } else {
    //         console.log('登录信息已过期');
    //         localStorage.removeItem('info');
    //         sessionStorage.removeItem('userInfo');
    //     }
    // }

    $('input, textarea').placeholder();
    var workNumber, password;

    if (localStorage.loginInfo) {
        var loginInfo = JSON.parse(localStorage.loginInfo);
        $('#workNumber').val(loginInfo.WorkNumber);
        $('#password').val(loginInfo.Password);
        $('.remember').attr('checked', true);
    }

    $(window).keydown(function (evt) {
        evt = window.event || evt;
        if (evt.keyCode == 13) {
            workNumber = $('#workNumber').val();
            password = $('#password').val();
            remember(workNumber, password);
            login(workNumber, password);
        }
    });

    $('.btn-login').on("click", function () {
        workNumber = $('#workNumber').val();
        password = $('#password').val();
        remember(workNumber, password);
        login(workNumber, password);
    });

    $('.remember').on('change', function () {
        if (!this.checked) {
            localStorage.removeItem('loginInfo');
        }
    });

    function remember(workNumber, password) {
        if ($('.remember').is(':checked')) {
            var loginInfo = {
                WorkNumber: workNumber,
                Password: password,
            }
            localStorage.loginInfo = JSON.stringify(loginInfo);
        }
    }

    function login(workNumber, password) {
        if (workNumber == '' || password == '') {
            $(".login-tip").html('帐号/密码不能为空！');
        } else {
            var postData = {
                WorkNumber: workNumber,
                Password: password
            }
            User.userLogin('post', postData, function userLoginListener(success, obj, strErro) {
                var tip;
                $('.login-tip').removeClass('login-tip-success');
                if (success) {
                    var curTime = new Date().getTime();
                    localStorage.setItem('mUserinfo', JSON.stringify({data: obj, time: curTime}));
                    sessionStorage.mUserId = obj.user.Id;
                    tip = '登录成功！';
                    $('.login-tip').addClass('login-tip-success');
                    $('.login-tip').html(tip);
                    location.href = '/Invite_bids/index.html';
                } else {
                    tip = '帐号/密码错误！';
                    console.info(strErro);
                }
                $('.login-tip').html(tip);
                setTimeout(function () {
                    $('.login-tip').html('');
                }, 3000);
            });
        }
    }
});