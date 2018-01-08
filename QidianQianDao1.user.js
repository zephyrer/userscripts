// ==UserScript==
// @name        Auto-scoreing on Qidian (Old Fashion)
// @namespace   https://github.com/zephyrer/
// @description 自动获取起点经验值（旧版）
// @include     http://me.qidian.com/profile/score.aspx
// @version     0.2.1.2
// @copyright   Efisio Zephyr
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/QidianQianDao1.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/QidianQianDao1.meta.js
// @grant       none
// ==/UserScript==

(function() {
  function autoscore() {
    var plusItems = document.getElementsByClassName('plus-items')[0];
    var btns = plusItems.getElementsByClassName('btn');
    for (var i=0; i<btns.length; i++) {
      if (btns[i].textContent.includes('可领取')) {
        btns[i].click();
        setTimeout("location.reload(true);", 1000);
        break;
      }
      else if (btns[i].textContent === '00:00') {
        location.reload(true);
        break;
      }
    }
  }
  setTimeout(autoscore, 5000);
})();
