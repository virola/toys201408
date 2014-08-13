/**
 * @file  房源列表页的交互逻辑
 */
define(function (require) {

    function initPageEvents() {

        // list event
        $('#house-lst li').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });


        // elements fixtop
        $('#filter-bar').fixtop({
            fixedWidth: '1098px'
        });
    }

    var listSide = $('#list-side');

    function bindWindowScroll() {

    }

    return {
        init: function (params) {
            initPageEvents();

            require(['common/toolbar'], function (toolbar) {
                toolbar.init({
                    user: {
                        username: params.username
                    },
                    url: params.tool.url
                });
            });
        }
    };

});