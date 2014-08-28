
define(function (require) {

    var exports = {};

    var filterPanel = $('#filter-bar');

    var filterBar = $('#filter-display-bar');
    var filterClearBtn = $('#filter-empty');

    var filterWrap = $('#filter-options').find('dl');
    var optionsList = filterWrap.find('.option-list');

    var customFilters = filterWrap.find('.custom');

    var _tplFilter = '<a href="#{1}"><span>#{0}</span><span class="del">&times;</span></a>';

    function render() {
        var checkedOptions = optionsList.find('a:gt(0)').filter('.on');

        var urls = $.map(checkedOptions, function (item) {
            return $(item).parent('.option-list').find('a:first').attr('href');
        });

        var filters = $.map(checkedOptions, function (dom, index) {
            return $.stringFormat(_tplFilter, $.encodeHTML(dom.innerHTML), urls[index]);
        });

        // add customed
        $.each(customFilters, function (i, row) {
            var key = $(row).attr('data-type');
            var label = '万';
            if (key == 'square') {
                label = '㎡';
            }

            var customed = $(row).find(':text').filter(function (index) {
                return $.trim($(this).val()) > 0;
            });

            if (customed.size()) {
                var text = customed.get(0).value + '-' + customed.get(1).value + label;
                var url = $(customed.get(0)).closest('dd').find('a:first').attr('href');

                filters.push(
                    $.stringFormat(_tplFilter, text, url)
                );
            }
        });

        // add keyword
        var keyword = $.trim($('#keyword-box').val());
        if (keyword) {
            var url = cacheOptions.baseUrl.replace('n#placeHolder#', '').replace(/\/s([\s\S]*)/, '');
            var text = '关键词: ' + keyword;

            filters.push(
                $.stringFormat(_tplFilter, text, url)
            );
        }
        
        // gen filter doms
        $(filters.join('')).insertBefore(filterClearBtn);

        // NO FILTER LINK SHOW
        if (filters.length) {
            filterClearBtn.show();
        }
        else {
            filterPanel.hide();
        }
    }

    // 初始化自定义筛选的区域事件
    function initCustomBtn() {

        customFilters.each(function (i, item) {
            var customBox = $(this);
            var inputs = customBox.find(':text');
            var okBtn = customBox.find('.ok');

            var getValues = function () {
                var hasValues = $.map(inputs, function (item) {
                    var val = $.trim($(item).val());
                    return (val > 0) ? true : null;
                });

                return hasValues;
            };

            var setOkBtnStyle = function () {
                var length = getValues().length;
                if (length == 2) {
                    okBtn.show();
                }
                else {
                    okBtn.hide();
                }
            };

            var regex = /x\d+y\d+/;
            var tpl = 'x#{0}y#{1}';

            if (customBox.attr('data-type') == 'square') {
                regex = /i\d+j\d+/;
                tpl = 'i#{0}j#{1}';
            }

            setOkBtnStyle();

            // var timer;
            inputs.on('keyup', function () {
                setOkBtnStyle();
            });


            okBtn.on('click', function () {
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

                var text = $.map(inputs, function (item) {
                    return $.trim($(item).val());
                });


                var url = cacheOptions.baseUrl.replace(/p\d+/, '');
                var replaceText = $.stringFormat(tpl, text[0], text[1]);

                if (regex.test(url)) {
                    url = url.replace(regex, replaceText)
                        .replace('n#placeHolder#', '');
                }
                else {
                    url = url.replace('n#placeHolder#', replaceText);
                }
                
                window.location.href = url;
            });
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