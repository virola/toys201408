/*!
 * jquery.scrollLoading.js
 * by zhangxinxu  http://www.zhangxinxu.com
 * 2010-11-19 v1.0
 * 2012-01-13 v1.1 偏移值计算修改 position → offset
 * 2012-09-25 v1.2 增加滚动容器参数, 回调参数
*/
(function($) {

    $.fn.scrollLoading = function(options) {
        var defaults = {
            attr: 'data-url',
            container: $(window),
            callback: $.noop
        };
        var params = $.extend({}, defaults, options || {});
        params.cache = [];
        $(this).each(function() {
            var node = this.nodeName.toLowerCase(), url = $(this).attr(params['attr']);
            //重组
            var data = {
                obj: $(this),
                tag: node,
                url: url
            };
            params.cache.push(data);
        });
        
        var callback = function(call) {
            if ($.isFunction(params.callback)) {
                params.callback.call(call.get(0));
            }
        };
        //动态显示数据
        var loading = function() {
            
            var contHeight = params.container.height();
            if ($(window).get(0) === window) {
                contop = $(window).scrollTop();
            } else {
                contop = params.container.offset().top;
            }       
            
            $.each(params.cache, function(i, data) {
                var o = data.obj, tag = data.tag, url = data.url, post, posb;

                if (o) {
                    post = o.offset().top - contop, post + o.height();
    
                    if ((post >= 0 && post < contHeight) || (posb > 0 && posb <= contHeight)) {
                        if (url) {
                            //在浏览器窗口内
                            if (tag === 'img') {
                                //图片，改变src
                                callback(o.attr('src', url));       
                            } else {
                                o.load(url, {}, function() {
                                    callback(o);
                                });
                            }       
                        } else {
                            // 无地址，直接触发回调
                            callback(o);
                        }
                        data.obj = null;    
                    }
                }
            }); 
        };
        
        //事件触发
        //加载完毕即执行
        loading();
        //滚动执行
        params.container.bind('scroll', loading);
    };

})(jQuery);
/**
 * @file 自动置顶插件
 */
(function( $ ) {

    $.fn.fixtop = function(options) {

        // Define default setting
        var settings = $.extend({
            marginTop: 0,
            zIndex: 1000,
            fixedWidth: '100%'
        }, options);

        var form_top = this.offset().top - settings.marginTop;
        var el = this;
        var missingHeight = el.height() + settings.marginTop;
        var blankArea = $('<div/>')
        blankArea.css({
            'display' : el.css('display'),
            'width' : el.outerWidth(true),
            'height' : el.outerHeight(true),
            'float' : el.css('float')
        });

        $(window).scroll(function(e){ 
            //Set position of sub navogation
            var y = form_top;
            if ($(this).scrollTop() > y && el.css('position') != 'fixed'){ 
                el.after(blankArea);
                el.css({
                    'position': 'fixed', 
                    'top': settings.marginTop+'px',
                    'z-index': settings.zIndex, 
                    'width': settings.fixedWidth
                }); 
                if (settings.fixed !== undefined) {
                    settings.fixed(el);
                }
            } 

            if ($(this).scrollTop() < y && el.css('position') == 'fixed'){
                blankArea.remove();
                el.css({
                    'position': 'relative', 
                    'top': '0px',
                    'z-index': settings.zIndex 
                });
                
                if(settings.unfixed !== undefined){
                    settings.unfixed(el);
                }
            }
        });

    
        // Return jQuery so that it's chainable 
        return this;        
    };
 
}( jQuery )); 

