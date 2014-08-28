
define(function (require) {

    var myCenter = require('./myCenter');

    var slideNews = require('./newHouse');

    var tabBox = $('#cond-tab');
    var tabList = $('.region-list');

    function bindTabClick() {
        tabBox.on('click', 'a', function () {
            var link = $(this);
            var li = link.parent('li');
            if (li.hasClass('on')) {
                return false;
            }

            tabBox.find('li.on').removeClass('on');
            li.addClass('on');

            var box = $(link.attr('href'));
            tabList.hide();
            box.fadeIn();

            return false;
        });
    }

    return {
        init: function (params) {


            bindTabClick();

            // 初始化新上房源的滚动播出
            // slideNews.init({
            //     height: 21,
            //     delay: 3000
            // });

            // 先隐藏此功能
            // myCenter.init({
            //     url: params.userDataUrl,
            //     requestOptions: params.requestOptions || {}
            // });

        }
    };
});