/**
 * @file 小区的相册交互
 */
define(function (require) {

    var albumBox = $('#zone-album');
    var ctrlBtns = albumBox.find('.ctrl-btn');
    var albumList = albumBox.find('.album-list');

    var albumWidth = albumBox.find('.album-view-wrap').width();

    var list = albumList.children('li');
    var itemWidth = list.outerWidth() + 1;
    var listWidth = itemWidth * list.size();

    function init() {
        albumList.css({
            width: listWidth + 'px'
        });

        setCtrlBtnStyle();
        initEvents();
    }

    function setCtrlBtnStyle() {
        var offsetLeft = Math.abs(albumList.position().left);

        ctrlBtns.removeClass('disabled');

        if (listWidth <= albumWidth) {
            ctrlBtns.addClass('disabled');
        }
        else {
            if (offsetLeft <= 0) {
                ctrlBtns.filter(':eq(0)').addClass('disabled');
            }

            if (offsetLeft + albumWidth >= listWidth) {
                ctrlBtns.filter(':eq(1)').addClass('disabled');
            }
        }
    }

    function initEvents() {
        ctrlBtns.on('click', function () {
            var _me = $(this);
            if (_me.hasClass('disabled')) {
                return false;
            }

            var left = albumList.position().left;

            var command = _me.attr('data-command');
            if (command == 'prev') {
                albumList.css({
                    left: (left + itemWidth) + 'px'
                });
            }
            if (command == 'next') {
                albumList.css({
                    left: (left - itemWidth) + 'px'
                });
            }
            setCtrlBtnStyle();

            return false;
        });

    }

    return {
        init: init
    };

});