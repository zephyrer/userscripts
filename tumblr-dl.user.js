// ==UserScript==
// @name         Tumblr Download
// @version      0.3
// @description  Download tumblr photos by typing 'dl' when viewing them
// @author       zephyrer
// @namespace    https://github.com/zephyrer/
// @match        https://www.tumblr.com/*
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
    document.addEventListener('keypress', e => {
      typed += String.fromCharCode(e.which)
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
    let a = document.createElement('a')
    let img = document.querySelector('img#tumblr_lightbox_center_image')
    if (!img) return false
    a.href = img.src
    a.setAttribute('download', true)
    document.body.appendChild(a)
    a.click()
    a.remove()
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

})()