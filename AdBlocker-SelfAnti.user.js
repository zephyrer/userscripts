// ==UserScript==
// @name        Anti-AdBlocker Selfly
// @namespace   zephyrer@msn.com
// @description 阻止网站反广告检测
// @include     http://www.hdmee.com/*
// @include     http://bbs.zzznan.com/*
// @include     http://*.tt1069.com/*
// @include     http://www.qingguox.com/*
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/AdBlocker-SelfAnti.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/AdBlocker-SelfAnti.meta.js
// @version     0.1.2
// @grant       none
// @run-at      document-start
// ==/UserScript==

if (location.host.indexOf("hdmee.com") !== -1 ||
    location.host.indexOf("zzznan.com") !== -1 ||
    location.host.indexOf("qingguox.com") !== -1
   ) {
	window.ad = "Anti-unadblock - ad";
	window.ads ='Anti-unadblock - ads';
	window.dzad ='Anti-unadblock - dzad';
	window.dzads ='Anti-unadblock - dzads';
}
else if (location.host.indexOf("tt1069.com") !== -1) {
	let adLayer = document.createElement("DIV");
	adLayer.id = "tt_FIuBYoHOADK";
	document.body.appendChild(adLayer);
}
//alert(window.ad);
