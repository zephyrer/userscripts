// ==UserScript==
// @name              chaospace.fun x
// @name:zh-CN        chaospace.fun 增强
// @description       2022/4/24 23:44:17
// @description:zh-CN 2022/4/24 23:44:17
// @namespace         github.com/zephyrer/userscripts
// @author            zephyrer
// @version           1.0
// @match             https://www.chaospace.fun/seasons/*.html
// @match             https://www.chaospace.fun/movies/*.html
// @grant             none
// ==/UserScript==
(function(){
  let tab = document.querySelector("a[href='#buy']");
  if (tab) {
    console.log("chaospace/fun kuake tab: " + tab)
    setTimeout(function() {
      jQuery("a[href='#buy']").trigger('click');
    }, 1);
  }
})();

/*
(function(){
  let tab = document.querySelector("a[href='#download']");
  if (!tab) {
    tab = document.querySelector("a[href='#buy']");
    if (tab) {
      console.log("chaospace/fun other tab: " + tab)
      setTimeout(function() {
        jQuery("a[href='#buy']").trigger('click');
      }, 1);
    }
  }
})();
 */