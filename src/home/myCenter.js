/**
 * @file 首页我的动态信息中心
 * 
 */
define(function (require) {

    var exports = {};

    var etpl;

    // clock按钮
    var openCenterBtn = $('#ctrl-my-center');

    // my-center Main Dom
    var myCenterDom = $('#my-center');

    var colBoxes = myCenterDom.find('.col-box>ul');

    var msgNumBox = openCenterBtn.find('i').hide();

    // TPL
    var _tplSearch = {
        item: ''
            + '<li class="clear">'
            +     '<a class="left" href="#{url}">#{title}</a>'
            +     '#{recentTpl}'
            +     '<span class="count right">#{count}'
            +         '#{addValueTpl}个结果</span>'
            + '</li>',

        empty: '<li class="no-data"><span class="home-ico ico-cond"></span><p>还没有相关找房条件</p></li>',
        recent: '<span class="left label">[最近搜过]</span>',
        addValue: '<em>(+#{0})</em>'
    };


    function getSearchColHtml(data) {

        if (data instanceof Array == false || data.length == 0) {
            return _tplSearch.empty;
        }

        var html = $.map(data, function (item, index) {
            if (item.recently) {
                item.recentTpl = _tplSearch.recent;
            }

            if (item.addValue > 0) {
                item.addValueTpl = $.stringFormat(_tplSearch.addValue, item.addValue);
            }
            return $.stringFormat(_tplSearch.item, item);
        });

        return html.join('');
    }

    var _tplHouse = {
        empty: '' 
            + '<li class="no-data">' 
            +     '<span class="home-ico ico-cond ico-cond-house"></span><p>您还没有关注的房源</p>' 
            + '</li>',

        item: ''
            + '<li class="clear">'
            +     '<a class="img-box" href="#{url}" title="#{title}">'
            +         '<img src="#{imgSrc}">'
            +     '</a>'
            +     '<a class="txt-box" href="#{url}" title="#{title}">'
            +         '<span class="title">#{title}</span>'
            +         '<span class="box clear">'
            +             '<em class="left">#{desc}</em>'
            +             '<span class="date right">#{pubtime}</span>'
            +         '</span>'
            +     '</a>'
            + '</li>'
    };

    var _tplHistory = {
        empty: ''
            + '<li class="no-data">' 
            + '<span class="home-ico ico-cond ico-cond-history"></span><p>您还没有浏览过房源</p>' 
            + '</li>'
    };

    /**
     * 生成房源列表的HTML
     * 
     * @param {Array} data 
     * @param {number} colIndex 
     * @return {string} html string
     */
    function getHouseColHtml(data, colIndex) {

        if (data instanceof Array == false || data.length == 0) {
            return colIndex == 2 ? _tplHistory.empty : _tplHouse.empty;
        }

        var html = $.map(data, function (item, index) {
            
            return $.stringFormat(_tplHouse.item, item);
        });

        return html.join('');
    }

    function getColHtml(colIndex, data) {
        switch (colIndex) {
            case 0:
                return getSearchColHtml(data);
            case 1:
            case 2:
                return getHouseColHtml(data, colIndex);
        }
    }

    function initDomEvents() {
        openCenterBtn.hover(function () {
            $(this).addClass('ico-clock-hover');
        }, function () {
            $(this).removeClass('ico-clock-hover');
        });

        openCenterBtn.add('#ctrl-my-center-close').on('click', function () {

            openCenterBtn.toggleClass('ico-clock-active');

            myCenterDom.slideToggle({
                complete: function () {
                    if (myCenterDom.is(':visible')) {

                        $(document.body).animate({
                            scrollTop: openCenterBtn.offset().top
                        });

                        msgNumBox.hide();
                    }
                }
            });

        });
    }


    function renderCol(colIndex, data) {
        if (colIndex > 0) {
            data = formatDataFromMsg(data);
        }
        $(colBoxes.get(colIndex)).html(getColHtml(colIndex, data));
    }


    function formatDataFromMsg(data) {
        return $.map(data, function (item) {
            var house = item.content.item;

            return {
                url: house.url,
                title: house.title,
                imgSrc: house.imgSrc,
                desc: item.title,
                pubtime: item.date
            };
        });
    }

    var reqUrl;

    // cache req params
    var reqData;

    exports.init = function (params) {
        reqUrl = params.url;
        reqData = $.extend({}, params.requestOptions);

        var urls = [params.url.search, params.url.house, params.url.history];


        $.each(urls, function (index, url) {
            ajax.get(url, reqData, function (data) {
                data = data.result || data.list || [];
                renderCol(index, data);

                // 有数据的时候，把button显示出来
                if (data && data.length > 0) {
                    openCenterBtn.show();

                    if (index == 1) {
                        msgNumBox.text(data.length).show();
                    }
                }

            }, function (resp) {
                renderCol(index, []);
            });
        });

        initDomEvents();
    };

    return exports;

});