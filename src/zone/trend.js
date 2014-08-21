
define(function (require) {

    var trend = $({});

    var chart = require('../detail/chart');

    var cacheOptions;
    var cacheData = [];
    var MAX_MONTH = 6;

    var _tplState = {
        up: '<span class="state-up">上涨 #{0}%</span>',
        down: '<span class="state-down">下跌 #{0}%</span>',
        normal: '<span class="state-normal">持平</span>'
    };

    var _tplTrend = ''
        + '<li class="data-col first">'
        +     '<dl class="trend-new first">'
        +         '<dt>当月新增</dt>'
        +         '<dd><em class="state-up">#{0}</em> 套房源</dd>'
        +     '</dl>'
        +     '<dl class="trend-new-compare">'
        +         '<dt>同比上月</dt>'
        +         '<dd>#{1}</dd>'
        +     '</dl>'
        + '</li>'
        + '<li class="data-col">'
        +     '<dl class="trend-deal first">'
        +         '<dt>当月成交</dt>'
        +         '<dd><em class="state-up">#{2}</em> 套房源</dd>'
        +     '</dl>'
        +     '<dl class="trend-deal-compare">'
        +         '<dt>同比上月</dt>'
        +         '<dd>#{3}</dd>'
        +     '</dl>'
        + '</li>'
        + '<li class="data-col">'
        +     '<dl class="trend-price first">'
        +         '<dt>挂牌均价</dt>'
        +         '<dd><em class="state-normal">#{4}</em> 元/平</dd>'
        +     '</dl>'
        +     '<dl class="trend-price-compare">'
        +         '<dt>同比上月</dt>'
        +         '<dd>#{5}</dd>'
        +     '</dl>'
        + '</li>'
        ;

    var trendBox = $('#zone-trend');
    var timeSpan = trendBox.find('.trend-data-time');
    var trendDataBox = $('#trend-data');
    var trendCtrls = trendBox.find('.trend-ctrl>a');
    var prevDom = trendCtrls.filter(':eq(0)');
    var nextDom = trendCtrls.filter(':eq(1)');

    var curMonth;

    /**
     * 绑定切换月份的click事件
     */
    function bindSwitchEvents() {
        trendCtrls.on('click', function () {
            var _me = $(this);
            var command = _me.attr('data-command');
            if (!_me.hasClass('disabled')) {
                if (command == 'prev') {
                    changeMonth(curMonth - 1);
                }
                else if (command == 'next') {
                    changeMonth(curMonth + 1);
                }
            }

            return false;
        });
    }

    function updateSwicherStyle() {
        if (curMonth == null) {
            return;
        }
        nextDom[(curMonth < cacheData.length - 1) ? 'removeClass' : 'addClass']('disabled');
        prevDom[(curMonth > 0) ? 'removeClass' : 'addClass']('disabled');
    }

    function request() {
        var url = cacheOptions.url;
        var reqData = cacheOptions.reqData;

        ajax.get(url, reqData, function (data) {
            trend.trigger('ready', {
                data: data
            });
        }, function (resp) {
            trend.trigger('ready', {
                data: []
            });
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
            x: 60,
            x2: 20,
            y: 60,
            y2: 30
        },
        legend: {
            data: ['当月新增', '当月成交', '挂牌均价'],
            padding: [16, 0, 5, 0]
        },
        xAxis : [],
        yAxis : [
            {
                type : 'value',
                name : '挂牌均价',
                boundaryGap: [0, 0.1],
            },
            {
                type : 'value',
                name : '',
                boundaryGap: [0, 0.1],
                axisLabel : {
                    formatter: ' '
                }
            }
            
        ],
        series : [
            {
                name:'当月新增',
                type: 'bar',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#f8e9a1'
                    }
                },
                data: []
            },
            {
                name:'当月成交',
                type: 'bar',
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        color: '#f1b65b'
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
        var length = datasource.length;

        var xData = {
            type : 'category',
            data : []
        };

        var yData = {
            0: [],
            1: [],
            2: []
        };

        $.each(datasource, function (i, item) {

            // 取最近6个月的数据显示出来
            if (i >= length - MAX_MONTH) {
                cacheData.push(item);

                xData.data.push(item.time);
                yData[0].push(item['new']);
                yData[1].push(item['deal']);
                yData[2].push(item['avePrice']);
            }
        });

        var data = $.extend({}, defaultOptions);
        data.xAxis = xData;
        data.series[0].data = yData[0];
        data.series[1].data = yData[1];
        data.series[2].data = yData[2];

        return data;
    }

    function getTrendHtml(item) {
        var getState = function (percent) {
            var tpl = percent > 0 ? _tplState.up : (percent < 0 ? _tplState.down : _tplState.normal);
            return $.stringFormat(tpl, Math.abs(percent));
        };

        return $.stringFormat(_tplTrend, 
                item['new'],
                getState(item.newContrast),
                item.deal,
                getState(item.dealContrast),
                item.avePrice,
                getState(item.avePriceContrast)
            );
    }


    function changeMonth(index) {
        if (index < 0 || index > cacheData.length - 1) {
            return false;
        }

        var time = cacheData[index].time;
        timeSpan.text(time);
        trendDataBox.html(getTrendHtml(cacheData[index]));
        curMonth = index;

        updateSwicherStyle();
    }


    trend.init = function (params) {
        cacheOptions = $.extend({}, params);
        bindSwitchEvents();

        request();

        trend.on('ready', function (ev, args) {
            var options = getOptionsBy(args.data);
            var length = cacheData.length;
            changeMonth(length - 1);

            chart.render(cacheOptions.chartDomId, options);

        });
    };

    return trend;
});