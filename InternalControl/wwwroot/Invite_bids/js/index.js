$(function () {
    var ParentIndex;
    var TwoIndex;
    avalon.config({debug: false});
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            userInfo: '',
            jurisdiction: '',
            loginUrl: '',
            newUrl: '',
            openIndex: 0,
            childrenOpenIndex: null,
            time: new Date(),
            toggle: false,
            isFlow: false,
            classToggle: 'icon-shouqi',
            home: {
                menu: {
                    Id: 1,
                    ParentId: 0,
                    Name: "首页",
                    ComponentName: 'home/home.html',
                    Type: 0,
                    Sort: 0,
                    Style: 'icon-home.png',
                    Remark: null
                },
                children: [
                    {
                        menu: {
                            Id: 101,
                            ParentId: 100,
                            Name: "任务消息",
                            ComponentName: "home/task_message.html",
                            Type: 1,
                            Sort: 1,
                            Style: null,
                            Remark: null
                        },
                        children: []
                    },
                    {
                        menu: {
                            Id: 102,
                            ParentId: 100,
                            Name: "通知消息",
                            ComponentName: "home/notice_message.html",
                            Type: 1,
                            Sort: 1,
                            Style: null,
                            Remark: null
                        },
                        children: []
                    },
                    {
                        menu: {
                            Id: 103,
                            ParentId: 100,
                            Name: "任务预警",
                            ComponentName: "home/task_warning.html",
                            Type: 1,
                            Sort: 1,
                            Style: null,
                            Remark: null
                        },
                        children: []
                    },
                    {
                        menu: {
                            Id: 104,
                            ParentId: 100,
                            Name: "数据统计",
                            ComponentName: "home/data_statistics.html",
                            Type: 1,
                            Sort: 1,
                            Style: null,
                            Remark: null
                        },
                        children: []
                    },
                ]
            },
            onload: function () {
                if (localStorage.getItem('mUserinfo')) {
                    window.mUserInfo = JSON.parse(localStorage.getItem('mUserinfo')).data;
                    vm.userInfo = mUserInfo.user;
                    vm.jurisdiction = mUserInfo.permission;
                    vm.jurisdiction.unshift(vm.home);
                    console.info(vm.userInfo);
                }
            },
            getClass: function (index) {
                if (index == vm.openIndex) {
                    return 'active'
                }
            },
            getChildrenClass: function (pIndex, index) {
                var index = pIndex + '-' + index;
                if (index == vm.childrenOpenIndex) {
                    return 'active'
                }
            },
            getClassToggle: function (index) {
                if (index == vm.openIndex) {
                    return ''
                } else {
                    return 'icon-xiala'
                }
            },
            ClickHome: function () {

            },
            ClickLiParent: function (index, el) {
                vm.isFlow = false;
                vm.toggle = false;
                ParentIndex = index;
                var li = $('.nav-sidebar .parent-li:eq(' + ParentIndex + ')');
                li.siblings().find('.treeview-menu').slideUp();
                $('.nav-sidebar .parent-li:eq(' + ParentIndex + ')>a').find('.icon-shouqi').toggleClass('icon-xiala');
                li.find('.treeview-menu').slideToggle(500);
                if (vm.openIndex == index) {
                    vm.openIndex = 100;

                } else {
                    vm.openIndex = index;
                }
                var url = el.menu.ComponentName;
                if (url != null && url != '') {
                    $('.subpage #subpage').attr('src', '/Invite_bids/views/' + url);
                    return false;
                }
            },
            ClickLiTwo: function (pIndex, index, aa) {
                vm.isFlow = false;
                vm.toggle = false;
                TwoIndex = index;
                vm.childrenOpenIndex = pIndex + '-' + index;
                var url = aa.menu.ComponentName;
                if (url != null && url != '') {
                    $('.subpage #subpage').attr('src', '/Invite_bids/views/' + url);
                    sessionStorage.mkeyandetails = false;
                    return false;
                }
            },
            hoverLi: function (index, el) {
                if ($('body').hasClass('mini-sidebar')) {
                    ParentIndex = index + 1;
                    var li = $('.nav-sidebar .parent-li:eq(' + ParentIndex + ')');
                    var siblings = li.siblings().removeClass('active');
                    siblings.find('.icon-shouqi').addClass('icon-xiala');
                    li.addClass('active').find('.treeview-menu').slideDown(500);
                    $('.nav-sidebar .parent-li:eq(' + ParentIndex + ')>a').find('.icon-shouqi').toggleClass('icon-xiala');
                    var url = el.nav.url;
                    if (url != null && url != '') {
                        $('.subpage #subpage').attr('src', url);
                        return false;
                    }
                }
            },
            clickBtnEdit: function () {
                $('.subpage #subpage').attr('src', '/Invite_bids/views/system_manage/user_info.html');
            },
            clickPassWord: function () {
                $('.subpage #subpage').attr('src', '/Invite_bids/views/system_manage/edit_password.html');
            },
            clickBtnToggle: function () {
                if (vm.isFlow) {
                    vm.toggle = true;
                } else {
                    vm.toggle = !vm.toggle;
                    if (vm.toggle == true) {
                        $('.parent-li ul').hide();
                    }
                    console.info(vm.toggle);
                }
            },
            getUrl: function (url) {
                return decodeURI(encodeURI(encodeURI(url)));
            },
            logOut: function () {
                localStorage.removeItem('info');
                sessionStorage.removeItem('userInfo');
                location.href = '/Invite_bids/login.html';
            },
            layout: function () {
                var width = $(window).width();
                var height = $(window).height();
                $('#subpage').css('height', height - 85);
                $('.nav-sidebar-box').css('height', height - 80);
                if (width <= 1280) {
                    vm.toggle = true
                    $('.parent-li ul').hide();
                } else {
                    if (vm.isFlow) {
                        vm.toggle = true;
                    } else {
                        vm.toggle = false;
                    }
                }
            }
        });
        vm.onload();
        vm.layout();
        //  菜单默认选中
        vm.$watch('onReady', function () {
            // vm.ClickLiParent(0, vm.jurisdiction[0]);
            // vm.ClickLiTwo(0, vm.jurisdiction[0].list[0]);
        })
        avalon.scan(document.body);
    });

    $(window).resize(function () {
        vm.layout();

    });

    //调用占位符插件
    $('input, textarea').placeholder();


    $('.nav-sidebar-box').mCustomScrollbar({
        theme: 'dark-3'
    });

    //头部导航
    $('.user-info .dropdown-menu a').on('click', function () {
        $('.dropdown-menu li').removeClass('active');
        $(this).parents('li').addClass('active').siblings().removeClass('active');

        var url = $(this).attr('href');
        if (url != 'javascript:;') {
            $('.subpage #subpage').attr('src', url);
            return false;
        }
    });


    $('.dropdown-toggle').dropdown();

    $('body').on('click', function () {
        $('.dropdown-toggle').dropdown();
    });

    $('.bs-tooltip').tooltip();

});