/**
 * @file 详情页的地图交互
 */
define(function (require) {

    /**
     * 地图交互模块
     * 
     * @type {Object}
     */
    var mapModule = $({});

    var mapIndicator = $('#map-indicator');

    var bdLocation;
    var bdMap;
    var bdPoint;

    mapModule.render = function (point, data) {
        bdPoint = new BMap.Point(point[1], point[0]);

        bdMap = new BMap.Map(cacheOptions.domId);   
        bdMap.centerAndZoom(bdPoint, 15);

        // control bar
        bdMap.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL
        }));

        // add Marker
        bdMap.addOverlay(new BMap.Marker(bdPoint));
    };

    function localSearch(keyword) {
        console.log(keyword);

        bdLocation = new BMap.LocalSearch(bdMap, {
            renderOptions: { map: bdMap, autoViewport: false}
        });

        bdMap.clearOverlays();
        bdMap.addOverlay(new BMap.Marker(bdPoint));

        bdLocation.searchNearby(keyword, bdPoint, 1000);
    }

    function localSearchApi(keyword, callback) {

        callback = callback || new Function();

        var options = {
            onSearchComplete: function(results){
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS) {
                    var s = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i ++) {
                        s.push(results.getPoi(i).title + ", " + results.getPoi(i).address);
                    }

                    callback(s);

                    mapModule.trigger('serviceReady', {
                        key: keyword,
                        result: s
                    });
                }
                else {
                    callback([]);
                }
            }
        };

        var local = new BMap.LocalSearch(bdMap, options);

        local.searchNearby(keyword, bdPoint, 1000);
    }


    /**
     * 真正的地图初始化函数
     */
    window.mapInitialize = function () {

        mapModule.render(cacheOptions.point);

        // render完成后触发ready事件
        mapModule.trigger('ready', mapModule);

        getEnvResults();

        bindIndicator();
    }; 

    // 绑定左侧点击事件
    function bindIndicator() {
        mapIndicator.find('a').on('click', function () {
            var _me = $(this);
            var keyword = _me.children('h5').text();

            localSearch(keyword);

            return false;
        });
    }

    // 获取周边信息
    function getEnvResults() {
        mapIndicator.find('h5').each(function (i, item) {
            var keyword = $(this).attr('data-key') || $(this).text();
            localSearchApi(keyword, function (result) {
                updateCount(i, result.length);
            });
        });
    }

    function updateCount(index, num) {
        mapIndicator.find('a').filter(':eq(' + index + ')').children('.count').text(num);
    }

    mapModule.getLocalService = getEnvResults;

    function loadMap(ak) {
        var script = document.createElement('script');  
        script.src = 'http://api.map.baidu.com/api?v=1.5&ak=' + ak + '&callback=mapInitialize';  
        document.body.appendChild(script);
    }

    // cache data option
    var cacheOptions;

    mapModule.init = function (options) {

        cacheOptions = $.extend({}, options);

        // 异步加载map
        loadMap(options.ak);
    };

    return mapModule
});