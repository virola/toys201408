
define(function (require) {

    var exports = {};

    var filterBar = $('#filter-display-bar');
    var filterClearBtn = $('#filter-empty');

    var filterOptions = $('#filter-options');
    var filterList = filterOptions.find('dl');

    var _tplFilter = '<a href="#{1}"><span>#{0}</span><span class="del">&times;</span></a>';

    function render() {
        var urls = [];
        var checkedOptions = filterList.find('a:gt(0)').filter('.on');

        var urls = $.map(checkedOptions, function (item) {
            var index = $(item).attr('data-index');
            return $(filterList.get(index)).find('dd a:first').attr('href');
        });

        var filters = $.map(checkedOptions, function (dom, index) {
            return $.stringFormat(_tplFilter, $.encodeHTML(dom.innerHTML), urls[index]);
        });

        // add customed
        var customed = filterList.find(':text').filter(function (index) {
            return $.trim($(this).val()) > 0;
        });

        if (customed.size()) {
            var text = customed.get(0).value + '-' + customed.get(1).value + '万';
            var url = $(customed.get(0)).closest('dd').find('a:first').attr('href');

            filters.push(
                $.stringFormat(_tplFilter, text, url)
            );
        }

        // add keyword
        // var keyword = $.trim($('#keyword-box').val());
        // if (keyword) {
        //     var url = cacheOptions.baseUrl.replace('\/s(\s+)', '');
        //     var text = '关键词: ' + keyword;

        //     filters.push(
        //         $.stringFormat(_tplFilter, text, url)
        //     );
        // }


        // gen filter doms
        $(filters.join('')).insertBefore(filterClearBtn);

        // NO FILTER LINK SHOW
        if (checkedOptions.size()) {
            filterClearBtn.show();
        }
    }


    function initCustomBtn() {
        var customBox = filterOptions.find('.custom');
        var inputs = customBox.find(':text');

        customBox.find('.ok').on('click', function () {
            var pass = 1;

            inputs.each(function (i, item) {
                var _me = $(item);
                var value = $.trim(_me.val());

                if (!value) {
                    _me.parent().addClass('txt-box-err');
                    pass = 0;
                }
                else {
                    _me.parent().removeClass('txt-box-err');
                }
            });

            if (!pass) {
                return false;
            }

            var prices = $.map(inputs, function (item) {
                return $.trim($(item).val());
            });


            var url = cacheOptions.baseUrl.replace('#placeHolder#', '')
                .replace(/x\d+y\d+/, 'x' + prices[0] + 'y' + prices[1]);

            window.location.href = url;
        });
    }

    var cacheOptions;

    exports.init = function (params) {
        cacheOptions = $.extend({}, params);
        render();

        initCustomBtn();
    };

    return exports;
});