// ==UserScript==
// @name        Tiebas Last Visited
// @namespace   https://github.com/zephyrer/
// @description 针对百度贴吧，添加关于最近逛过的贴吧的支持
// @include     http://tieba.baidu.com/f?*
// @include     http://tieba.baidu.com/p/*
// @include     https://tieba.baidu.com/f?*
// @include     https://tieba.baidu.com/p/*
// @version     1.2.4
// @grant       GM_addStyle
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_log
// @grant       GM_registerMenuCommand
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/lastVisitedTiebas.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/lastVisitedTiebas.meta.js
//
// @note        2017/06/13 1.2.3  百度数据结构改版，forum_name 变成 name
// @note        2017/06/13 1.2.2  美化排版
// @note        2015/01/14 1.2.1  修正"常逛的吧"按钮背景色在面板开启时恢复原色的问题
// @note        2015/01/14 1.2    添加 excludeFavorites 支持
// @note        2015/01/11 1.1    添加 GM 命令菜单项
// @note        2015/01/10 1.0    initial release
//
// ==/UserScript==

(function(){
    if (window.Node && Node.prototype && !Node.prototype.contains){
       Node.prototype.contains = function (arg) {
         return !!(this.compareDocumentPosition(arg) & 16)
       }
     }
     GM_registerMenuCommand("最近逛过的贴吧(V)", MaxVisitedSetting, 'V');

    //添加按钮
    var ph = document.getElementById("wd2");//placeholder
    if (!ph) return;
    //修正样式
    GM_addStyle(".search_form {margin-left: auto !important;margin-right: auto !important;}");
    GM_addStyle("#tb_header_search_form {width: 90% !important;min-width: 1000px !important;}");

    GM_addStyle("#oftenVisitedWrapper:hover #oftenVisitedAnchor,#oftenVisitedWrapper:hover #oftenVisitedAnchorArrow {background-position: 0px -35px;color: #000;}");
    GM_addStyle("#oftenVisitedAnchorArrowWrapper {background-image: url('http://tb2.bdstatic.com/tb/static-common/img/search_sp_06cf7d9.png');background-position: -202px -33px;background-repeat: no-repeat;float: left;height: 34px;display: inline-block;margin-left:-1px;}");
    GM_addStyle("#oftenVisitedAnchorArrowWrapper .search_btn_fixed {margin-left:2px !important;}");
    GM_addStyle("#oftenVisitedAnchorArrow {width: auto !important;border-right: 1px solid #000;}");
    var div = document.createElement("DIV");
    div.id = "oftenVisitedWrapper";
    var btn = document.createElement("SPAN");
    btn.id = "oftenVisitedAnchorWrapper";
    btn.classList.add("search_btn_wrap");
    btn.innerHTML = "<a id='oftenVisitedAnchor' href='#' onclick='return false;' class='search_btn search_btn_enter_ba'>常逛的吧</a>";
    div.appendChild(btn);
    btn = document.createElement("SPAN");
    btn.id = "oftenVisitedAnchorArrowWrapper"
    btn.innerHTML = "<a id='oftenVisitedAnchorArrow' href='#' onclick='return false;' class='search_btn search_btn_enter_ba'>▼</a>";
    div.appendChild(btn);
    div.addEventListener("mouseover", displayList, false);
    div.addEventListener("click", toggleList, false);
    ph.parentNode.insertBefore(div, ph.nextSibling);

    {//美化排版
    let spans = document.getElementById("tb_header_search_form").getElementsByClassName("search_btn_wrap");
    let target = spans[spans.length-1];
    let left = target.offsetLeft + target.offsetWidth + 10;
    target = document.getElementsByClassName("senior-search-link")[0];
    target.style.left = left + "px";
    }


///////////////////////////////////////////////////////////////////////////////
//
var aFavoriteTiebas = ["azw3", "B1A4", "Bii", "朴海镇", "MRMR", "剑的旋律", "MIC男团", "bilibili邀请码"];
//
///////////////////////////////////////////////////////////////////////////////
var regFavoriteTiebas = new RegExp(aFavoriteTiebas.join('|'), "ig");
    //读取并更新贴吧访问记录
    var sLastVisitedTiebas = GM_getValue("lastVisitedTiebas", "");
    var bExcludeFavorites = GM_getValue("excludeFavorites", false);
    //alert(sLastVisitedTiebas);
    var aLastVisitedTiebas = sLastVisitedTiebas.split(',').filter(function(e){return e!="";});
    var currentTieba = unsafeWindow.PageData.forum.name;
    if (aLastVisitedTiebas.indexOf(currentTieba) > -1) {
        aLastVisitedTiebas.splice(aLastVisitedTiebas.indexOf(currentTieba), 1);
    }
    //aLastVisitedTiebas.push(currentTieba);
    aLastVisitedTiebas.unshift(currentTieba);
    //长度控制
    var maxRecordNumbers = GM_getValue("max_visited_tiebas", 10);
    if (aLastVisitedTiebas.length > maxRecordNumbers) {
        //aLastVisitedTiebas.splice(0, aLastVisitedTiebas.length - maxRecordNumbers);
        aLastVisitedTiebas.splice(maxRecordNumbers, aLastVisitedTiebas.length - maxRecordNumbers);
    }
    GM_setValue("lastVisitedTiebas",
                bExcludeFavorites ?
                    aLastVisitedTiebas.filter(function(e){return !regFavoriteTiebas.test(e);}).toString()
                  : aLastVisitedTiebas.toString());

    //生成显示面板
    div = document.createElement("DIV");
    div.id = "div-last-visited-tiebas";
    div.classList.add("suggestion");
    div.setAttribute("style", "position:fixed;width:150px;display:none;");
    var tbList = document.createElement("UL");
    tbList.id = "ul-last-visited-tiebas";
    GM_addStyle("#ul-last-visited-tiebas li:hover {background-color: #3B84F2;} #ul-last-visited-tiebas li:hover a {color: #FFF;}");
    GM_addStyle("#ul-last-visited-tiebas .forum_item {height: 15px !important;}");
    tbList.classList.add("suggestion_list");
    var item = document.createElement("LI");
    item.classList.add("break_title");
    item.innerHTML = "<span class='break_tip'>我的最爱</span>";
    tbList.appendChild(item);
    aFavoriteTiebas.forEach(function(el,ix,ar){
        item = document.createElement("LI");
        item.setAttribute("data-field", '{"sugType":"forum_item","sugValue":"' + el + '","sugUrl":"/f?ie=utf-8&kw=' + encodeURIComponent(el) + '"}');
        item.innerHTML = '<div class="forum_item"><div class="forum_name"><a class="forum_desc" href="http://tieba.baidu.com/f?ie=utf-8&kw=' + encodeURIComponent(el) + '">' + el + '吧</a></div></div>';
        tbList.appendChild(item);
    })
    item = document.createElement("LI");
    item.classList.add("break_title");
    item.innerHTML = "<span class='break_tip'>我的足迹</span>";
    tbList.appendChild(item);
    for (var i=0; i<aLastVisitedTiebas.length; i++) {
        if (bExcludeFavorites && regFavoriteTiebas.test(aLastVisitedTiebas[i])) continue;
        item = document.createElement("LI");
        item.setAttribute("data-field", '{"sugType":"forum_item","sugValue":"' + aLastVisitedTiebas[i] + '","sugUrl":"/f?ie=utf-8&kw=' + encodeURIComponent(aLastVisitedTiebas[i]) + '"}');
        item.innerHTML = '<div class="forum_item"><div class="forum_name"><a class="forum_desc" href="http://tieba.baidu.com/f?ie=utf-8&kw=' + encodeURIComponent(aLastVisitedTiebas[i]) + '">' + aLastVisitedTiebas[i] + '吧</a></div></div>';
        tbList.appendChild(item);
    }
    div.appendChild(tbList);
    //document.body.appendChild(div);
    document.getElementById("oftenVisitedWrapper").parentNode.insertBefore(div, document.getElementById("oftenVisitedWrapper"));
    GM_addStyle("#div-last-visited-tiebas[display] ~ #oftenVisitedWrapper #oftenVisitedAnchor,#div-last-visited-tiebas[display] ~ #oftenVisitedWrapper #oftenVisitedAnchorArrow {background-position: 0px -35px;color: #000;}");
    div.addEventListener("mouseout", hideList, false);
    //alert((unsafeWindow.PageData.forum.name));

    //var aTiebaNames = ["B1A4", "Bii", "朴海镇", "剑的旋律", "MIC男团"];
    //add suggestions
    //aTiebaNames.forEach(addSuggestion);

    function addSuggestion(ele, idx, arr) {
        var li = document.createElement("LI");
        li.setAttribute("data-field", '{"sugType":"forum_item","sugValue":"' + ele + '","sugUrl":"/f?ie=utf-8&kw=' + encodeURIComponent(ele) + '"}');
        var div = document.createElement("DIV");
        div.classList.add("forum_item");
        div.textContent = ele + "吧";
        li.appendChild(div);
        ph.parentNode.insertBefore(li, ph);
    }

    function displayList(e) {
        var div = document.getElementById("div-last-visited-tiebas");
        var loc = document.getElementById("oftenVisitedAnchorWrapper");
        var l = getElementAbsPos(loc).left;
        loc = document.getElementById("tb_header_search_form");
        var t = getElementAbsPos(loc).top + loc.offsetHeight;
        //GM_log("x: " + l + ", y: " + t);
        div.style.left = l + "px";
        div.style.top = t + "px";
        div.style.display = "block";
        div.setAttribute("display", "true");
    }

    function hideList(e) {
        var div = document.getElementById("div-last-visited-tiebas");
        var el = e.relatedTarget;
        if (div.contains(el)) return;
        div.style.display = "none";
        if (div.hasAttribute("display")) div.removeAttribute("display");
    }

    function toggleList(e) {
        var div = document.getElementById("div-last-visited-tiebas");
        if (div.style.display == "none") displayList(e);
        else {
          div.style.display = "none";
          if (div.hasAttribute("display")) div.removeAttribute("display");
        }
    }

    function getElementAbsPos(e)
    {
        var t = e.offsetTop;
        var l = e.offsetLeft;
        while(e = e.offsetParent)
        {
            t += e.offsetTop;
            l += e.offsetLeft;
        }

        return {left:l,top:t};
    }

    function MaxVisitedSetting(e) {
        var maxVisited = GM_getValue("max_visited_tiebas", 10);
        var retValue = prompt("1. 请指定希望记住的逛过的贴吧的最大数目：", maxVisited);
        if (retValue && retValue != "") {
            maxVisited = parseInt(retValue, 10);
            if (!isNaN(maxVisited)) GM_setValue("max_visited_tiebas", maxVisited);
        }
        var bExcludeFavorites = GM_getValue("excludeFavorites", false);
        retValue = prompt("2. 希望在\"我的足迹\"中显示\"我的最爱\"中的贴吧吗？（是填1，否填0）", bExcludeFavorites ? 0 : 1);
        GM_setValue("excludeFavorites", !parseInt(retValue));
    }
})();