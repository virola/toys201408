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

        var formTop = this.offset().top - settings.marginTop;
        var el = this;
        var missingHeight = el.height() + settings.marginTop;
        var blankArea = $('<div/>').css({
            'display' : el.css('display'),
            'width' : el.outerWidth(true),
            'height' : el.outerHeight(true),
            'float' : el.css('float')
        });

        $(window).scroll(function(e){ 
            //Set position of sub navogation
            var y = formTop;
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
