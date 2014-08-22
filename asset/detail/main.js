define("map",["require"],function(e){function a(e,t){t=t||new Function,BMap.Convertor.translate(e,2,t)}function f(e,t,n){n&&t&&t.clearResults(),t&&t.searchNearby(e,o,u)}function c(){l=new BMap.LocalSearch(s,{renderOptions:{map:s,autoViewport:!1}}),r.find("a").on("click",function(){var e=$(this),t=e.children("h5"),n=t.attr("data-key")||t.text();return f(n,l),!1})}function h(e,n){n=n||new Function;var r={onSearchComplete:function(r){if(i.getStatus()==BMAP_STATUS_SUCCESS){var s=[];for(var o=0;o<r.getCurrentNumPois();o++)s.push(r.getPoi(o).title+", "+r.getPoi(o).address);n(s),t.trigger("serviceReady",{key:e,result:s})}else n([])}},i=new BMap.LocalSearch(s,r);i.searchNearby(e,o,u)}function p(){r.find("h5").each(function(e,t){var n=$(this).attr("data-key")||$(this).text();h(n,function(t){d(e,t.length)})})}function d(e,t){r.find("a").filter(":eq("+e+")").children(".count").text(t)}function v(e){var t=document.createElement("script");t.src="http://api.map.baidu.com/api?v=1.5&ak="+e+"&callback=mapInitialize",document.body.appendChild(t)}var t=$({}),n,r=$("#map-indicator"),i,s,o,u=2e3;t.render=function(e,t){t=t||new Function,o=new BMap.Point(e[1],e[0]),a(o,function(e){o=e,s=new BMap.Map(n.domId),s.centerAndZoom(o,15),s.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_SMALL})),s.addOverlay(new BMap.Marker(o)),t()})},window.mapInitialize=function(){t.render(n.point,function(){t.trigger("ready",t),p(),c()})};var l;return t.getLocalService=p,t.init=function(e){n=$.extend({},e),v(e.ak)},t}),define("album",["require"],function(e){function l(){r.on("click",function(){var e=$(this),t=e.attr("data-command"),n;return t=="prev"?n=f-1:t=="next"&&(n=f+1),n<0&&(n=u-1),n>u-1&&(n=0),c(n),!1}),o.on("click",function(){var e=$(this),t=+e.attr("data-index");return t!=f&&c(t),!1})}function c(e){var t=$(o.get(e));o.removeClass("on"),t.addClass("on"),$.showIframeImg?(a.children("iframe").remove(),$.showIframeImg(a,t.attr("data-large")),a.children("iframe").show()):a.find("img").attr("src",t.attr("data-large")),f=e,h()}function h(){var e=$(o.get(f)),t=s.position().top,n=e.position().top+e.outerHeight()-i.height();n-=10,n>0?s.css({top:-n+"px"}):s.css({top:"14px"})}var t={},n=$("#album-box"),r=n.find("a.ctrl-btn"),i=n.find(".album-view-wrap"),s=i.children("ul"),o=s.find("li"),u=o.size(),a=n.find(".pic-panel"),f=0;return t.init=l,t}),define("chart",["require"],function(e){function r(n,r){e(["echarts","echarts/chart/bar","echarts/chart/line"],function(e){var i=e.init(document.getElementById(n));i.setOption(r,!0),t.trigger("ready",i)})}function s(e){var t={type:"category",data:[]},n={0:[],1:[]};$.each(e,function(e,r){t.data[e]=r.time,n[0][e]=r["new"],n[1][e]=r.avePrice});var r=$.extend({},i);return r.xAxis=t,r.series[0].data=n[0],r.series[1].data=n[1],r}var t=$({}),n;t.setOptions=function(e){n=$.extend({},params)},t.init=function(e,t){n=$.extend({},t),t.url&&ajax.get(t.url,{communityId:t.zoneId},function(t){r(e,s(t))},function(t){r(e,[])})},t.render=r;var i={tooltip:{trigger:"axis",formatter:function(e,t,n){var r=e[0][1];return r+="<br>"+e[0][0]+" : "+e[0][2]+" 套",r+="<br>"+e[1][0]+" : "+e[1][2]+" 元/㎡",r}},toolbox:{show:!1},calculable:!1,grid:{x:80,x2:10,y:30,y2:30},xAxis:[],yAxis:[{type:"value",name:"挂牌均价",boundaryGap:[0,.1]},{type:"value",name:"",boundaryGap:[0,.2],axisLabel:{formatter:" "}}],series:[{name:"挂牌套数",type:"bar",yAxisIndex:1,itemStyle:{normal:{color:"#e6e6e6",label:{show:!0,textStyle:{fontSize:"14",color:"#babdc1",fontFamily:"微软雅黑"},formatter:"{c} 套"}},emphasis:{color:"#babdc1"}},data:[]},{name:"挂牌均价",type:"line",symbol:"emptyCircle",symbolSize:5,itemStyle:{normal:{color:"#16449d",lineStyle:{width:3}}},data:[]}]};return t}),define("recommend",["require"],function(e){function i(e){r=$.extend({},e),$.each(n,function(e,t){s(t)})}function s(e){ajax.get(r.url[e],r.reqData,function(t){if(t.result&&t.result instanceof Array){var n=u(e,t.result);a(e,n)}},function(e){})}function u(e,t){var n=$.map(t,function(n,r){r==t.length-1&&(n.itemStyle='class="last"'),e=="region"&&(n.districtUrl=n.district.url,n.districtTitle=n.district.title);if(e=="newhouse"){var i=[];$.each(n.region,function(e,t){i[e]=$.stringFormat(o.newhouseRegion,t)}),n.regionHtml=i.join(" - ")}return $.stringFormat(o[e],n)});return n.join("")}function a(e,t){var n=$("#rec-"+e);t?(n.find("ul").html(t),n.show()):n.hide()}var t={},n=["similar","footstep","region","newhouse"],r,o={similar:'<li #{itemStyle}><a class="side-img" href="#{url}"><img src="#{imgSrc}"><b class="bg"></b><span class="album-count fn-num"><i class="ico-pic"></i>#{imgCount}</span></a><div class="price-box clear"><span class="price-text left"><em>#{price}</em>#{priceUnit}</span><span class="desc-text right desc-status-#{recStatus}">#{recText}</span></div><h4 class="sub-text">#{title}</h4><p class="room-text">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</p></li>',footstep:'<li #{itemStyle}><a class="side-img" href="#{url}"><img src="#{imgSrc}"><b class="bg"></b><span class="album-count fn-num"><i class="ico-pic"></i>#{imgCount}</span></a><div class="price-box clear"><span class="price-text left"><em>#{price}</em>#{priceUnit}</span><span class="desc-text right">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</span></div><p class="view-per"><em class="em-text">#{viewPercent}%</em>还看了：</p><h4 class="sub-text">#{title}</h4></li>',region:'<li><a class="side-img" href="#{url}"><img src="#{imgSrc}"><b class="bg"></b><span class="album-count fn-num"><i class="ico-pic"></i>#{imgCount}</span></a><div class="price-box clear"><span class="price-text left"><em>#{price}</em>#{priceUnit}</span><span class="desc-text right">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</span></div><h4 class="sub-text"><a href="#{districtUrl}">#{districtTitle}</a>&nbsp;-&nbsp;#{title}</h4></li>',newhouse:'<li class="item"><div class="pic"><a href="#{url}"><img class="lazyload" src="#{imgSrc}" alt="#{title}" /></a></div><div class="txt price-txt clear"><div class="left"><span class="price">#{price}</span>&nbsp;#{priceUnit}</div><div class="right">#{bedroom}室&nbsp;#{square}㎡&nbsp;#{orientation}</div></div><div class="loc">#{regionHtml}</div></li>',newhouseRegion:'<a href="#{url}">#{title}</a>'};return t.init=i,t}),define("main",["require","./map","./album","./chart","./recommend"],function(e){function o(){$("#btn-expand-album").on("click",function(){return s.show(),$(this).parent().hide(),!1}),n.fixtop({fixedWidth:"947px"}),n.on("click","a",function(){n.find("a").removeClass("on"),$(this).addClass("on")});var e;$(window).on("scroll",function(){e&&clearTimeout(e),e=setTimeout(function(){var e=$(document.body).scrollTop(),t;i.each(function(n,r){$(this).position().top<e+44&&(t=$(this))}),t||(t=i.filter(":first"));var r=n.find("a.on");if(r.attr("href")=="#"+t.attr("id"))return;r.removeClass("on"),n.find("a[href=#"+t.attr("id")+"]").addClass("on")},100)})}var t=e("./map"),n=$("#panel-tab"),r=n.next(".tab-content"),i=r.children("div"),s=$(".album-more");return{init:function(n){o(),e("./album").init();var r=n.priceData;e("./chart").init(n.chartDomId,{url:n.url.priceTrend,zoneId:n.zoneId}),t.init({ak:n.ak,domId:n.mapDomId,point:n.coordinates}),e("./recommend").init({url:n.url,reqData:n.reqData})}}});