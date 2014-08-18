
define(function (require) {

    var listModule = $({});

    var listBox = $('#house-lst');

    function bindFavor(url) {

        listBox.on('click', 'a.add-favor', function (e) {

            var options = {
                ids: $(this).attr('data-id')
            };

            ajax.post(url, options, function () {
                // success
            }, function (resp) {
                // fail
            });

            return false;
        });
    }

    function bindListHover() {

        // list event
        listBox.children('li').hover(function () {
            $(this).addClass('hover');

            listModule.trigger('mouseover', {
                main: this,
                index: $(this).attr('data-index')
            });

        }, function () {
            $(this).removeClass('hover');

            listModule.trigger('mouseout', {
                main: this,
                index: $(this).attr('data-index')
            });
        });
    }

    listModule.init = function (params) {
        bindListHover();
        bindFavor(params.favorUrl);
    };

    listModule.highlight = function (index) {
        listBox.children('li:eq(' + index + ')').addClass('hover');
    };

    listModule.unhighlight = function (index) {
        listBox.children('li:eq(' + index + ')').removeClass('hover');
    };

    return listModule;
});