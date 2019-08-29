// ==UserScript==
// @name         Open External Link in NewTab
// @version      0.3.5.1
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
  {patterns: [/https:\/\/www\.amazon\.cn\/(d|g)p\//i],
   includes: null,
   excludes: [/https:\/\/www.amazon.cn\/gp\/your-account\//i]},
  {patterns: [/https:\/\/www\.douban\.com\/group\/topic\//i],
   includes: null,
   excludes: null}
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
  if (!anchor) return;
  if (protocolsMustNewTab.includes(anchor.protocol) ||
      urlsMustNewTab.some(e => {
        if (e.includes && e.includes.every(i => !i.test(anchor.href))) {
          return false;
        }
        if (e.excludes && e.excludes.some(i => i.test(anchor.href))) {
          return false;
        }
        return e.patterns.some(i => i.test(anchor.href));
      })
     ) {
    anchor.target = "_blank";
    return;
  }
  if (anchor.target || !protocolsToHandle.includes(anchor.protocol) || e.isTrusted === false || !anchor.offsetParent || (e.isTrusted == null && !e.detail)) {
    return;
  }

  if (getHost(anchor.hostname) != getHost(location.hostname)) {
    anchor.target = "_blank";
  }
});

})();