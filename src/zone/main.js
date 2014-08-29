/**
 * @file 小区房源列表的交互模块
 */
define(function (require) {

    var cacheOptions;
    var urls;

    var favorBtnCtrl = $('#zone-favor-add');

    function initEvents() {

        favorBtnCtrl.on('click', function () {
            var url = cacheOptions.url.follow;
            var _me = $(this);
            var isUnfollow = _me.hasClass('zone-favor-on');

            if (isUnfollow) {
                url = cacheOptions.url.unfollow;
            }

            var data = $.extend({}, cacheOptions.reqData, {
                id: cacheOptions.reqData.communityId
            });

            ajax.post(url, data, function () {
                if (isUnfollow) {
                    favorBtnCtrl.removeClass('zone-favor-on').text('关注该小区');
                }
                else {
                    favorBtnCtrl.addClass('zone-favor-on').text('已关注');
                }
                favorBtnCtrl.removeClass('zone-favor-hover');
            });

            return false;
        }).on('mouseover', function () {
            var _me = $(this);
            var isUnfollow = _me.hasClass('zone-favor-on');

            if (isUnfollow) {
                _me.addClass('zone-favor-hover');
                _me.text('取消关注');
            }
        }).on('mouseout', function () {
            var _me = $(this);
            var isUnfollow = _me.hasClass('zone-favor-on');

            if (isUnfollow) {
                _me.removeClass('zone-favor-hover');
                _me.text('已关注');
            }
        });

    }

    return {
        init: function (params) {

            cacheOptions = $.extend({}, params);

            initEvents();

            require('../list/list').init({
                favorUrl: params.favorUrl
            });

            require('../list/recommend').start({
                url: params.recommendUrl
            });

            require('./trend').init({
                url: params.trendUrl,
                reqData: params.reqData,
                chartDomId: 'chart-dom'
            });

            require('./filter').init();

            require('./album').init();

            // map is last
            require('./map').init({
                feRoot: params.feRoot,
                ak: params.mapak,
                domId: params.mapDomId,
                point: params.coordinates
            });
        }
    };
});