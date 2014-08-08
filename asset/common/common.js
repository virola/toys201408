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