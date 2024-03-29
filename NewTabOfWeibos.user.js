// ==UserScript==
// @name               New Tab of Weibos
// @name:zh-CN         新标签页打开微博
// @namespace          https://github.com/zephyrer/userscripts/
// @version            0.0.15
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

  const careContainer = ':is(div[class*="vue-recycle-scroller__item-view"], \
                             div[class*="Feed_retweet_"], \
                             article[class*="Feed_wrap_"], \
                             div[class^="Feed_body_"])';
  const careSelector = 'a[class^="head-info_time"]:not([user-inserted])';

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

  function makeExternalLink(a) {
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

  let demoElem = document.body;
  loopDescendants(demoElem, careSelector, makeExternalLink);

  let observer = new MutationObserver(mutations => {
    /*
    let counter = {
      anchors: 0,
      containers: 0,
      reset: function() {
        this.anchors = this.containers = 0;
      },
      textStyle: 'color: yellow; background-color: blue; font-weight: 500',
      strongStyle: 'color: yellow; background-color: blue; font-weight: 700',
      log: function() {
        console.log('%cIn this mutation, we\'ve gotten %c%d anchors%c and %c%d feeds%c.', this.textStyle,
                    this.strongStyle, this.anchors, this.textStyle, this.strongStyle, this.containers, this.textStyle);
      }
    };
    */
    for(let mutation of mutations) {
      // 检查新节点，有什么需要特殊处理的吗？
      //let msg = 'new nodes are: \r\n';
      for(let node of mutation.addedNodes) {
        //let classes = node.classList;
        //msg += `${node.nodeName}[class="${classes}"]\r\n`;
        // 我们只跟踪元素，跳过其他节点（例如文本节点）
        if (!(node instanceof HTMLElement)) continue;
        // 检查插入的元素是否为目标元素
        if (node.matches(careContainer)) {
          for(let elem of node.querySelectorAll(careSelector)) {
            makeExternalLink(elem);
          }
        }
      }
      //console.log(msg);
    }
  });

  observer.observe(demoElem, {childList: true, subtree: true});

})();