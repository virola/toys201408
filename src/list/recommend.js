/**
 * @file 推荐小区
 */
define(function (require) {

    var recDom = $('#rec-dom');

    var exports = {};


    var _tplItem = ''
        + '<div class="item">'
        +     '<div class="pic"><a target="_blank" href="#{url}">' 
        +         '<img class="lazyload loaded" src="#{imgSrc}" alt="#{title}" /></a></div>'
        +     '<div class="txt">'
        +         '<a target="_blank" href="#{url}">#{title}</a> / #{avePrice}元/㎡'
        +     '</div>'
        +     '#{houseCnt}套在售  #{browseCnt}人浏览'
        + '</div>';

    exports.render = function (data) {
        recDom.find('.recommend-lst').html(
            $.map(data, function (item) {
                return $.stringFormat(_tplItem, item);
            }).join('')
        );

        recDom.show();
    };

    exports.start = function (params) {
        var url = params.url;
        var data = $.extend({}, params.reqData);

        ajax.get(url, {}, function (data) {
            var result = data.result || data.list || [];
            if (result instanceof Array && result.length > 0) {
                exports.render(result);
            }
        }, function (resp) {
            // ...
        });
    };

    return exports;
});