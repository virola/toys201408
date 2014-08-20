/**
 * @file 谷歌地图转换百度地图JS模块
 */
(function () {  

    var transUrl = 'http://api.map.baidu.com/ag/coord/convert';

    function load_script(xyUrl, callback) {
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = xyUrl;

        //借鉴了jQuery的script跨域方法
        script.onload = script.onreadystatechange = function(){
            if((!this.readyState || this.readyState === 'loaded' || this.readyState === 'complete')){
                callback && callback();
                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;
                if ( head && script.parentNode) {
                    head.removeChild( script );
                }
            }
        };
        // Use insertBefore instead of appendChild  to circumvent an IE6 bug.
        head.insertBefore( script, head.firstChild );
    }

    function translate(point, type, callback) {
        var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
        var xyUrl = transUrl + '?from='+ type + '&to=4&x=' + point.lng + '&y=' + point.lat + '&callback=BMap.Convertor.' + callbackName;
        
        //动态创建script标签
        load_script(xyUrl);
        BMap.Convertor[callbackName] = function (xyResult) {
            delete BMap.Convertor[callbackName];    //调用完需要删除改函数
            var point = new BMap.Point(xyResult.x, xyResult.y);
            callback && callback(point);
        }
    }

    function translateMore(points, type, callback) {
        var xyUrl = transUrl + '?from=' + type + '&to=4&mode=1';
        var xs = [];
        var ys = [];
        var maxCnt = 20; //每次发送的最大个数

        var send = function () {
            var callbackName = 'cbk_' + Math.round(Math.random() * 10000);    //随机函数名
            var url = xyUrl + '&x=' + xs.join(',') + '&y=' + ys.join(',') + '&callback=BMap.Convertor.' + callbackName;
            //动态创建script标签
            load_script(url);
            xs = [];
            ys = [];

            BMap.Convertor[callbackName] = function (xyResults) {
                delete BMap.Convertor[callbackName];    //调用完需要删除改函数

                var xyResult = null;
                var points = [];

                for (var index in xyResults) {
                    xyResult = xyResults[index];

                    if (xyResult.error != 0) {

                        //出错就直接返回;
                        points[index] = null;
                        continue;
                    }

                    var point = new BMap.Point(xyResult.x, xyResult.y);
                    points[index] = point;
                }

                callback && callback(points);
            }
        };

        for (var index in points) {
            if(index % maxCnt == 0 && index != 0){
                send();
            }

            xs.push(points[index].lng);
            ys.push(points[index].lat);
            if(index == points.length - 1){
                send();
            }
        }
        
    }

    window.BMap = window.BMap || {};
    BMap.Convertor = $({});
    BMap.Convertor.translate = translate;
    BMap.Convertor.translateMore = translateMore;
})();