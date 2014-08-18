/**
 * @file 房源详情页逻辑模块
 */
define(function (require) {

    /**
     * 地图交互模块
     * 
     * @type {[type]}
     */
    var Map = (function () {
        var exports = $({});

        var bdLocation;
        var bdMap;
        var bdPoint;

        var renderData = function (data) {

        };

        exports.render = function (point, data) {
            bdPoint = new BMap.Point(point[1], point[0]);

            bdMap = new BMap.Map(cacheOptions.domId);   
            bdMap.centerAndZoom(bdPoint, 17);

            // control bar
            bdMap.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL
            }));

            // add Marker
            var marker = new BMap.Marker(bdPoint);  // 创建标注
            bdMap.addOverlay(marker);

            // generate a info window
            var bdInfoWindow = new BMap.InfoWindow('marker');
            marker.addEventListener('click', function () {
                this.openInfoWindow(bdInfoWindow);
            });

            // cache location object
            bdLocation = new BMap.LocalSearch(bdMap, {
                renderOptions: { map: bdMap, autoViewport: true}
            });

            
        };

        window.mapInitialize = function () {

            exports.render(cacheOptions.point);

            // render完成后触发ready事件
            exports.trigger('ready', exports);
        }; 

        function loadMap(ak) {
            var script = document.createElement('script');  
            script.src = 'http://api.map.baidu.com/api?v=1.5&ak=' + ak + '&callback=mapInitialize';  
            document.body.appendChild(script);
        }

        // cache data option
        var cacheOptions;

        exports.init = function (options) {

            cacheOptions = $.extend({}, options);

            // 异步加载map
            loadMap(options.ak);
        };

        exports.searchNear = function (keyword) {
            bdLocation && bdLocation.searchNearby(keyword);
        };

        return exports
    })();

    return {
        init: function (params) {

            // charts
            var data = params.priceData;
            require('./chart').init(params.chartDomId, data);

            // map
            Map.init({
                ak: params.ak,
                domId: params.mapDomId,
                point: params.coordinates
            });

            Map.on('ready', function () {
                console.log('render finish~');
            });
        }
    };
});