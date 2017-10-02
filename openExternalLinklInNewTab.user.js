// ==UserScript==
// @name         Open External Link in NewTab
// @version      0.3.3.1
// @namespace    EfisioZephyr
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

function getAnchor(element) {
	while (element && element.nodeName != "A") {
		element = element.parentNode;
	}
	return element;
}

function getDomain(url) {
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
	if (anchor.target || anchor.protocol == "javascript:" || anchor.protocol == "magnet:"|| e.isTrusted === false || !anchor.offsetParent || (e.isTrusted == null && !e.detail)) {
		return;
	}
	
	if (getHost(anchor.hostname) != getHost(location.hostname)) {
		anchor.target = "_blank";
	}
});

})();