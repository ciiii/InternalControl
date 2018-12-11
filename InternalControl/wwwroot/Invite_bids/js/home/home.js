$(function () {
    isOverdue(1000 * 60 * 60 * 3);
    var chartPaper = echarts.init(document.getElementById('myEchart'), 'macarons');
    chartPaper.showLoading();
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            time: new Date().getFullYear(),
            req: {
                Index: 1,
                Size: 5,
                OrderType: false
            },
            TaskMessage: [],
            nocticeId: '',
            mUserInfo: mUserInfo,
            myDetails: {},
            NoticeList: [],
            reqTaskWarningt: {
                Index: 1,
                Size: 5,
                OrderType: true
            },
            TaskWarning: [],
            nothing: false,
            nothing2: false,
            nothing3: false,
            thisYearEndDatetime: '',
            thisYear: new Date().getFullYear(),
            ClickLeft: function () {
                vm.time--;
            },
            ClickRight: function () {
                vm.time++;
            },
            getTaskMessage: function () {
                Notice.GetPagingProjectBacklog('get', vm.req.$model, function GetPagingProjectBacklogListener(success, obj, strErro) {
                    if (success) {
                        if (obj == null || obj.List.length == 0) {
                            vm.TaskMessage = [];
                            vm.nothing = true;
                            return;
                        } else {
                            obj = obj.List;
                            vm.TaskMessage = obj;
                            vm.nothing = false;
                        }
                    } else {
                        console.info('获取任务消息列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getNoticeList: function () {
                Notice.GetPagingNotcieForViewList('get', vm.req.$model, function GetPagingNotcieForViewListListener(success, obj, strErro) {
                    if (success) {
                        if (obj == null || obj.List.length == 0) {
                            vm.NoticeList = [];
                            vm.nothing2 = true;
                            return;
                        } else {
                            obj = obj.List;
                            for (var i = 0; i < obj.length; i++) {
                                if (obj[i].Type == '规章制度') {
                                    obj.splice(i, 1);
                                }
                            }
                            vm.NoticeList = obj;
                            vm.nothing2 = false;
                        }
                    } else {
                        console.info('获取通知消息列表失败！');
                        console.info(strErro);
                    }
                });
            },
            getTaskWarning: function () {
                Notice.GetPagingExecuteProjectWarning('get', vm.reqTaskWarningt.$model, function GetPagingExecuteProjectWarningListener(success, obj, strErro) {
                    if (success) {
                        if (obj == null || obj.List.length == 0) {
                            vm.TaskWarning = [];
                            vm.nothing3 = true;
                            return;
                        } else {
                            obj = obj.List;
                            for (var i = 0; i < obj.length; i++) {
                                obj[i].day = '还剩' + obj[i].DayDiffOfEarlyWarning + '天';
                                if (obj[i].DayDiffOfEarlyWarning == 0) {
                                    obj[i].day = '今天'
                                }
                                if (obj[i].DayDiffOfEarlyWarning < 0) {
                                    obj[i].day = '已过期'
                                }
                            }
                            vm.TaskWarning = obj;
                            vm.nothing3 = false;
                            $('.bs-tooltip').tooltip();
                        }
                    } else {
                        console.info('获取任务预警失败！');
                        console.info(strErro);
                    }
                });
            },
            getDepartmentsSetting: function () {
                Department.GetRelevantDepartmentsSetting('get', vm.mUserInfo.user.DepartmentId, function GetRelevantDepartmentsSettingListener(success, obj, strErro) {
                    if (success) {
                        if (obj && obj.SupplementEndDatetime && obj.SupplementEndDatetime != '') {
                            vm.thisYearEndDatetime = obj.SupplementEndDatetime;
                        } else {
                            vm.thisYearEndDatetime = '无';
                        }

                    } else {
                        alert('获取某个归口部门的时间设置失败！');
                        console.info(strErro);
                    }
                });
            },
            clickDetails: function (el) {
                vm.nocticeId = el.Id;
                vm.myDetails = el.$model;
            },
            clickNotiveDetails: function (el) {
                vm.nocticeId = el.Id;
                vm.myDetails = el.$model;
                if (!el.IsReceived) {
                    el.IsReceived = true;
                }
            },
            getStateClass: function (State) {
                if (!State) {
                    return 'not-received'
                }
            },
            getClass: function (el) {
                if (el.DayDiffOfEarlyWarning < 3) {
                    return 'state-over'
                }
                if (el.DayDiffOfEarlyWarning >= 3 && el.DayDiffOfEarlyWarning < 6) {
                    return 'state-auditing'
                }
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
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },
        });
        vm.getNoticeList();
        vm.getTaskMessage();
        vm.getTaskWarning();
        vm.getDepartmentsSetting();
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