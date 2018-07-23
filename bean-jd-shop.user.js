// ==UserScript==
// @author            zephyrer
// @original-author   krapnik
// @name              京东每日签到助手
// @description       京东会员签到+每日店铺抽奖+金融会员抽奖+京友邦签到+数字游戏签到
// @include           *//bean.jd.com/myJingBean/list/*
// @include           *//mall.jd.com/*
// @include           *//*.jd.com/*
// @include           *//vip.jr.jd.com/
// @version           0.8.3
// @connect           jd.com
// @connect-src       jd.com
// @namespace         https://github.com/zephyrer
// @comment           https://greasyfork.org/users/151668
// ==/UserScript==

(function() {
  'use strict';
  var href = new String(top.location);
  var parts = href.split('/').filter((item) => item != "");
  var hostname = parts[1];
  //parts.forEach((item, i) => console.log("krapnik -- #" + i + ": " + item));
  if(hostname=='bean.jd.com') {
    console.log("krapnik -- site is OK.");
    // open fixed pages
    setTimeout(function() {
      window.open("https://vip.jd.com/sign/index");
    },1000);
    setTimeout(function() {
      window.open("https://vip.jr.jd.com");
    },6000);
    setTimeout(function() {
      window.open("https://huan.jd.com");
    },11000);
    setTimeout(function() {
      window.open("https://you.jd.com/channel/shouji.html");
    },16000);
    // open bean-shop-list
    var count = 0, iid = 0;
    var doit = function () {
      var btns = [...document.getElementsByClassName('s-btn')];
      //console.log("krapnik -- #" + count + ": Found " + btns.length + " targets.");
      count++;
      if (count > 20 || btns.length > 0) {
        clearInterval(iid);
      }
      if (btns.length > 0) {
        btns.forEach((btn, i, arr) => {
          setTimeout(btn.click(), 20000)
        });
      }
    };
    iid = setInterval(doit, 17000);
  }
  //每日店铺抽奖
  if(/\w*\.jd\.com/.test(hostname)&&(hostname!='bean.jd.com')&&(hostname!='vip.jd.com')&&(hostname!='huan.jd.com')&&(hostname!='you.jd.com')){
    setInterval(function(){
      if(document.getElementsByClassName('unsigned').length>=1){
         document.getElementsByClassName('unsigned')[0].click();
      }else if(document.getElementsByClassName('signed').length>=1){
        window.location.href="about:blank";
        window.close();
      }
    },3000);
    setInterval(function(){
      if(window.location.href.indexOf('shopSign')>=0){
        window.location.href="about:blank";
        window.close();
      }
    },3000);
    //延时未加载页面即刷新
    setTimeout(function(){
      window.location.reload();
    },10000);
  }
  //会员中心每日抽奖
  if(hostname=='vip.jd.com'){
    //关闭弹窗
    setInterval(function(){
      var ele = document.querySelector('.active .active-info .title');
      if(ele && (ele.textContent.includes("签到成功") || ele.textContent.includes("已签到"))){
        window.location.href="about:blank";
        window.close();
      }
    },3000);
  }
  //金融会员抽奖
  if(hostname=='vip.jr.jd.com'){
    //签到
    setInterval(function(){
      if(document.getElementById('index-qian-btn')){
         document.getElementById('index-qian-btn').click();
      }
    },1000);
    //关闭弹窗
    setInterval(function(){
      if(document.getElementsByClassName('close-sign')){
         document.getElementsByClassName('close-sign')[0].click();
      }
    },1000);
    setInterval(function(){
      if(document.getElementsByClassName('qian-text')[0].innerHTML=="已签到"){
        window.location.href="about:blank";
        window.close();
      }
    },1000);
  }
  //数字游戏
  if(hostname=='huan.jd.com'){
    setTimeout(function(){
      if(document.getElementsByClassName('sign-status').length==0){
         document.getElementById('signin-btn').click();
      };
    },2000);
    setInterval(function(){
      if(document.getElementsByClassName('thickclose').length>0){
        window.location.href="about:blank";
        window.close();
      }
    },2000);
  }
  //京友邦
  if(hostname=='you.jd.com'){
    setInterval(function(){
      if(document.getElementsByClassName('sidebar_checkin_btn_content').length>=1){
         document.getElementsByClassName('sidebar_checkin_btn_content')[0].click();
      }
    },2000);
    setInterval(function(){
      if(document.getElementById('confirmPunchInfo')){
         document.getElementById('confirmPunchInfo').click();
      }
    },3000);
    setInterval(function(){
      if(document.getElementsByClassName('checked')[0]){
        window.location.href="about:blank";
        window.close();
      }
    },3000);
  }
})();