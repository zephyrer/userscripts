// ==UserScript==
// @name          自定义快速链接
// @author        zephyrer
// @namespace     https://github.com/zephyrer/
// @match         https://weibo.com/*
// @match         https://*.weibo.com/*
// @exclude-match https://weibo.com/ttarticle/*
// @version       0.2.7.1
// @description   为微博等站点页面添加各类直链
// @downloadURL   https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.user.js
// @updateURL     https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.meta.js
// @copyright     2018, Efisio Zephyr
// @grant         GM_addStyle
// ==/UserScript==

(function(){
  if (window.top !== window.self)
    return;
  const getDefaultObjectAt = function (array, index) {return array[index] || {};};
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
      {name: '肖战',
       url:  'https://weibo.com/xiaozhan1'},
      {name: '肖战工作室',
       url:  'https://weibo.com/u/6643123988'},
      {name: '肖战超话',
       url:  'https://huati.weibo.com/4079642'},
      {name: '零柒年浮影',
       url:  'https://weibo.com/u/1733102053'},
      {name: '天府',
       url:  'https://weibo.com/u/7351772787'},
      {name: '喜翻',
       url:  'https://weibo.com/u/7361457829'},
      {name: '宅基地',
       url:  'https://weibo.com/u/6489598481'},
      {name: '追剧天团',
       url:  'https://weibo.com/u/7319883354'},
      {name: '顶风',
       url:  'https://weibo.com/u/6892479995'},
      {name: '幻月',
       url:  'https://weibo.com/u/5389683779'},
      {name: '晨光曦',
       url:  'https://weibo.com/u/7070113048'},
      {name: '南木言',
       url:  'https://weibo.com/u/5719868787'},
      {name: '鱼子酱',
       url:  'https://weibo.com/yuzijiangzimuzu'},
      {name: '凤凰天使',
       url:  'https://weibo.com/fhtsks'},
      {name: '神叨',
       url:  'https://weibo.com/shenbibi'},
      {name: '小施爱吃肠旺面',
       url:  'https://weibo.com/u/2077867213'},
      {name: 'kmoonhh',
       url:  'https://weibo.com/u/6679183776'},
      {name: 'SEVENXHs',
       url:  'https://weibo.com/u/2951375584'},
      {name: '肖战 on 豆瓣',
       url:  'https://www.douban.com/group/search?start=0&cat=1013&sort=time&q=%E8%82%96%E6%88%98'},
      {name: '星球放映室',
       url:  'https://weibo.com/u/7142114548'},
/*    {name: '杨孟霖Nick',
       url:  'https://weibo.com/u/3148083033'},
      {name: '杨孟霖超话',
       url:  'http://huati.weibo.com/5450398'},
      {name: '施柏宇超话',
       url:  'http://huati.weibo.com/5489289'},*/
      {name: '宇霖cp超话',
       url:  'http://huati.weibo.com/5509572'},
/*      {name: '施柏宇patrick',
       url:  'https://weibo.com/u/5946042311'},*/
      {name: 'MarkGun超话',
       url:  'http://huati.weibo.com/5614825'},
/*      {name: 'Gunnapatn超话',
       url:  'http://huati.weibo.com/5579596'},
      {name: 'Gunnapatn',
       url:  'https://weibo.com/u/6528529056'},
      {name: '陈智霆超话',
       url:  'http://huati.weibo.com/k/%E9%99%88%E6%99%BA%E9%9C%86'},
      {name: '战斗虾',
       url:  'https://huati.weibo.com/6744285'},
      {name: '肖战最好的你',
       url:  'https://huati.weibo.com/3965968'},
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
      {name: 'Marksiwat超话',
       url:  'http://huati.weibo.com/5196173'},
      {name: 'Marksiwat',
       url:  'https://weibo.com/u/6528517553'},//https://weibo.com/n/Mark-Siwat*/
      {}// ending placeholder
    ]
  }
  var huatis = getDefaultObjectAt(directURLs, location.host.replace(/^www\./i, ""));
  if (isEmpty(huatis)) return;

  var css = `
    #direct-links-to-super-topics {
      z-index: 99999;
      position: fixed;
      left: auto;
      right: 2px;
      top: auto;
      bottom: 120px;
      border: 2px red solid;
      color: orange;
      mix-blend-mode: difference;
      max-height: 300px;
      width: 150px;
      overflow: auto;
      scrollbar-color: rebeccapurple green;
    }
    #direct-links-to-super-topics ul {
      list-style-type: none;
      list-style-image: none;
      margin-left: 0px;
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
