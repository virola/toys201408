
define(function (require) {

    var albumModule = {};

    var albumBox = $('#album-box');
    var ctrlBtn = albumBox.find('a.ctrl-btn');

    var albumWrap = albumBox.find('.album-view-wrap');
    var albumList = albumWrap.children('ul');
    var albumThumbs = albumList.find('li');
    var picCount = albumThumbs.size();

    var showBox = albumBox.find('.pic-panel');

    var currentIndex = 0;

    function init() {
        ctrlBtn.on('click', function () {
            var _me = $(this);
            var cmd = _me.attr('data-command');
            var newIndex;

            if (cmd == 'prev') {
                newIndex = currentIndex - 1;
            }
            else if(cmd == 'next') {
                newIndex = currentIndex + 1;
            }

            if (newIndex < 0) {
                newIndex = picCount - 1;
            }

            if (newIndex > picCount - 1) {
                newIndex = 0;
            }

            switchPic(newIndex);

            return false;
        });


        albumThumbs.on('click', function () {

            var _me = $(this);
            var index = +_me.attr('data-index');

            if (index != currentIndex) {
                switchPic(index);
            }

            return false;
        });
    }

    function switchPic(index) {
        var target = $(albumThumbs.get(index));
        albumThumbs.removeClass('on');
        target.addClass('on');

        if ($.showIframeImg) {
            showBox.children('iframe').remove();
            $.showIframeImg(showBox, target.attr('data-large'));
            showBox.children('iframe').show();
        }
        else {
            showBox.find('img').attr('src', target.attr('data-large'));
        }

        

        currentIndex = index;

        adjustLoc();
    }

    function adjustLoc() {
        var target = $(albumThumbs.get(currentIndex));
        var listOffset = albumList.position().top;

        var adjustHeight = target.position().top + target.outerHeight() - albumWrap.height();

        adjustHeight -= 10;

        if (adjustHeight > 0) {
            albumList.css({
                top: - adjustHeight + 'px'
            });
        }
        else {
            albumList.css({
                top: '14px'
            });
        }
    }

    albumModule.init = init;

    return albumModule;
});