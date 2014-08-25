/**
 * @file 数据统计相关的模块
 */
define(function (require) {

    var SEARCH_DELAY = 9000;

    var cacheUrl;

    function startRecentSearch() {
        setTimeout(function () {
            ajax.post(cacheUrl.search, {
                url: window.location.href
            });
        }, SEARCH_DELAY);
    }

    return {
        init: function (urls) {
            cacheUrl = $.extend({}, urls);

            startRecentSearch();
        }
    };
});