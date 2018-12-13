// ==UserScript==
// @name          自定义快速链接
// @author        zephyrer
// @namespace     https://github.com/zephyrer/
// @match         https://weibo.com/*
// @match         https://*.weibo.com/*
// @version       0.2.6.0
// @description   为微博等站点页面添加各类直链
// @downloadURL   https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.user.js
// @updateURL     https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.meta.js
// @copyright     2018, Efisio Zephyr
// @grant         GM_addStyle
// ==/UserScript==

(function(){
  if (window.top !== window.self)
    return;
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
/*
      {name: '杨孟霖Nick超话',
       url:  'http://huati.weibo.com/5479348'},
 */
  const directURLs = {
    "weibo.com": [
      {name: '杨孟霖超话',
       url:  'http://huati.weibo.com/5450398'},
      {name: '施柏宇超话',
       url:  'http://huati.weibo.com/5489289'},
      {name: '宇霖cp超话',
       url:  'http://huati.weibo.com/5509572'},
      {name: '张赫超话',
       url:  'http://huati.weibo.com/5132232'},
      {name: '杨孟霖Nick',
       url:  'https://weibo.com/u/3148083033'},
      {name: '施柏宇patrick',
       url:  'https://weibo.com/u/5946042311'},
      {name: 'MarkGun超话',
       url:  'http://huati.weibo.com/5614825'},
      {name: 'Gunnapatn超话',
       url:  'http://huati.weibo.com/5579596'},
      {name: 'Gunnapatn',
       url:  'https://weibo.com/u/6528529056'},
      {name: 'Marksiwat超话',
       url:  'http://huati.weibo.com/5196173'},
      {name: 'Marksiwat',
       url:  'https://weibo.com/u/6528517553'},//https://weibo.com/n/Mark-Siwat
      {name: '陈智霆超话',
       url:  'http://huati.weibo.com/k/%E9%99%88%E6%99%BA%E9%9C%86'},
      {name: '陈瑞书超话',
       url:  'http://huati.weibo.com/5638897'},
      {name: '甜橙夫夫超话',
       url:  'http://huati.weibo.com/5617881'},
      {name: '张赫超话',
       url:  'http://huati.weibo.com/5132232'},
      {name: '盛一伦',
       url:  'https://weibo.com/shengyilun1'},
      {name: '高瀚宇KD',
       url:  'https://weibo.com/u/1308391574'},
      {}// ending placeholder
    ]
  }
  var huatis = getDefaultObjectAt(directURLs, location.host);
  if (isEmpty(huatis)) return;

  var css = `
    #direct-links-to-super-topics {
      z-index: 99999;
      position: fixed;
      left: auto;
      right: 2px;
      top: auto;
      bottom: 100px;
      border: 2px red solid;
      color: orange;
      mix-blend-mode: difference;
      max-height: 300px;
      width: 120px;
      overflow: auto;
      scrollbar-color: rebeccapurple green;
    }
    a[id^='direct-link-to-super-topic-'] {
      font-size: 14px;
    }
    @media (min-width: 1800px) {
      a[id^='direct-link-to-super-topic-'] {
        font-size: 18px;
      }
    }
  `;
  GM_addStyle(css);

  var div = document.createElement('div');
  div.id = 'direct-links-to-super-topics';
  //div.style = 'z-index: 99999; position: fixed; left: auto; right: 2px; top: auto; bottom: 100px; border: 2px red solid; color: orange; mix-blend-mode: difference';
  var list = document.createElement('ul');
  for (let i=0; i<huatis.length; i++) {
    if (isEmpty(huatis[i])) break;// ending placeholder
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