/*@cc_on(function(m,c){var z="abbr|article|aside|audio|canvas|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video";function n(d){for(var a=-1;++a<o;)d.createElement(i[a])}function p(d,a){for(var e=-1,b=d.length,j,q=[];++e<b;){j=d[e];if((a=j.media||a)!="screen")q.push(p(j.imports,a),j.cssText)}return q.join("")}var g=c.createElement("div");g.innerHTML="<z>i</z>";if(g.childNodes.length!==1){var i=z.split("|"),o=i.length,s=RegExp("(^|\\s)("+z+")",
"gi"),t=RegExp("<(/*)("+z+")","gi"),u=RegExp("(^|[^\\n]*?\\s)("+z+")([^\\n]*)({[\\n\\w\\W]*?})","gi"),r=c.createDocumentFragment(),k=c.documentElement;g=k.firstChild;var h=c.createElement("body"),l=c.createElement("style"),f;n(c);n(r);g.insertBefore(l,
g.firstChild);l.media="print";m.attachEvent("onbeforeprint",function(){var d=-1,a=p(c.styleSheets,"all"),e=[],b;for(f=f||c.body;(b=u.exec(a))!=null;)e.push((b[1]+b[2]+b[3]).replace(s,"$1.iepp_$2")+b[4]);for(l.styleSheet.cssText=e.join("\n");++d<o;){a=c.getElementsByTagName(i[d]);e=a.length;for(b=-1;++b<e;)if(a[b].className.indexOf("iepp_")<0)a[b].className+=" iepp_"+i[d]}r.appendChild(f);k.appendChild(h);h.className=f.className;h.innerHTML=f.innerHTML.replace(t,"<$1font")});m.attachEvent("onafterprint",
function(){h.innerHTML="";k.removeChild(h);k.appendChild(f);l.styleSheet.cssText=""})}})(this,document);@*/
var betafang = window.betafang || {};


$.encodeHTML = function (source) {
    return String(source)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
};

$.stringFormat = function (source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments, 1);
    var toString = Object.prototype.toString;

    if ( data.length ) {
        data = data.length == 1 ? 

            /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
            : data;
        return source.replace(/#\{(.+?)\}/g, function (match, key){
            var replacer = data[key];

            // chrome 下 typeof /a/ == 'function'
            if('[object Function]' == toString.call(replacer)){
                replacer = replacer(key);
            }
            return ('undefined' == typeof replacer ? '' : replacer);
        });
    }
    return source;
};


$.strHTML = function (source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments, 1);
    var toString = Object.prototype.toString;

    if ( data.length ) {
        data = data.length == 1 ? 

            /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data) 
            : data;
        return source.replace(/#\{(.+?)\}/g, function (match, key){
            var replacer = data[key];

            // chrome 下 typeof /a/ == 'function'
            if('[object Function]' == toString.call(replacer)){
                replacer = replacer(key);
            }
            return ('undefined' == typeof replacer ? '' : encodeHTML(replacer));
        });
    }
    return source;
};

$.showIframeImg = function (parent, url) {
    var stylesTpl = '' 
        + '<style>' 
        + 'body{margin:0;padding:0}img{width:#{0}px;height:#{1}px;}'
        + '</style>';
    
    var item = $(parent);
    var height = item.height();
    var width = item.width();
    var styles = $.stringFormat(stylesTpl, width, height);

    var frameid = 'frameimg' + Math.round(Math.random() * 1000000000); 
    window.betafang[frameid] = ''
        + '<head>' + styles + '</head>'
        + '<body><img id="img-' + frameid + '" src=\'' + url + '?' + Math.random() + '\' />' 
        + '</body>'; 
    parent.append(''
        + '<iframe style="display:none" id="' + frameid + '" src="javascript:parent.betafang[\'' + frameid + '\'];"' 
        + ' frameBorder="0" scrolling="no" width="' + width + '" height="' + height + '"></iframe>'
    );
    
};

