// ==UserScript==
// @name        Auto-scoreing on Qidian
// @namespace   https://github.com/zephyrer
// @description 自动获取起点经验值
// @include     http://me.qidian.com/profile/score.aspx
// @include     http://my.qidian.com/level
// @version     0.3.0
// @copyright   Efisio Zephyr
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.meta.js
// @grant       none
// ==/UserScript==

(function() {
  function autoscore() {
    if (location.href.indexOf("score") > -1) {
      var plusItems = document.getElementsByClassName('plus-items')[0];
      var btns = plusItems.getElementsByClassName('btn');
      for (var i=0; i<btns.length; i++) {
        if (btns[i].textContent.includes('可领取')) {
          btns[i].click();
          setTimeout("location.reload(true);", 1000);
          break;
        } else if (btns[i].textContent === '00:00') {
          location.reload(true);
          break;
        }
      }
    } else {
      var btns = document.getElementsByClassName('elGetExp');
      if (btns) {
        btns[0].click();
        setTimeout("location.reload(true);", 1000);
      } else {
        setTimeout(autoscore, 5000);
      }
    }
  }
  setTimeout(autoscore, 5000);
})();
