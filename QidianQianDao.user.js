// ==UserScript==
// @name        Auto-scoreing on Qidian
// @namespace   zephyrer@msn.com
// @description 自动获取起点经验值
// @include     http://me.qidian.com/profile/score.aspx
// @version     0.1.1
// @copyright   Efisio Zephyr
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.meta.js
// @grant       none
// ==/UserScript==

(function() {
  function autoscore() {
    var plusItems = document.getElementsByClassName('plus-items')[0];
    var btns = plusItems.getElementsByClassName('btn');
    for (var i=0; i<btns.length; i++) {
      if (btns[i].textContent === '可领取') {
        btns[i].click();
        setTimeout("location.reload(true);", 1000);
        break;
      } else if (btns[i].textContent === '00:00') {
        location.reload(true);
        break;
      }
    }
  }
  
  setTimeout(autoscore, 5000);  
})();
