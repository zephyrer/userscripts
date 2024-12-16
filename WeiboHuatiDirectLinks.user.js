// ==UserScript==
// @name          自定义快速链接
// @author        zephyrer
// @namespace     https://github.com/zephyrer/
// @match         https://weibo.com/*
// @match         https://*.weibo.com/*
// @exclude-match https://weibo.com/ttarticle/*
// @version       0.3.1.31
// @description   为微博等站点页面添加各类直链
// @icon          https://weibo.com/favicon.ico
// @downloadURL   https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.user.js
// @updateURL     https://github.com/zephyrer/userscripts/raw/master/WeiboHuatiDirectLinks.meta.js
// @copyright     2018-2024, Efisio Zephyr
// @grant         GM_addStyle
// ==/UserScript==

(function(){
  if (window.top !== window.self) {
    return;
  }
  const getDefaultObjectAt = function (array, index) {return array[index] || {};};
  const isNull = val => val === null;
  const isEmpty = function (obj) {
    if (typeof obj === 'undefined') {
      return true;
    }
    if (obj === void 0) {
      return true;
    }
    if (obj === undefined) {
      return true;
    }
    if (obj === null) {
      return true;
    }
    if (Object.getOwnPropertyNames(obj).length === 0 && Object.getOwnPropertySymbols(obj).length === 0 && obj.constructor === Object) {
      return true;
    }
    if (!obj) {
      return true;
    }
    return false;
  }
/*
      {name: '杨孟霖Nick超话',
       url:  'http://huati.weibo.com/5479348'},
 */
  const directURLs = {
    "weibo.com": [
      {name: '肖战',
       url:  'https://weibo.com/n/X%E7%8E%96%E5%B0%91%E5%B9%B4%E5%9B%A2%E8%82%96%E6%88%98DAYTOY'},
      {name: '肖战工作室',
       url:  'https://weibo.com/u/6643123988'},
      {name: '肖战超话',
       url:  'https://huati.weibo.com/4079642'},
      {name: '不知名压制小人',
       url:  'https://weibo.com/u/7800864480'},
      {name: '天府（交流互动）',
       url:  'https://weibo.com/u/2117871375'},
      {name: '喜翻（互动交流）',
       url:  'https://weibo.com/u/6319447640'},
      {name: '顶风官博',
       url:  'https://weibo.com/u/1857713171'},
      {name: 'Sidoimujeng',
       url:  'https://weibo.com/u/5752710610'},
      {name: '同影资源舍',
       url:  'https://weibo.com/u/5784069948'},
      {name: '萌主推剧',
       url:  'https://weibo.com/u/5598200333'},
      {name: '绅士Go',
       url:  'https://weibo.com/u/3156062620'},
      {name: '昨日闲谈梦落花',
       url:  'https://weibo.com/u/1678144821'},
      {name: '饼干茶字幕组',
       url:  'https://weibo.com/u/7962905182'},
      {name: '秃炮怪字幕组',
       url:  'https://weibo.com/u/5525415815'},
      {name: '才高八斗电影推荐官',
       url:  'https://weibo.com/u/6767696520'},
      {name: '李建秋的世界',
       url:  'https://weibo.com/u/1687813073'},
      {name: '王虎的舰桥',
       url:  'https://weibo.com/u/6545577536'},
      {name: '包容万物恒河水',
       url:  'https://weibo.com/u/1671109627'},
      {name: '杨光张',
       url:  'https://weibo.com/u/1441971481'},
      {name: '星球放映室',
       url:  'https://weibo.com/u/6738078896'},
      {name: '渡鸦传书',
       url:  'https://weibo.com/u/5909975989'},
      {name: '衣柜字幕组',
       url:  'https://weibo.com/u/3009184157'},
      {name: '霸王龙压制组',
       url:  'https://weibo.com/u/7907134033'},
      {name: '香城蘑菇字幕組',
       url:  'https://weibo.com/5661289494'},
      {name: 'tv综合吧',
       url:  'https://weibo.com/tvzonghe'},
      {name: '亿万同人字幕组',
       url:  'https://weibo.com/u/5998891553'},
      {name: '癫疯剧场',
       url:  'https://weibo.com/u/7906315836'},
      {name: '随译字幕组',
       url:  'https://weibo.com/u/5574861710'},
      {name: '小玩剧字幕组',
       url:  'https://weibo.com/u/5721630404'},
      {name: '丝丝影音',
       url:  'https://weibo.com/u/2265460284'},
      {name: '星球放映室4K压制组',
       url:  'https://weibo.com/u/7142114548'},
      {name: 'MC-MoCuishle (MovieFans Club)',
       url:  'https://weibo.com/u/5750864727'},
      {name: '远鉴字幕组',
       url:  'https://weibo.com/u/1732580774'},
      {name: '宅基地',
       url:  'https://weibo.com/u/6489598481'},
      {name: '追剧天团',
       url:  'https://weibo.com/u/7319883354'},
      {name: '晨光曦',
       url:  'https://weibo.com/u/7070113048'},
      {name: '萌小win',
       url:  'https://weibo.com/u/7436994368'},
      {name: '豆角拌饭',
       url:  'https://weibo.com/u/7770502764'},
      {name: '攒到一百万退休',
       url:  'https://weibo.com/u/7820591843'},
      {name: 'Sumiress',
       url:  'https://weibo.com/u/1888662541'},
      {name: '俩男子',
       url:  'https://weibo.com/u/7441029048'},
      {name: '男友人',
       url:  'https://weibo.com/u/6665983190'},
      {name: '嚒嚒冲浪日记',
       url:  'https://weibo.com/u/7737163200'},
      {name: '怪兽汉化',
       url:  'https://weibo.com/u/7512778090'},
      {name: 'Blutopia',
       url:  'https://weibo.com/u/6451931503'},
      {name: '特效丶字幕',
       url:  'https://weibo.com/u/7739166808'},
      {name: '怀旧怪奇电影',
       url:  'https://weibo.com/u/5737573024'},
      {name: '流浪的tora',
       url:  'https://weibo.com/u/5613202495'},
      {name: '电影Movie',
       url:  'https://weibo.com/u/5944563626'},
      {name: '被抛弃字幕组',
       url:  'https://weibo.com/u/3949785854'},
      {name: '在太阳阳下开花',
       url:  'https://weibo.com/u/6198528359'},
      {name: '小寒追剧',
       url:  'https://weibo.com/u/3934654129'},
      {name: '小施爱吃肠旺面-自购日剧',
       url:  'https://weibo.com/u/2077867213'},
      {name: 'kmoonhh',
       url:  'https://weibo.com/u/6679183776'},
      {name: 'SEVENXHs',
       url:  'https://weibo.com/u/2951375584'},
      {name: '喜翻（发布剧集）',
       url:  'https://weibo.com/u/7361457829'},
      {name: '天府（剧集发布）',
       url:  'https://weibo.com/u/7351772787'},
      {name: '顶风世腐',
       url:  'https://weibo.com/u/6260688005'},
      {name: '顶风官网',
       url:  'http://nb.dingfengyzz.com/'},
      {name: '追剧天团官网',
       url:  'http://zhuijutiantuan.com/'},
      {name: 'FST字幕组',
       url:  'https://weibo.com/u/5882966616'},
      {name: 'SuperM字幕组',
       url:  'https://weibo.com/u/3912229558'},
      {name: '凤凰天使',
       url:  'https://weibo.com/u/6329558658'},
      {name: 'PurpleBlood字幕组',
       url:  'https://weibo.com/n/%E5%81%9A%E5%AD%97%E5%B9%95%E7%9A%84%E5%B0%8F%E7%B4%AB'},
      {name: '南木言',
       url:  'https://weibo.com/u/5719868787'},
      {name: '神叨',
       url:  'https://weibo.com/shenbibi'},
      {name: '鱼子酱',
       url:  'https://weibo.com/yuzijiangzimuzu'},
      {name: '追剧狗子',
       url:  'https://weibo.com/u/3079402980'},
      {name: '三角字幕组',
       url:  'https://weibo.com/u/2606228641'},
      {name: '大蘑菇不见了',
       url:  'https://weibo.com/u/7734233887'},
      {name: '零柒年浮影',
       url:  'https://weibo.com/u/1733102053'},
      {name: '肖战 on 豆瓣',
       url:  'https://www.douban.com/group/search?start=0&cat=1013&sort=time&q=%E8%82%96%E6%88%98'},
      {name: '七s彩虹姐妹',
       url:  'https://weibo.com/u/7358743372'},
      {name: '系红领巾的猴子',
       url:  'https://weibo.com/u/5216087137'},
      {name: '红参冻咖啡(EarthMix)',
       url:  'https://weibo.com/u/6171187263'},
      {name: '牛油炒蛋香(JoongDunk)',
       url:  'https://weibo.com/u/7747573411'},
      {name: '蛋白质泡酒(PondPhuwin)',
       url:  'https://weibo.com/u/1874123557'},
      {name: '姚卓悦',
       url:  'https://weibo.com/u/1919626531'},
      {name: 'LNS字幕组',
       url:  'https://weibo.com/u/6495868642'},
      {name: 'NEW字幕组',
       url:  'https://weibo.com/u/7199907287'},
      {name: '弯弯字幕组',
       url:  'https://weibo.com/u/3674655357'},
      {name: '冰冰字幕组',
       url:  'https://weibo.com/u/1073477450'},
      {name: '深影字幕组官博',
       url:  'https://weibo.com/u/2633051373'},
      {name: '深影字幕组官网',
       url:  'https://sub.shinybbs.vip/?page_id=152'},
      {name: '大文Tawan',
       url:  'https://weibo.com/u/1822780553'},
      {name: '暖Boy推剧',
       url:  'https://weibo.com/u/5995866909'},
      {name: '丛宙',
       url:  'https://weibo.com/u/1734921680'},
      {name: 'No777漆號',
       url:  'https://weibo.com/u/7218224046'},
      {name: 'Yiresen',
       url:  'https://weibo.com/u/2186536873'},
      {name: '炸鱼薯条字幕组',
       url:  'https://weibo.com/u/7733106747'},
      {name: '鱼羹字幕组',
       url:  'https://weibo.com/u/7794677873'},
      {name: '小脑腐剧透',
       url:  'https://weibo.com/u/7332155228'},
      {name: '幻月官博',
       url:  'https://weibo.com/u/5389683779'},
      {name: '',
       url:  ''},
/*    {name: '杨孟霖Nick',
       url:  'https://weibo.com/u/3148083033'},
      {name: '杨孟霖超话',
       url:  'http://huati.weibo.com/5450398'},
      {name: '施柏宇超话',
       url:  'http://huati.weibo.com/5489289'},
      {name: '宇霖cp超话',
       url:  'http://huati.weibo.com/5509572'},
      {name: '施柏宇patrick',
       url:  'https://weibo.com/u/5946042311'},
      {name: 'MarkGun超话',
       url:  'http://huati.weibo.com/5614825'},
      {name: 'Gunnapatn超话',
       url:  'http://huati.weibo.com/5579596'},
      {name: 'Gunnapatn',
       url:  'https://weibo.com/u/6528529056'},
      {name: '陈智霆超话',
       url:  'http://huati.weibo.com/k/%E9%99%88%E6%99%BA%E9%9C%86'},
      {name: '战斗虾',
       url:  'https://huati.weibo.com/6744285'},
      {name: '吴楚一',
       url:  'https://weibo.com/u/1887354764'},
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
  var huatis = getDefaultObjectAt(directURLs, location.host.replace(/^\w+\.weibo/i, "weibo"));
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
      color: red;
      font-weight: 700;
      /*mix-blend-mode: difference;*/
      max-height: 300px;
      width: 180px;
      overflow: auto;
      scrollbar-color: rebeccapurple green;
      text-align: right;
      background-color: rgba(245, 245, 245, 0.26);
    }
    #direct-links-to-super-topics ul {
      list-style-type: none;
      list-style-image: none;
      margin-block-start: 0em;
      margin-block-end: 0em;
      padding-inline-start: 0px;
      padding-inline-end: 15px;
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
    if (isEmpty(huatis[i].name)) continue;
    let link = document.createElement('a');
    link.id = 'direct-link-to-super-topic-' + i;
    link.innerHTML = huatis[i].name;
    link.setAttribute('href', huatis[i].url);
    link.setAttribute('target', '_blank');
    link.setAttribute('opentonew', 'true');
    let item = document.createElement('li');
    item.appendChild(link);
    list.appendChild(item);
  }
  div.appendChild(list);
  document.body.appendChild(div);

  return;
})();
