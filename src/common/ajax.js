/**
 * @file  通用ajax模块
 */

var ajax = (function () {

    var exports = {};
    
    /**
     * GET方法
     * 
     * @param {string} url 
     * @param {Function} callback 
     */
    exports.get = function (url, param, success, failure) {
        $.getJSON(url, param, function (response) {
            if (response.status == 0) {
                success(response.data);
            }
            else {
                failure(response);
            }
        }, function (response) {
            var resp = {
                status: 500,
                statusInfo: '服务请求失败'
            };
            failure(resp);
        });
    };

    return exports;

})();
