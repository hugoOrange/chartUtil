/*
 * @Author: caihao 
 * @Description: 图表方法抽取
 * @Date: 2019-07-03 17:44:39 
 * @Last Modified by: caihao
 * @Last Modified time: 2019-07-17 09:23:22
 */
define(['echarts', 'jquery'], function(echarts, $) {

    var acceptChartType = [
        "centerBuildState",
        "centerPersonNum",
        "centerAlarm",
        "propertyBuildState",
        "propertyWarehouse",
        "manageBuildState",
        "manageArchives"
    ];

    var chartBase = {
        setChartTitle: function (title) {
            this.chartConfig.title.text = title;
        },

        resize: function () {
            this.chart && this.chart.resize();
        },

        resetChart: function () {
            throw "`resetChart` method is undefined";
        },
        addChart: function () {
            throw "`resetChart` method is undefined";
        },
        setChart: function () {
            throw "`resetChart` method is undefined";
        },
        
        on: function (eventName, eventFn) {
            if (typeof eventFn !== 'function') {
                throw "Argument 'eventFn' need to be a function in `on(" + eventName + ")`";
            }
            
            switch (eventName) {
                case 'legendselectchanged':
                case 'click':
                    this.chart.on(eventName, function(chartEvent) {
                        var selected = chartEvent.selected;
                        eventFn(selected);
                    });
                    break;
                    
                default:
                    throw "Unrecognized event name.";
            }
        },

        off: function (eventName) {
            this.chart.off(eventName);
        },

        destroy: function () {
            this.chart.dispose();
            this.chart.off('click');
            this.chart.off('legendselectchanged');
            // this.chart = null;
        }
    };
   
    var chartExtend = {
        // 办案场所建设情况
        centerBuildState: {
            chart: null,
            chartConfig: {
                title: {
                    show: false,
                    // text: '办案场所建设对比Top10',
                    // x: 'center',
                    // y: 'top',
                    // textAlign: 'center',
                    // textStyle: {
                    //     color: '#5591ED',
                    //     fontSize: 14
                    // }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    left: 30,
                    top: 0,
                    orient: 'vertical',
                    itemHeight: 16,
                    itemWidth: 16,
                    inactiveColor: '#5f6577',
                    data: [{
                        name: '已建设',
                        textStyle: {
                            color: '#5591ED',
                            padding: [36, 0, 36, 0]
                        },
                        icon: 'rect'
                    }, {
                        name: '建设中',
                        textStyle: {
                            color: '#5591ED',
                            padding: [36, 0, 36, 0]
                        },
                        icon: 'rect'
                    }, {
                        name: '未建设',
                        textStyle: {
                            color: '#5591ED',
                            padding: [36, 0, 36, 0]
                        },
                        icon: 'rect'
                    }],
                },
                grid: {
                    left: '200px',
                    right: '50px',
                    bottom: '30px',
                    containLabel: true
                },
                yAxis:  {
                    type: 'value',
                    name: '数量',
                    nameTextStyle: {
                        color: '#5591ED',
                        fontSize: 14,
                        lineHeight: 50
                    },
                    // y轴坐标轴轴线
                    axisLine: {
                        lineStyle:{color:'#07245E'}
                    },
                    // y轴坐标线刻度值
                    axisLabel: {
                        color:'#5591ED',
                        textStyle: {
                            fontSize: 14,
                        }
                    },
                    // y轴坐标先刻度线
                    axisTick:{
                        show: false
                    },
                    // 图表内分隔线颜色
                    splitLine:{
                        lineStyle:{color:'#07245E'}
                    }
                },
                xAxis: {
                    type: 'category',
                    name: '地区',
                    nameTextStyle: {
                        color: '#5591ED',
                        fontSize: 14
                    },
                    axisLine: {
                        lineStyle:{color:'#07245E'}
                    },
                    axisLabel: {
                        color:'#5591ED',
                        interval: 0,
                        rotate: 30,
                        textStyle: {
                            fontSize: 14,
                        }
                    },
                    axisTick:{
                        show: false
                    },
                    splitLine:{
                        lineStyle:{color:'#07245E'}
                    },
                    data: []
                },
                series: [
                    {
                        name: '未建设',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '22%',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 1, color: 'rgba(76, 209, 237, 1)' },
                                        { offset: 0, color: 'rgba(76, 209, 237, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    },
                    {
                        name: '建设中',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '22%',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 1, color: 'rgba(37, 68, 255, 1)' },
                                        { offset: 0, color: 'rgba(37, 68, 255, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    },
                    {
                        name: '已建设',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '22%',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 1, color: 'rgba(85, 54, 223, 1)' },
                                        { offset: 0, color: 'rgba(85, 54, 223, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    }
                ]
            },
            typeArr: [],
            builtArr: [],
            building: [],
            notBuilt: []
        },
        centerBuildStateFn: {
            resetChart: function () {
                this.typeArr  = []
                this.builtArr = [];
                this.building = [];
                this.notBuilt = [];
                this.chartConfig.xAxis.show = true;
                this.chartConfig.yAxis.show = true;
                this.chartConfig.legend.show = true;
            },
            addChart: function (name, built, building, notBuilt, zeroCheck) {
                if (zeroCheck && building === 0 && built === 0 && notBuilt === 0) {
                    return; 
                }
                var typeArr = this.typeArr;
                var typeIndex = typeArr.indexOf(name);
                if (typeIndex < 0) {
                    typeArr.push(name);
                    typeIndex = typeArr.length - 1;
                }
                if (typeof built !== 'undefined') {
                    this.builtArr[typeIndex] = built;
                }
                if (typeof building !== 'undefined') {
                    this.building[typeIndex] = building;
                }
                if (typeof notBuilt !== 'undefined') {
                    this.notBuilt[typeIndex] = notBuilt;
                }
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }
                var chartConfig = this.chartConfig;
                chartConfig.xAxis.data = this.typeArr;
                chartConfig.series[0].data = this.notBuilt;
                chartConfig.series[1].data = this.building;
                chartConfig.series[2].data = this.builtArr;
                if (this.notBuilt.length === 0 && this.building.length === 0 && this.builtArr.length === 0) {
                    chartConfig.xAxis.show = false;
                    chartConfig.yAxis.show = false;
                    chartConfig.legend.show = false;
                }
                chartObj.setOption(chartConfig, true);
                this.chart = chartObj;
            }
        },

        // 办案场所流量TOP10区域
        centerPersonNum: {
            chart: null,
            chartConfig: {
                grid: {
                    show: false,
                    top: 10,
                    bottom: 10
                },
                yAxis: {
                    min: 0,
                    show: false,
                    max: 100,
                },
                xAxis: {
                    min: 0,
                    show: false,
                    max: 100,
                },
                series: []
            },
            SCATTER_MIN_RADIUS: 50,
            SCATTER_MAX_RADIUS: 80,
            /**
             * 关于位置（position）的摆放有几点注意：
             * 1. 坐标的范围- 0 < x < 100, 0 < y < 100
             * 2. 按照顺序，越往前的位置越靠近中心，可以放置的圆越大，应尽量放数字大的
             */
            scatterData: [],
            scatterConfigSet: [
                {
                    color: 'rgba(29, 194, 242',
                    opacity: .8,
                    position: [54, 50]
                }, {
                    color: 'rgba(86, 54, 224',
                    opacity: .8,
                    position: [70, 70]
                }, {
                    color: 'rgba(17, 169, 149',
                    opacity: .8,
                    position: [66, 30]
                }, {
                    color: 'rgba(255, 166, 40',
                    opacity: .8,
                    position: [30, 30]
                }, {
                    color: 'rgba(5, 97, 244',
                    opacity: .8,
                    position: [22, 55]
                }, {
                    color: 'rgba(17, 169, 149',
                    opacity: .8,
                    position: [40, 84]
                }, {
                    color: 'rgba(226, 97, 224',
                    opacity: .8,
                    position: [10, 18]
                }, {
                    color: 'rgba(86, 54, 224',
                    opacity: .8,
                    position: [90, 60]
                }, {
                    color: 'rgba(17, 169, 149',
                    opacity: .8,
                    position: [10, 70]
                }, {
                    color: 'rgba(5, 97, 244',
                    opacity: .8,
                    position: [90, 20]
                }
            ],
        },
        centerPersonNumFn: {
            resetChart: function () {
                this.scatterData = [];
            },
            addChart: function (index, name, count, minCount, maxCount, zeroCheck) {
                if (zeroCheck && count === 0) {
                    return;
                }
                var scatterConfigSet = this.scatterConfigSet;
                if (minCount === maxCount) {
                    var radius = (this.SCATTER_MAX_RADIUS + this.SCATTER_MIN_RADIUS) / 2;
                } else {
                    var radius = count * (this.SCATTER_MAX_RADIUS - this.SCATTER_MIN_RADIUS) / (maxCount - minCount) + this.SCATTER_MIN_RADIUS;
                }
                this.scatterData.push({
                    type: 'scatter',
                    symbol: 'circle',
                    symbolSize: radius,
                    label: {
                        normal: {
                            show: true,
                            formatter: '{b}',
                            color: '#fff',
                            fontSize: 14,
                            textStyle: {
                                fontSize: 14
                            }
                        },
                    },
                    itemStyle: {
                        normal: {
                            borderWidth: '6',
                            borderType: 'solid',
                            borderColor: scatterConfigSet[index].color + ', 0.2)',
                        }
                    },
                    data: [{
                        name: name + '\n' + count,
                        value: scatterConfigSet[index].position,
                        symbolSize: radius,
                        label: {
                            normal: {
                                textStyle: {
                                    fontSize: '14',
                                    color: '#fff',
                                    fontWeight: 900
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: {
                                    type: 'radial',
                                    x: 0,
                                    y: 0,
                                    r: 1,
                                    colorStops: [{
                                        offset: 0,
                                        color: scatterConfigSet[index].color + ', 0.2)' // 0% 处的颜色
                                    }, {
                                        offset: 1,
                                        color: scatterConfigSet[index].color + ', 0.6)', // 100% 处的颜色
                                    }],
                                    global: true // 缺省为 false
                                },
                                opacity: scatterConfigSet[index].opacity
                            }
                        },
                    }]
                });
            },

            setChartRadiusRange: function (min, max) {
                this.SCATTER_MIN_RADIUS = min;
                this.SCATTER_MAX_RADIUS = max;
            },

            setChartPosition: function (configSet) {
                var scatterConfigSet = this.scatterConfigSet;

                for (var i = 0; i < configSet.length; i++) {
                    if (configSet[i].index > 9) {
                        scatterConfigSet[configSet[i].index] = {
                            color: configSet[i].color,
                            opacity: .8,
                            position: configSet[i].position
                        }
                    } else {
                        scatterConfigSet[configSet[i].index].color = configSet[i].color || "rgba(100, 100, 0";
                        scatterConfigSet[configSet[i].index].position = configSet[i].position || [80, 80];
                    }
                }
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }
                this.chartConfig.series = this.scatterData;
                chartObj.setOption(this.chartConfig, true);
                this.chart = chartObj;
            }
        },

        // 办案场所异常行为分析
        centerAlarm: {
            chart: null,
            chartConfig: {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                legend: {
                    right: 0,
                    top: 0,
                    itemHeight: 16,
                    itemWidth: 16,
                    inactiveColor: '#5f6577',
                    data: [{
                        name: '涉案人员告警',
                        textStyle: {
                            color: '#5591ED'
                        },
                        icon: 'rect'
                    }, {
                        name: '民警办案告警',
                        textStyle: {
                            color: '#5591ED'
                        },
                        icon: 'rect'
                    }],
                },
                grid: {
                    left: '10px',
                    right: '50px',
                    bottom: '30px',
                    containLabel: true
                },
                yAxis:  {
                    type: 'value',
                    name: '数量',
                    nameTextStyle: {
                        color: '#5591ED',
                        fontSize: 14,
                        lineHeight: 50
                    },
                    // y轴坐标轴轴线
                    axisLine: {
                        lineStyle:{color:'#07245E'}
                    },
                    // y轴坐标线刻度值
                    axisLabel: {
                        color:'#5591ED',
                        textStyle: {
                            fontSize: 14,
                        }
                    },
                    // y轴坐标先刻度线
                    axisTick:{
                        show: false
                    },
                    // 图表内分隔线颜色
                    splitLine:{
                        lineStyle:{color:'#07245E'}
                    }
                },
                xAxis: {
                    type: 'category',
                    name: '地区',
                    nameTextStyle: {
                        color: '#5591ED',
                        fontSize: 14
                    },
                    axisLine: {
                        lineStyle:{color:'#07245E'}
                    },
                    axisLabel: {
                        color:'#5591ED',
                        interval: 0,
                        rotate: 30,
                        textStyle: {
                            fontSize: 14,
                        }
                    },
                    axisTick:{
                        show: false
                    },
                    splitLine:{
                        lineStyle:{color:'#07245E'}
                    },
                    data: []
                },
                series: [
                    {
                        name: '涉案人员告警',
                        type: 'bar',
                        barWidth: '22%',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 1, color: 'rgba(30, 194, 241, 1)' },
                                        { offset: 0, color: 'rgba(30, 194, 241, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    },
                    {
                        name: '民警办案告警',
                        type: 'bar',
                        barWidth: '22%',
                        label: {
                            show: false
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 1, 0, 0,
                                    [
                                        { offset: 1, color: 'rgba(216, 151, 64, 1)' },
                                        { offset: 0, color: 'rgba(216, 151, 64, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    }
                ]
            },
            typeArr: [],
            personAlarmArr: [],
            policeAlarmArr: [],
        },
        centerAlarmFn: {
            resetChart: function () {
                this.typeArr = [];
                this.personAlarmArr = [];
                this.policeAlarmArr = [];
                this.chartConfig.yAxis.show = true;
                this.chartConfig.xAxis.show = true;
                this.chartConfig.legend.show = true;
            },
            addChart: function (name, personAlarm, policeAlarm, zeroCheck) {
                if (zeroCheck && personAlarm === 0 && policeAlarm === 0) {
                    return;
                }
                var typeArr = this.typeArr;
                var typeIndex = typeArr.indexOf(name);
                if (typeIndex < 0) {
                    typeArr.push(name);
                    typeIndex = typeArr.length - 1;
                }
                if (typeof personAlarm !== 'undefined') {
                    this.personAlarmArr[typeIndex] = personAlarm;
                }
                if (typeof policeAlarm !== 'undefined') {
                    this.policeAlarmArr[typeIndex] = policeAlarm;
                }
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }
                var chartConfig = this.chartConfig;
                var chartConfig = this.chartConfig;

                var chartConfig = this.chartConfig;
                chartConfig.xAxis.data = this.typeArr;
                chartConfig.series[0].data = this.personAlarmArr;
                chartConfig.series[1].data = this.policeAlarmArr;
                if (this.personAlarmArr.length === 0 && this.policeAlarmArr.length === 0) {
                    chartConfig.yAxis.show = false;
                    chartConfig.xAxis.show = false;
                    chartConfig.legend.show = false;
                }
                chartObj.setOption(this.chartConfig, true);
                this.chart = chartObj;
            }
        },

        // 物管场所建设TOP5区域
        propertyBuildState: {
            chart: null,
            charBarColorSet: [
                'rgba(30, 194, 241',
                'rgba(86, 52, 224',
                'rgba(86, 52, 224',
                'rgba(5, 96, 244',
                'rgba(14, 132, 125'
            ],
            chartConfig: {
                tooltip: {
                    trigger: 'axis',
                },
                grid: {
                    left: '20px',
                    top: '30px',
                    right: '20px',
                    bottom: '20px',
                    containLabel: true
                },
                xAxis: {
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#07245e',
                        }
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 30,
                        textStyle: {
                            color: '#5591ed',
                            fontSize: 14
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#07245e'
                        }
                    },
                    data: [],
                },
                yAxis: {
                    // y轴坐标轴轴线
                    axisLine: {
                        lineStyle:{
                            color:'#07245E'
                        }
                    },
                    // y轴坐标线刻度值
                    axisLabel: {
                        color:'#5591ED',
                        textStyle: {
                            fontSize: 14,
                        }
                    },
                    // y轴坐标先刻度线
                    axisTick:{
                        show: false
                    },
                    // 图表内分隔线颜色
                    splitLine:{
                        lineStyle:{color:'#07245E'}
                    }
                },
                series: [{
                    name: '',
                    type: 'pictorialBar',
                    barCategoryGap: '0%',
                    symbol: 'path://M10 0 L0 10 L20 10 Z',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: function (params) {
                                var charBarColorSet = [
                                    'rgba(30, 194, 241',
                                    'rgba(86, 52, 224',
                                    'rgba(86, 52, 224',
                                    'rgba(5, 96, 244',
                                    'rgba(14, 132, 125'
                                ];
                                var rowColor = charBarColorSet[params.dataIndex];
                                // var rowColor = propertyBuildState.charBarColorSet[params.dataIndex];
                                return new echarts.graphic.LinearGradient(0, 0, 0, 1,
                                    [{
                                        offset: 0,
                                        color: rowColor + ', 1)'
                                    }, {
                                        offset: 1,
                                        color: rowColor + ', 0.4)'
                                    }],
                                    false);
                            }
                        }
                    },
                    data: [],
                    z: 10
                }]
            },
            typeArr: [],
            numArr: []
        },
        propertyBuildStateFn: {
            resetChart: function () {
                this.typeArr = [];
                this.numArr = [];
                this.chartConfig.xAxis.show = true;
                this.chartConfig.yAxis.show = true;
            },
            addChart: function (name, num, zeroCheck) {
                if (zeroCheck && num === 0) {
                    return;
                }
                var typeArr = this.typeArr;
                var typeIndex = typeArr.indexOf(name);
                if (typeIndex < 0) {
                    typeArr.push(name);
                    typeIndex = typeArr.length - 1;
                }
                this.numArr[typeIndex] = num;
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }

                var chartConfig = this.chartConfig;
                chartConfig.xAxis.data = this.typeArr;
                chartConfig.series[0].data = this.numArr;
                if (this.typeArr.length === 0 && this.numArr.length === 0) {
                    chartConfig.xAxis.show = false;
                    chartConfig.yAxis.show = false;
                }
                chartObj.setOption(chartConfig, true);
                this.chart = chartObj;
            }
        },

        // 物管库存TOP5场所
        propertyWarehouse: {
            chart: null,
            chartConfig: {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: '30px',
                    left: '20px',
                    right: '60px',
                    bottom: '20px',
                    containLabel: true
                },
                legend: {
                    right: 0,
                    itemHeight: 16,
                    itemWidth: 16,
                    inactiveColor: '#5f6577',
                    data: [{
                        name: '在库数',
                        textStyle: {
                            fontSize: 16,
                            color: '#5591ED'
                        },
                        icon: 'rect'
                    }, {
                        name: '借调数',
                        textStyle: {
                            fontSize: 16,
                            color: '#5591ED'
                        },
                        icon: 'rect'
                    }, {
                        name: '处置数',
                        textStyle: {
                            fontSize: 16,
                            color: '#5591ED'
                        },
                        icon: 'rect'
                    }]
                },
                xAxis: {
                    type: 'value',
                    name: '数量',
                    nameTextStyle: {
                        color: '#5591ED',
                        fontSize: 14
                    },
                    axisTick: {
                        show: false
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#07245e',
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#5591ed',
                            fontSize: 14
                        },
                    },
                    splitLine: {
                        lineStyle: {
                            color: '#07245e'
                        }
                    },
                },
                yAxis: {
                    type: 'category',
                    // y轴坐标轴轴线
                    axisLine: {
                        lineStyle:{
                            color:'#07245E'
                        }
                    },
                    // y轴坐标线刻度值
                    axisLabel: {
                        color:'#5591ED',
                        textStyle: {
                            fontSize: 14,
                        }
                    },
                    // y轴坐标先刻度线
                    axisTick:{
                        show: false
                    },
                    // 图表内分隔线颜色
                    splitLine:{
                        lineStyle:{color:'#07245E'}
                    },
                    data: []
                },
                series: [
                    {
                        name: '在库数',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '40%',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        { offset: 1, color: 'rgba(76, 209, 237, 1)' },
                                        { offset: 0, color: 'rgba(76, 209, 237, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    },
                    {
                        name: '借调数',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '40%',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        { offset: 1, color: 'rgba(201, 134, 43, 1)' },
                                        { offset: 0, color: 'rgba(201, 134, 43, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    },
                    {
                        name: '处置数',
                        type: 'bar',
                        stack: '总量',
                        barWidth: '40%',
                        label: {
                            show: false,
                        },
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(
                                    0, 0, 1, 0,
                                    [
                                        { offset: 1, color: 'rgba(17, 169, 149, 1)' },
                                        { offset: 0, color: 'rgba(17, 169, 149, 0.4)' }
                                    ]
                                )
                            }
                        },
                        data: []
                    }
                ]
            },
            placeArr: [],
            storageArr: [],
            requestArr: [],
            disposeArr: []
        },
        propertyWarehouseFn: {
            resetChart: function () {
                this.storageArr = [];
                this.requestArr = [];
                this.disposeArr = [];
                this.chartConfig.yAxis.show = true;
                this.chartConfig.xAxis.show = true;
                this.chartConfig.legend.show = true;
            },
            addChart: function (name, storageCount, requestCount, disposeCount, zeroCheck) {
                if (zeroCheck && storageCount === 0 && requestCount === 0 && disposeCount === 0) {
                    return;
                }
                var typeIndex = this.placeArr.indexOf(name);
                if (typeIndex < 0) {
                    this.placeArr.push(name);
                    typeIndex = this.placeArr.length - 1;
                }
                
                this.storageArr[typeIndex] = storageCount;
                this.requestArr[typeIndex] = requestCount;
                this.disposeArr[typeIndex] = disposeCount;
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }
                var chartConfig = this.chartConfig;
                var chartConfig = this.chartConfig;

                var chartConfig = this.chartConfig;
                chartConfig.yAxis.data = this.placeArr;
                chartConfig.series[0].data = this.storageArr;
                chartConfig.series[1].data = this.requestArr;
                chartConfig.series[2].data = this.disposeArr;
                if (this.storageArr.length === 0 && this.requestArr.length === 0 && this.disposeArr.length === 0) {
                    chartConfig.yAxis.show = false;
                    chartConfig.xAxis.show = false;
                    chartConfig.legend.show = false;
                }
                chartObj.setOption(chartConfig, true);
                this.chart = chartObj;
            }
        },

        // 案管场所TOP5区域
        manageBuildState: {
            chart: null,
            chartConfig: {
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    },
                    // 使用了多个yAxis，所以要特定指定tooltip
                    formatter: "{b0}: {c0}"
                },
                grid: {
                    top: '10px',
                    left: '20px',
                    right: '10px',
                    bottom: '0px',
                    containLabel: true
                },
                xAxis: {
                    type: 'value',
                    show: false
                },
                yAxis: [{
                    type: 'category',
                    // y轴坐标轴轴线
                    axisLine: {
                        show: false
                    },
                    // y轴坐标线刻度值
                    axisLabel: {
                        color:'#5591ED',
                        textStyle: {
                            fontSize: 16,
                        }
                    },
                    // y轴坐标刻度线
                    axisTick:{
                        show: false
                    },
                    // 图表内分隔线颜色
                    splitLine:{
                        show: false
                    },
                    splitArea: {
                        areaStyle: {
                            color: ["#07245E"]
                        }
                    },
                    data: []
                }, {
                    // 右侧数值
                    type: 'category',
                    axisLine: {
                        show: false
                    },
                    axisLabel: {
                        color:'#5591ED',
                        textStyle: {
                            fontSize: 16,
                        }
                    },
                    axisTick:{
                        show: false
                    },
                    splitLine:{
                        show: false
                    },
                    formatter: function () {
                        return '{b}';
                    },
                    data: []
                }],
                series: [{
                    type: 'bar',
                    barWidth: '40%',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 1, 0,
                                [
                                    { offset: 1, color: 'rgba(6, 176, 156, 1)' },
                                    { offset: 0, color: 'rgba(6, 176, 156, 0.4)' }
                                ]
                            )
                        }
                    },
                    z: 10,
                    data: []
                }, {
                    // 右侧阴影填充
                    type: 'bar',
                    barWidth: '40%',
                    barGap: '-100%',
                    label: {
                        show: false
                    },
                    itemStyle: {
                        normal: {
                            color: '#07245E'
                        }
                    },
                    z: 5,
                    data: []
                }]
            },
            typeArr: [],
            numArr: [],
            maxNumArr: []
        },
        manageBuildStateFn: {
            resetChart: function () {
                this.typeArr = [];
                this.numArr = [];
                this.maxNumArr = [];
                this.chartConfig.yAxis.show = true;
            },
            addChart: function (name, num, maxNum, zeroCheck) {
                if (zeroCheck && num === 0) {
                    return;
                }
                var typeIndex = this.typeArr.indexOf(name);
                if (typeIndex < 0) {
                    this.typeArr.push(name);
                    typeIndex = this.typeArr.length - 1;
                }
                if (typeof maxNum !== 'undefined') {
                    var maxNumArr = [];
                    for (var i = 0; i < this.typeArr.length; i++) {
                        maxNumArr.push(maxNum);
                    }
                    this.maxNumArr = maxNumArr;
                }

                this.numArr[typeIndex] = num;
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }
                var chartConfig = this.chartConfig;
                chartConfig.yAxis[0].data = this.typeArr;
                chartConfig.yAxis[1].data = this.numArr;
                chartConfig.series[0].data = this.numArr;
                chartConfig.series[1].data = this.maxNumArr;
                chartConfig.series[1].show = this.maxNumArr.length !== 0;
                if (this.typeArr.length === 0) {
                    chartConfig.yAxis.show = false;
                }
                chartObj.setOption(chartConfig, true);
                this.chart = chartObj;
            }
        },

        // 执法卷宗管理
        manageArchives: {
            chart: null,
            chartPieColorSet: [
                'rgba(29, 194, 242',
                'rgba(253, 178, 48',
                'rgba(86, 54, 224',
                'rgba(37, 68, 255'
            ],
            chartConfig: {
                title: {
                    text: '',
                    left: 'center',
                    top: 'center',
                    textStyle: {
                        color: '#ffffff'
                    },
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'',
                        type:'pie',
                        radius: ['40%', '70%'],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: true,
                                color: '#487CFF',
                                position: 'outside',
                                formatter: '{b}:{c}',
                                align: 'center',
                                fontSize: 14
                            }
                        },
                        labelLine: {
                            normal: {
                                show: true,
                                lineStyle: {
                                    color: '#487CFF'
                                }
                            }
                        },
                        data:[]
                    }
                ]
            },
            seriesData: [],
            typeArr: []
        },
        manageArchivesFn: {
            resetChart: function () {
                this.seriesData = [];
                this.typeArr = [];
                this.chartConfig.series[0].name = "";
                this.chartConfig.title.text = "";
            },
            addChart: function (name, count, zeroCheck) {
                if (zeroCheck && count === 0) {
                    return;
                }
                var typeIndex = this.typeArr.indexOf(name);
                if (typeIndex < 0) {
                    this.typeArr.push(name);
                    typeIndex = this.typeArr.length - 1;
                }
                var rowColor = this.chartPieColorSet[typeIndex];
                if (count != 0) {
                    this.chartConfig.series[0].name = "纸质卷宗状态";
                    this.chartConfig.title.text = "纸质卷宗状态";
                }
                this.seriesData[typeIndex] = {
                    value: count,
                    name: name,
                    itemStyle: {
                        normal: {
                            color: {
                                type: 'radial',
                                x: 1,
                                y: 0,
                                r: 2,
                                colorStops: [{
                                    offset: 0,
                                    color: rowColor + ', 0.4)'
                                }, {
                                    offset: 1,
                                    color: rowColor + ', 1)'
                                }],
                                global: false
                            }
                        }
                    }
                };
            },

            setChart: function (id) {
                if (this.chart === null) {
                    var chartObj = echarts.init(document.getElementById(id));
                } else {
                    var chartObj = this.chart;
                }
                var chartConfig = this.chartConfig;
                chartConfig.series[0].data = this.seriesData;
                chartObj.setOption(chartConfig, true);
                this.chart = chartObj;
            }
        }
    };

    // 测试
    chartExtend.centerBuildStateFn.test = function () {
        this.resetChart();
        this.addChart('深圳市', 220, 120, 320);
        this.addChart('广州市', 182, 132, 302);
        this.addChart('佛山市', 191, 101, 301);
        this.addChart('河源市', 234, 134, 334);
        this.addChart('肇庆市', 290, 90, 390);
        this.setChart("center_build_chart");
    };
    chartExtend.centerPersonNumFn.test = function () {
        this.resetChart();
        var data = [{
            name: "广州市",
            count: 365
        }, {
            name: "深圳市",
            count: 289
        }, {
            name: "惠州市",
            count: 138
        }, {
            name: "佛山市",
            count: 130
        }, {
            name: "东莞市",
            count: 112
        }, {
            name: "河源市",
            count: 100
        // }, {
        //     name: "珠海市",
        //     count: 96
        // }, {
        //     name: "中山市",
        //     count: 88
        // }, {
        //     name: "汕头市",
        //     count: 75
        // }, {
        //     name: "湛江市",
        //     count: 70
        }];
        var max = data[0].count;
        var min = data[data.length - 1].count;
        for (var i = 0; i < data.length; i++) {
            this.addChart(i, data[i].name, data[i].count, min, max);
        }
        this.setChartPosition([{
            index: 3,
            color: 'rgba(100, 100, 0',
            position: [40, 18]
        }, {
            index: 7,
            position: [80, 80]
        }, {
            index: 9,
            color: 'rgba(100, 100, 0',
        }]);
        this.setChart("person_num_chart");
    };
    chartExtend.centerAlarmFn.test = function () {
        this.resetChart();
        this.addChart('深圳市', 50, 74);
        this.addChart('广州市', 37, 83);
        this.addChart('佛山市', 36, 56);
        this.addChart('河源市', 24, 50);
        this.addChart('肇庆市', 38, 48);
        this.setChart("alarm_chart");
    };
    chartExtend.propertyBuildStateFn.test = function () {
        this.resetChart();
        this.addChart("深圳市", 79);
        this.addChart("广州市", 68);
        this.addChart("佛山市", 66);
        this.addChart("惠州市", 58);
        this.addChart("韶关市", 47);
        this.setChart("property_build_chart");
    };
    chartExtend.propertyWarehouseFn.test = function () {
        this.resetChart();
        this.addChart("物管场所01", 3, 5, 6);
        this.addChart("物管场所02", 5, 3, 2);
        this.addChart("物管场所03", 2, 2, 9);
        this.addChart("物管场所04", 10, 1, 1);
        this.addChart("物管场所05", 5, 2, 3);
        this.setChart("warehouse_chart");
    };
    chartExtend.manageBuildStateFn.test = function () {
        this.resetChart();
        this.addChart("广州市", 35, 40);
        this.addChart("深圳市", 32, 40);
        this.addChart("佛山市", 31, 40);
        this.addChart("河源市", 27, 40);
        this.addChart("肇庆市", 22, 40);
        this.setChart("manage_build_chart");
    };
    chartExtend.manageArchivesFn.test = function () {
        this.resetChart();
        this.addChart("刑事已破", 335);
        this.addChart("刑事未破", 310);
        this.addChart("行政已破", 234);
        this.addChart("行政未破", 303);
        this.setChart("archives_chart");
    };

    for (var i = 0; i < acceptChartType.length; i++) {
        var baseObjectFn = chartExtend[acceptChartType[i] + "Fn"];
        baseObjectFn.__proto__ = chartBase;
    }

    return function factoryFn(type) {
        if (acceptChartType.indexOf(type) < 0) {
            throw "Unsupported chart type in chart.js";
        }
 
        var retObj = {};
        $.extend(true, retObj, chartExtend[type]);
        retObj.__proto__ = chartExtend[type + "Fn"];

        return retObj;
    };
});