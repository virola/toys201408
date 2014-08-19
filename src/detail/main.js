/**
 * @file 房源详情页逻辑模块
 */
define(function (require) {

    var map = require('./map');

    var tabNav = $('#panel-tab');
    var tabContent = tabNav.next('.tab-content');
    var contentList = tabContent.children('div');

    function initPageEvents() {
        tabNav.fixtop({
            fixedWidth: '947px'
        });

        tabNav.on('click', 'a', function () {
            tabNav.find('a').removeClass('on');
            $(this).addClass('on');
        });

        var timer;

        $(window).on('scroll', function () {

            if (timer) {
                clearTimeout(timer);
            }

            timer = setTimeout(function () {

                var scrollTop = $(document.body).scrollTop();

                var current;

                contentList.each(function (i, dom) {
                    if ($(this).position().top < scrollTop + 44) {
                        current = $(this);
                    }
                });

                if (!current) {
                    current = contentList.filter(':first');
                }

                var currentNav = tabNav.find('a.on');
                if (currentNav.attr('href') == '#' + current.attr('id')) {
                    return;
                }

                currentNav.removeClass('on');
                tabNav.find('a[href=#' + current.attr('id') + ']').addClass('on');

            }, 100);

        });
    }

    return {
        init: function (params) {

            initPageEvents();

            // charts
            var data = params.priceData;

            require('./chart').init(params.chartDomId, data);

            // map
            map.init({
                ak: params.ak,
                domId: params.mapDomId,
                point: params.coordinates
            });

            map.on('ready', function () {
                console.log('render finish~');
            });
        }
    };
});