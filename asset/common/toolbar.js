/**
 * @file 工具栏模块
 * @author  virola<virola.zhu@gmail.com>
 */

define(function (require) {

    var exports = {};


    var mainBox;
    var boxes;

    var timer;

    function resetHeight() {
        // height set
        var windowHeight = $(window).height();
        mainBox.height(windowHeight).children().height(windowHeight);
    }

    var cacheOptions;

    var _tplMain = ''
        + '<div class="m-tool">'
        +     '<div class="m-tool-mask"></div>'
        +     '<div class="m-tool-bar">'
        +         '<div class="m-tool-close m-tool-bar-close"></div>'
        +         '<div class="m-tool-task">'
        +             '<div class="m-tool-tab-user" title="#{username}">'
        +                 '<img src="#{userAvatar}">'
        +             '</div>'
        +             '<div class="m-tool-tab" data-command="open" data-box="0">'
        +                 '<div class="m-tool-tab-logo m-tool-tab-logo-msg"></div>'
        +                 '<div class="m-tool-tab-tip">我的消息'
        +                     '<div class="m-tool-bar-arr m-tool-tab-tip-arr">◆</div>'
        +                 '</div>'
        +             '</div>'
        +             '<div class="m-tool-tab" data-command="open" data-box="1">'
        +                 '<div class="m-tool-tab-logo m-tool-tab-logo-favor"></div>'
        +                 '<div class="m-tool-tab-tip">我的收藏'
        +                     '<div class="m-tool-bar-arr m-tool-tab-tip-arr">◆</div>'
        +                 '</div>'
        +             '</div>'
        +             '<div class="m-tool-tab" data-command="open" data-box="2">'
        +                 '<div class="m-tool-tab-logo m-tool-tab-logo-clock"></div>'
        +                 '<div class="m-tool-tab-tip">浏览历史'
        +                     '<div class="m-tool-bar-arr m-tool-tab-tip-arr">◆</div>'
        +                 '</div>'
        +             '</div>'
        +             '<div class="m-tool-tab" data-command="open" data-box="3">'
        +                 '<div class="m-tool-tab-logo m-tool-tab-logo-find"></div>'
        +                 '<div class="m-tool-tab-tip">快速找房'
        +                     '<div class="m-tool-bar-arr m-tool-tab-tip-arr">◆</div>'
        +                 '</div>'
        +             '</div>'
        +             '<div class="m-tool-tab" data-command="top">'
        +                 '<div class="m-tool-tab-logo m-tool-tab-logo-top"></div>'
        +                 '<div class="m-tool-tab-tip">返回顶部'
        +                     '<div class="m-tool-bar-arr m-tool-tab-tip-arr">◆</div>'
        +                 '</div>'
        +             '</div>'
        +         '</div>'
        +     '</div>'
        +     '<div class="m-tool-main">'
        +         '<div class="m-tool-main-wrap">'
        +           '<div class="m-tool-main-box m-tool-main-box-msg">'
        +               '<h3 class="m-tool-main-box-title">动态提醒</h3>'
        +               '<div class="m-tool-main-box-ctrl clear">'
        +                   '<div class="left">共有<em class="m-tool-ctrl-count">0</em>条消息</div>'
        +                   '<div class="right" data-type="msg">'
        +                       '<a href="#" data-command="clear">全部清除</a>&nbsp;&nbsp;'
        +                       '<a href="#" data-command="refresh">刷新</a>'
        +                   '</div>'
        +               '</div>'
        +               '<div class="m-tool-main-box-list">'
        +                   '<ul></ul>'
        +               '</div>'
        +           '</div>'

        +           '<div class="m-tool-main-box m-tool-main-box-favor">'
        +               '<h3 class="m-tool-main-box-title">我的关注</h3>'
        +               '<div class="m-tool-main-box-tab clear">'
        +                   '<a href="#" class="on" data-type="0">关注的房源</a>'
        +                   '<a href="#" data-type="1">关注的小区</a>'
        +               '</div>'
        +               '<div class="m-tool-main-box-ctrl clear">'
        +                   '<div class="left">共有<em class="m-tool-ctrl-count">0</em>套房源</div>'
        +                   '<div class="right">'
        +                       '<a href="#">刷新</a>'
        +                   '</div>'
        +               '</div>'
        +               '<div class="m-tool-main-box-list">'
        +                   '<ul></ul>'
        +               '</div>'
        +           '</div>'
        +           '<div class="m-tool-main-box m-tool-main-box-favor">'
        +               '<h3 class="m-tool-main-box-title">最近浏览历史</h3>'
        +               '<div class="m-tool-main-box-list">'
        +                   '<ul></ul>'
        +               '</div>'
        +           '</div>'
        +           '<div class="m-tool-main-box m-tool-main-box-search">'
        +               '<h3 class="m-tool-main-box-title">找房条件</h3>'
        +               '<div class="m-tool-main-box-list">'
        +                   '<a class="search-add-btn" href="#">+ 添加找房条件</a>'
        +                   '<div class="content">'
        +                       '<div class="m-tool-bar-arr m-tool-main-box-arr">◆</div>'
        +                       '<form onsubmit="return false">'
        +                           '<div class="form-line clear">'
        +                               '<div class="left">城区/商圈</div>'
        +                               '<div class="right">'
        +                                   '<div class="select">'
        +                                       '<div class="select-display"><span class="placeholder">请选择</span></div>'
        +                                   '</div>'
        +                               '</div>'
        +                           '</div>'
        +                           '<div class="form-line clear">'
        +                               '<div class="left">户型</div>'
        +                               '<div class="right">'
        +                                   '<div class="select">'
        +                                       '<div class="select-display"><span class="placeholder">请选择</span></div>'
        +                                   '</div>'
        +                               '</div>'
        +                           '</div>'
        +                           '<div class="form-line clear">'
        +                               '<div class="left">面积</div>'
        +                               '<div class="right">'
        +                                   '<div class="txt-wrap">'
        +                                       '<input class="txt">'
        +                                       '<span>㎡</span>'
        +                                   '</div>&nbsp;-&nbsp;'
        +                                   '<div class="txt-wrap">'
        +                                       '<input class="txt">'
        +                                       '<span>㎡</span>'
        +                                   '</div>'
        +                               '</div>'
        +                           '</div>'
        +                           '<div class="form-line clear">'
        +                               '<div class="left">价格</div>'
        +                               '<div class="right">'
        +                                   '<div class="txt-wrap">'
        +                                       '<input class="txt">'
        +                                       '<span>万</span>'
        +                                   '</div>&nbsp;-&nbsp;'
        +                                   '<div class="txt-wrap">'
        +                                       '<input class="txt">'
        +                                       '<span>万</span>'
        +                                   '</div>'
        +                               '</div>'
        +                           '</div>'
        +                           '<div class="form-line form-btn clear">'
        +                               '<div class="right">'
        +                                   '<button class="save-btn">保存</button>'
        +                                   '<button class="cancel-btn">取消</button>'
        +                               '</div>'
        +                           '</div>'
        +                       '</form>'
        +                   '</div>'
        +               '</div>'
        +               '<ul class="search-list"></ul>'
        +           '</div>'
        +         '</div>'
        +     '</div>'
        + '</div>'
    ;

    var _tplClearTip = ''
        + '<div class="clear-tip">' 
        +     '<div class="clear-bg"></div>' 
        +     '<div class="clear-tip-main"><h5>删除成功！</h5></div>'
        + '</div>';

    var _tplClearFavorTip = '' 
        + '<div class="clear-tip">' 
        +     '<div class="clear-bg"></div>' 
        +     '<div class="clear-tip-main"><h5>取消成功啦！<a href="#" class="rollback">撤销操作</a></h5>'
        +     '<p>注意：刷新页面后会彻底删除</p></div>'
        + '</div>';

    var _tplItem = {
        msg: ''
            + '<li data-id="#{id}" data-type="msg" data-link="#{url}">'
            +     '<div class="title clear">'
            +         '<h4 class="left">#{title}</h4>'
            +         '<span class="date right">#{date}</span>'
            +     '</div>'
            +     '<div class="content clear">'
            +         '<div class="m-tool-bar-arr m-tool-main-box-arr">◆</div>'
            +         '<div class="content-img left">'
            +             '<a href="#{url}"><img src="#{imgSrc}"></a>'
            +         '</div>'
            +         '<div class="content-info right">'
            +             '<h5><a href="#{url}">#{detailTitle}</a></h5>'
            +             '<p>#{region}</p>'
            +             '<p>#{bedroom}室 #{square}㎡</p>'
            +         '</div>'
            +     '</div>'
            +     '#{extraHtml}'
            +     '<div class="close"><div class="m-tool-close"></div></div>'
            + _tplClearTip
            + '</li>',

        msgRemove: ''
            + '<li data-id="#{id}" data-type="msg" data-link="#{url}" #{removeClass}>'
            +     '<div class="title clear">'
            +         '<h4 class="left">#{title}</h4>'
            +         '<span class="date right">#{date}</span>'
            +     '</div>'
            +     '<div class="content clear">'
            +         '<div class="m-tool-bar-arr m-tool-main-box-arr">◆</div>'
            +         '<div class="content-img left">'
            +             '<img src="#{imgSrc}">'
            +         '</div>'
            +         '<div class="content-info right">'
            +             '<h5>#{detailTitle}</h5>'
            +             '<p>#{region}</p>'
            +             '<p>#{bedroom}室 #{square}㎡</p>'
            +         '</div>'
            +     '</div>'
            +     '#{extraHtml}'
            +     '<div class="close"><div class="m-tool-close"></div></div>'
            + _tplClearTip
            + '</li>',

        house: ''
            + '<li class="content clear" data-type="house" data-id="#{id}" data-link="#{url}">'
            +     '<div class="content-img left">'
            +         '<a href="#{url}"><img src="#{imgSrc}"></a>'
            +     '</div>'
            +     '<div class="content-info right">'
            +         '<h5><a href="#{url}">#{title}</a></h5>'
            +         '<p>#{region} - #{bedroom}室 #{square}㎡</p>'
            +         '<div class="favor-text clear">'
            +             '<div class="favor-time left">#{favorTime}</div>'
            +             '<div class="price right"><em class="ft-num">#{price}</em> #{priceUnit}</div>'
            +         '</div>'
            +     '</div>'
            +     '<div class="close"><div class="m-tool-close"></div></div>'
            + _tplClearFavorTip
            + '</li>',

        zone: ''
            + '<li class="content clear" data-type="zone" data-id="#{id}" data-link="#{url}">'
            +     '<div class="content-img left">'
            +         '<a href="#{url}"><img src="#{imgSrc}"></a>'
            +     '</div>'
            +     '<div class="content-info right">'
            +         '<h5><a href="#{url}">#{title}</a></h5>'
            +         '<p>均价：#{averagePrice}元/平米</p>'
            +         '<p>共#{houseCount}套房源在售</p>'
            +         '<div class="favor-text">'
            +             '<div class="favor-time">#{favorTime}</div>'
            +         '</div>'
            +     '</div>'
            +     '<div class="close"><div class="m-tool-close"></div></div>'
            + _tplClearFavorTip
            + '</li>',

        history: ''
            + '<li class="content clear" data-type="history" data-id="#{id}" data-link="#{url}">'
            +     '<div class="content-img left">'
            +         '<a href="#{url}"><img src="#{imgSrc}"></a>'
            +     '</div>'
            +     '<div class="content-info right">'
            +         '<h5><a href="#{url}">#{title}</a></h5>'
            +         '<p>#{region} - #{bedroom}室 #{square}㎡</p>'
            +         '<div class="favor-text clear">'
            +             '<div class="favor-time left">#{favorTime}</div>'
            +             '<div class="price right"><em class="ft-num">#{price}</em> #{priceUnit}</div>'
            +         '</div>'
            +     '</div>'
            +     '<div class="close"><div class="m-tool-close"></div></div>'
            + _tplClearTip
            + '</li>',

        search: ''
            + '<li data-type="search" data-id="#{id}">'
            +     '<span class="m-tool-circle">●</span>'
            +     '<a href="#{url}">#{title}</a>'
            +     '<a class="search-delete" href="#">删除</a>'
            +     '<p>#{count}套房源在售</p>'
            + '</li>',

        msgExtraHouse: '<div class="extra-info">与你关注的房源 <em>#{0}</em> 相似</div>'
    };

    var _tplItemEmpty = {
        msg: ''
            + '<div class="msg-empty">'
            +     '<h4>呣~还没有新的动态呢...</h4>'
            +     '<p>小贝仍在为您时刻关注最新的房源动态，稍后再来看看吧！</p>'
            + '</div>',

        msgNoFavor: ''
            + '<div class="msg-empty">'
            +     '<h4>还没关注房源</h4>'
            +     '<p>关注后，我会在这里告诉你它们最近的动态</p>'
            +     '<ul class="empty-entry">'
            +         '<li><i class="ico-tick"></i>房子价格变化</li>'
            +         '<li><i class="ico-tick"></i>房子下架情况</li>'
            +         '<li><i class="ico-tick"></i>新上相似房源</li>'
            +         '<li><i class="ico-tick"></i>小区新上房源</li>'
            +     '</ul>'
            + '</div>',

        favor: ''
            + '<div class="msg-empty">'
            +     '<h4>还没关注房源</h4>'
            +     '<p>关注后，我会及时通知你它们最近的动态</p>'
            +     '<ul class="empty-entry">'
            +         '<li><i class="ico-tick"></i>房子价格变化</li>'
            +         '<li><i class="ico-tick"></i>房子下架情况</li>'
            +         '<li><i class="ico-tick"></i>新上相似房源</li>'
            +         '<li><i class="ico-tick"></i>小区新上房源</li>'
            +     '</ul>'
            + '</div>',

        history: ''
            + '<div class="msg-empty">'
            +     '<h4>还没有浏览历史哦...</h4>'
            +     '<p>小贝仍在为您时刻关注最新的房源动态，稍后再来看看吧！</p>'
            + '</div>',
    };

    var MSG_STATE = {
        alert: 1,
        recHouse: 2,
        recCom: 3,
        remove: 4
    };

    // msg render
    var msgRender = (function () {

        function getMsgListHtml(data) {

            return $.map(data, function (item) {
                var tpl = _tplItem.msg;

                if (item.type == MSG_STATE.remove) {
                    tpl = _tplItem.msgRemove;
                    item.removeClass = 'class="remove"';
                }
                else if (item.type == MSG_STATE.recHouse) {
                    item.extraHtml = $.stringFormat(_tplItem.msgExtraHouse, item.relatedKeyword);
                }

                var data = $.extend({
                    detailTitle: item.content.item.title
                }, item.content.item, item);

                return $.stringFormat(tpl, data);

            }).join('');
        }

        function renderMsg(datasource) {
            var main = boxes.filter(':eq(0)');
            var ctrlBox = main.find('.m-tool-main-box-ctrl');
            var cntText = main.find('.m-tool-ctrl-count');
            var listMain = main.find('.m-tool-main-box-list>ul');

            var count = datasource.count || 0;
            cntText.text(count);

            var html = getMsgListHtml(datasource.list);

            if (count > 0 && html) {
                listMain.hide().html(html).fadeIn();
                ctrlBox.show();
            }
            else {
                listMain.parent().html(_tplItemEmpty.msg);
                ctrlBox.hide();
            }
        }

        return {
            render: renderMsg
        };
    })();

    // 关注房源和小区
    var favorRender = (function () {

        // favor house / zone
        function getFavorHouseHtml(data) {

            return $.map(data, function (item) {

                var data = $.extend({}, item);

                return $.stringFormat(_tplItem.house, data);
            }).join('');
        }

        function getFavorZoneHtml(data) {

            return $.map(data, function (item) {

                var data = $.extend({}, item);

                return $.stringFormat(_tplItem.zone, data);
            }).join('');
        }

        function renderFavor(datasource, index) {
            var main = boxes.filter(':eq(1)');
            var cntText = main.find('.m-tool-ctrl-count');
            var listMain = main.find('.m-tool-main-box-list>ul');
            var ctrlBox = main.find('.m-tool-main-box-ctrl');

            var count = datasource.count || 0;
            cntText.text(count);

            var html;
            if (index == 1) {
                html = getFavorZoneHtml(datasource.list);
            }
            else {
                html = getFavorHouseHtml(datasource.list);
            }

            listMain.hide();
            listMain.html(html).fadeIn();

            if (count > 0 && html) {
                ctrlBox.show();
            }
            else {
                ctrlBox.hide();
            }

            
        }

        return {
            render: renderFavor
        };
    })();

    // 历史浏览记录
    var historyRender = (function () {

        function getListHtml(data) {

            return $.map(data, function (item) {
                var tpl = _tplItem.history;
                var data = $.extend({}, item);

                return $.stringFormat(tpl, data);
            }).join('');
        }

        function render(datasource) {
            var main = boxes.filter(':eq(2)');
            var listMain = main.find('.m-tool-main-box-list>ul');

            var html = getListHtml(datasource);

            if (html) {
                listMain.html(html);
            }
            else {
                listMain.parent().html(_tplItemEmpty.history);
            }

            
        }

        return {
            render: render
        };
    })();

    // 搜索条件
    var searchRender = (function () {
        function getListHtml(data) {

            return $.map(data, function (item) {
                var tpl = _tplItem.search;
                var data = $.extend({}, item);

                return $.stringFormat(tpl, data);
            }).join('');
        }

        function render(datasource) {
            var main = boxes.filter(':eq(3)');
            var listMain = main.find('.search-list');

            var html = getListHtml(datasource);

            listMain.html(html || '');
        }

        return {
            render: render
        };
    })();

    function renderMain(user) {
        $(document.body).append(getMainHtml(user));

        mainBox = $('.m-tool');
        boxes = mainBox.find('.m-tool-main-box');


        initToolEvents();
    }

    function getMainHtml(data) {
        return $.stringFormat(_tplMain, {
            username: data.nickname,
            userAvatar: data.userAvatar || ''
        });
    }

    function initToolEvents() {
        resetHeight();

        var timerScroll;

        $(window).on('resize', function () {
            if (timerScroll) {
                clearTimeout(timerScroll);
            }

            timerScroll = setTimeout(function () {
                resetHeight();
                clearTimeout(timerScroll);
            }, 300);
        });

        var timerHover;

        // tab icon click events
        mainBox.find('.m-tool-tab').hover(function () {
            $(this).addClass('m-tool-tab-hover');

            var tip = $(this).find('.m-tool-tab-tip');

            if (timerHover) {
                clearTimeout(timerHover);
            }

            timerHover = setTimeout(function () {
                tip.show().animate({
                    right: 50,
                    opacity: 1
                }, 500);
                clearTimeout(timerHover);
            }, 200);
            
        }, function () {
            $(this).removeClass('m-tool-tab-hover');

            var tip = $(this).find('.m-tool-tab-tip');
            tip.animate({
                right: 80,
                opacity: 0
            }, 500, function () {
                tip.hide();
            });

        }).on('click', function () {
            var command = $(this).attr('data-command');
            var boxIndex = $(this).attr('data-box');

            if (command == 'open') {
                mainBox.addClass('m-tool-open');
            }

            if (command == 'top') {
                $(document.body).animate({
                    scrollTop: 0
                });
            }

            if (boxIndex) {
                boxes.hide();
                boxes.filter(':eq(' + boxIndex + ')').show();
            }
        });

        // close btn click events
        mainBox.find('.m-tool-bar-close').on('click', function () {
            mainBox.removeClass('m-tool-open');
        });

        // list hover events / click events
        mainBox.find('.m-tool-main-box-list').on('mouseover', 'li', function () {
            $(this).addClass('hover');
        })
        .on('mouseout', 'li', function () {
            $(this).removeClass('hover');
        })
        .on('click', '.close', function () {
            var item = $(this).parent('li');
            var type = item.attr('data-type');
            var id = item.attr('data-id');

            if (type && id) {
                removeItem(type, id, item);
            }
        });

        initSearch();

        favorEvents.init();

        initMsgCtrl();
    }

    function initMsgCtrl() {

        mainBox.find('.m-tool-main-box-msg .m-tool-main-box-ctrl').on('click', 'a', function () {
            // todo...
            var command = $(this).attr('data-command');
            console.log(command);

            if (command == 'clear') {
                // todo
            }
            if (command == 'refresh') {
                loadMsgList();
            }
            
            return false;
        });
    }

    /**
     * 删除工具栏中的1个项目
     * 
     * @param {string} type 标识key
     * @param {string} id 项目的id值，ajax需要
     * @param {Object} element DOM元素
     */
    function removeItem(type, id, element) {
        var urls = cacheOptions.url['clear'];
        var url = urls[type] || '';
        var item = $(element);
        item.find('.close').hide();

        var tipLayer = item.find('.clear-tip');

        ajax.post(url, {id: id}, function (data) {
            switch (type) {
                case 'search':
                    item.fadeOut();
                    break;
                case 'msg':
                case 'history':
                    tipLayer.fadeIn();
                    setTimeout(function () {
                        item.remove();
                    }, 2000);
                    break;
                case 'house':
                case 'zone':
                    tipLayer.fadeIn();

            }
        }, function () {

        })
    }

    function removeAll(type, ids) {

    }

    // 找房条件里的事件绑定
    function initSearch() {

        var searchBox = mainBox.find('.m-tool-main-box-search');
        searchBox.find('input.txt')
        .on('focusin', function () {
            $(this).parent().addClass('txt-wrap-focus');
        })
        .on('focusout', function () {
            $(this).parent().removeClass('txt-wrap-focus');
        });

        searchBox.find('.search-list').on('mouseover', 'li', function () {
            $(this).addClass('hover');
        })
        .on('mouseout', 'li', function () {
            $(this).removeClass('hover');
        })
        // delete search
        .on('click', '.search-delete', function () {
            var item = $(this).parent();
            removeItem('search', item.attr('data-id'), item);

            return false;
        });
    }

    /**
     * 关注tab的事件绑定模块
     * 
     * @type {Object}
     */
    var favorEvents = (function () {

        var _curFavorType = 0;

        var ajaxing = {
            house: 0,
            zone: 0
        };

        function loadFavorList(type) {
            if (type == 1) {
                if (ajaxing.zone) {
                    return false;
                }

                ajax.get(cacheOptions.url.favor.zone, {}, function (resp) {
                    ajaxing.zone = 0;
                    if (_curFavorType == 1) {
                        favorRender.render(resp, 1);
                    }
                }, function (resp) {
                    ajaxing.zone = 0;
                });
                ajaxing.zone = 1;
            }
            else {
                if (ajaxing.house) {
                    return false;
                }

                ajax.get(cacheOptions.url.favor.house, {}, function (resp) {
                    ajaxing.house = 0;

                    if (_curFavorType == 0) {
                        favorRender.render(resp);
                    }
                }, function (resp) {
                    ajaxing.house = 0;
                });

                ajaxing.house = 1;

            }
        }

        function initFavor() {
            var box = mainBox.find('.m-tool-main-box-favor');
            var tab = box.find('.m-tool-main-box-tab');
            var ctrl = box.find('.m-tool-main-box-ctrl');
            var list = box.find('.m-tool-main-box-list>ul')

            tab.on('click', 'a', function () {
                var _me = $(this);
                var type = +_me.attr('data-type');

                if (type != _curFavorType) {
                    loadFavorList(type);

                    _curFavorType = type;

                    _me.siblings().removeClass('on');
                    _me.addClass('on');
                }

                return false;
            });

            // refresh clicker
            ctrl.on('click', 'a', function () {
                loadFavorList(_curFavorType);
                return false;
            });

            list.on('click', '.rollback', function () {
                var item = $(this).closest('li');
                var type = item.attr('data-type');
                var id = item.attr('data-id');

                addFavor(type, id, function () {
                    item.find('.clear-tip').fadeOut();
                    item.find('.close').attr('style', '');
                });

                return false;
            });
        }

        var addingAjax = 0;

        function addFavor(type, id, callback) {
            callback = callback || new Function();
            var url = cacheOptions.url.rollback.zone;
            if (type == 'house') {
                url = cacheOptions.url.rollback.house;
            }

            if (!id || addingAjax) {
                return false;
            }

            ajax.post(url, {
                id: id
            }, function (data) {
                addingAjax = 0;
                callback();
            }, function (resp) {
                addingAjax = 0;
            });

            addingAjax = 1;
        }

        return {
            init: initFavor,
            load: loadFavorList
        };
    })();


    function loadCss() {
        $('<link>').attr('rel', 'stylesheet').attr('href',  cacheOptions.feRoot + '/asset/common/toolbar.css')
            .appendTo($(document.head));
    }


    exports.init = function (params) {
        cacheOptions = $.extend({}, params);

        var urls = params.url;

        ajax.get(urls.user, {}, function (data) {
            if (data && data.userAvatar) {
                loadCss();

                renderMain(data);
                requestUserData();
            }
        });
    };

    function loadMsgList() {
        ajax.get(cacheOptions.url.msg, {}, function (resp) {
            msgRender.render(resp);
        });
    }

    function requestUserData() {
        var urls = cacheOptions.url;

        loadMsgList();
        favorEvents.load(0);

        ajax.get(urls.history, {}, function (resp) {
            historyRender.render(resp.list);
        });

        ajax.get(urls.search, {}, function (resp) {
            searchRender.render(resp.list);
        });
    }

    return exports;
});

