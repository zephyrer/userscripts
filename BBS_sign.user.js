// ==UserScript==
// @name         论坛签到工具
// @namespace    https://github.com/zephyrer/
// @version      1.6.10.6
// @description  用于各种论坛自动签到，自用！！
// @include      http*://*/plugin.php?id=*sign*
// @include      http*://*/dsu_paulsign-sign*
// @include      http*://*/plugin.php?id=mpage_sign:sign*
// @include      http*://*/plugin.php?id=ljdaka:daka*
// @include      http*://*/plugin.php?id=yinxingfei_zzza:yinxingfei_zzza_hall*
// @include      http*://*/home.php?mod=task&*
// @include      http*://*/*action=view*
// @include      http*://*/*action=applied*
// @include      http*://*/plugin.php?id=dc_signin:sign
// @include      http*://*/zsj_moneychange*
// @include      http*://*/forum.php
// @include      http*://*/u.php*
// @include      http*://*/*qiandao
// @include      http*://*/*qiandao&
// @include      http*://bbs.kafan.cn/*
// @include      http*://bbs.wstx.com/*
// @include      http*://bbs.gfan.com/*
// @include      http*://www.horou.com/
// @include      http*://www.92jh.cn/*
// @include      http*://bbs.ntrqq.net/*
// @include      http*://www.gn00.com/*
// @include      http*://588ku.com/
// @include      http*://*.58pic.com/*
// @include      http*://bbs.qidian.com/signeveryday.aspx*
// @include      http*://*/signin*
// @include      http*://wenku.baidu.com/task/browse/daily
// @include      http*://www.tiexue.net/*
// @include      http*://bbs.zol.com.cn/*
// @include      http*://bbs.cnmo.com/*
// @include      http*://*.51cto.com/*
// @include      http*://*/*tab=credit
// @include      http*://usr.005.tv/
// @include      http*://www.banyungong.org/daysign.html
// @include      http*://passport.eepw.com.cn/user/index
// @include      http*://*/task?ttype*
// @include      http*://*/mperson/task*
// @include      http*://lkong.cn/*
// @include      http*://*.iskytree.net/*
// @include      http*://*.gongzicp.com/*
// @include      http*://kindleren.com/*
// @include      http*://www.huihui.cn/*
// @include      http*://*.21ic.com/*
// @include      http*://*/torrents.php
// @include      http*://*/jobcenter.php?action=finish*
// @include      http*://ishare.iask.sina.com.cn/checkin
// @include      http*://www.zimuzu.io/user/sign
// @include      http*://www.galaxyclub.cn/
// @include      http*://*?id=seotask*
// @note         论坛签到工具,整合自卡饭Coolkids论坛自动签到和jasonshaw网页自动化系列点击,做了一点微小的修改
// @copyright    2013+, Coolkid
// @copyright    2014+, jasonshaw
// @copyright    2016+, wycaca
// @copyright    2017+, zephyrer
// @downloadURL  https://github.com/zephyrer/userscripts/raw/master/BBS_sign.user.js
// @updateURL    https://github.com/zephyrer/userscripts/raw/master/BBS_sign.meta.js
// @grant        GM_xmlhttpRequest
// @grant        unsafeWindow
// @grant        GM_log
// @grant        GM_registerMenuCommand
// @grant        GM_openInTab
// @run-at       document-end
// ==/UserScript==

