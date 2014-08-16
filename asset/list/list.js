
define(function (require) {

    var listModule = {};

    var listBox = $('#house-lst');

    listModule.init = function (params) {

        bindFavor(params.favorUrl);
    };

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

    return listModule;
});