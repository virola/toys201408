
define(function (require) {

    var exports = $({});

    var cacheOptions;

    exports.init = function (domId, params) {
        cacheOptions = $.extend({}, params);
        cacheOptions.domId = domId;

        if (params.url) {

            ajax.get(params.url, {
                communityId: params.zoneId
            }, function (data) {
                render(data);
            }, function (resp) {
                render([]);
            });
        }
        
    };

    function render(data) {

        require(['echarts', 'echarts/chart/bar', 'echarts/chart/line'], function (ec) {

            var myChart = ec.init(document.getElementById(cacheOptions.domId));
            myChart.setOption(getOptionsBy(data));
            exports.trigger('ready', myChart); 
        });
    }

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
        xAxis : [],
        yAxis : [
            {
                type : 'value',
                name : '挂牌均价',
                boundaryGap: [0, 0.1]
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
                data: []
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
                data: []
            }
        ]
    };

    function getOptionsBy(datasource) {
        var xData = {
            type : 'category',
            data : []
        };

        var yData = {
            0: [],
            1: []
        };

        $.each(datasource, function (i, item) {
            xData.data[i] = item.time;
            yData[0][i] = item['new'];
            yData[1][i] = item['avePrice'];
        });

        var data = $.extend({}, defaultOptions);
        data.xAxis = xData;
        data.series[0].data = yData[0];
        data.series[1].data = yData[1];

        return data;
    }

    return exports;
});