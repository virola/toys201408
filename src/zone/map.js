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

            mapList.getEnvResults();
        });

       
    }; 

    /**
     * 地图下方信息模块
     * 
     * @type {Object}
     */
    var mapList = (function () {

        // api search
        function localSearchApi(keyword, callback) {
            callback = callback || (function () {});

            var options = {
                onSearchComplete: function(results) {
                    // 判断状态是否正确
                    if (local.getStatus() == BMAP_STATUS_SUCCESS) {

                        var s = [];
                        for (var i = 0; i < results.getCurrentNumPois(); i ++) {
                            var rs = results.getPoi(i);
                            var distance = bdMap.getDistance(rs.point, bdPoint);

                            s.push({
                                title: rs.title,
                                address: rs.address,
                                point: rs.point,
                                distance: distance
                            });
                        }

                        // console.log(s);

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
                    mapBox.addMarker(i, result);
                    updateEnvList(i, result);
                });
            });
        }

        // 显示数据信息
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
        
        // 每个类别最多显示3条
        var MAX_ITEM = 3;

        /**
         * 地图信息列表
         * 
         * @param {Array} data 
         * @return {string} HTML
         */
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

                html[i] = $.stringFormat(_tplItem, item.title, Math.round(item.distance) + '米', last);
            });

            return html.join('');
        }

        return {
            getEnvResults: getEnvResults
        };

    })();

    var mapBox = (function () {

        var _tplInfoWindow = '' 
            + '<h3 class="iw-poi-title" title="#{0}">#{0}</h3>' 
            + '<div class="iw-poi-content"><p>地址：#{1}</p></div>';

        //创建InfoWindow
        function createInfoWindow(item) {
            var iw = new BMap.InfoWindow($.stringFormat(_tplInfoWindow, item.title, item.address));
            return iw;
        }

        // 在地图上打点点
        function addMarker(index, data) {
            var url = cacheOptions.feRoot + '/asset/img/map-ico/20x20/' + index + '.png';
            var size = new BMap.Size(20, 20);
            var markerIcon = new BMap.Icon(url, size, {});

            $.each(data, function (i, item) {
                var marker = new BMap.Marker(item.point, {icon: markerIcon});
                
                marker.addEventListener('click', function () {
                    this.openInfoWindow(createInfoWindow(item));
                });
                bdMap.addOverlay(marker);
            });
        }

        return {
            addMarker: addMarker
        };

    })();

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