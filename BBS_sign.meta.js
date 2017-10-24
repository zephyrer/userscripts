// ==UserScript==
// @name         论坛签到工具
// @namespace    EfisioZephyr
// @version      1.6.8.4
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
// @include      http://passport.eepw.com.cn/user/index
// @exclude      http*://bbs.realqwh.cn/*
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