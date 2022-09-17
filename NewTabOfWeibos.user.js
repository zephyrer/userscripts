// ==UserScript==
// @name               New Tab of Weibos
// @name:zh-CN         新标签页打开微博
// @namespace          https://github.com/zephyrer/userscripts/
// @version            0.0.14.5
// @description        click specific links to open the weibo in a new tab
// @description:zh-CN  新标签页打开微博
// @author             zephyrer
// @match              https://weibo.com/*
// @match              https://*.weibo.com/*
// @icon               https://www.google.com/s2/favicons?sz=64&domain=weibo.com
// @grant              none
// ==/UserScript==

(function() {
  'use strict';

  const rootSelector = '.vue-recycle-scroller__item-wrapper';
  const altRootSel = 'article[class*="Feed_wrap"]';
  const careContainer = ':is(div[class*="vue-recycle-scroller__item-view"],div[class*="Feed_retweet_"])';
  const altContainer = 'div[class^="Feed_body"]';
  const careSelector = 'a[class^="head-info_time"]:not([user-inserted])';
  //const careSelector = 'a[class^="head-info_time_"]';

  const handler = {
    handleEvent: function(e) {
      switch(e.type) {
        case 'click':
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          //console.log('target name: ' + e.target.nodeName + ', inner content: ' + e.target.innerHTML);
          //console.log('currentTarget name: ' + e.currentTarget.nodeName + ', inner content: ' + e.currentTarget.innerHTML);
          window.open(e.currentTarget.previousSibling.href, '_blank');
          break;
      }
    }
  };

  let count = 0;
  function makeExternalLink(a) {
    //console.log("External from: " + a.href + '(' + count++ +')');
    let aNew = document.createElement('a');
    aNew.classList.add(...a.classList);
    aNew.innerHTML = '<img src="https://cdn-icons-png.flaticon.com/128/6705/6705383.png" width="12px" />';
    aNew.href = '#';
    aNew.setAttribute('user-inserted', 'true');
    aNew.addEventListener('click', handler, false);
    a.parentNode.insertBefore(aNew, a.nextSibling);
  }

  function loopDescendants(node, sel, callback) {
    for(let a of node.querySelectorAll(sel)) {
      callback(a);
    }
  }

  let demoElem = document.querySelector(rootSelector);
  let container = careContainer;
  if (demoElem === null) {
    demoElem = document.querySelector(altRootSel);
    container = altContainer;
  }
  if (demoElem === null) return;
  console.log('container is ' + container);
  demoElem = document.body;
  loopDescendants(demoElem, careSelector, makeExternalLink);

  let observer = new MutationObserver(mutations => {
    for(let mutation of mutations) {
      // 检查新节点，有什么需要特殊处理的吗？
      for(let node of mutation.addedNodes) {
        // 我们只跟踪元素，跳过其他节点（例如文本节点）
        if (!(node instanceof HTMLElement)) continue;
        /*
        // // 检查插入的元素是否为微博块
        if (node.matches(container)) {
          for(let elem of node.querySelectorAll(careSelector)) {
            makeExternalLink(elem);
          }
        }*/
        // 检查插入的元素是否为目标元素
        if (node.matches(careSelector)) {
          makeExternalLink(node);
        } else if (node.matches(container)) {
          for(let elem of node.querySelectorAll(careSelector)) {
            makeExternalLink(elem);
          }
        }
      }
    }
  });

  observer.observe(demoElem, {childList: true, subtree: true});

})();