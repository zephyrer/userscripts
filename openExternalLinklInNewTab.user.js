// ==UserScript==
// @name         Open External Link in NewTab
// @version      0.3.6.0
// @namespace    https://github.com/zephyrer/
// @contributor  DandyClubs
// @description  This script will open any external link in new tab. Support dynamic content. Support subdomain aaa.test.co.kr = bbb.test.co.kr (controlled by bStrict)
// @include      *
// @downloadURL  https://github.com/zephyrer/userscripts/raw/master/openExternalLinklInNewTab.user.js
// @updateURL    https://github.com/zephyrer/userscripts/raw/master/openExternalLinklInNewTab.meta.js
// @copyright    Efisio Zephyr
// @run-at       document-start
// @grant        none
// ==/UserScript==
(function(){

"use strict";

var bStrict = false;
var getHost = function(url) {return url;};
var protocolsMustNewTab = ["ftp:", "ftps:", "ws:", "wss:"];
var protocolsToHandle = ["http:", "https:"];
var protocolsToIgnore = ["javascript:", "magnet:", "git:"];
var urlsMustNewTab = [
  {patterns: [/https:\/\/www\.amazon\.c(n|om)\/(d|g)p\//i],
   includes: null,
   excludes: [/https:\/\/www.amazon.cn\/gp\/your-account\//i]},
  {patterns: [/https:\/\/www\.douban\.com\/group\/(topic|search)\//i],
   includes: null,
   excludes: [/\/\?(cid|start)=/i]},
  {patterns: [/https?:\/\/(www|bbs)\.\w+\.\w+\/viewthread/i],
   includes: null,
   excludes: [/&page=/i]}
];

function getAnchor(element) {
  while (element && element.nodeName != "A") {
    element = element.parentNode;
  }
  return element;
}

function getDomain(url) {
  if (url.indexOf('://') !== -1) {
    let n = url.indexOf('://');
    url = url.substr(url.indexOf('://') + 3);
  }
  if (url.indexOf('/') !== -1) url = url.split('/')[0];
  url = url.split('.');
  let level = 0;
  if (url[url.length - 1].length == 2 && (url[url.length - 2].length == 2 || url[url.length - 2].length == 3)) {
    // co.kr, co.jp
    // com.cn, edu.cn
    // 163, jd, qq
    level = -3;
  }
  else if (url.includes("mozilla") ||
           url.includes("microsoft") ||
           url.includes("google") ||
           url.includes("apple") ||
           url.includes("sohu") ||
           url.includes("baidu") ||
           url.includes("taobao") ||
           url.includes("tmall")
          ) {
    level = -3;
  }
  else if (url.includes("sina")) {
    level = -4;
  }
  else {
    level = -2;
  }
  url = url.slice(level).join('.');
  return url;
}

if (!bStrict) getHost = getDomain;

document.addEventListener("click", function(e){
  var anchor = getAnchor(e.target);
  //console.log("href is: " + anchor.href);
  if (!anchor) return true;
  if (/#$/.test(anchor.href)) return true;
  if (anchor.target || protocolsToIgnore.includes(anchor.protocol) || !protocolsToHandle.includes(anchor.protocol) || e.isTrusted === false || !anchor.offsetParent || (e.isTrusted == null && !e.detail)) {
    return true;
  }
  if (protocolsMustNewTab.includes(anchor.protocol) ||
      urlsMustNewTab.some(e => {
        if (e.patterns.some(i => i.test(anchor.href))) {// first, match the url pattern
          if (e.includes && e.includes.some(i => i.test(anchor.href))) {// second, include
            return true;
          }
          if (e.excludes && e.excludes.some(i => i.test(anchor.href))) {// third, exclude
            return false;
          }
          return true;// if includes and excludes are null, default the url matched open in new tab
        } else {
          return false;
        }
      })
     ) {
    anchor.target = "_blank";
    e.stopImmediatePropagation();
    e.stopPropagation();
    return false;
  }

  if (getHost(anchor.hostname) != getHost(location.hostname)) {
    anchor.target = "_blank";
  }
  e.stopImmediatePropagation();
  e.stopPropagation();
  return false;
}, false);

/*
if (document.location.hostname == "weibo.com") {
  var patterns = [/weibo\.com/i,/https?:\/\/t\.cn\/.+/i];
  var observer = new MutationObserver(function (mutationsList) {
    // mutationsList参数是个MutationRecord对象数组，描述了每个发生的变化
    mutationsList.forEach(function (mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeName.toLowerCase() === "a" || (node.tagName && node.tagName.toLowerCase() === "a")) {
          console.log(node.textContent + " <- " + node.href);
          if (patterns.some(e => e.test(node.href))) {
            node.target = "_blank";
            console.log(node.textContent + " -> " + node.target);
          }
        }
      })
    });
  });

  // 开始观察ell元素并制定观察内容
  observer.observe(document, {
      childList: true,
      subtree: true
  });

  function doi() {
    document.links.forEach(node => {
      if (patterns.some(e => e.test(node.href))) {
        node.target = "_blank";
        console.log(node.textContent + " -> " + node.target);
      }
    });
    setInterval(myCallback, 500);
    function myCallback() {
      var links = document.querySelectorAll('a[class^="head-info_time"]');
      links.forEach(node => {node.target = "_blank";console.log(node.textContent + " -> " + node.target)});
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', doi, false);
  } else {  // 此时`DOMContentLoaded` 已经被触发
    doi();
  }
}
*/

})();