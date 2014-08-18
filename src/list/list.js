
define(function (require) {

    var listModule = $({});

    var listBox = $('#house-lst');
    var itemList = listBox.children('li').not('.list-no-data');

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
        itemList.hover(function () {
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

    listModule.getPoints = function () {
        return $.map(itemList, function (item, index) {
            var jItem = $(item);

            return {
                id: jItem.attr('data-id'),
                index: index,
                rank: index + 1,
                name: jItem.find('.where').text(),
                point: jItem.attr('data-geo').split(',')
            };
        });
    };

    listModule.highlight = function (index) {
        listBox.children('li:eq(' + index + ')').addClass('hover');
    };

    listModule.unhighlight = function (index) {
        listBox.children('li:eq(' + index + ')').removeClass('hover');
    };

    return listModule;
});