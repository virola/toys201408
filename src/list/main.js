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

            if (mainTop < scrollTop - gapHeight) {
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

            require('./filter').init();



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

            var pointDataList = $.map($('#house-lst li'), function (item, index) {
                var jItem = $(item);

                return {
                    id: jItem.attr('data-id'),
                    index: index,
                    rank: index + 1,
                    name: jItem.find('.where').text(),
                    point: jItem.attr('data-geo').split(',')
                };
            });

            map.on('ready', function () {
                console.log('ready');

                map.render(pointDataList);

                list.on('mouseover', function (ev, args) {
                    map.highlight(args.index);
                }).on('mouseout', function (ev, args) {
                    map.unhighlight(args.index);
                });

                map.on('mouseover', function (ev, args) {
                    list.highlight(args.index);
                }).on('mouseout', function (ev, args) {
                    list.unhighlight(args.index);
                });
            });
        }
    };

});