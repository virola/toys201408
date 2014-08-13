
$(function () {

    if (/msie (\d+\.\d+)/i.test(navigator.userAgent)) {
        $(document.body).addClass('ie', 'ie' + (document.documentMode || + RegExp['\x241']));
    }

    $('.lazyload').scrollLoading({
        callback: function () {
            $(this).addClass('loaded');
        }
    });
    
});

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