(function(){
  GM_log("BBSsign.user.js executing...");

  GM_registerMenuCommand("BBS 签到", qd);

  let aBtnApply = null, el = null, els = null, imgs = null, idx = 0;

  if (isURL("bbs.realqwh.cn")) {
    return false;
  }

  if (isURL("feifantxt.com")) {
    let ele = document.querySelector("#breadCrumb ~ .t3 .t:first-child .tac:nth-child(1)")
    if (ele.textContent.includes("进行第 1 次签到")) {
      return false;
    } else {
      return qd();
    }
  }

  if (isURL("bbs.zhiyoo.com")) {
    let snagscreen = _class("tips_screen") ? _class("tips_screen")[0] : null;
    if (snagscreen) {
      let btn = snagscreen.querySelector("em");
      btn.click();
    }
  }

  if (isURL("seotask")) {
    el = document.querySelector("img[alt*='apply']");
    if (el && !el.src.includes('rewardless')) {
      el.click();
      return true;
    }
    el = document.querySelector(".ptm > a:nth-child(1)");
    if (el && el.textContent.includes("领取任务请转到进行中的任务")) {
      el.click();
      return true;
    }
    el = document.querySelector(".xs2 > a:nth-child(1)");
    if (el && el.textContent.includes("百度")) {
      el.click();
      return true;
    }
    el = document.querySelector("a.xi2");
    if (el && el.textContent.includes("点击这里前往完成任务")) {
      let nt = GM_openInTab(el.href, true);
      setTimeout(() => {
        nt.close();
        let ele = document.querySelector(".mbw a:nth-child(1)");
        ele ? ele.click() : 0;
      }, 2000);
      return true;
    }
  }

  // vidown
  if (isURL("gsignin")) {
    if (top !== self) {
      return false;
    }
    if (_id('ls_cookietime')) {
      return false;
    }
    let count = 0;
    let iid = setInterval(function() {
      let els = _class("right");
      if (els) {
        clearInterval(iid);
        if (els[0].textContent.includes('已签到')) {
          return;
        } else {
          els[0].click();
          return;
        }
      } else {
        count++;
      }
      if (count > 50) {
        clearInterval(iid);
      }
    }, 500);
  }

  if (isURL("zsj_moneychange")) {
    let count = 0;
    let iid = setInterval(function() {
        let els = _class("ft-btn");
        if (els) {
          clearInterval(iid);
          if (els[0].textContent.includes("已签到")) {
            return;
          }
          els[0].click();
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("588ku.com")) {
    let count = 0;
    let iid = setInterval(function() {
        let els = _class("already-sign-but");
        if (els) {
          clearInterval(iid);
          if (els[0].textContent.includes("已签到")) {
            return;
          }
          els[0].click();
          setTimeout(function() {
            let el = document.querySelector(".signIn-rule .signIn-btn");
            if (el) el.click();
          }, 2000);
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("58pic.com")) {
    let count = 0;
    let iid = setInterval(function() {
        let els = _class("sign-but");
        if (els) {
          clearInterval(iid);
          if (els[0].textContent.includes("已签到")) {
            return;
          }
          els[0].click();
          setTimeout(function() {
            let el = document.querySelector(".everySign .integral-btn");
            if (el) el.click();
          }, 2000);
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("huihui.cn")) {
    let count = 0;
    let iid = setInterval(function() {
        let els = _class("signup");
        if (els) {
          clearInterval(iid);
          if (els[0].textContent.includes('已抽奖')) {
            return;
          }
          els[0].click();
          els = document.querySelectorAll(".lottery-btn a");
          if (els.length > 0) {
            els[0].click();
          }
          return;
        }
        count++;
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("21ic.com")) {
    let count = 0;
    let iid = setInterval(function() {
      let el = _id("qiandao");
      if (el) {
        clearInterval(iid);
        el.click();
        let iid1 = setInterval(() => {
          let el1 = _id('qiandao_menu_message');
          if (el1 && el1.textContent.includes('已经签到')) {
            clearInterval(iid1);
            el1 = document.querySelector('#qiandao_menu a[onclick^="hideMenu"]');
            el1.click();
            return;
          } else {
            el1 = _id("qiandao_message");
            if (el1) {
              el1.click();
              setTimeout(() => {
                let els1 = document.querySelectorAll("#qiandao_message_menu ul li");
                if (els1.length > 0) {
                  clearInterval(iid1);
                  idx = randomNum(els1.length);
                  els1[idx].firstChild.click();
                  el1 = _id("qiandao_add");
                  el1.click();
                  setTimeout(() => window.location.reload(true), 2000);
                }
              }, 1000);
            }
          }
        }, 500);
        return;
      }
      count++;
      if (count > 50) {
        clearInterval(iid);
      }
    }, 1000);
  }

  if (isURL("kindleren.com")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("k_misign_topb");
        if (el) {
          clearInterval(iid);
          els = el.getElementsByTagName("a");
          if (els) {
            els[0].click();
          }
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("gongzicp.com")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("signBtn");
        if (el) {
          clearInterval(iid);
          if (el.textContent.indexOf("已") === -1) {
            el.click();
          }
          return;
        } else if (document.querySelectorAll('.card-header > .ivu-btn:not([disabled])').length > 0) {
          clearInterval(iid);
          document.querySelectorAll('.card-header > .ivu-btn')[0].click();
          return;
        }
        count++;
        if (count > 50) {
          clearInterval(iid);
        }
      }, 1500);
  }

  if (isURL("lkong.cn")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("punch");
        if (el) {
          clearInterval(iid);
          el.click();
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("galaxyclub.cn")) {
    let el = _id("login");
    if (el && el.style.display != "none") {
      return false;
    }
    let count = 0;
    let iid = setInterval(function() {
        let els = _class("bt-check");
        if (els) {
          clearInterval(iid);
          els[0].click();
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("horou.com")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("fx_checkin_b");
        if (el) {
          clearInterval(iid);
          if (el.textContent.indexOf("已") !== -1) {
            el.click();
          }
          return;
        } else {
          count++;
        }
        if (count > 10) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("iskytree.net")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("fx_checkin_b");
        if (el) {
          clearInterval(iid);
          if (el.getAttribute('alt') === '已签到') {
            return;
          } else {
            el.click();
            return;
          }
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  if (isURL("lkong.cn")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("punch");
        if (el) {
          clearInterval(iid);
          el.click();
          return;
        } else {
          count++;
        }
        if (count > 50)
          clearInterval(iid);
      }, 500);
  }

  if (isURL("/u.php")) {
    aBtnApply = _id("punch");
    if (aBtnApply) {
      aBtnApply.click();
      setTimeout(() => window.location.reload(true), 2000);
      return;
    }
  }

  if (isURL("=view")) {
    aBtnApply = Array.from(document.links).filter((e) => {return /(&|\?)(action|do)=(apply|draw)&/i.test(e.href)});
    if (aBtnApply.length > 0) {
      if (aBtnApply[0].classList.contains("task_disallow_btn")) {
        return;
      }
      imgs = childs(aBtnApply[0], "tagName", "IMG");
      if (imgs && /rewardless/i.test(imgs[0].src)) {
        return;
      }
      aBtnApply[0].click();
      return;
    }
  }

  if (isURL("=applied")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = _id("gain_5");
        if (el) {
          clearInterval(iid);
          el.click();
          setTimeout(() => window.location.reload(true), 2000);
          return;
        } else {
          count++;
        }
        if (count > 50)
          clearInterval(iid);
      }, 500);
  }

xqqiandao: {
  if (isURL("=xqqiandao")) {
    // 检测是否已经签过到
    els = _class("pd15");
    if (!els) {
      break xqqiandao;
    }
    el = els[0];
    els = Array.from(el.getElementsByClassName("tac"))
            .filter((x) => {return x.tagName == "TD";})
            .filter((x) => {return x.textContent.includes("您本月已累计签到");});
    el = els[0];
    if (el.textContent.includes("您已于")) {
      GM_log("BBS_sign.user.js: 您已签到");
      return;
    }
    // 开始签到
    setTimeout(function() {
      els = _name("qdxq");
      el = _name("form1");
      if (els && el) {
        idx = randomNum(els.length);
        els[idx].checked = true;
        el[0].submit();
        return;
      }
    }, 3500);
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

  if (isURL("passport.eepw.com.cn")) {
    let n = setInterval(function() {
      el = _id("signs");
      if (el.textContent.includes("已签到")) {
        clearInterval(n);
      } else {
        el.click();
      }
    }, 1000);
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
      els = _class("g-btn-pass");
      if (els) {
        els[0].click();
      }
    /*
      var qzones = Array.from(document.getElementsByClassName("qzone"));
      if (qzones.length > 0 && qzones[0].href.includes("sns.qzone.qq.com")) {
        clearInterval(n);
        qzones.forEach((e) => e.click());
      }
    */
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

  if (isURL("H_name=qiandao")) {
    let smiles = _name("qdxq");
    if (smiles) {
      let i = randomNum(smiles.length);
      smiles[i].click();
      el = (_name("form2"))[0].submit();
    }
  }

  if (isURL("bbs.pinggu.org")) {
    let smileList = _class("qdsmile") ? (_class("qdsmile"))[0] : null;
    if (smileList) {
      let smiles = childs(smileList, "tagName", "LI");
      let i = randomNum(smiles.length);
      smiles[i].click();
    }
    els = _name("qdsubject");
    if (els) {
      els[0].value = "每日一签";
    }
    el = _id("todaysay");
    if (el) {
      el.value = "今天签到来了，各位安好";
    }
    el = _id("qiandao");
    if (el) {
      el.submit();
    }
    return;
  }

  // --- Processing plugin.php?id=dsu_paulsign-sign* begin ---

  if (isURL("club.vmall.com/plugin.php?id=dsu_paulsign:sign")
     || isURL("club.vmall.com/dsu_paulsign-sign")
     || isURL("club.huawei.com/dsu_paulsign-sign")
     || isURL("club.huawei.com/plugin.php?id=dsu_paulsign:sign")) {
      //华为
    document.getElementsByClassName('sign-btn btn_rs')[0].click();
    return;
  } else if(isURL("bbs.elecfans.com/plugin.php?id=dsu_paulsign:sign")){
    document.getElementsByClassName('plugin-btn')[0].click();
    let cnt = 0;
    let iid = setInterval(function() {
      if (cnt > 20) {
        clearInterval(iid);
        return;
      }
      cnt++;
      els = _class("qdsmilea");
      if (els) {
        clearInterval(iid);
        let lis = childs(els[0], "tagName", "LI");
        let i = randomNum(lis.length);
        lis[i].click();
        let radio = document.querySelector("input[type='radio'][name='qdmode'][value='3']");
        radio.click();
        let button = document.querySelector(".f_c + .o.pns > button");
        button.click();
        return;
      }
    }, 1500);
  } else if(location.href.indexOf("plugin.php?id=dsu_paulsign:sign") != -1){
    if (!qd()) {
      qd2();
    }
    return;
  }

  if (isURL("bbs.gfan.com")) { //机锋
      qd();
      if (window.find("签到领奖!")) {
          window.location.href = "http://bbs.gfan.com/plugin.php?id=dsu_paulsign:sign";
          return;
      }
  }

  if (isURL("bbs.ntrqq.net")) { //NTRQQ
    qd();
    if (window.find("签到领奖!")) {
      window.location.href = "http://bbs.ntrqq.net/plugin.php?id=dsu_paulsign:sign";
      return;
    }
  }

  // --- Processing plugin.php?id=dsu_paulsign-sign* end ---

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
    let iid = setInterval(function() {
      if (cnt > 20) {
        clearInterval(iid);
        return;
      }
      cnt++;
      els = _class("mood_list");
      if (els) {
        clearInterval(iid);
        let lis = childs(els[0], "tagName", "LI");
        let i = randomNum(lis.length);
        lis[i].click();
        els = _name("signpn");
        els[0].click();
        setTimeout(() => window.location.reload(true), 2000);
        return;
      }
    }, 500);
    return;
  }

  if (isURL("zimuzu.io")) {
    let cnt = 0;
    let iid = setInterval(function() {
      if (cnt > 50) {
        clearInterval(iid);
        return;
      }
      cnt++;
      el = document.querySelector('.qd-words .C a');
      if (el) {
        clearInterval(iid);
        let msg = el ? el.textContent : 'NULL';
        if (msg.includes('点击')) {
          setTimeout(() => window.location.reload(true), 2000);
          return;
        }
        return;
      }
    }, 1000);
    return;
  }

  if (isURL("=yinxingfei_zzza:yinxingfei_zzza_hall")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("zzza_go");
      if (el) {
        clearInterval(n);
        el.click();
      }
    }, 500);
    return;
  }

  if (isURL("=ljdaka:daka")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      els = _class("chk_mood");
      if (els) {
        clearInterval(n);
        let lis = childs(els[0], "tagName", "a");
        let i = randomNum(lis.length);
        lis[i].click();
        el = _id("rn_checkout");
        el.click();
      }
    }, 500);
    return;
  }

  if (isURL("www.tiexue.net")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      els = _class("signBtn");
      if (els) {
        clearInterval(n);
        els[0].click();
      }
    }, 500);
    return;
  }

  if (isURL("bbs.zol.com.cn")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("signInBtn");
      if (el) {
        clearInterval(n);
        el.click();
      }
    }, 500);
    return;
  }

  if (isURL("bbs.cnmo.com")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("sign_click");
      if (el) {
        clearInterval(n);
        el.click();
      }
    }, 500);
    return;
  }

  if (isURL("http://www.banyungong.org/daysign.html")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("btnSign");
      if (el) {
        clearInterval(n);
        el.click();
      }
    }, 500);
    return;
  }

  if (isURL("tab=credit")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("daily_sign");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
    }, 500);
    return;
  }

  if (isURL("usr.005.tv")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("btn-sign-user");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
    }, 500);
    return;
  }

  if (isURL("51cto.com")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("jsSignGetCredits");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
      el = _id("jsCreditsSpan");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
    }, 500);
    return;
  }

  if (isURL("task?ttype") || isURL("mperson/task")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("profilego");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
    }, 500);
    return;
  }

  if (isURL("ishare.iask.sina.com.cn")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("J_btn-sign");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
    }, 500);
    return;
  }

  if (isURL("/torrents.php")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      els = _class("faqlink");
      if (els) {
        clearInterval(n);
        els[0].click();
        return;
      }
      el = _id("showup");
      if (el) {
        clearInterval(n);
        el.click();
        return;
      }
    }, 500);
    return;
  }

  // id=dc_signin&...
  if (document.querySelector("a[href='dc_signin-sign.html']")) {
    let e = document.querySelector("a[href='dc_signin-sign.html']");
    e.click();
    setTimeout(function() {
      let smileList = _class("dcsignin_list") ? (_class("dcsignin_list"))[0] : null;
      let smiles = childs(smileList, "tagName", "LI");
      let i = randomNum(smiles.length);
      smiles[i].click();
      document.getElementById("signform").submit();
    }, 2000);
  }

  // ---- processing home.php?mod=task begin ---
  // The processing order is IMPORTANT !

  if (isURL("www.lightnovel.cn/home.php?mod=task")) {
    //轻国
    if (isURL("item=done")) {
      let els = _class("xs2 xi2");
      if (els) {
        let elt = els.filter(e => e.textContent.includes("每日任务"));
        if (elt) {
          let el = elt[0].parentNode.nextSibling.nextSibling.nextSibling.nextSibling;
          let matches = el.textContent.match(/\d{4,4}-\d{1,2}-\d{1,2} \d{1,2}:\d{1,2}/g);
          if (!matches) {
            window.location.href = "http://www.lightnovel.cn/home.php?mod=task&do=apply&id=98";
            return true;
          }
          let dat1 = new Date(matches[1]);
          let dat2 = new Date();
          if ((dat2 - dat1) >= 0) {
            window.location.href = "http://www.lightnovel.cn/home.php?mod=task&do=apply&id=98";
            return true;
          }
        }
      }
      return false;
    }
    if (window.find("每日任务") && window.find("啪啪啪")) {
      let ele = document.querySelector(".xg2.mbn");
      if (ele && ele.textContent.includes("后可以再次申请")) {
        return false;
      }
      window.location.href = "http://www.lightnovel.cn/home.php?mod=task&do=apply&id=98";
      return true;
    }
    return false;
  }

  if (isURL("in.zasv.net")) {
    let cnt = 0;
    let n = setInterval(function() {
      if (cnt > 20) {
        clearInterval(n);
        return;
      }
      cnt++;
      let el = _id('um');
      if (el) {
        clearInterval(n);
        let els = _tag('a');
        if (els) {
          els = els.filter((e) => e.textContent.includes('打卡签到'));
          if (els.length > 0) {
            setTimeout(function() {
              let cnt1 = 0;
              let n1 = setInterval(function() {
                if (cnt1 > 20) {
                  clearInterval(n1);
                  return;
                }
                cnt1++;
                let els1 = _class("chk_mood");
                if (els1) {
                  clearInterval(n1);
                  let lis1 = childs(els1[0], "tagName", "A");
                  let i1 = randomNum(lis1.length);
                  lis1[i1].click();
                  let el1 = _id("rn_checkout");
                  el1.click();
                  setTimeout(() => window.location.reload(true), 500);
                }
              }, 500);
              return;
            }, 1000);
            els[0].click();
            return;
          }
        }
      }
    }, 500);
    return;
  }

  if (isURL("u.8264.com")) {
    let count = 0;
    let iid = setInterval(function() {
        let el = document.querySelector("#apply_qr.lqjl");
        if (el) {
          clearInterval(iid);
          el.click();
          return;
        } else {
          count++;
        }
        if (count > 50) {
          clearInterval(iid);
        }
      }, 500);
  }

  // ---- processing home.php?mod=task end ---

  if (isURL("jobcenter.php?action=finish")) {
    let cnt = 0;
    let n = setInterval(function() {
      let nodes = document.getElementsByClassName('warp');
      if (nodes.length === 0) {
        return;
      }
      let contextNode = nodes[0];
      let targetNode = document.evaluate( '//div[3]/div[2]/div/table/tbody/tr/td/div/table/tbody/tr[3]/td[2]/div/dl[2]/dd', contextNode, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null );
      if (!targetNode) {
        clearInterval(n);
        return;
      }
      let date1 = new Date(targetNode.singleNodeValue.textContent);
      let date2 = new Date();
      let timeSpan = Math.floor((date2.getTime() - date1.getTime()) / 3600000);
      if (Number.isNaN(timeSpan)) {
        timeSpan = 0;
      }
      let threshold = (isURL('soapone.org')) ? 20 : (isURL('5ichecker.com')) ? 12 : 24;
      GM_log('BBSsign.user.js finished ' + timeSpan + ' hours. Required elapsed time is ' + threshold + ' hours.');
      if (timeSpan < threshold) {
        clearInterval(n);
        return;
      }
      if (cnt > 50) {
        clearInterval(n);
        return;
      }
      cnt++;
      el = _id("apply_5");
      if (el) {
        clearInterval(n);
        if (el.classList.contains("tasks_apply_old")) {
          return;
        }
        else {
          el.click();
          setTimeout(() => {
            window.location.href = window.location.href.replace(/\?action.*/i, "?action=applied");
          }, 1500);
        }
        return;
      }
    }, 500);
    return;
  }

  if (0) {
  } else {
    //其他论坛
    if (!qd())
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
        (window.find("请选择您此刻的心情图片") || //请选择您此刻的心情图片并写下今天最想说的话
         window.find("请选择你此刻的心情图片"))) || //请选择您此刻的心情图片并点击开始签到按钮签个到吧
        window.find("今天簽到了嗎？請選擇您此刻的心情圖片並寫下今天最想說的話")
       ) {
      //var text = document.getElementById("ch_s");
      let smileList = _class("qdsmile") ? (_class("qdsmile"))[0] : _class("qdsmilea") ? (_class("qdsmilea"))[0] : null;
      if (smileList) {
        //let faces = [...smileList.querySelectorAll("*")].filter(e => e.tagName == "INPUT");
        let faces = [...smileList.querySelectorAll("input[type='radio']")];
        if (faces.length > 0) {
          let i = randomNum(faces.length);
          faces[i].click();
        } else {
          let smiles = childs(smileList, "tagName", "LI");
          let i = randomNum(smiles.length);
          smiles[i].click();
        }
      } else {
        let smiles = _name("qdxq");
        if (!smiles) {
          return false;
        } else {
          let i = randomNum(smiles.length);
          smiles[i].click();
        }
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
      let button = _id("qiandao");
      if (button) {
        button.submit();
        return true;
      }
      button = _id("fzsx");
      if (button) {
        button.firstChild.click();
        return true;
      }
      button = _name("qiandao");
      if (button) {
        button[0].submit();
        return true;
      }
      button = document.querySelector(".t3 > table:nth-child(1) > tbody:nth-child(1) > tr:nth-child(1) > td:nth-child(2) > div:nth-child(1) > form:nth-child(1) > table:nth-child(2) > tbody:nth-child(1) > tr:nth-child(2) > td:nth-child(1) > div:nth-child(2) > input:nth-child(1)");
      if (button) {
        button.click();
        return true;
      }
      return false;
    }
    return false;
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
