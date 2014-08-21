/**
 * @file 推荐小区
 */
define(function (require) {

    var recDom = $('#rec-dom');

    var exports = {};


    var _tplItem = ''
        + '<div class="item">'
        +     '<div class="pic"><a href="#{url}"><img class="lazyload loaded" src="#{imgSrc}" alt="#{title}" /></a></div>'
        +     '<div class="txt">'
        +         '<a href="{$item.url|escape:html}">#{title}</a> / #{averagePrice}元/㎡'
        +     '</div>'
        +     '#{houseCount}套在售  #{viewCount}人浏览'
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

        ajax.get(url, {}, function (data) {
            if (data.result instanceof Array && data.result.length > 0) {
                exports.render(data.result);
            }
        }, function (resp) {
            // ...
        });
    };

    return exports;
});