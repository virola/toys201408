/**
 * @file  通用ajax模块
 */

var ajax = (function () {

    var exports = {};

    var _blankFn = function () {};
    
    /**
     * GET方法
     * 
     * @param {string} url 
     * @param {Function} callback 
     */
    exports.get = function (url, param, success, failure) {
        success = success || _blankFn;
        failure = failure || _blankFn;

        if (!url) {
            return false;
        }

        $.getJSON(url, param, function (response) {
            if (response.status === 0) {
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

    exports.post = function (url, param, success, failure) {
        success = success || _blankFn;
        failure = failure || _blankFn;
        
        if (!url) {
            return false;
        }
        
        $.ajax({
            type: 'POST',
            url: url,
            data: param,
            success: function (response) {
                if (response.status === 0) {
                    success(response.data);
                }
                else {
                    failure(response);
                }
            },
            failure: function (response) {
                var resp = {
                    status: 500,
                    statusInfo: '服务请求失败'
                };
                failure(resp);
            },
            dataType: 'json'
        });
    };

    return exports;

})();

