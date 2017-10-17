﻿// ==UserScript==
// @name         论坛签到工具
// @namespace    EfisioZephyr
// @version      1.6.5
// @description  用于各种论坛自动签到，自用！！
// @include      http*://*/plugin.php?id=*sign*
// @include      http*://*/dsu_paulsign-sign*
// @include      http*://*/plugin.php?id=mpage_sign:sign*
// @include      http*://*/home.php?mod=task&do=view*
// @include      http*://*/*action=view*
// @include      http*://*/*action=applied*
// @include      http*://*/plugin.php?id=dc_signin:sign
// @include      http*://*/forum.php
// @include      http*://*/u.php*
// @include      http*://*/*qiandao
// @include      http*://bbs.kafan.cn/*
// @include      http*://bbs.wstx.com/*
// @include      http*://bbs.gfan.com/*
// @include      http*://www.horou.com/
// @include      http*://www.92jh.cn/*
// @include      http*://bbs.ntrqq.net/*
// @include      http*://www.gn00.com/*
// @include      http*://bbs.qidian.com/signeveryday.aspx*
// @include      http*://book.sfacg.com/signin*
// @include      http*://wenku.baidu.com/task/browse/daily
// @include      http*://www.tiexue.net/*
// @include      http*://bbs.zol.com.cn/*
// @include      http*://bbs.cnmo.com/*
// @include      http://www.banyungong.org/daysign.html
// @note         论坛签到工具,整合自卡饭Coolkids论坛自动签到和jasonshaw网页自动化系列点击,做了一点微小的修改
// @copyright    2013+, Coolkid
// @copyright    2014+, jasonshaw
// @copyright    2016+, wycaca
// @copyright    2017+, zephyrer
// @downloadURL   https://github.com/zephyrer/userscripts/raw/master/BBS_sign.user.js
// @updateURL     https://github.com/zephyrer/userscripts/raw/master/BBS_sign.meta.js
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_log
// @run-at       document-end
// ==/UserScript==

