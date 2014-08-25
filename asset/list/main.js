define("list",["require"],function(e){function i(e){n.on("click","a.add-favor",function(t){var n=$(this),r={id:$(this).attr("data-id")};return ajax.post(e,r,function(){n.hide()},function(e){}),!1})}function s(){r.hover(function(){$(this).addClass("hover"),t.trigger("mouseover",{main:this,index:$(this).attr("data-index"),id:$(this).attr("data-id")})},function(){$(this).removeClass("hover"),t.trigger("mouseout",{main:this,index:$(this).attr("data-index"),id:$(this).attr("data-id")})})}var t=$({}),n=$("#house-lst"),r=n.children("li").not(".list-no-data");t.init=function(e){s(),i(e.favorUrl)};var o={};t.getPoints=function(){return $.map(r,function(e,t){var n=$(e),r=n.attr("data-id");return o[r]=$(e),{id:r,index:t,rank:t+1,name:n.find(".where").text(),point:n.attr("data-geo").split(",")}})},t.highlight=function(e){if(!o[e])return;o[e].addClass("hover")},t.unhighlight=function(e){if(!o[e])return;o[e].removeClass("hover")};var u='<li data-index="#{index}" data-id="#{houseId}" data-geo="#{latitude},#{longitude}"><div class="pic-panel"><a href="#{viewUrl}"><img class="lazyload" src="#{imgSrc}" alt="#{title}" width="165" height="120"/></a><div class="pic-num"><i class="ico-pic"></i><span class="num">#{imgCount}</span></div></div><div class="info-panel"><h2><a href="#{viewUrl}" title="#{title}"><span>#{rank}</span>#{title}</a></h2><div class="summary"><div class="where">#{region}</div><div class="type"><span class="num">#{bedroom}</span>室<span class="num">#{livingroom}</span>厅</div><div class="square"><span class="num">#{square}</span>平米</div><div class="price"><span class="num">#{price}</span>#{priceUnit}</div></div><div class="other"><div class="con">#{desc}</div><div class="price-pre">#{averagePrice} 元/平</div></div><div class="fd"><div class="left"><a href="#{agencyUrl}" title="#{agency}"><img src="#{agencyLogo}" alt="#{agency}" /></a></div><div class="right"><a href="#" class="add-favor star" data-id="#{houseId}"><i class="ico ico-star"></i></a><a href="#{viewUrl}" class="go-detail">详情</a></div></div></div></li>',a=$("#rec-house-list");return t.renderRec=function(e){var t=$.map(e,function(e,t){var n=$.extend({index:t,rank:t+1,latitude:e.coordinates.latitude,longitude:e.coordinates.longitude},e);return $.strHTML(u,n)});a.html(t.join("")).show()},t}),define("map",["require"],function(e){function o(e,t){t=t||function(){},BMap.Convertor.translateMore(e,2,t)}function u(e){var t=document.createElement("script");t.src="http://api.map.baidu.com/api?v=2.0&ak="+e+"&callback=mapInitialize",document.body.appendChild(t)}var t=$({}),n,r=[],i={},s={};t.addPoint=function(e){var t=e.point;if(!t||t.length!=2||!t[1]||!t[0])return!1;var n=new BMap.Point(t[1],t[0]);r.push(n),i[e.id]={point:n,item:e}},t.render=function(e){$.each(e,function(e,n){t.addPoint(n)});var u=r.length;if(!e.length||!u){n.centerAndZoom(a.cityName),n.zoomIn();return}o(r,function(e){e.length==u?(r=e,$.each(i,function(e,r){var i=new t.MapOverlay(r.point,r.item);n.addOverlay(i),s[e]=i}),setTimeout(function(){n.setViewport(r,{delay:500})},1e3)):(r=[],n.centerAndZoom(a.cityName),n.zoomIn())})},window.mapInitialize=function(){function e(e){}n=new BMap.Map(a.domId),n.centerAndZoom(a.cityName),n.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_SMALL})),n.addEventListener("click",e),t.MapOverlay=function(e,t){this._point=e,this._data=t},t.MapOverlay.prototype=new BMap.Overlay,t.MapOverlay.prototype.initialize=function(e){this._map=e;var r=this._div=document.createElement("div");r.className="map-item",r.style.position="absolute",r.style.zIndex=BMap.Overlay.getZIndex(this._point.lat);var i=this._rankDiv=document.createElement("div");i.className="map-item-rank",$(i).text(this._data.rank);var s=this._nameDiv=document.createElement("div");$(s).addClass("map-item-name").text(this._data.name),r.appendChild(i),r.appendChild(s);var o=this,u=this._arrow=document.createElement("div");return u.style.background="url("+a.feRoot+"/asset/img/map-marker-arrow.png) no-repeat",u.style.position="absolute",u.style.width="14px",u.style.height="12px",u.style.top="34px",u.style.left="10px",u.style.overflow="hidden",r.appendChild(u),r.onmouseover=function(){o.onmouseover(),t.trigger("mouseover",o._data)},r.onmouseout=function(){o.onmouseout(),t.trigger("mouseout",o._data)},n.getPanes().labelPane.appendChild(r),r},t.MapOverlay.prototype.onmouseover=function(){var e=this;e._div.style.zIndex=0,$(e._rankDiv).addClass("map-item-rank-hover"),$(e._nameDiv).addClass("map-item-name-hover")},t.MapOverlay.prototype.onmouseout=function(){var e=this;e._div.style.zIndex=BMap.Overlay.getZIndex(e._point.lat),$(e._rankDiv).removeClass("map-item-rank-hover"),$(e._nameDiv).removeClass("map-item-name-hover")},t.MapOverlay.prototype.draw=function(){var e=this._map,t=e.pointToOverlayPixel(this._point);this._div.style.left=t.x-parseInt(this._arrow.style.left,10)+"px",this._div.style.top=t.y-30+"px"},t.trigger("ready",t)};var a;return t.init=function(e){a=$.extend({},e),u(e.ak)},t.highlight=function(e){if(!s[e])return;s[e].onmouseover()},t.unhighlight=function(e){if(!s[e])return;s[e].onmouseout()},t}),define("recommend",["require"],function(e){var t=$("#rec-dom"),n={},r='<div class="item"><div class="pic"><a target="_blank" href="#{url}"><img class="lazyload loaded" src="#{imgSrc}" alt="#{title}" /></a></div><div class="txt"><a target="_blank" href="#{url}">#{title}</a> / #{avePrice}元/㎡</div>#{houseCnt}套在售  #{browseCnt}人浏览</div>';return n.render=function(e){t.find(".recommend-lst").html($.map(e,function(e){return $.stringFormat(r,e)}).join("")),t.show()},n.start=function(e){var t=e.url,r=$.extend({},e.reqData);ajax.get(t,{},function(e){var t=e.result||e.list||[];t instanceof Array&&t.length>0&&n.render(t)},function(e){})},n}),define("filter",["require"],function(e){function a(){var e=s.find("a:gt(0)").filter(".on"),t=$.map(e,function(e){var t=$(e).attr("data-index");return $(s.get(t)).find("dd a:first").attr("href")}),n=$.map(e,function(e,n){return $.stringFormat(u,$.encodeHTML(e.innerHTML),t[n])});$.each(o,function(e,t){var r=$(t).attr("data-type"),i="万";r=="square"&&(i="㎡");var s=$(t).find(":text").filter(function(e){return $.trim($(this).val())>0});if(s.size()){var o=s.get(0).value+"-"+s.get(1).value+i,a=$(s.get(0)).closest("dd").find("a:first").attr("href");n.push($.stringFormat(u,o,a))}}),$(n.join("")).insertBefore(r),e.size()&&r.show()}function f(){o.each(function(e,t){var n=$(this),r=n.find(":text"),i=n.find(".ok"),s=function(){var e=$.map(r,function(e){return $.trim($(e).val())>0});return e},o=function(){var e=s().length;e==2?i.show():i.hide()},u=/x\d+y\d+/,a="x#{0}y#{1}";n.attr("data-type")=="square"&&(u=/i\d+j\d+/,a="i#{0}j#{1}"),o(),r.on("keypress",function(){o()}),i.on("click",function(){var e=1;r.each(function(t,n){var r=$(n),i=$.trim(r.val());i?r.parent().removeClass("txt-box-err"):(r.parent().addClass("txt-box-err"),e=0)});if(!e)return!1;var t=$.map(r,function(e){return $.trim($(e).val())}),n=l.baseUrl.replace(/p\d+/,""),i=$.stringFormat(a,t[0],t[1]);u.test(n)?n=n.replace(u,i).replace("n#placeHolder#",""):n=n.replace("n#placeHolder#",i),window.location.href=n})})}var t={},n=$("#filter-display-bar"),r=$("#filter-empty"),i=$("#filter-options"),s=i.find("dl"),o=s.find(".custom"),u='<a href="#{1}"><span>#{0}</span><span class="del">&times;</span></a>',l;return t.init=function(e){l=$.extend({},e),a(),f()},t}),define("main",["require","./list","./map","./recommend","./filter"],function(e){function r(){s(),$("#filter-bar").fixtop({fixedWidth:"1098px"})}function s(){var e=50,t=i.parent().position().top,n=i.parent().height(),r=i.outerHeight(),s=function(){var s=$(window).scrollTop(),o=i.position().top,u=e+s-t;if(t+e<s){i.addClass("fixed");if(s+r+e>t+n){i.css({top:n-r+"px"});return}i.css({top:u+"px"})}else i.removeClass("fixed"),i.css({top:0})},o;$(window).on("scroll",function(){$.browser.ie?(o&&clearTimeout(o),o=setTimeout(function(){s()},100)):s()})}var t=e("./list"),n=e("./map"),i=$("#list-side");return{init:function(i){r(),e("./recommend").start({url:i.recommendUrl,reqData:i.reqData}),e("./filter").init({baseUrl:i.baseUrl}),t.init({favorUrl:i.favorUrl}),n.init({ak:i.mapak,domId:i.mapDomId,cityName:i.cityName,feRoot:i.feRoot});var s=t.getPoints();n.on("ready",function(){n.render(s),t.on("mouseover",function(e,t){n.highlight(t.id)}).on("mouseout",function(e,t){n.unhighlight(t.id)}),n.on("mouseover",function(e,n){t.highlight(n.id)}).on("mouseout",function(e,n){t.unhighlight(n.id)})})}}});