// ==UserScript==
// @name         AppendPanLinkPw
// @author       zephyrer
// @contributor  jasonshaw, jasake
// @namespace    https://github.com/zephyrer/
// @version      0.6.5.2
// @description  配合网盘密码自动提取，自动处理网盘链接及其提取码，融合链接与提取码变成支持自动填充密码的方式的链接（百度云、360pan等）
// @include      *
// @exclude      http://*/forum.php
// @exclude      https://*/forum.php
// @exclude      http://*/forum.php?mod=forumdisplay&*
// @exclude      https://*/forum.php?mod=forumdisplay&*
// @exclude      http://tieba.baidu.com/f?*
// @note         20161008, 支持密码在回复显示隐藏内容中的情形
// @note         支持微云地址【感谢jixun大的更新】
// @note         解决部分网站百度盘提取密码在第二行时出现的问题【感谢卡饭会员“jasake”的修改支持】
// @note         添加支持文本状态的网盘地址【感谢卡饭会员“jasake”的修改支持】
// @note         添加支持云盘https地址
// @note         添加支持微盘地址 
// @note         添加支持zd423博客，runningman-fan，wenlei.ys168.com【感谢卡饭会员“jasake”的修改支持】
// @note         修复一个手误bug 
// @note         改变程序逻辑以适应一些特殊环境
// @note         修复一个bug，彻底解决重复后缀密码问题
// @note         增加脚本运行判断的设定，默认自动运行，对于类似新浪微博类网址，才执行判断后执行  
// @note         改变程序逻辑对更多的情况进行支持
// @note         增加处理盘密码就在链接的文本本身上
// @note         增加脚本运行判断，解决个别页面动态加载问题，比如新浪微博
// @note         增加百度贴吧跳转和新浪微博短网址的支持，两条配置一样存在“误杀”，不常用的可以注释掉这两条规则
// @note         优化代码，将任意单条正则变为可选配置，一般由默认正则处理，有利于自定义扩展和维护
// @note         增加支持自动更新
// @note         修正配置，支持单页面多云盘链接
// @note         避免重复后缀密码
// @note         支持百度网盘/贴吧/360云
// @note         支持加密百度网盘https
// @note         支持uAutoPagerize2.uc.js的自动翻页
// @downloadURL  https://github.com/zephyrer/userscripts/raw/master/AppendPanLinkPw.user.js
// @updateURL    https://github.com/zephyrer/userscripts/raw/master/AppendPanLinkPw.meta.js
// @grant        none
// @run-at       document-end
// @copyright    Efisio Zephyr
// ==/UserScript==
