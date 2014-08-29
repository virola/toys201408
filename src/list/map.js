/**
 * @file 列表的地图交互模块
 */
define(function (require) {

    /**
     * 地图交互模块
     * 
     * @type {Object}
     */
    var mapModule = $({});

    var bdMap;

    var allPointList = [];
    var allPointMap = {};
    var markerMap = {};

    // 将谷歌坐标Array转换成百度坐标Array，并回调
    function pointTranslate(ggPoints, callback) {
        callback = callback || (function () {});

        // 参数2，表示是从GCJ-02坐标到百度坐标。参数0，表示是从GPS到百度坐标
        BMap.Convertor.translateMore(ggPoints, 2, callback); 
    }

    

    mapModule.setDatasource = function (datasource, callback) {
        var pointIndex = 0;

        // foreach add marker
        $.each(datasource, function (i, item) {
            var point = item.point;
            if (!point || point.length != 2 || !point[1] || !point[0]) {
                return;
            }

            var bdPoint = new BMap.Point(point[1], point[0]);

            allPointList.push(bdPoint);
            allPointMap[item.id] = {
                bdPoint: bdPoint,
                item: item,
                index: pointIndex++
            };
        });

        var length = allPointList.length;

        // translate ggpoints to bdpoints
        pointTranslate(allPointList, function (results) {
            if (length == results.length) {
                allPointList = results;

                $.each(allPointMap, function (id, data) {
                    var index = data.index;
                    var ggPoint = allPointList[index];
                    if (!ggPoint) {
                        return;
                    }
                    allPointMap[id].ggPoint = ggPoint;
                });

                if (callback) {
                    callback();
                }
            }
        });
    };

    mapModule.render = function (data) {

        // clear fisrt
        bdMap.clearOverlays();

        if (!data.length) {
            bdMap.centerAndZoom(cacheOptions.cityName);
            bdMap.zoomIn();
            return;
        }

        var pointList = [];

        // foreach add marker
        $.each(data, function (i, item) {
            var point = item.point;
            if (!point || point.length != 2 || !point[1] || !point[0]) {
                return;
            }

            var itemData = allPointMap[item.id];
            pointList.push(itemData.ggPoint);

            // add Marker
            var marker = new mapModule.MapOverlay(itemData.ggPoint, itemData.item);  // 创建标注
            bdMap.addOverlay(marker);
            markerMap[item.id] = marker;
        });

        // auto adjust viewport
        setTimeout(function () {
            bdMap.setViewport(pointList, {
                margins: [30, 150, 30, 30]
            });
        }, 500);
    };

    window.mapInitialize = function () {

        bdMap = new BMap.Map(cacheOptions.domId); 
        bdMap.setCurrentCity(cacheOptions.cityName);  
        bdMap.disableAutoResize();

        // control bar
        bdMap.addControl(new BMap.NavigationControl({
            anchor: BMAP_ANCHOR_TOP_RIGHT, type: BMAP_NAVIGATION_CONTROL_SMALL
        }));

        function showInfo(e){
            // console.log(e.point.lng + ", " + e.point.lat);
        }
        bdMap.addEventListener('click', showInfo);


        // 复杂的自定义覆盖物
        mapModule.MapOverlay = function(point, data) {
            this._point = point;
            this._data = data;
        };

        mapModule.MapOverlay.prototype = new BMap.Overlay();

        mapModule.MapOverlay.prototype.initialize = function (map) {
            this._map = map;
            var div = this._div = document.createElement('div');
            div.className = 'map-item';
            div.style.position = 'absolute';
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);

            var rankDiv = this._rankDiv = document.createElement('div');
            rankDiv.className = 'map-item-rank';
            $(rankDiv).text(this._data.rank);

            var nameDiv = this._nameDiv = document.createElement('div');
            $(nameDiv).addClass('map-item-name').text(this._data.name);

            div.appendChild(rankDiv);
            div.appendChild(nameDiv);

            var that = this;

            var arrow = this._arrow = document.createElement('div');
            arrow.style.background = 'url('+ cacheOptions.feRoot + '/asset/img/map-marker-arrow.png) no-repeat';
            arrow.style.position = 'absolute';
            arrow.style.width = '14px';
            arrow.style.height = '12px';
            arrow.style.top = '34px';
            arrow.style.left = '10px';
            arrow.style.overflow = 'hidden';
            div.appendChild(arrow);
            
            div.onmouseover = function () {
                that.onmouseover();

                mapModule.trigger('mouseover', that._data);
            };
        
            div.onmouseout = function () {
                that.onmouseout();

                mapModule.trigger('mouseout', that._data);
            };

            bdMap.getPanes().labelPane.appendChild(div);
          
            return div;
        };

        mapModule.MapOverlay.prototype.onmouseover = function () {
            var that = this;
            that._div.style.zIndex = 0;
            $(that._rankDiv).addClass('map-item-rank-hover');
            $(that._nameDiv).addClass('map-item-name-hover');
        };

        mapModule.MapOverlay.prototype.onmouseout = function () {
            var that = this;
            that._div.style.zIndex = BMap.Overlay.getZIndex(that._point.lat);
            $(that._rankDiv).removeClass('map-item-rank-hover');
            $(that._nameDiv).removeClass('map-item-name-hover');
        };

        mapModule.MapOverlay.prototype.draw = function(){
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - parseInt(this._arrow.style.left, 10) + 'px';
            this._div.style.top  = pixel.y - 30 + 'px';
        };

        // load完成后触发ready事件
        mapModule.trigger('ready', mapModule);
    }; 

    function loadMap(ak) {
        var script = document.createElement('script');  
        script.src = 'http://api.map.baidu.com/api?v=2.0&ak=' + ak + '&callback=mapInitialize';  
        document.body.appendChild(script);
    }

    // cache data option
    var cacheOptions;

    mapModule.init = function (options) {

        cacheOptions = $.extend({}, options);

        // 异步加载map
        loadMap(options.ak);
    };

    mapModule.highlight = function (id) {
        if (!markerMap[id]) {
            return;
        }
        markerMap[id].onmouseover();
    };

    mapModule.unhighlight = function (id) {
        if (!markerMap[id]) {
            return;
        }
        markerMap[id].onmouseout();
    };

    return mapModule;
});