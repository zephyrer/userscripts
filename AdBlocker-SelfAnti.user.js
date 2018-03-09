// ==UserScript==
// @name        Anti-AdBlocker Selfly
// @namespace   https://github.com/zephyrer/
// @description 阻止网站反广告检测
// @include     http://www.hdmee.com/*
// @include     http://www.hdmee.me/*
// @include     http://bbs.zzznan.com/*
// @include     http://*.tt1069.com/*
// @include     http://www.qingguox.com/*
// @include     https://*.cnbeta.com/*
// @downloadURL https://github.com/zephyrer/userscripts/raw/master/AdBlocker-SelfAnti.user.js
// @updateURL   https://github.com/zephyrer/userscripts/raw/master/AdBlocker-SelfAnti.meta.js
// @version     0.2.0.2
// @grant       none
// @run-at      document-start
// ==/UserScript==

(function() {
function antis() {
  console.log("Anti-AdBlocker Selfly pre-executing...");
  if (location.host.indexOf("hdmee.com") !== -1 ||
      location.host.indexOf("hdmee.me") !== -1 ||
      location.host.indexOf("zzznan.com") !== -1 ||
      location.host.indexOf("qingguox.com") !== -1
     ) {
    window.ad = "Anti-unadblock - ad";
    window.ads ='Anti-unadblock - ads';
    window.dzad ='Anti-unadblock - dzad';
    window.dzads ='Anti-unadblock - dzads';
    //alert(window.ad);
    return;
  }
  else if (location.host.indexOf("tt1069.com") !== -1) {
      let adLayer = document.createElement("DIV");
      adLayer.id = "tt_FIuBYoHOADK";
      document.body.appendChild(adLayer);
    }
  else if (location.host.indexOf("cnbeta.com") !== -1) {
    let count = 0;
    let REPEATED = 15;
    let INTERVAL = 500;//ms

    let iid = setInterval(cnbeta_callback, INTERVAL);
    function cnbeta_callback() {
      if (document.body) {
        console.log("Anti-AdBlocker Selfly executing...");
        let objs = Array.from(document.getElementsByTagName("DIV")).filter((x) => x.getAttribute("style")&&x.getAttribute("style").indexOf("position:fixed;bottom:0;margin-top:10px;width:100%;background:#c44;") !== -1);
        if (objs.length > 0) {
          clearInterval(iid);
          let nag_msg_bar = objs[0];
          document.body.removeChild(nag_msg_bar);
          return;
        }
      }
      console.log("Anti-AdBlocker Selfly looping...");
      if (count > REPEATED)
        clearInterval(iid);
      else
        count++;
      
    }
  }
}
antis();
/*
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === "loading") {
    antis();
  }
});
*/
})();