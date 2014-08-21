/**
 * @file  房源列表页的交互逻辑
 */
define(function (require) {

    var list = require('./list');
    var map = require('./map');

    function initPageEvents() {
        bindWindowScroll();

        // elements fixtop
        $('#filter-bar').fixtop({
            fixedWidth: '1098px'
        });
    }

    var listSide = $('#list-side');

    function bindWindowScroll() {
        var gapHeight = 50;
        var mainTop = listSide.parent().position().top;
        var mainHeight = listSide.parent().height();
        var selfHeight = listSide.outerHeight();

        var timer;

        $(window).on('scroll', function () {
            if (timer) {
                clearTimeout(timer);
            }

            var scrollTop = $(document.body).scrollTop();
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
        });
    }

    return {
        init: function (params) {
            initPageEvents();

            require('./recommend').start({
                url: params.recommendUrl
            });

            require('./filter').init({
                baseUrl: params.baseUrl
            });


            // 列表和地图的关系绑定
            list.init({
                favorUrl: params.favorUrl
            });


            map.init({
                ak: params.mapak,
                domId: params.mapDomId,
                cityName: params.cityName,
                feRoot: params.feRoot
            });

            var pointDataList = list.getPoints();

            map.on('ready', function () {

                map.render(pointDataList);

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
    };

});