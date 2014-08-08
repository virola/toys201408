/**
 * @file  房源列表页的交互逻辑
 */
define(function (require) {    

    function initPageEvents() {

        // list event
        $('#house-lst li').hover(function () {
            $(this).addClass('hover');
        }, function () {
            $(this).removeClass('hover');
        });


        // elements fixtop
        $('#filter-bar').fixtop({
            fixedWidth: '1098px'
        });
        
        // $('#list-side').fixtop({
        //     marginTop: 50 + 22,
        //     fixedWidth: '382px',
        //     fixed: function (sideElement) {
        //         var neighbor = $(sideElement).prev();
        //         var left = neighbor.outerWidth() + neighbor.position().left + 23;
        //         sideElement.css({
        //             left: left + 'px',
        //             marginBottom: (283 + 83 + 168) + 'px'
        //         });
        //         sideElement.addClass('fixed');
        //     },
        //     unfixed: function (sideElement) {
        //         sideElement.css({
        //             left: ''
        //         })
        //     }
        // });
    }


    function bindWindowScroll() {

    }

    return {
        init: function () {
            initPageEvents();
        }
    };

});