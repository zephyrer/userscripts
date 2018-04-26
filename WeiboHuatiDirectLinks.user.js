// ==UserScript==
// @name          微博超话快速链接
// @author        zephyrer
// @namespace     https://github.com/zephyrer/
// @match         https://weibo.com/*
// @version       0.1.3
// @description   为微博页面添加超话直链
// @downloadURL   https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.user.js
// @updateURL     https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.meta.js
// @copyright     2018, Efisio Zephyr
// @grant         none
// ==/UserScript==

(function(){
  const getDefaultObjectAt = function (array, index) {return array[index] = array[index] || {};};
  const isNull = val => val === null;
  const isEmpty = function (obj) {
    if (typeof obj === 'undefined')
      return true;
    if (obj === void 0)
      return true;
    if (obj === undefined)
      return true;
    if (obj === null)
      return true;
    if (Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0 && obj.constructor === Object)
      return true;
    if (!obj)
      return true;
    return false;
  }
  var huatis = [
    {name: '杨孟霖',
     url:  'http://huati.weibo.com/5450398'},
    {name: '施柏宇',
     url:  'http://huati.weibo.com/5489289'},
    {name: '宇霖cp',
     url:  'http://huati.weibo.com/5509572'},
    {name: '张赫',
     url:  'http://huati.weibo.com/5132232'},
    {}
  ];
  
  var div = document.createElement('div');
  div.id = 'direct-links-to-super-topics';
  div.style = 'position: fixed; left: auto; right: 2px; top: auto; bottom: 100px; border: 2px red solid;';
  var list = document.createElement('ul');
  for (let i=0; i<huatis.length; i++) {
    if (isEmpty(huatis[i])) continue;
    let link = document.createElement('a');
    link.id = 'direct-link-to-super-topic-' + i;
    link.innerHTML = huatis[i].name;
    link.setAttribute('href', huatis[i].url);
    link.setAttribute('target', '_blank');
    let item = document.createElement('li');
    item.appendChild(link);
    list.appendChild(item);
  }
  div.appendChild(list);
  document.body.appendChild(div);
  
  return;
})();
