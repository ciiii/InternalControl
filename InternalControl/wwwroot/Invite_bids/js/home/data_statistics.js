$(function () {
    isOverdue(1000 * 60 * 60 * 24);
    var chartOone = echarts.init(document.getElementById('chartOone'), 'macarons');
    var chartTwo = echarts.init(document.getElementById('chartTwo'), 'macarons');
    var chartThree = echarts.init(document.getElementById('chartThree'), 'macarons');
    var chartFour = echarts.init(document.getElementById('chartFour'), 'macarons');
    var chartFive = echarts.init(document.getElementById('chartFive'), 'macarons');
    chartOone.showLoading();
    chartTwo.showLoading();
    chartThree.showLoading();
    chartFour.showLoading();
    chartFive.showLoading();
    window.vm = null;
    avalon.ready(function () {
        window.vm = avalon.define({
            $id: 'root',
            getChartOne: function (data, series) {
                //图表配置
                var option = {
                    tooltip: {
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['已通过金额', '未通过金额']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '项目论证',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                                emphasis: {
                                    show: true,
                                    textStyle: {
                                        fontSize: '14',
                                        fontWeight: 'bold'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 3035, name: '已通过金额'},
                                {value: 1510, name: '未通过金额'},
                            ]
                        }
                    ]
                };
                chartOone.hideLoading();
                chartOone.setOption(option);
            },
            getChartTwo: function (data, series) {
                //图表配置
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['金额', '数量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    grid: {
                        top: '20%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'value',
                            name: '金额（ 万元）',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '数量（个）',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'category',
                            data: ['自主采购', '自主招标', '政府采购中心', '社会代理机构', '网上竞价', '商城直购']
                        }
                    ],
                    series: [
                        {
                            name: '金额',
                            type: 'bar',
                            barWidth: '30%',
                            data: [200, 500, 700, 300, 500, 200],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },

                        },
                        {
                            name: '数量',
                            type: 'bar',
                            barWidth: '30%',
                            data: [147, 59, 115, 253, 127, 322],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },

                        }
                    ]
                };
                chartTwo.hideLoading();
                chartTwo.setOption(option);
            },
            getChartThree: function (data, series) {
                //图表配置
                var option = {
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['金额', '数量']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    grid: {
                        top: '20%',
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    calculable: true,
                    xAxis: [
                        {
                            type: 'category',
                            data: ['公开招标', '单一来源', '询价采购', '竞争性磋商', '竞争性谈判', '邀请招标', '其他']
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '金额（ 万元）',
                            axisLabel: {
                                formatter: '{value}'
                            }
                        },
                        {
                            type: 'value',
                            name: '数量（个）',
                            axisLabel: {
                                formatter: '{value} '
                            }
                        }
                    ],
                    series: [
                        {
                            name: '金额',
                            type: 'bar',
                            barWidth: '30%',
                            data: [200, 500, 700, 300, 500, 200,300],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },

                        },
                        {
                            name: '数量',
                            type: 'bar',
                            barWidth: '30%',
                            data: [147, 59, 115, 253, 127, 322,251],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },

                        }
                    ]
                };
                chartThree.hideLoading();
                chartThree.setOption(option);
            },
            getChartFour: function (data, series) {
                //图表配置
                var option = {
                    title: {
                        text: '60%',
                        x: 'center',
                        y: 'center',
                        textStyle: {
                            fontSize: '30'
                        },
                    },
                    tooltip: {
                        show: false,
                        trigger: 'item',
                        formatter: '{a} <br/>{b}: {c} ({d}%)',
                    },
                    legend: {
                        orient: 'vertical',
                        x: 'left',
                        data: ['资金节约率']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '资金节约率',
                            type: 'pie',
                            radius: ['50%', '70%'],
                            avoidLabelOverlap: false,
                            hoverAnimation: true,
                            label: {
                                normal: {
                                    show: false,
                                    position: 'center'
                                },
                            },
                            labelLine: {
                                normal: {
                                    show: false
                                }
                            },
                            data: [
                                {value: 60, name: '资金节约率'},
                            ]
                        }
                    ]
                };
                chartFour.hideLoading();
                chartFour.setOption(option);
            },
            getChartFive: function (data, series) {
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
                chartFive.hideLoading();
                chartFive.setOption(option);
            },
            clickBtnReturn: function () {
                $('.modal').modal('hide');
            },

        });
        //使图表自适应
        window.onresize = function () {
            chartOone.resize();
            chartTwo.resize();
            chartThree.resize();
            chartFour.resize();
            chartFive.resize();
        }
        vm.getChartOne();
        vm.getChartTwo();
        vm.getChartThree();
        vm.getChartFour();
        vm.getChartFive();
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