$(function () {

    if (/msie (\d+\.\d+)/i.test(navigator.userAgent)) {
        $(document.body).addClass('ie', 'ie' + (document.documentMode || + RegExp['\x241']));
    }

    // $('.lazyload').scrollLoading({
    //     callback: function () {
    //         $(this).addClass('loaded');
    //     }
    // });

    
    $('.iframe-img').each(function () {
        var img = $(this);
        var parent = img.parent();
        var url = img.attr('data-url') || img.attr('src');
        $.showIframeImg(parent, url);

        img.remove();
        parent.children('iframe').show();
    });


    // search form submit
    var keywordBox = $('#keyword-box');
    keywordBox.closest('form').on('submit', function () {
        var form = $(this);
        var url = form.attr('action');

        url += $.encodeHTML($.trim(keywordBox.val()));

        window.location.href = url;

        return false;
    });
    
});

/**
 * @file  通用ajax模块
 */

var ajax = (function () {

    var exports = {};
    
    /**
     * GET方法
     * 
     * @param {string} url 
     * @param {Function} callback 
     */
    exports.get = function (url, param, success, failure) {
        if (!url) {
            return false;
        }

        $.getJSON(url, param, function (response) {
            if (response.status == 0) {
                success(response.data);
            }
            else {
                failure(response);
            }
        }, function (response) {
            var resp = {
                status: 500,
                statusInfo: '服务请求失败'
            };
            failure(resp);
        });
    };

    exports.post = function (url, param, success, failure) {
        if (!url) {
            return false;
        }
        
        $.ajax({
            type: "POST",
            url: url,
            data: param,
            success: function (response) {
                if (response.status == 0) {
                    success(response.data);
                }
                else {
                    failure(response);
                }
            },
            failure: function (response) {
                var resp = {
                    status: 500,
                    statusInfo: '服务请求失败'
                };
                failure(resp);
            },
            dataType: 'json'
        });
    };

    return exports;

})();


/**
 * @file 谷歌地图转换百度地图JS模块
 */
(function () {  

    var transUrl = 'http://api.map.baidu.com/ag/coord/convert';

    function load_script(xyUrl, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = xyUrl;

        //借鉴了jQuery的script跨域方法
        script.onload = script.onreadystatechange = function(){
            if((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')){
                callback && callback();
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if ( head && script.parentNode) {
                    head.removeChild( script );
                }
            }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        head.insertBefore( script, head.firstChild );
    }

    function translate(point, type, callback) {
        var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
        var xyUrl = transUrl + '?from='+ type + '&to=4&x=' + point.lng + '&y=' + point.lat + '&callback=BMap.Convertor.' + callbackName;
        
        //动态创建script标签
        load_script(xyUrl);
        BMap.Convertor[callbackName] = function (xyResult) {
            delete BMap.Convertor[callbackName];    //调用完需要删除改函数
            var point = new BMap.Point(xyResult.x, xyResult.y);
            callback && callback(point);
        }
    }

    function translateMore(points, type, callback) {
        var xyUrl = transUrl + '?from=' + type + '&to=4&mode=1';
        var xs = [];
        var ys = [];
        var maxCnt = 20; //每次发送的最大个数

        var send = function () {
            var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
            var url = xyUrl + '&x=' + xs.join(',') + '&y=' + ys.join(',') + '&callback=BMap.Convertor.' + callbackName;
            //动态创建script标签
            load_script(url);
            xs = [];
            ys = [];

            BMap.Convertor[callbackName] = function (xyResults) {
                delete BMap.Convertor[callbackName];    //调用完需要删除改函数

                var xyResult = null;
                var points = [];

                for (var index in xyResults) {
                    xyResult = xyResults[index];

                    if (xyResult.error != 0) {

                        //出错就直接返回;
                        points[index] = null;
                        continue;
                    }

                    var point = new BMap.Point(xyResult.x, xyResult.y);
                    points[index] = point;
                }

                callback && callback(points);
            }
        };

        for (var index in points) {
            if(index % maxCnt == 0 && index != 0){
                send();
            }

            xs.push(points[index].lng);
            ys.push(points[index].lat);
            if(index == points.length - 1){
                send();
            }
        }
        
    }

    window.BMap = window.BMap || {};
    BMap.Convertor = $({});
    BMap.Convertor.translate = translate;
    BMap.Convertor.translateMore = translateMore;
})();