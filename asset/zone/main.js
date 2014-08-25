define("../list/list",["require"],function(e){function i(e){n.on("click","a.add-favor",function(t){var n=$(this),r={ids:$(this).attr("data-id")};return ajax.post(e,r,function(){n.hide()},function(e){}),!1})}function s(){r.hover(function(){$(this).addClass("hover"),t.trigger("mouseover",{main:this,index:$(this).attr("data-index"),id:$(this).attr("data-id")})},function(){$(this).removeClass("hover"),t.trigger("mouseout",{main:this,index:$(this).attr("data-index"),id:$(this).attr("data-id")})})}var t=$({}),n=$("#house-lst"),r=n.children("li").not(".list-no-data");t.init=function(e){s(),i(e.favorUrl)};var o={};t.getPoints=function(){return $.map(r,function(e,t){var n=$(e),r=n.attr("data-id");return o[r]=$(e),{id:r,index:t,rank:t+1,name:n.find(".where").text(),point:n.attr("data-geo").split(",")}})},t.highlight=function(e){if(!o[e])return;o[e].addClass("hover")},t.unhighlight=function(e){if(!o[e])return;o[e].removeClass("hover")};var u='<li data-index="#{index}" data-id="#{houseId}" data-geo="#{latitude},#{longitude}"><div class="pic-panel"><a href="#{viewUrl}"><img class="lazyload" src="#{imgSrc}" alt="#{title}" width="165" height="120"/></a><div class="pic-num"><i class="ico-pic"></i><span class="num">#{imgCount}</span></div></div><div class="info-panel"><h2><a href="#{viewUrl}" title="#{title}"><span>#{rank}</span>#{title}</a></h2><div class="summary"><div class="where">#{region}</div><div class="type"><span class="num">#{bedroom}</span>室<span class="num">#{livingroom}</span>厅</div><div class="square"><span class="num">#{square}</span>平米</div><div class="price"><span class="num">#{price}</span>#{priceUnit}</div></div><div class="other"><div class="con">#{desc}</div><div class="price-pre">#{averagePrice} 元/平</div></div><div class="fd"><div class="left"><a href="#{agencyUrl}" title="#{agency}"><img src="#{agencyLogo}" alt="#{agency}" /></a></div><div class="right"><a href="#" class="add-favor star" data-id="#{houseId}"><i class="ico ico-star"></i></a><a href="#{viewUrl}" class="go-detail">详情</a></div></div></div></li>',a=$("#rec-house-list");return t.renderRec=function(e){var t=$.map(e,function(e,t){var n=$.extend({index:t,rank:t+1,latitude:e.coordinates.latitude,longitude:e.coordinates.longitude},e);return $.strHTML(u,n)});a.html(t.join("")).show()},t}),define("../list/recommend",["require"],function(e){var t=$("#rec-dom"),n={},r='<div class="item"><div class="pic"><a href="#{url}"><img class="lazyload loaded" src="#{imgSrc}" alt="#{title}" /></a></div><div class="txt"><a href="#{url}">#{title}</a> / #{averagePrice}元/㎡</div>#{houseCount}套在售  #{viewCount}人浏览</div>';return n.render=function(e){t.find(".recommend-lst").html($.map(e,function(e){return $.stringFormat(r,e)}).join("")),t.show()},n.start=function(e){var t=e.url,r=$.extend({},e.reqData);ajax.get(t,{},function(e){var t=e.result||e.list||[];t instanceof Array&&t.length>0&&n.render(e.result)},function(e){})},n}),define("../detail/chart",["require"],function(e){function n(n,r){e(["echarts","echarts/chart/bar","echarts/chart/line"],function(e){var i=e.init(document.getElementById(n));i.setOption(r,!0),t.trigger("ready",i)})}function i(e){var t={type:"category",data:[]},n={0:[],1:[]};$.each(e,function(e,r){t.data[e]=r.time,n[0][e]=r["new"],n[1][e]=r.avePrice});var i=$.extend({},r);return i.xAxis=t,i.series[0].data=n[0],i.series[1].data=n[1],i}var t=$({});t.setOptions=function(e){},t.init=function(e,t){t.url&&ajax.get(t.url,{communityId:t.zoneId},function(t){n(e,i(t))},function(t){n(e,[])})},t.render=n;var r={tooltip:{trigger:"axis",formatter:function(e,t,n){var r=e[0][1];return r+="<br>"+e[0][0]+" : "+e[0][2]+" 套",r+="<br>"+e[1][0]+" : "+e[1][2]+" 元/㎡",r}},toolbox:{show:!1},calculable:!1,grid:{x:80,x2:10,y:30,y2:30},xAxis:[],yAxis:[{type:"value",name:"挂牌均价",boundaryGap:[0,.1]},{type:"value",name:"",boundaryGap:[0,.2],axisLabel:{formatter:" "}}],series:[{name:"挂牌套数",type:"bar",yAxisIndex:1,itemStyle:{normal:{color:"#e6e6e6",label:{show:!0,textStyle:{fontSize:"14",color:"#babdc1",fontFamily:"微软雅黑"},formatter:"{c} 套"}},emphasis:{color:"#babdc1"}},data:[]},{name:"挂牌均价",type:"line",symbol:"emptyCircle",symbolSize:5,itemStyle:{normal:{color:"#16449d",lineStyle:{width:3}}},data:[]}]};return t}),define("trend",["require","../detail/chart"],function(e){function v(){c.on("click",function(){var e=$(this),t=e.attr("data-command");return e.hasClass("disabled")||(t=="prev"?E(d-1):t=="next"&&E(d+1)),!1})}function m(){if(d===null)return;p[d<i.length-1?"removeClass":"addClass"]("disabled"),h[d>0?"removeClass":"addClass"]("disabled")}function g(){var e=r.url,n=r.reqData;ajax.get(e,n,function(e){t.trigger("ready",{data:e})},function(e){t.trigger("ready",{data:[]})})}function b(e){var t=e.length,n={type:"category",data:[]},r={0:[],1:[],2:[]};$.each(e,function(e,o){e>=t-s&&(i.push(o),n.data.push(o.time),r[0].push(o["new"]),r[1].push(o.deal),r[2].push(o.avePrice))});var o=$.extend({},y);return o.xAxis=n,o.series[0].data=r[0],o.series[1].data=r[1],o.series[2].data=r[2],o}function w(e){var t=function(e){var t=e>0?o.up:e<0?o.down:o.normal;return $.stringFormat(t,Math.abs(e))};return $.stringFormat(u,e["new"],t(e.newContrast),e.deal,t(e.dealContrast),e.avePrice,t(e.avePriceContrast))}function E(e){if(e<0||e>i.length-1)return!1;var t=i[e].time;f.text(t),l.html(w(i[e])),d=e,m()}var t=$({}),n=e("../detail/chart"),r,i=[],s=6,o={up:'<span class="state-up">上涨 #{0}%</span>',down:'<span class="state-down">下跌 #{0}%</span>',normal:'<span class="state-normal">持平</span>'},u='<li class="data-col first"><dl class="trend-new first"><dt>当月新增</dt><dd><em class="state-up">#{0}</em> 套房源</dd></dl><dl class="trend-new-compare"><dt>同比上月</dt><dd>#{1}</dd></dl></li><li class="data-col"><dl class="trend-deal first"><dt>当月成交</dt><dd><em class="state-up">#{2}</em> 套房源</dd></dl><dl class="trend-deal-compare"><dt>同比上月</dt><dd>#{3}</dd></dl></li><li class="data-col"><dl class="trend-price first"><dt>挂牌均价</dt><dd><em class="state-normal">#{4}</em> 元/平</dd></dl><dl class="trend-price-compare"><dt>同比上月</dt><dd>#{5}</dd></dl></li>',a=$("#zone-trend"),f=a.find(".trend-data-time"),l=$("#trend-data"),c=a.find(".trend-ctrl>a"),h=c.filter(":eq(0)"),p=c.filter(":eq(1)"),d,y={tooltip:{trigger:"axis",formatter:function(e,t,n){var r=e[0][1];return r+="<br>"+e[0][0]+" : "+e[0][2]+" 套",r+="<br>"+e[1][0]+" : "+e[1][2]+" 元/㎡",r}},toolbox:{show:!1},calculable:!1,grid:{x:60,x2:20,y:60,y2:30},legend:{data:["当月新增","当月成交","挂牌均价"],padding:[16,0,5,0]},xAxis:[],yAxis:[{type:"value",name:"挂牌均价",boundaryGap:[0,.1]},{type:"value",name:"",boundaryGap:[0,.1],axisLabel:{formatter:" "}}],series:[{name:"当月新增",type:"bar",yAxisIndex:1,itemStyle:{normal:{color:"#f8e9a1"}},data:[]},{name:"当月成交",type:"bar",yAxisIndex:1,itemStyle:{normal:{color:"#f1b65b"}},data:[]},{name:"挂牌均价",type:"line",symbol:"emptyCircle",symbolSize:5,itemStyle:{normal:{color:"#16449d",lineStyle:{width:3}}},data:[]}]};return t.init=function(e){r=$.extend({},e),v(),g(),t.on("ready",function(e,t){var s=b(t.data),o=i.length;E(o-1),n.render(r.chartDomId,s)})},t}),define("map",["require"],function(e){function u(e,t){t=t||function(){},BMap.Convertor.translate(e,2,t)}function f(e,n){n=n||function(){};var r={onSearchComplete:function(r){if(u.getStatus()==BMAP_STATUS_SUCCESS){var o=[];for(var a=0;a<r.getCurrentNumPois();a++){var f=r.getPoi(a),l=i.getDistance(f.point,s);o.push({title:f.title,address:f.address,point:f.point,distance:l})}n(o),t.trigger("serviceReady",{key:e,result:o})}else n([])}},u=new BMap.LocalSearch(i,r);u.searchNearby(e,s,o)}function c(){l.find(".map-key").each(function(e,t){var n=$(this).attr("data-key")||$(this).text();f(n,function(t){h(e,t)})})}function h(e,t){var n=l.find("dl:eq("+e+")"),r=v(t);r?n.find("ul").html(r).fadeIn():n.fadeOut()}function v(e){var t=[],n=e.length;return $.each(e,function(e,r){if(e>d-1)return!1;var i="";if(e==d-1||e==n-1)i='class="last"';t[e]=$.stringFormat(p,r.title,r.address,i)}),t.join("")}function m(e){var t=document.createElement("script");t.src="http://api.map.baidu.com/api?v=1.5&ak="+e+"&callback=mapInitialize",document.body.appendChild(t)}var t=$({}),n,r,i,s,o=2e3;t.render=function(e,t){t=t||function(){},s=new BMap.Point(e[1],e[0]),u(s,function(e){s=e,i=new BMap.Map(n.domId),i.centerAndZoom(s,15),i.addControl(new BMap.NavigationControl({anchor:BMAP_ANCHOR_TOP_RIGHT,type:BMAP_NAVIGATION_CONTROL_SMALL})),i.addOverlay(new BMap.Marker(s)),t()})},window.mapInitialize=function(){t.render(n.point,function(){t.trigger("ready",t),c()})};var a,l=$("#zone-env-list"),p='<li #{2}><i class="fa fa-caret-right"></i><span class="label">#{0}</span>#{1}</li>',d=3;return t.getLocalService=c,t.init=function(e){n=$.extend({},e),m(e.ak)},t}),define("filter",["require"],function(e){function n(){e(["jquery-ui"],function(){$.widget("custom.linkselectmenu",$.ui.selectmenu,{_renderItem:function(e,t){var n=$("<li>");t.disabled&&n.addClass("ui-state-disabled");var r=$("<a>",{text:t.label,href:t.element.attr("data-url")});return t.element.attr("data-class")&&r.addClass("on"),r.appendTo(n),n.appendTo(e)}}),t.linkselectmenu({select:function(e,t){var n=$(e.currentTarget),r=n.find("a"),i=n.find("a").attr("href");i&&(window.location.href=i)}})})}var t=$("#filter-options .filter-select-wrap");return{init:n}}),define("main",["require","../list/list","../list/recommend","./trend","./map","./filter"],function(e){function i(){r.on("click",function(){var e=t.url.follow,n=$(this),i=n.hasClass("zone-favor-on");i&&(e=t.url.unfollow);var s=$.extend({},t.reqData,{id:t.reqData.communityId});return ajax.post(e,s,function(){i?r.removeClass("zone-favor-on").text("关注该小区"):r.addClass("zone-favor-on").text("已关注"),r.removeClass("zone-favor-hover")}),!1}).on("mouseover",function(){var e=$(this),t=e.hasClass("zone-favor-on");t&&(e.addClass("zone-favor-hover"),e.text("取消关注"))}).on("mouseout",function(){var e=$(this),t=e.hasClass("zone-favor-on");t&&(e.removeClass("zone-favor-hover"),e.text("已关注"))})}var t,n,r=$("#zone-favor-add");return{init:function(n){t=$.extend({},n),i(),e("../list/list").init({favorUrl:n.favorUrl}),e("../list/recommend").start({url:n.recommendUrl}),e("./trend").init({url:n.trendUrl,reqData:n.reqData,chartDomId:"chart-dom"}),e("./map").init({ak:n.mapak,domId:n.mapDomId,point:n.coordinates}),e("./filter").init()}}});