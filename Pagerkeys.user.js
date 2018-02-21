// ==UserScript==
// @name         Pagerkeys
// @author       zephyrer
// @namespace    https://github.com/zephyrer/
// @description  Add ArrowLeft and ArrowRight for generic next/previous page. It will click the last found link whose text starts/ends with e.g. "Next", "Prev", or "Previous".
// @version      2.0.20.1
// @match        *://*/*
// @downloadURL  https://github.com/zephyrer/userscripts/raw/master/Pagerkeys.user.js
// @updateURL    https://github.com/zephyrer/userscripts/raw/master/Pagerkeys.meta.js
// @copyright    Efisio Zephyr
// @grant        GM_log
// ==/UserScript==
(function(){
  const PREV = 'prev';
  const PREV_KEYWORDS = ['^prev(ious)?\\b', '\\bprev(ious)?$', '上一(页|章|节)', '<', '<<', '«'];
  const NEXT = 'next';
  const NEXT_KEYWORDS = ['^next(\\b|$)', '下一(页|章|节)', '>', '>>', '»'];
  const CONTENT_KEYWORDS = ['content', '^目录$', '返回目录', 'index'];
  const INVALID_URL = 'javascript:';

  function loadURI(url){
GM_log("Pager keys LOADing " + url);
    location.href = url;
  }

  function incrementURL() {
    var url = location.href;
    if (!url.match(/(.*:\/\/.*\/.*)(\d+)(\D*)$/))
      return false;
    var num = RegExp.$2;
    var digit = (num.charAt(0) == '0') ? num.length : null;
    num = parseInt(num, 10) + 1;
    if (num < 0)
      return false;
    num = num.toString();
    digit = digit - num.length;
    for (var i = 0; i < digit; i++)
      num = '0' + num;
GM_log("Pager keys *** increment ***, TO LOAD " + url);
    loadURI(RegExp.$1 + num + RegExp.$3);
    return true;
  }

  function pager(PREV_NEXT, KEYWORDS) {
    if (!KEYWORDS)
      return;

    var doc = document;
    var links = doc.getElementsByTagName('link');
    if (PREV_NEXT && PREV_NEXT !== '') {
      for (var i = 0; i < links.length; i++) {
        if (links[i].href && links[i].hasAttribute('rel') && links[i].getAttribute('rel').toLowerCase().indexOf(PREV_NEXT) == 0) {
GM_log("Pager keys *** link rel ***, TO LOAD " + links[i].href);
          loadURI(links[i].href);
          return true;
        }
      }
    }

    if (PREV_NEXT && PREV_NEXT === 'prev') {
      links = Array.from(doc.getElementsByTagName('a')).filter((x) => x.classList.contains('prev'));
      if (links.length > 0) {
GM_log("Pager keys *** class prev ***, TO LOAD " + links[0].href);
        loadURI(links[0].href);
        return true;
      }
    }

    if (PREV_NEXT && PREV_NEXT === 'next') {
      links = Array.from(doc.getElementsByTagName('a')).filter((x) => (x.classList.contains('next') || x.classList.contains('nxt')));
      if (links.length > 0) {
GM_log("Pager keys *** class next ***, TO LOAD " + links[0].href);
        loadURI(links[0].href);
        return true;
      }
    }

    var regexp = new RegExp('(' + KEYWORDS.join('|') + ')', 'i');
GM_log("Pager keys *** regexp ***, REGEXP " + regexp);
    links = Array.from(doc.links).filter((x) => x.href && !/^(javascript|ftp|x-github-client|ed2k|magnet):/i.test(x.href));
    for (i = 0; i < links.length; i++) {
      if (links[i].href && links[i].textContent && links[i].textContent.trim().match(regexp)) {
        loadURI(links[i].href);
        return true;
        /*
        var len = RegExp.$1.length;
        var per = (len == 1) ? 0.3 : 0.4;
        if (links[i].textContent.length * per < len){
GM_log("Pager keys *** regexp ***, TO LOAD " + links[i].href);
          loadURI(links[i].href);
          return true;
        }
        */
      }
    }
    return incrementURL();
  }

  function installHandler() {
    addEventListener("keydown", function(ev) {
      if (!ev.ctrlKey && !ev.altKey && !ev.shiftKey) {
  //GM_log("document.activeElement.tagName：" + document.activeElement.tagName);
  //GM_log("document.activeElement.isContentEditable：" + document.activeElement.isContentEditable);
  //GM_log("document.activeElement.contentEditable：" + document.activeElement.contentEditable);
        if (document.activeElement && (
            (/^(INPUT|TEXTAREA)$/).test(document.activeElement.tagName) ||
             document.activeElement.isContentEditable ||
             (document.activeElement.contentEditable == "true")
            )
           )
           return;
        switch (ev.key) {
          case "ArrowLeft": //previous
            if (pager(PREV, PREV_KEYWORDS))
              return;
            break;
          case "ArrowRight": //next
            if (pager(NEXT, NEXT_KEYWORDS))
              return;
            break;
          case "Enter": //content
            if (pager('', CONTENT_KEYWORDS))
              return;
            break;
        }
      }
    }, false);
  }

  installHandler();
})();