// ==UserScript==
// @name         消除起点章节阅读页自动跳转提示
// @namespace    EfisioZephyr
// @version      0.1
// @description  消除烦人的起点章节阅读页面自动跳转对话框
// @author       Efisio Zephyr
// @include      https://vipreader.qidian.com/chapter/*
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

(function() {
  var cnt = 0;
  function doThing() {
    var b = document.getElementsByClassName("read-status-close");
    if (b && (b.length > 0) && b[0]) {
        GM_log("消除自动跳转干扰: b.length - " + b.length);
        GM_log("消除自动跳转干扰: b[0].click - " + b[0].click.toString());
        b[0].click();
    } else {
        GM_log("消除自动跳转干扰: 无干扰");
    }
    if (cnt < 10) {
       cnt++;
       setTimeout(doThing, 500);
    }
  }
  doThing();
})();