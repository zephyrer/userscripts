// ==UserScript==
// @name        Auto-scoreing on Qidian
// @namespace   EfisioZephyr
// @description 自动获取起点经验值
// @include     http://my.qidian.com/level
// @include     https://my.qidian.com/level
// @version     0.3.2.5
// @copyright   Efisio Zephyr
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.meta.js
// @grant       GM_log
// ==/UserScript==

(function() {
  function autoscore() {
    var btns = document.getElementsByClassName('elGetExp');
    if (btns && btns.length > 0) {
      GM_log("elGetExp: " + btns.length);
      btns[0].click();
      //setTimeout("location.reload(true);", 1000);
    } else if (document.getElementsByClassName('elIsCurrent')) {
      setTimeout(autoscore, 10000);
    } else {
      setTimeout(autoscore, 3600000);
    }
  }
  setTimeout(autoscore, 10);
})();

