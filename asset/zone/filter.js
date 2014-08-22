
define(function (require) {


    var selectBoxes = $('#filter-options .filter-select-wrap');

    function init() {
        
        require(['jquery-ui'], function () {
            $.widget( 'custom.linkselectmenu', $.ui.selectmenu, {
                _renderItem: function( ul, item ) {
                    var li = $( '<li>' );
             
                    if ( item.disabled ) {
                        li.addClass( 'ui-state-disabled' );
                    }
             
                    var link = $( '<a>', { 
                        text: item.label,
                        'href': item.element.attr( 'data-url' )
                    });

                    if (item.element.attr('data-class')) {
                        link.addClass('on');
                    }

                    link.appendTo( li );
         
                    return li.appendTo( ul );
                }
            });

            selectBoxes.linkselectmenu({
                select: function( ev, ui ) {
                    var li = $(ev.currentTarget);
                    var link = li.find('a');
                    var url = li.find('a').attr('href');

                    if (url) {
                        window.location.href = url;
                    }
                }
            });
        });
    }

    return {
        init: init
    };
});