
define(function (require) {

    var listModule = $({});

    var listBox = $('#house-lst');
    var itemList = listBox.children('li').not('.list-no-data');

    // list dom map; `id` is the key
    var listMap = {};

    // all point list
    var pointList;

    function bindFavor(url) {

        listBox.on('click', 'a.add-favor', function (e) {
            var _me = $(this);

            var options = {
                id: $(this).attr('data-id')
            };

            ajax.post(url, options, function () {
                _me.hide();
                // success
            }, function (resp) {
                // fail
            });

            return false;
        });
    }

    function bindListHover() {

        // list event
        itemList.hover(function () {
            $(this).addClass('hover');

            listModule.trigger('mouseover', {
                main: this,
                index: $(this).attr('data-index'),
                id: $(this).attr('data-id')
            });

        }, function () {
            $(this).removeClass('hover');

            listModule.trigger('mouseout', {
                main: this,
                index: $(this).attr('data-index'),
                id: $(this).attr('data-id')
            });
        });
    }

    listModule.init = function (params) {
        bindListHover();
        // bindFavor(params.favorUrl);
        
        pointList = listModule.getPoints();
    };


    listModule.getPoints = function () {
        return $.map(itemList, function (item, index) {
            var jItem = $(item);
            var id = jItem.attr('data-id');

            listMap[id] = $(item);

            return {
                id: id,
                index: index,
                rank: index + 1,
                name: jItem.find('.zone').text(),
                point: jItem.attr('data-geo').split(','),
                url: jItem.find('.info-panel>h2>a').attr('href')
            };
        });
    };

    listModule.getVisiblePoints = function () {
        var scrollTop = $(window).scrollTop();
        var viewHeight = $(window).height();

        var points = $.map(itemList, function (item, index) {
            var jItem = $(item);
            var id = jItem.attr('data-id');

            if (jItem.offset().top >= scrollTop 
                && (jItem.offset().top + 30) <= scrollTop + viewHeight
            ) {
                return {
                    id: id,
                    index: index,
                    rank: index + 1,
                    name: jItem.find('.zone').text(),
                    point: jItem.attr('data-geo').split(','),
                    url: jItem.find('.info-panel>h2>a').attr('href')
                };
            }

            return null;
        });

        return points;
    };


    listModule.highlight = function (id) {
        if (!listMap[id]) {
            return;
        } 
        listMap[id].addClass('hover');
    };

    listModule.unhighlight = function (id) {
        if (!listMap[id]) {
            return;
        }
        listMap[id].removeClass('hover');
    };


    var _tplItem = ''
        + '<li data-index="#{index}" data-id="#{houseId}" data-geo="#{latitude},#{longitude}">'
        +     '<div class="pic-panel">'
        +         '<a href="#{viewUrl}">' 
        +             '<img class="lazyload" src="#{imgSrc}" alt="#{title}" width="165" height="120"/></a>'
        +         '<div class="pic-num">'
        +             '<i class="ico-pic"></i>'
        +             '<span class="num">#{imgCount}</span>'
        +         '</div>'
        +     '</div>'
        +     '<div class="info-panel">'
        +         '<h2><a href="#{viewUrl}" title="#{title}"><span>#{rank}</span>#{title}</a></h2>'
        +         '<div class="summary">'
        +             '<div class="where">#{region}</div>'
        +             '<div class="type">' 
        +                 '<span class="num">#{bedroom}</span>室<span class="num">#{livingroom}</span>厅</div>'
        +             '<div class="square"><span class="num">#{square}</span>平米</div>'
        +             '<div class="price"><span class="num">#{price}</span>#{priceUnit}</div>'
        +         '</div>'
        +         '<div class="other">'
        +             '<div class="con">#{desc}</div>'
        +             '<div class="price-pre">#{averagePrice} 元/平</div>'
        +         '</div>'
        +         '<div class="fd">'
        +             '<div class="left">'
        +                 '<a href="#{agencyUrl}" title="#{agency}"><img src="#{agencyLogo}" alt="#{agency}" /></a>'
        +             '</div>'
        +             '<div class="right">'
        +                 '<a href="#" class="add-favor star" data-id="#{houseId}">'
        +                     '<i class="ico ico-star"></i>'
        +                 '</a>'
        +                 '<a href="#{viewUrl}" class="go-detail">详情</a>'
        +             '</div>'
        +         '</div>'
        +     '</div>'
        + '</li>'
        ;

    // 列表推荐
    var listRecBox = $('#rec-house-list');

    listModule.renderRec = function (data) {
        var list = $.map(data, function (item, i) {
            var data = $.extend({
                index: i,
                rank: i + 1,
                latitude: item.coordinates.latitude,
                longitude: item.coordinates.longitude
            }, item);

            return $.strHTML(_tplItem, data);
        });

        // console.log(list);

        listRecBox.html(list.join('')).show();
        // TODO..
    };

    return listModule;
});