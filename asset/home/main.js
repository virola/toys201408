
define(function (require) {

    var myCenter = require('./myCenter');

    var slideNews = require('./newHouse');

    return {
        init: function (params) {

            // 初始化新上房源的滚动播出
            slideNews.init({
                height: 21,
                delay: 3000
            });

            myCenter.init({
                url: params.userDataUrl,
                requestOptions: params.requestOptions || {}
            });

        }
    };
});