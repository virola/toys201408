
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


    /**
     * 搜索建议部分
     * 
     * @type {Object}
     */
    var suggestion = (function () {

        var mainBox = $('#keyword-box');
        var options;

        var exports = {};

        /**
         * 请求ajax数据
         * 
         * @param {string} url 请求url
         * @param {string} word 请求关键词
         * @param {Function} callback 回调函数
         */
        exports.request = function (url, word, callback) {
            // test data
            callback([
                {
                    "title": "乐城 二手房",
                    "region": "马连道 西城",
                    "count": "35",
                    "recently": false,
                    "url": "http://xxx"
                },
                {
                    "title": "与“乐城”相关的房源",
                    "region": "",
                    "count": "455",
                    "recently": false,
                    "url": "http://xxx"
                },
                {
                    "title": "乐城 二室 200万-300万",
                    "region": "",
                    "count": "672",
                    "recently": true,
                    "url": "http://xxx"
                },
                {
                    "title": "乐城 二手房",
                    "region": "马连道 西城",
                    "count": "35",
                    "recently": false,
                    "url": "http://xxx"
                },
                {
                    "title": "与“乐城”相关的房源",
                    "region": "",
                    "count": "455",
                    "recently": false,
                    "url": "http://xxx"
                },
                {
                    "title": "乐城 二室 200万-300万",
                    "region": "",
                    "count": "672",
                    "recently": true,
                    "url": "http://xxx"
                }
            ]);

            return;

            url = url + (url.indexOf('?') > -1 ? '&' : '?') + 'keyword=' + encodeURIComponent(word);
            $.getJson(url, function (response) {
                if (response.status == 0 && (response.data.result instanceof Array)) {
                    callback(response.data.result);
                }
                else {
                    callback([]);
                }
            });
        };

        /**
         * 显示词条的格式
         */
        exports.renderItem = function( ul, item ) {
            var region = $('<span>').addClass('left sub-text').append(item.region);
            var count = $('<span>').addClass('count right').append(item.count + ' 套在售');

            var title = $('<span>').addClass('left').append(item.title);
            var link = $('<a>').addClass('clear').attr('href', item.url)
                .append(title).append(region);

            if (item.recently) {
                link.append( $('<span>[最近搜过]</span>').addClass('left sub-text') );
            }

            link.append(count);
            // console.log(link);

            return $('<li>')
                .append(link)
                .appendTo(ul);
        };

        var suggestWrap = $('#suggest-cont');

        exports.init = function (params) {
            options = $.extend({}, params);

            require(['jquery-ui'], function () {

                $.ui.autocomplete.prototype._renderItem = exports.renderItem;

                mainBox.autocomplete({
                    minLength: 0,
                    max: 10,
                    delay: 300,
                    source: function(request, response) {
                        var term = $.trim(request.term);
                        if (!term) {
                            response([]);
                        }
                        exports.request(options.url, term, function (data) {
                            response(data);
                        });
                    },
                    appendTo: suggestWrap,
                    position: {
                        my: 'left top+14'
                    },
                    open: function (ev, ui) {
                        suggestWrap.find('i').show();
                    },
                    close: function () {
                        suggestWrap.find('i').hide();
                    }
                });

                // mainBox.data('autocomplete')._renderItem = exports.renderItem;

                

                // debugger;
            });
        };

        return exports;
    })();
    

    return {
        init: function (params) {

            suggestion.init({
                url: params.suggestUrl
            });

            // 初始化新上房源的滚动播出
            slideNews.init({
                height: 21,
                delay: 3000
            });

            myCenter.init();


        }
    };
});