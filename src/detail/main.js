/**
 * @file 房源详情页逻辑模块
 */
define(function (require) {

    var map = require('./map');

    var tabNav = $('#panel-tab');
    var tabContent = tabNav.next('.tab-content');
    var contentList = tabContent.children('div');

    var albumMoreBox = $('.album-more');

    var favorBar = $('#favor-bar');
    var favorText = favorBar.children('em');

    var cacheOptions;

    function initPageEvents() {

        // more album
        $('#btn-expand-album').on('click', function () {
            albumMoreBox.show();
            $(this).parent().hide();
            return false;
        });

        var favorClass = 'bg-favor-bar-active';

        favorBar.on('click', function () {
            var isOn = favorBar.hasClass(favorClass);
            var url = cacheOptions.url.follow;

            if (isOn) {
                url = cacheOptions.url.unfollow;
            }

            var data = cacheOptions.reqData;

            ajax.post(url, data, function () {
                if (isOn) {
                    favorBar.removeClass(favorClass);
                    favorText.text('收藏此房');
                }
                else {
                    favorBar.addClass(favorClass);
                    favorText.text('已收藏');
                }
            });

            return false;
        }).on('mouseover', function () {
            var isOn = favorBar.hasClass(favorClass);

            if (isOn) {
                favorText.text('取消收藏');
            }
        }).on('mouseout', function () {
            var isOn = favorBar.hasClass(favorClass);

            if (isOn) {
                favorText.text('已收藏');
            }
            else {
                favorText.text('收藏此房');
            }
        });

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

                var scrollTop = $(window).scrollTop();

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

            cacheOptions = $.extend({}, params);

            initPageEvents();

            require('./album').init();

            // charts
            var data = params.priceData;

            require('./chart').init(params.chartDomId, {
                url: params.url.priceTrend,
                zoneId: params.zoneId
            });

            // map
            map.init({
                ak: params.ak,
                domId: params.mapDomId,
                point: params.coordinates
            });

            // recommend
            require('./recommend').init({
                url: params.url,
                reqData: params.reqData
            });
        }
    };
});