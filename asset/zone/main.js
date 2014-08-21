/**
 * @file 小区房源列表的交互模块
 */
define(function (require) {

    var cacheOptions;
    var urls;

    var favorBtnCtrl = $('#zone-favor-add');

    function initEvents() {
        favorBtnCtrl.on('click', function () {
            var _me = $(this);

            if (_me.hasClass('zone-favor-on')) {
                return false;
            }

            var data = $.extend({}, cacheOptions.reqData, {
                id: cacheOptions.reqData.communityId
            });

            ajax.post(cacheOptions.url.follow, data, function () {
                favorBtnCtrl.addClass('zone-favor-on').text('已关注该小区');
            });

            return false;
        });
    }

    return {
        init: function (params) {

            cacheOptions = $.extend({}, params);

            initEvents();

            require('../list/recommend').start({
                url: params.recommendUrl
            });

            require('./trend').init({
                url: params.trendUrl,
                reqData: params.reqData,
                chartDomId: 'chart-dom'
            });

            require('./map').init({
                ak: params.mapak,
                domId: params.mapDomId,
                point: params.coordinates
            });

            require('./filter').init();
        }
    };
});