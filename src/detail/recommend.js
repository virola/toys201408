
define(function (require) {

    var recommend = {};

    var recKey = ['similar', 'footstep', 'region', 'newhouse'];

    var cacheOptions;

    function init(params) {
        cacheOptions = $.extend({}, params);
        
        $.each(recKey, function (i, key) {
            request(key);
        });
    }

    function request(key) {
        ajax.get(cacheOptions.url[key], cacheOptions.reqData, function (data) {
            var result = data.result || data.list;
            if (result && result instanceof Array) {
                var html = getHtml(key, result);
                render(key, html);
            }
        }, function (resp) {

        });
    }

    var _tplItem = {

        similar: ''
            + '<li #{itemStyle}>'
            +     '<a class="link-mask" target="_blank" href="#{url}"></a>'
            +     '<a class="side-img" target="_blank" href="#{url}">'
            +         '<img src="#{imgSrc}">'
            +         '<b class="bg"></b>'
            +         '<span class="album-count fn-num"><i class="ico-pic"></i>#{imgCount}</span>'
            +     '</a>'
            +     '<div class="price-box clear">'
            +         '<span class="price-text left"><em>#{price}</em>#{priceUnit}</span>'
            +         '<span class="desc-text right desc-status-#{recStatus}">#{recText}</span>'
            +     '</div>'
            +     '<h4 class="sub-text">#{title}</h4>'
            +     '<p class="room-text">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</p>'
            + '</li>'
            ,

        footstep: ''
            + '<li #{itemStyle}>'
            +     '<a class="link-mask" target="_blank" href="#{url}"></a>'
            +     '<a class="side-img" href="#{url}">'
            +         '<img src="#{imgSrc}">'
            +         '<b class="bg"></b>'
            +         '<span class="album-count fn-num"><i class="ico-pic"></i>#{imgCount}</span>'
            +     '</a>'
            +     '<div class="price-box clear">'
            +         '<span class="price-text left"><em>#{price}</em>#{priceUnit}</span>'
            +         '<span class="desc-text right">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</span>'
            +     '</div>'
            +     '<p class="view-per"><em class="em-text">#{viewPercent}%</em>还看了：</p>'
            +     '<h4 class="sub-text">#{title}</h4>'
            + '</li>'
            ,

        region: ''
            + '<li>'
            +     '<a class="link-mask" target="_blank" href="#{url}"></a>'
            +     '<a class="side-img" href="#{url}">'
            +         '<img src="#{imgSrc}">'
            +         '<b class="bg"></b>'
            +         '<span class="album-count fn-num"><i class="ico-pic"></i>#{imgCount}</span>'
            +     '</a>'
            +     '<div class="price-box clear">'
            +         '<span class="price-text left"><em>#{price}</em>#{priceUnit}</span>'
            +         '<span class="desc-text right">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</span>'
            +     '</div>'
            +     '<h4 class="sub-text"><a href="#{districtUrl}">#{districtTitle}</a>&nbsp;-&nbsp;#{title}</h4>'
            + '</li>'
            ,

        newhouse: ''
            + '<li class="item">'
            +     '<div class="pic">' 
            +         '<a target="_blank" href="#{url}">' 
            +           '<img class="lazyload loaded" src="#{imgSrc}" alt="#{title}" /></a>' 
            +     '</div>'
            +     '<div class="txt price-txt clear">'
            +         '<div class="left">'
            +             '<span class="price">#{price}</span>&nbsp;#{priceUnit}'
            +         '</div>'
            +         '<div class="right">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</div>'
            +     '</div>'
            +     '<div class="loc">#{regionHtml}</div>'
            + '</li>'
            ,

        newhouseRegion: '<a target="_blank" href="#{url}">#{title}</a>'
    };

    function getHtml(key, data) {
        var html = $.map(data, function (item, index) {
            if (index == data.length - 1) {
                item.itemStyle = 'class="last"';
            }

            if (key == 'region') {
                var district = item.region;
                if (district instanceof Array && district[0]) {
                    var dist = district[0];
                    item.districtUrl = dist.url || '#';
                    item.districtTitle = dist.title || '';
                }
            }

            if (key == 'newhouse') {
                var region = [];
                $.each(item.region, function (i, rg) {
                    region[i] = $.stringFormat(_tplItem.newhouseRegion, rg);
                });

                item.regionHtml = region.join(' - ');
            }

            return $.stringFormat(_tplItem[key], item);
        });

        return html.join('');
    }

    function render(key, html) {
        // console.log(html);
        
        var box = $('#rec-' + key);

        if (html) {
            box.find('ul').html(html);
            box.show();
        }
        else {
            box.hide();
        }
    }



    recommend.init = init;

    return recommend;
});