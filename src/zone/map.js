/**
 * @file 小区详情页的地图交互
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

    var bdLocation;
    var bdMap;
    var bdPoint;

    var SEARCH_RADIUS = 2000;


    // 将谷歌坐标转换成百度坐标，并回调
    function pointTranslate(ggPoint, callback) {
        callback = callback || new Function();

        BMap.Convertor.translate(ggPoint, 2, callback); 
    }

    mapModule.render = function (point, callback) {
        callback = callback || new Function();

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

            callback();
        });
    };


    /**
     * 真正的地图初始化函数
     */
    window.mapInitialize = function () {

        mapModule.render(cacheOptions.point, function () {

             // render完成后触发ready事件
            mapModule.trigger('ready', mapModule);

            getEnvResults();
        });

       
    }; 

    // 本地搜索服务对象
    var objLocalSearch;

    // api search
    function localSearchApi(keyword, callback) {
        callback = callback || new Function();

        var options = {
            onSearchComplete: function(results) {
                // 判断状态是否正确
                if (local.getStatus() == BMAP_STATUS_SUCCESS) {

                    var s = [];
                    for (var i = 0; i < results.getCurrentNumPois(); i ++) {
                        var rs = results.getPoi(i);
                        s.push({
                            title: rs.title,
                            address: rs.address,
                            point: rs.point
                        });
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
        local.searchNearby(keyword, bdPoint, SEARCH_RADIUS);
    }

    var envListBox = $('#zone-env-list');

    // 获取周边信息
    function getEnvResults() {

        envListBox.find('.map-key').each(function (i, item) {
            var keyword = $(this).attr('data-key') || $(this).text();

            localSearchApi(keyword, function (result) {
                // todo
                // console.log(result);
                updateEnvList(i, result);
            });
        });
    }

    function updateEnvList(index, data) {
        var list = envListBox.find('dl:eq(' + index + ')');

        var html = getListHtml(data);

        if (html) {
            list.find('ul').html(html).fadeIn();
        }
        else {
            list.fadeOut();
        }
        
    }

    var _tplItem = '<li #{2}><i class="fa fa-caret-right"></i><span class="label">#{0}</span>#{1}</li>';
    var MAX_ITEM = 3;

    function getListHtml(data) {
        var html = [];
        var length = data.length;

        $.each(data, function (i, item) {
            
            if (i > MAX_ITEM - 1) {
                return false;
            }
            var last = '';
            if (i == MAX_ITEM - 1 || i == length - 1) {
                last = 'class="last"';
            }

            html[i] = $.stringFormat(_tplItem, item.title, item.address, last);
        });

        return html.join('');
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

    return mapModule
});