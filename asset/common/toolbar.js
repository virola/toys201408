/**
 * @file 工具栏模块
 * @author  virola<virola.zhu@gmail.com>
 */

define(function (require) {

    // TODO
    var exports = {};

    var options;

    exports.init = function (params) {
        options = $.extend({}, params);

    };

    var _tplMain = '<div class="toolbar">#{0}</div>';

    var _tplMiniBar = '<div class="mini-bar">#{0}</div>';
    var _tplMTab = '<div class="tab">#{0}</div>'

    exports.renderMinibar = function () {

    };

    return exports;
});

