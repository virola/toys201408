define("myCenter",["require"],function(e){function a(e){if(e instanceof Array==0||e.length===0)return u.empty;var t=$.map(e,function(e,t){return e.recently&&(e.recentTpl=u.recent),e.addValue>0&&(e.addValueTpl=$.stringFormat(u.addValue,e.addValue)),$.stringFormat(u.item,e)});return t.join("")}function c(e,t){if(e instanceof Array==0||e.length===0)return t==2?l.empty:f.empty;var n=$.map(e,function(e,t){return $.stringFormat(f.item,e)});return n.join("")}function h(e,t){switch(e){case 0:return a(t);case 1:case 2:return c(t,e)}}function p(){r.hover(function(){$(this).addClass("ico-clock-hover")},function(){$(this).removeClass("ico-clock-hover")}),r.add("#ctrl-my-center-close").on("click",function(){r.toggleClass("ico-clock-active"),i.slideToggle({complete:function(){i.is(":visible")&&($("html,body").animate({scrollTop:r.offset().top}),o.hide())}})})}function d(e,t){e>0&&(t=v(t)),$(s.get(e)).html(h(e,t))}function v(e){return $.map(e,function(e){var t=e.content.item;return{url:t.url,title:t.title,imgSrc:t.imgSrc,desc:e.title,pubtime:e.date}})}var t={},n,r=$("#ctrl-my-center"),i=$("#my-center"),s=i.find(".col-box>ul"),o=r.find("i").hide(),u={item:'<li class="clear"><a class="left" href="#{url}">#{title}</a>#{recentTpl}<span class="count right">#{count}#{addValueTpl}个结果</span></li>',empty:'<li class="no-data"><span class="home-ico ico-cond"></span><p>还没有相关找房条件</p></li>',recent:'<span class="left label">[最近搜过]</span>',addValue:"<em>(+#{0})</em>"},f={empty:'<li class="no-data"><span class="home-ico ico-cond ico-cond-house"></span><p>您还没有关注的房源</p></li>',item:'<li class="clear"><a class="img-box" href="#{url}" title="#{title}"><img src="#{imgSrc}"></a><a class="txt-box" href="#{url}" title="#{title}"><span class="title">#{title}</span><span class="box clear"><em class="left">#{desc}</em><span class="date right">#{pubtime}</span></span></a></li>'},l={empty:'<li class="no-data"><span class="home-ico ico-cond ico-cond-history"></span><p>您还没有浏览过房源</p></li>'},m,g;return t.init=function(e){m=e.url,g=$.extend({},e.requestOptions);var t=[e.url.search,e.url.house,e.url.history];$.each(t,function(e,t){ajax.get(t,g,function(t){t=t.result||t.list||[],d(e,t),t&&t.length>0&&(r.show(),e==1&&o.text(t.length).show())},function(t){d(e,[])})}),p()},t}),define("newHouse",["require"],function(e){var t=$("#slide-news"),n,r,i={};return i.init=function(e){r=$.extend({},e),i.play(),t.on("mouseover",function(){i.stop()}).on("mouseout",function(){i.play()})},i.stop=function(){clearInterval(n)},i.play=function(){n=setInterval(function(){i.slideUp(r.height)},r.delay)},i.slideUp=function(e){var n=Math.abs(t.css("marginTop").replace("px",""))+e;n>=t.outerHeight()&&(n=0),$(t).animate({marginTop:-n+"px"})},i}),define("main",["require","./myCenter","./newHouse"],function(e){var t=e("./myCenter"),n=e("./newHouse");return{init:function(e){n.init({height:21,delay:3e3}),t.init({url:e.userDataUrl,requestOptions:e.requestOptions||{}})}}});