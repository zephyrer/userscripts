// ==UserScript==
// @name Qidian First-Line Fixer
// @namespace github.com/zephyrer
// @match https://vipreader.qidian.com/chapter/*
// @match https://read.qidian.com/chapter/*
// @grant none
// ==/UserScript==

(function() {
  var line = document.querySelector(".main-text-wrap .read-content p:first-child");
  line.textContent = line.textContent.replace("　　　　", "　　");
})();