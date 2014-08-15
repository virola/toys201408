/**
 * @file  首页的新上房源滑动模块
 * 
 */

define(function (require) {


    var newsCont = $('#slide-news');
    var timer;

    // cache options
    var options;

    // main exporter
    var exports = {};

    exports.init = function (params) {
        options = $.extend({}, params);

        exports.play();

        newsCont.on('mouseover', function () {
            exports.stop();
        }).on('mouseout', function () {
            exports.play();
        });
    };

    exports.stop = function () {
        clearInterval(timer);
    };

    exports.play = function () {

        timer = setInterval(function () {
            exports.slideUp(options.height);
        }, options.delay);
    };

    exports.slideUp = function (height) {
        var marginTop = Math.abs(newsCont.css('marginTop').replace('px', '')) + height;

        if (marginTop >= newsCont.outerHeight()) {
            marginTop = 0;
        }

        $(newsCont).animate({
            marginTop: -marginTop + 'px'
        })

    };

    return exports;

});
