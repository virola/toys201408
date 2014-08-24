/**
 * @file 搜索建议模块
 * 
 * @type {Object}
 */

define(function (require) {

    var mainBox = $('#keyword-box');
    var suggestWrap = $('#suggest-cont');

    var options;

    /**
     * 搜索模块对象
     * 
     * @type {Object}
     */
    var suggestion = {};

    /**
     * 请求ajax数据
     * 
     * @param {string} url 请求url
     * @param {string} params 请求参数
     * @param {Function} callback 回调函数
     */
    suggestion.request = function (url, params, callback) {
        
        url = url + (url.indexOf('?') > -1 ? '&' : '?') + $.param(params);
        $.getJSON(url, function (response) {
            if (response.status === 0 && (response.data.result instanceof Array)) {
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
    suggestion.renderItem = function( ul, item ) {
        var region = $('<span>').addClass('left sub-text').append(item.region);
        var count = $('<span>').addClass('count right').append(item.count + ' <b>套在售</b>');

        var title = $('<span>').addClass('left').append(item.title);
        var link = $('<a>').addClass('clear').attr('href', item.url)
            .append(title).append(region);

        if (item.recently) {
            link.append( $('<span>[最近搜过]</span>').addClass('left sub-text') );
        }

        link.append(count);

        return $('<li>')
            .append(link)
            .appendTo(ul);
    };

    

    suggestion.init = function (params) {
        options = $.extend({}, params);

        mainBox = options.main ? $(options.main) : mainBox;
        suggestWrap = options.appendTo ? $(options.appendTo) : suggestWrap;

        var reqData = options.requestOptions || {};

        require(['jquery-ui'], function () {

            $.ui.autocomplete.prototype._renderItem = suggestion.renderItem;

            mainBox.autocomplete({
                minLength: 0,
                max: 10,
                delay: 300,
                source: function(request, response) {
                    var term = $.trim(request.term);
                    if (!term) {
                        response([]);
                        return;
                    }

                    reqData.keyword = term;

                    suggestion.request(options.url, reqData, function (data) {
                        $.each(data, function (index, item) {

                            // set value for plugin
                            if (!item.value) {
                                item.value = item.keyword;
                            }
                        });
                        response(data);
                    });
                },
                appendTo: suggestWrap,
                position: {
                    my: 'left+1 top+14'
                },
                open: function (ev, ui) {
                    var icon = suggestWrap.find('i');
                    if (icon.size() > 0) {
                        icon.show();
                    }
                    else {
                        suggestWrap.children('ul').css({
                            top: 0
                        });
                    }
                    
                },
                close: function () {
                    suggestWrap.find('i').hide();
                }
            });

        });
    };

    return suggestion;
});