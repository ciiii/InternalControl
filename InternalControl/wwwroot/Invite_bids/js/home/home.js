$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    var chartPaper = echarts.init(document.getElementById('myEchart'),'macarons');
    chartPaper.showLoading();
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            req: {
                Index: 1,
                Size: 10,
                OrderType: false
            },
            ScientificResearch: [],
            total: '',
            time: new Date().getFullYear(),
            // userInfo: mUserInfo,
            notice: [],
            reqNotice: {
                Index: 1,
                Size: 5,
                // 人员编号: mUserId,
                OrderType: false
            },
            downFile: [],
            reqdownFile: {
                Index: 1,
                Size: 5,
                是否启用: true,
                OrderType: false
            },
            workFlow: [],
            reqWorkFlow: {
                Index: 1,
                Size: 5,
                OrderType: false
            },
            noticeTotal: '',
            downFileTotal: '',
            WorkFlowTotal: '',
            nothing: false,
            nothing2: false,
            nothing3: false,
            nothing4: false,
            ClickLeft: function () {
                vm.time--;
            },
            ClickRight: function () {
                vm.time++;
            },
            navList: [
                {
                    title: '主办讲座',
                    url: '学术活动/申请学术讲座/主办讲座.html',
                    icon: '活动.png'
                },
                {
                    title: '获奖管理',
                    url: '成果管理/获奖/获奖管理.html',
                    icon: '获奖.png'
                },
                {
                    title: '参会管理',
                    url: '学术活动/参加学术会议/参会信息管理.html',
                    icon: '会议.png'
                },
                {
                    title: '专利管理',
                    url: '成果管理/专利/专利管理.html',
                    icon: '专利.png'
                },
                {
                    title: '横向项目',
                    url: '横向项目/横向项目管理/横向项目列表.html',
                    icon: '项目.png'
                },
                {
                    title: '纵向项目',
                    url: '纵向项目/项目立项/纵向项目立项列表.html',
                    icon: '项目2.png'
                },
                {
                    title: '组织架构',
                    url: '组织架构/部门人员信息维护.html',
                    icon: '医院负责人.png'
                },
                {
                    title: '角色管理',
                    url: '系统管理/权限管理/角色管理.html',
                    icon: '设置.png'
                }
            ],
            newNavList: [],
            onload: function () {
                for (var i = 0; i < vm.navList.length; i++) {
                    vm.match(mUserInfo.权限, vm.newNavList, vm.navList[i]);
                }
            },
            match: function (arrA, arrB, obj) {
                for (var j = 0; j < arrA.length; j++) {
                    var url = arrA[j].菜单;
                    var arr = arrA[j].子级菜单;
                    if (url && url.路径 != '') {
                        if (decodeURI(url.路径) == obj.url) {
                            arrB.push(obj);
                        }
                    }
                    if (arr && arr.length > 0) {
                        vm.match(arr, arrB, obj);
                    }
                }
            },
            query: function () {
                ScientificResearch.getScientificResearchUntreated('get', vm.req.$model, function getScientificResearchUntreatedListener(success, obj, strErro) {
                    if (success) {
                        vm.total = obj.total;
                        if (obj == null || obj.list.length == 0) {
                            $('.regulation .pager').hide();
                            vm.ScientificResearch = [];
                            vm.nothing3 = true;
                            return;
                        } else {
                            obj = obj.list;
                            var number = (vm.req.Index - 1) * vm.req.Size + 1;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].number = number;
                                number++;
                            }
                            vm.ScientificResearch = obj;
                            $('.regulation .pager').show();
                            vm.nothing3 = false;
                        }
                        $('.regulation .pager').mamPager({
                            pageSize: vm.req.Size,                       //页大小
                            pageIndex: vm.req.Index,                     //当前页
                            recordTotal: vm.total,                       //数据总数
                            type: 1,
                            prevText: "&laquo;",                         //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                vm.req.Index = index;
                                vm.nothing3 = false;
                                vm.query();
                            }
                        });
                    } else {
                        console.info('获取科研待办列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getChart: function (data, series) {
                //图表配置
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        top: '20',
                        data: ['数量', '金额']
                    },
                    toolbox: {
                        right: '20',
                        show: true,
                        feature: {
                            mark: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    grid: {
                        top: 60,
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: false,
                            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: '数量',
                            type: 'line',
                            stack: '总量',
                            data: [120, 132, 101, 134, 90, 150, 210, 113, 154, 215, 189, 133]
                        },
                        {
                            name: '金额',
                            type: 'line',
                            stack: '总量',
                            data: [220, 182, 191, 234, 290, 330, 310, 278, 195, 203, 173, 253]
                        },
                    ]
                };
                chartPaper.hideLoading();
                chartPaper.setOption(option);

                //使图表自适应
                window.onresize = function () {
                    chartPaper.resize();
                }
            },
            getUserNoticeList: function () {
                Notice.getUserNoticeList('get', vm.reqNotice.$model, function getUserNoticeListListener(success, obj, strErro) {
                    if (success) {
                        vm.noticeTotal = obj.total;
                        if (obj == null || obj.list.length == 0) {
                            $('.notice .pager').hide();
                            vm.notice = [];
                            vm.nothing = true;
                            return;
                        } else {
                            obj = obj.list;
                            vm.notice = obj;
                            $('.notice .pager').show();
                            vm.nothing = false;
                        }
                        $('.notice .pager').mamPager({
                            pageSize: vm.reqNotice.Size,                       //页大小
                            pageIndex: vm.reqNotice.Index,                     //当前页
                            recordTotal: vm.noticeTotal,                       //数据总数
                            type: 1,
                            prevText: "&laquo;",                         //上一页显示内容
                            nextText: "&raquo;",
                            noData: "暂无数据",
                            pageChange: function (index) {
                                vm.reqNotice.Index = index;
                                vm.nothing = false;
                                vm.getUserNoticeList();
                            }
                        });
                    } else {
                        console.info('获取通知公告列表失败！');
                        console.info(strErro);
                    }
                });
            },
            clickBtnEdit: function (el) {
                vm.editType = true;
                sessionStorage.editInfo = JSON.stringify(el.$model);
                var details = {
                    id: el.项目编号,
                    name: el.发起人姓名,
                    shenHeUrl: el.步骤链接路径,
                    步骤编号: el.步骤编号
                }
                sessionStorage.xueShuDetails = JSON.stringify(details);
            },
            details: function (el) {
                var details = {
                    id: el.项目编号,
                    name: el.发起人姓名,
                    shenHeUrl: el.步骤链接路径,
                    步骤编号: el.步骤编号
                }
                sessionStorage.xueShuDetails = JSON.stringify(details);
                $('.modal-details .detailsPage').attr('src', vm.getUrl(el.流程相关项目路径));
            },
            getStateClass: function (state) {
                switch (state) {
                    case 1:
                        return 'not-received';
                }
            },
            noticeDetails: function (id) {
                sessionStorage.noticeId = JSON.stringify(id);
            },
            downloadDetails: function (el) {
                sessionStorage.downloadDetails = JSON.stringify(el);
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });

        // vm.onload();
        // vm.getUserNoticeList();
        // vm.getEnableDownloadList();
        // vm.query();
        // vm.WorkFlowTotalList();
            vm.getChart();
        avalon.scan(document.body);
    });
    $('.main').mCustomScrollbar({
        theme: 'dark-3',
    });
    $('.form-year').datetimepicker({
        format: 'yyyy',
        todayBtn: 1,
        autoclose: 1,
        startView: 4,
        minView: 4,
        language: 'zh-CN',
    });
    $('.bs-tooltip').tooltip();
});