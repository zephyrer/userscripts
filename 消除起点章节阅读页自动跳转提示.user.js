// ==UserScript==
// @name         消除起点章节阅读页自动跳转提示
// @namespace    https://github.com/zephyrer/
// @version      0.4.1
// @description  消除烦人的起点章节阅读页面自动跳转对话框
// @author       Efisio Zephyr
// @include      https://vipreader.qidian.com/chapter/*
// @include      https://read.qidian.com/chapter/*
// @downloadURL  https://github.com/zephyrer/userscripts/raw/master/%E6%B6%88%E9%99%A4%E8%B5%B7%E7%82%B9%E7%AB%A0%E8%8A%82%E9%98%85%E8%AF%BB%E9%A1%B5%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC%E6%8F%90%E7%A4%BA.user.js
// @updateURL    https://github.com/zephyrer/userscripts/raw/master/%E6%B6%88%E9%99%A4%E8%B5%B7%E7%82%B9%E7%AB%A0%E8%8A%82%E9%98%85%E8%AF%BB%E9%A1%B5%E8%87%AA%E5%8A%A8%E8%B7%B3%E8%BD%AC%E6%8F%90%E7%A4%BA.meta.js
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

(function() {
  var cnt = 0;
  var maxTime = 25;
  function doThing() {
    var b = document.getElementsByClassName("read-status-close");
    GM_log("消除自动跳转干扰.user.js: executed " + cnt + " times...");
    if (b && (b.length > 0) && b[0]) {
        //GM_log("消除自动跳转干扰.user.js: b[0].click - " + b[0].click.toString());
        b[0].click();
        cnt = maxTime;
    } else {
        GM_log("消除自动跳转干扰.user.js: 无干扰");
    }
    if (cnt < maxTime) {
       cnt++;
       setTimeout(doThing, 500);
    }
  }
  doThing();
})();