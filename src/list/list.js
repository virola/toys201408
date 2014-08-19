
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
                index: $(this).attr('data-index'),
                id: $(this).attr('data-id')
            });

        }, function () {
            $(this).removeClass('hover');

            listModule.trigger('mouseout', {
                main: this,
                index: $(this).attr('data-index'),
                id: $(this).attr('data-id')
            });
        });
    }

    listModule.init = function (params) {
        bindListHover();
        bindFavor(params.favorUrl);
    };

    var listMap = {};

    listModule.getPoints = function () {
        return $.map(itemList, function (item, index) {
            var jItem = $(item);
            var id = jItem.attr('data-id');

            listMap[id] = $(item);

            return {
                id: id,
                index: index,
                rank: index + 1,
                name: jItem.find('.where').text(),
                point: jItem.attr('data-geo').split(',')
            };
        });
    };

    listModule.highlight = function (id) {
        if (!listMap[id]) {
            return;
        } 
        listMap[id].addClass('hover');
    };

    listModule.unhighlight = function (id) {
        if (!listMap[id]) {
            return;
        }
        listMap[id].removeClass('hover');
    };

    return listModule;
});