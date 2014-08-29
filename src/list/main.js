/**
 * @file  房源列表页的交互逻辑
 */
define(function (require) {

    var list = require('./list');
    var map = require('./map');

    function initPageEvents() {
        bindWindowScroll();

        // elements fixtop
        $('#sort-panel').fixtop({
            fixedWidth: '696px'
        });
    }

    var listSide = $('#list-side');

    function bindWindowScroll() {
        var gapHeight = 0;
        var mainTop = listSide.parent().position().top;
        var mainHeight = listSide.parent().height();
        var selfHeight = listSide.outerHeight();

        /**
         * 右侧跟随
         */
        var adjustSide = function () {
            var scrollTop = $(window).scrollTop();
            var selfTop = listSide.position().top;
            var top = gapHeight + scrollTop - mainTop;

            if (mainTop + gapHeight < scrollTop) {
                listSide.addClass('fixed');

                if (scrollTop + selfHeight + gapHeight > mainTop + mainHeight) {
                    listSide.css({
                        top: (mainHeight - selfHeight) + 'px'
                    });
                    return;
                }
                
                listSide.css({
                    top: top + 'px'
                });
            }
            else {
                listSide.removeClass('fixed');
                listSide.css({
                    top: 0
                });
            }
        };

        var timer;

        $(window).on('scroll', function () {
            if ($.browser.ie) {
                if (timer) {
                    clearTimeout(timer);
                }

                timer = setTimeout(function () {
                    adjustSide();
                }, 100);
            }
            else {
                adjustSide();
            }
        });

        adjustSide();
    }

    function initMapAndList(params) {
        map.init({
            ak: params.mapak,
            domId: params.mapDomId,
            cityName: params.cityName,
            feRoot: params.feRoot
        });

        map.on('ready', function () {

            map.setDatasource(list.getPoints(), function () {
                repaintMap();
                bindListScroll();
            });

            list.on('mouseover', function (ev, args) {
                map.highlight(args.id);
            }).on('mouseout', function (ev, args) {
                map.unhighlight(args.id);
            });

            map.on('mouseover', function (ev, args) {
                list.highlight(args.id);
            }).on('mouseout', function (ev, args) {
                list.unhighlight(args.id);
            });
        });

    }

    function bindListScroll() {

        // scroll时的地图重绘
        var timerMap;

        $(window).on('scroll', function () {
            if (timerMap) {
                clearTimeout(timerMap);
            }

            timerMap = setTimeout(function () {
                repaintMap();
            }, 500);
        });

        var timerResizeMap;

        $(window).on('resize', function () {
            if (timerResizeMap) {
                clearTimeout(timerResizeMap);
            }

            timerResizeMap = setTimeout(function () {
                repaintMap();
            }, 500);
        });
    }

    function repaintMap() {
        var pointDataList = list.getVisiblePoints();
        map.render(pointDataList);
    }

    return {
        init: function (params) {
            initPageEvents();

            require('./recommend').start({
                url: params.recommendUrl,
                reqData: params.reqData
            });

            require('./filter').init({
                baseUrl: params.baseUrl
            });


            
            list.init({
                favorUrl: params.favorUrl
            });

            // 列表和地图的关系绑定
            initMapAndList(params);
        }
    };

});