// ==UserScript==
// @name         Open External Link in NewTab
// @version      0.3
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
var getHost = function(url) {return url};

function getAnchor(element) {
	while (element && element.nodeName != "A") {
		element = element.parentNode;
	}
	return element;
}

function getDomain(url) {
    if (url.indexOf('/') !== -1) url = url.split('/')[0];
    url = url.split('.');
    if (url[url.length - 1].length == 2 && url[url.length - 2].length == 2) url = url.slice(-3).join('.');
    else url = url.slice(-2).join('.');
    return url;
}

if (!bStrict) getHost = getDomain;

document.addEventListener("click", function(e){
	var anchor = getAnchor(e.target);
	if (!anchor) return;
	if (anchor.target || anchor.protocol == "javascript:" || anchor.protocol == "magnet:"|| e.isTrusted === false || !anchor.offsetParent || (e.isTrusted == null && !e.detail)) {
		/*
		let msg = !anchor ? "Target" : anchor.href;
		msg += " isn't normal link.";
		GM_log(msg)
		*/
		return;
	}
	
	/*
	{
		let msg = GetDomain(anchor.hostname) + " is an ";
		msg += (GetDomain(anchor.hostname) != GetDomain(location.hostname)) ? "external" : "internal";
		msg += " link.";
		GM_log(msg);
	}
	*/

	if (getHost(anchor.hostname) != getHost(location.hostname)) {
		anchor.target = "_blank";
	}
});

})();