(function(){
  GM_log("BBSsign.user.js executing...");

  let aBtnApply = el = els = imgs = null, idx = 0;

  if (isURL("/u.php")) {
    aBtnApply = _id("punch");
    if (aBtnApply) {
      aBtnApply.click();
      return;
    }
  }

  if (isURL("=view")) {
    aBtnApply = Array.from(document.links).filter((e) => {return /(&|\?)(action|do)=(apply|draw)&/i.test(e.href)});
    if (aBtnApply.length > 0) {
      if (aBtnApply[0].classList.contains("task_disallow_btn"))
        return;
      imgs = childs(aBtnApply[0], "tagName", "IMG");
      if (imgs && /rewardless/i.test(imgs[0].src))
        return;
      aBtnApply[0].click();
      return;
    }
  }

  if (isURL("=applied")) {
    el = _id("gain_5");
    if (el) {
      el.click();
      return;
    }
  }

  if (isURL("=xqqiandao")) {
    els = _name("qdxq");
    el = _name("form1");
    if (els && el) {
      idx = randomNum(els.length);
      els[idx].checked = true;
      el[0].submit();
    }
  }

  // 保险处理
  el = document.getElementById("todaysay");
  if (el) {
    el.value = "今天签到来了，各位安好";
  }
  els = document.getElementsByName("qdmode");
  if (els.length > 0) {
    els[els.length-1].click();
  }

  if (isURL("k_misign:sign")) {
    el = _id("JD_sign");
    if (el) {
      el.click();
      return;
    }
  }

  if (isURL("dc_signin:sign")) {
    els = _class("dcsignin_list");
    if (els) {
      let lis = childs(els[0], "tagName", "LI");
      let i = randomNum(lis.length);
      lis[i].click();
      el = _id("signform");
      el.submit();
    }
  }

  if (isURL("book.sfacg.com")) {
    setTimeout(function() {
      els = document.getElementsByClassName("sign-btn");
      if (els.length === 1) {
        els = childs(els[0], "tagName", "A");
        els[0].click();
      }
    }, 1000);
    return;
  }

  if (isURL("wenku.baidu.com")) {
    //百度文库
    let n = setInterval(function() {
      var qzones = Array.from(document.getElementsByClassName("qzone"));
      if (qzones.length > 0 && qzones[0].href.includes("sns.qzone.qq.com")) {
        clearInterval(n);
        qzones.forEach((e) => e.click());
      }
    }, 100);
    return;
  }

  if (isURL("bbs.kafan.cn")) {
      //卡饭论坛
      imgs = document.getElementById("pper_a").getElementsByTagName("IMG");
      if (imgs[0].src.indexOf("wb.png") == -1) {
          let a = document.getElementById("pper_a");;
          a.click();
          return;
      }
  }

  if (isURL("www.horou.com")) {
    //河洛
    imgs = document.getElementById("fx_checkin_b");
      if (imgs.src.indexOf("mini2") == -1) {
          imgs.click();
          return;
      }
  }

  if (isURL("cn.club.vmall.com/plugin.php?id=dsu_paulsign:sign")
    || isURL("cn.club.vmall.com/dsu_paulsign-sign")) {
      //华为
    document.getElementsByClassName('sign-btn btn_rs')[0].click();
  } else if(location.href.indexOf("plugin.php?id=dsu_paulsign:sign") != -1){
    if (!qd())
      qd2();
  }

  if (isURL("http://bbs.gfan.com/")) { //机锋
      qd();
      if (window.find("签到领奖!")) {
          window.location.href = "http://bbs.gfan.com/plugin.php?id=dsu_paulsign:sign";
          return;
      }
  }

  if (isURL("http://bbs.ntrqq.net/")) { //NTRQQ
      qd();
      if (window.find("签到领奖!")) {
          window.location.href = "http://bbs.ntrqq.net/plugin.php?id=dsu_paulsign:sign";
          return;
      }
  }

  if (isURL("www.lightnovel.cn/home.php?mod=task")) {
      //轻国
      if (window.find("每日任务") && window.find("啪啪啪")) {
          window.location.href = "http://www.lightnovel.cn/home.php?mod=task&do=apply&id=98";
          return;
      }
  }

  if (isURL("bbs.qidian.com")) {
    if (_class("BDtop2right2") && _class("BDtop2right2")[0].textContent.includes("心飞扬")) {
      els = _class("BDtop2left3");
      if (els.length === 1) {
        els = childs(els[0], "tagName", "A");
        els && els[0] && els[0].click();
        return;
      }
    }
  }

  if (isURL("=mpage_sign:sign")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      els = _class("mood_list");
      if (els) {
        clearInterval(n);
        let lis = childs(els[0], "tagName", "LI");
        let i = randomNum(lis.length);
        lis[i].click();
        els = _name("signpn");
        els[0].click();
      }
    }, 500);
    return;
  }

  if (isURL("www.tiexue.net")) {
    els = _class("signBtn");
    if (els) {
      els[0].click();
    }
    return;
  }

  if (isURL("bbs.zol.com.cn")) {
    el = _id("signInBtn");
    if (el) {
      el.click();
    }
    return;
  }

  if (isURL("bbs.cnmo.com")) {
    el = _id("sign_click");
    if (el) {
      el.click();
    }
    return;
  }

  if (isURL("http://www.banyungong.org/daysign.html")) {
    el = _id("btnSign");
    if (el)
      el.click();
  }

  if (0) {
  } else {
    //其他论坛
    qd();
    qd2();
  }

  function isURL(x){
      return window.location.href.indexOf(x) != -1;
  }

  function isEmpty(x) {
    if (undefined == x || null == x || "" == x)
      return true;

    if (Array.isArray(x) && x.length == 0)
      return true;

    return false;
  }

  function childs(obj, attr, value) {
    let ret = Array.from(obj.children).filter((e) => {return e[attr] == value});
    if (ret.length == 0)
      return null;
    else
      return ret;
  }

  function _id(selr) {
    return document.getElementById(selr);
  }

  function _class(selr, attr, value) {
    let els = document.getElementsByClassName(selr);
    if (els.length === 0) return null;
    els = Array.from(els);
    switch(arguments.length) {
      case 1:
        return els;
      case 2:
        return els.filter((e) => {return e[attr]});
      case 3:
        return els.filter((e) => {return e[attr] == value});
    }
    return null;
  }

  function _name(selr, attr, value) {
    let els = document.getElementsByName(selr);
    if (els.length === 0) return null;
    els = Array.from(els);
    switch(arguments.length) {
      case 1:
        return els;
      case 2:
        return els.filter((e) => {return e[attr]});
      case 3:
        return els.filter((e) => {return e[attr] == value});
    }
    return null;
  }

  function _tag(selr, attr, value) {
    let els = document.getElementsByTagName(selr);
    if (els.length === 0) return null;
    els = Array.from(els);
    switch(arguments.length) {
      case 1:
        return els;
      case 2:
        return els.filter((e) => {return e[attr]});
      case 3:
        return els.filter((e) => {return e[attr] == value});
    }
    return null;
  }

  //生成从minNum到maxNum的随机数
  function randomNum(minNum, maxNum){
      switch(arguments.length){
          case 1:
              return parseInt(Math.random()*minNum,10);
              break;
          case 2:
              return parseInt(Math.random()*(maxNum-minNum+1)+minNum,10);
              break;
          default:
              return 0;
              break;
      }
  }

  function qd() {
      if ((window.find("今天签到了吗") &&
          (window.find("请选择您此刻的心情图片并写下今天最想说的话") ||
           window.find("请选择您此刻的心情图片并点击开始签到按钮签个到吧")
          )) ||
          window.find("今天簽到了嗎？請選擇您此刻的心情圖片並寫下今天最想說的話")
         ) {
          //var text = document.getElementById("ch_s");
          let smileList = _class("qdsmile") ? (_class("qdsmile"))[0] : null;
          if (smileList) {
            let smiles = childs(smileList, "tagName", "LI");
            let i = randomNum(smiles.length);
            smiles[i].click();
          } else {
            return false;
          }
          let text2 = document.getElementById("todaysay");
          /*
          if (text == null) {
              return;
          }
          text.setAttribute('checked', true);
          */
          if (text2)
            text2.value = "今天签到来了，各位安好";//全自动签到,就是爽~
          let button = document.getElementById("qiandao");
          if (button) {
            button.submit();
            return true;
          }
          button = _name("qiandao");
          if (button) {
            button[0].submit();
            return true;
          }
          return false;
      }
  }

  function qd2() {
    if (!document.getElementById("kx"))
      return false;
    document.getElementById("kx").click();
    unsafeWindow.showWindow('qwindow', 'qiandao', 'post', '0');
    return true;
  }

  function qd3() {
      var elements = p.elements,
      i = 0;
      setTimeout(function() {
          try {
              if (elements instanceof Array) var els = p.elements;
              else { //function
                  var els = p.elements();
              }
              while (els[i]) {
                  var obj = (p.elements instanceof Array) ? document.querySelector(els[i]) : els[i];
                  if (obj == null) return;
                  if (obj.tagName == "A" && obj.href.indexOf("javascript") < 0 && obj.onclick == "undefined") GM_openInTab(obj.href);
                  else obj.click();
                  i++;
              }
          } catch(e) {
              alert(e);
          }
      },
      400);
      setTimeout(function() {
          if (autoClose) window.close();
      },
      delay + 100);
  }
})();