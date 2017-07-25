// ==UserScript==
// @name        Auto-scoreing on Qidian
// @namespace   EfisioZephyr
// @description 自动获取起点经验值
// @include     http://my.qidian.com/level
<<<<<<< HEAD
// @version     0.3.2.3
=======
// @version     0.3.2.2
>>>>>>> 1b9b29f8ca2ef43f96306998c453e6d1f569c34e
// @copyright   Efisio Zephyr
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/QidianQianDao.meta.js
// @grant       GM_log
// ==/UserScript==

(function() {
  function autoscore() {
    var btns = document.getElementsByClassName('elGetExp');
    GM_log("elGetExp: " + btns.length)
    if (btns && btns.length > 0) {
      btns[0].click();
      //setTimeout("location.reload(true);", 1000);
    } else if (document.getElementsByClassName('elIsCurrent')) {
<<<<<<< HEAD
      setTimeout(autoscore, 10000);
=======
      setTimeout(autoscore, 30000);
>>>>>>> 1b9b29f8ca2ef43f96306998c453e6d1f569c34e
    }
  }
  setTimeout(autoscore, 1);
})();

