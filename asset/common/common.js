/*! betafang-fe 2014-08-28 */
!function(a){a.fn.scrollLoading=function(b){var c={attr:"data-url",container:a(window),callback:a.noop},d=a.extend({},c,b||{});d.cache=[],a(this).each(function(){var b=this.nodeName.toLowerCase(),c=a(this).attr(d.attr),e={obj:a(this),tag:b,url:c};d.cache.push(e)});var e=function(b){a.isFunction(d.callback)&&d.callback.call(b.get(0))},f=function(){var b,c=d.container.height();b=a(window).get(0)===window?a(window).scrollTop():d.container.offset().top,a.each(d.cache,function(a,d){var f=d.obj,g=d.tag,h=d.url;if(f){var i=f.offset().top-b,j=i+f.height();(i>=0&&c>i||j>0&&c>=j)&&(h?"img"===g?e(f.attr("src",h)):f.load(h,{},function(){e(f)}):e(f),d.obj=null)}})};f(),d.container.bind("scroll",f)}}(jQuery),function(a){a.fn.fixtop=function(b){var c=a.extend({marginTop:0,zIndex:1e3,fixedWidth:"100%"},b),d=this.offset().top-c.marginTop,e=this,f=(e.height()+c.marginTop,a("<div/>").css({display:e.css("display"),width:e.outerWidth(!0),height:e.outerHeight(!0),"float":e.css("float")}));return a(window).scroll(function(){var b=d;a(this).scrollTop()>b&&"fixed"!=e.css("position")&&(e.after(f),e.css({position:"fixed",top:c.marginTop+"px","z-index":c.zIndex,width:c.fixedWidth}),void 0!==c.fixed&&c.fixed(e)),a(this).scrollTop()<b&&"fixed"==e.css("position")&&(f.remove(),e.css({position:"relative",top:"0px","z-index":c.zIndex}),void 0!==c.unfixed&&c.unfixed(e))}),this}}(jQuery);var betafang=window.betafang||{};$.encodeHTML=function(a){return String(a).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")},$.stringFormat=function(a,b){a=String(a);var c=Array.prototype.slice.call(arguments,1),d=Object.prototype.toString;return c.length?(c=1==c.length&&null!==b&&/\[object Array\]|\[object Object\]/.test(d.call(b))?b:c,a.replace(/#\{(.+?)\}/g,function(a,b){var e=c[b];return"[object Function]"==d.call(e)&&(e=e(b)),"undefined"==typeof e?"":e})):a},$.strHTML=function(a,b){a=String(a);var c=Array.prototype.slice.call(arguments,1),d=Object.prototype.toString;return c.length?(c=1==c.length&&null!==b&&/\[object Array\]|\[object Object\]/.test(d.call(b))?b:c,a.replace(/#\{(.+?)\}/g,function(a,b){var e=c[b];return"[object Function]"==d.call(e)&&(e=e(b)),"undefined"==typeof e?"":$.encodeHTML(e)})):a},$.showIframeImg=function(a,b){var c="<style>body{margin:0;padding:0}img{width:#{0}px;height:#{1}px;}</style>",d=$(a),e=d.height(),f=d.width(),g=$.stringFormat(c,f,e),h="frameimg"+Math.round(1e9*Math.random());window.betafang[h]="<head>"+g+'</head><body><img id="img-'+h+"\" src='"+b+"' /></body>",a.append('<iframe style="display:none" id="'+h+'" src="javascript:parent.betafang[\''+h+'\'];" frameBorder="0" scrolling="no" width="'+f+'" height="'+e+'"></iframe>')},$.browser=$.browser||{},$.browser.ie=/msie (\d+\.\d+)/i.test(navigator.userAgent)?document.documentMode||+RegExp.$1:void 0,$(function(){/msie (\d+\.\d+)/i.test(navigator.userAgent)&&$("body").addClass("ie","ie"+(document.documentMode||+RegExp.$1)),$(".iframe-img").each(function(){var a=$(this),b=a.parent(),c=a.attr("data-url")||a.attr("src");$.showIframeImg(b,c),a.remove(),b.children("iframe").show()});var a=$("#keyword-box");a.closest("form").on("submit",function(){var b=$(this),c=b.attr("action");return c+=$.encodeHTML($.trim(a.val())),window.location.href=c,!1})});var ajax=function(){var a={},b=function(){};return a.get=function(a,c,d,e){return d=d||b,e=e||b,a?void $.getJSON(a,c,function(a){0===a.status?d(a.data):e(a)},function(){var a={status:500,statusInfo:"服务请求失败"};e(a)}):!1},a.post=function(a,c,d,e){return d=d||b,e=e||b,a?void $.ajax({type:"POST",url:a,data:c,success:function(a){0===a.status?d(a.data):e(a)},failure:function(){var a={status:500,statusInfo:"服务请求失败"};e(a)},dataType:"json"}):!1},a}();!function(){function a(a,b){var c=document.getElementsByTagName("head")[0],d=document.createElement("script");d.type="text/javascript",d.src=a,b=b||function(){},d.onload=d.onreadystatechange=function(){this.readyState&&"loaded"!==this.readyState&&"complete"!==this.readyState||(b(),d.onload=d.onreadystatechange=null,c&&d.parentNode&&c.removeChild(d))},c.insertBefore(d,c.firstChild)}function b(b,c,e){var f="cbk_"+Math.round(1e4*Math.random()),g=d+"?from="+c+"&to=4&x="+b.lng+"&y="+b.lat+"&callback=BMap.Convertor."+f;e=e||function(){},a(g),BMap.Convertor[f]=function(a){delete BMap.Convertor[f];var b=new BMap.Point(a.x,a.y);e(b)}}function c(b,c,e){var f=d+"?from="+c+"&to=4&mode=1",g=[],h=[],i=20;e=e||function(){};var j=function(){var b="cbk_"+Math.round(1e4*Math.random()),c=f+"&x="+g.join(",")+"&y="+h.join(",")+"&callback=BMap.Convertor."+b;a(c),g=[],h=[],BMap.Convertor[b]=function(a){delete BMap.Convertor[b];var c=null,d=[];for(var f in a)if(c=a[f],0===c.error){var g=new BMap.Point(c.x,c.y);d[f]=g}else d[f]=null;e(d)}};for(var k in b)k%i===0&&0!==k&&j(),g.push(b[k].lng),h.push(b[k].lat),k==b.length-1&&j()}var d="http://api.map.baidu.com/ag/coord/convert";window.BMap=window.BMap||{},BMap.Convertor=$({}),BMap.Convertor.translate=b,BMap.Convertor.translateMore=c}();