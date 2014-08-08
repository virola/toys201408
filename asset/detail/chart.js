
define(function (require) {

    var exports = $({});

    exports.init = function (domId, data) {
        require(['echarts', 'echarts/chart/bar', 'echarts/chart/line'], function (ec) {

            var myChart = ec.init(document.getElementById(domId));

            myChart.setOption(getOptionsBy(data));

            exports.trigger('ready', myChart); 
        });
    };

    var defaultOptions = {
        tooltip : {
            trigger: 'axis',
            formatter: function (params, ticket, callback) {
                var res = params[0][1];
                res += '<br>' + params[0][0] + ' : ' + params[0][2] + ' 套';
                res += '<br>' + params[1][0] + ' : ' + params[1][2] + ' 元/㎡';
                
                return res;
            }
        },
        toolbox: {
            show : false
        },
        calculable : false,
        grid: {
            x: 80,
            x2: 10,
            y: 30,
            y2: 30
        },
        // legend: {
        //     data: ['挂牌套数', '挂牌均价']
        // },
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value',
                name : '挂牌均价',
                boundaryGap: [0, 0.1]
                // ,
                // max: 50000   // 考虑通过计算的方式获取最大值
            },
            {
                type : 'value',
                name : '',
                boundaryGap: [0, 0.2],
                axisLabel : {
                    formatter: ' '
                }
            }
        ],
        series : [
            {
                name:'挂牌套数',
                type: 'bar',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#e6e6e6',
                        label : {
                            show: true,
                            textStyle: {
                                fontSize: '14',
                                color: '#babdc1',
                                fontFamily : '微软雅黑'
                            },
                            formatter: '{c} 套'
                        }
                    },
                    emphasis : {
                        color: '#babdc1'
                    }
                },
                data: [20, 49, 70, 232, 256, 767, 356, 622, 326, 200, 64, 33]
            },
            {
                name: '挂牌均价',
                type: 'line',
                symbol: 'emptyCircle',
                symbolSize: 5,
                itemStyle: {
                    normal: {
                        color: '#16449d',
                        lineStyle: {
                            width: 3
                        }
                    }
                },
                data: [20030, 20032, 19033, 18035, 20033, 18032, 20033, 23034, 23030, 20035, 19030, 18032]
            }
        ]
    };

    function getOptionsBy(datasource) {

        return defaultOptions;
    }

    return exports;
});