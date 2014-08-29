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

    // cache data option
    var cacheOptions;

    var mapIndicator = $('#map-indicator');
    var envList = $('#env-list');

    var bdLocation;
    var bdMap;
    var bdPoint;
    var bdLocalSearch;

    var SEARCH_RADIUS = 3000;

    var _isMapReady;


    // 将谷歌坐标转换成百度坐标，并回调
    function pointTranslate(ggPoint, callback) {
        callback = callback || (function () {});

        BMap.Convertor.translate(ggPoint, 2, callback); 
    }

    mapModule.render = function (point, callback) {
        callback = callback || (function () {});

        bdPoint = new BMap.Point(point[1], point[0]);

        // 如果不需要转换谷歌坐标，那么把这个wrapper函数和新赋值注释掉就可以了
        pointTranslate(bdPoint, function (newPoint) {

            bdPoint = newPoint;

            bdMap = new BMap.Map(cacheOptions.domId);   
            bdMap.centerAndZoom(bdPoint, 15);

            // control bar
            bdMap.addControl(new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL
            }));

            // add Marker
            bdMap.addOverlay(new BMap.Marker(bdPoint));

            // ls
            bdLocalSearch = new BMap.LocalSearch(bdMap, {
                renderOptions: {
                    map: bdMap,
                    panel: 'map-result-list'
                }
            });

            callback();
        });
    };

    // function bdSearch(keyword, searchObj, needClear) {
    //     if (!searchObj) {
    //         return false;
    //     }
    //     if (needClear) {
    //         searchObj.clearResults();
    //     }

    //     searchObj.searchNearby(keyword, bdPoint, SEARCH_RADIUS);
    // }


    /**
     * 真正的地图初始化函数
     */
    window.mapInitialize = function () {
        bindIndicator();

        mapModule.render(cacheOptions.point, function () {
            _isMapReady = 1;



             // render完成后触发ready事件
            mapModule.trigger('ready', mapModule);

            var key = mapIndicator.find('a.on').text();
            getEnvResults(key);

        });

       
    }; 

    // 本地搜索服务对象
    var objLocalSearch;

    // 绑定左侧点击事件
    function bindIndicator() {
        var ctrls = mapIndicator.find('a');

        ctrls.on('click', function () {
            var _me = $(this);
            if (_me.hasClass('on')) {
                return false;
            }

            var keyword = _me.attr('data-key') || _me.text();

            ctrls.removeClass('on');
            _me.addClass('on');

            getEnvResults(keyword, true);

            return false;
        });
    }

    // api search
    function localSearchApi(keyword, callback, needClear) {
        if (!_isMapReady) {
            return false;
        }
        callback = callback || (function () {});

        bdLocalSearch.setSearchCompleteCallback(function(results) {
            // 判断状态是否正确
            if (bdLocalSearch.getStatus() == BMAP_STATUS_SUCCESS) {
                var s = [];
                for (var i = 0; i < results.getCurrentNumPois(); i ++) {
                    s.push(results.getPoi(i));
                }

                callback(s);
            }
            else {
                callback([]);
            }
        });

        // bdLocalSearch.setResultsHtmlSetCallback(function (html) {
        //     console.log(html);
        // });
        
        if (needClear) {
            bdLocalSearch.clearResults();
        }
        
        bdLocalSearch.searchNearby(keyword, bdPoint, SEARCH_RADIUS);
    }

    var envResultList = envList.find('.result-list');

    var _tplItem = '<dl></dl>';

    // 获取周边信息
    function getEnvResults(keyword, needClear) {

        localSearchApi(keyword, function (result) {

            var html = $.map(result, function (item) {
                var distance = bdMap.getDistance(item.point, bdPoint);
                return $.stringFormat(_tplItem, {
                    title: item.title,
                    desc: item.address,
                    distance: distance
                });
            });

            envList.find('h3').text(keyword);
            // envResultList.html(html.join(''));

            // updateCount(i, result.length);
            // searchObj.searchNearby(keyword, bdPoint, SEARCH_RADIUS);
        }, needClear);
    }

    mapModule.getLocalService = getEnvResults;

    function loadMap(ak) {
        var script = document.createElement('script');  
        script.src = 'http://api.map.baidu.com/api?v=1.5&ak=' + ak + '&callback=mapInitialize';  
        document.body.appendChild(script);
    }

    mapModule.init = function (options) {

        cacheOptions = $.extend({}, options);

        // 异步加载map
        loadMap(options.ak);
    };

    return mapModule;
});