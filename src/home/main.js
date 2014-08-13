
define(function (require) {


    /**
     * 我的信息中心
     * 
     * @type {Object}
     */
    var myCenter = (function () {
        var openCenterBtn = $('#ctrl-my-center');
        var myCenterDom = $('#my-center');

        function ctrlHoverInit() {
            openCenterBtn.hover(function () {
                $(this).addClass('ico-clock-hover');
            }, function () {
                $(this).removeClass('ico-clock-hover');
            });
        }

        function ctrlClickInit() {
            openCenterBtn.add('#ctrl-my-center-close').on('click', function () {

                openCenterBtn.toggleClass('ico-clock-active');

                myCenterDom.slideToggle({
                    complete: function () {
                        if (myCenterDom.is(':visible')) {

                            $(document.body).animate({
                                scrollTop: openCenterBtn.offset().top
                            });

                            openCenterBtn.find('.msg-num').hide();
                        }
                    }
                });

            });
        }

        return {
            init: function () {
                ctrlHoverInit();
                ctrlClickInit();
            }
        };
    })();


    /**
     * 首页的新上房源滑动模块
     * 
     * @type {Object}
     */
    var slideNews = (function () {

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
    })();

    return {
        init: function (params) {

            // 初始化新上房源的滚动播出
            slideNews.init({
                height: 21,
                delay: 3000
            });

            myCenter.init();


        }
    };
});