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


$.strHtml = function (source, opts) {
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

    $('.lazyload').scrollLoading({
        callback: function () {
            $(this).addClass('loaded');
        }
    });

    
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
