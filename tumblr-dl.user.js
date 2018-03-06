// ==UserScript==
// @name         Tumblr Download
// @version      0.3.2
// @description  Download tumblr photos by typing 'dl' when viewing them
// @author       zephyrer
// @namespace    https://github.com/zephyrer/
// @match        https://*.tumblr.com/*
// @match        http://*.tumblr.com/*
// @downloadURL  https://github.com/zephyrer/userscripts/raw/master/tumblr-dl.user.js
// @updateURL    https://github.com/zephyrer/userscripts/raw/master/tumblr-dl.meta.js
// @copyright    2018, Efisio Zephyr
// @copyright    Original, @christophemarois
// @grant        none
// ==/UserScript==

(function() {

  function WordWatcher (initialCommands = {}) {

    this.commands = initialCommands

    let typed = ''
    console.log("Tumblr Download - installing listener...");
    document.addEventListener('keypress', e => {
      typed += String.fromCharCode(e.which)
      console.log("Tumblr Download - typed: " + typed);
      for (let command of Object.keys(this.commands)) {
        if (typed.endsWith(command)) {
          typed = ''
          this.commands[command]()
        }
      }
    })

  }

  let wordWatcher = new WordWatcher()

  wordWatcher.commands.dl = () => {
    console.log("Tumblr Download - executing command 'dl' 1st ...");
    let img = document.querySelector('img#tumblr_lightbox_center_image');
    if (img) {
      let a = document.createElement('a');
      a.href = img.src;
      a.setAttribute('download', true);
      document.body.appendChild(a);
      a.click();
      a.remove();
      return;
    }
    console.log("Tumblr Download - executing command 'dl' 2nd ...");
    let photoframes = Array.from(document.getElementsByTagName("iframe")).filter((x) => /^photoset_iframe_/.test(x.id));
    if (photoframes.length > 0) {
      let photolinks = Array.from(photoframes[0].contentWindow.document.getElementsByTagName("a")).filter((x) => /^photoset_link_/.test(x.id));
      if (photolinks.length > 0) {
        let msg = '';
        for (let i=0; i<photolinks.length;i++)
          msg += photolinks[i].href + '\r\n';
        console.log("Tumblr Download - msg: " + msg);
        copyTextToClipboard(msg);
      }
    }
  }
  
  wordWatcher.commands.l = () => {
    getMostVisibleElement(document.querySelectorAll('.post_container .post')).querySelector('.like').click()
  }
  
  function getMostVisibleElement (els) {

    var viewportHeight = window.innerHeight

    var max = 0
    var mostVisibleEl = null

    for (var el of Array.from(els)) {

      var rect = el.getBoundingClientRect()
      var height = rect.bottom - rect.top
      var visible = {
        top: rect.top >= 0 && rect.top < viewportHeight,
        bottom: rect.bottom > 0 && rect.bottom < viewportHeight
      }

      var visiblePx = 0
      if ( visible.top && visible.bottom ) {
        visiblePx = height // Whole element is visible
      } else if ( visible.top ) {
        visiblePx = viewportHeight - rect.top
      } else if ( visible.bottom ) {
        visiblePx = rect.bottom
      } else if ( height > viewportHeight && rect.top < 0 ) {
        var absTop = Math.abs( rect.top )
        if ( absTop < height ) {
          visiblePx = height - absTop // Part of the element is visible
        }
      }

      if ( visiblePx > max ) {
        max = visiblePx
        mostVisibleEl = el
      }

    }

    return mostVisibleEl

  }

  function copyTextToClipboard(text) {
    // Create a text area with the value we want to copy.
    let textarea = document.createElement("textarea");
    textarea.value = text;

    // Style textarea to make it fairly invisible.
    // Copy doesn't work when display: none.
    textarea.style.maxHeight = '2em';
    textarea.style.maxWidth = '2em';
    textarea.style.position = 'fixed';
    textarea.style.top = 0;
    textarea.style.left = 0;
    textarea.style.padding = 0;
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';

    // Append the textarea, copy its value, then remove it.
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }

})()