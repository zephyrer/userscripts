// ==UserScript==
// @name           Anti-Disabler 2
// @namespace      http://diveintomark.org/projects/greasemonkey/
// @description    Restore copy, selection and context menus on sites that try to disable them, reissued from "Anti-Disabler" of JoeSimmons & Mark Pilgrim.
// @include        http://*
// @include        https://*
// @exclude        http://*.google.com/*
// @exclude        https://*.google.com/*
// @exclude        http://*.youtube.com/*
// @exclude        http://youtube.com/*
// @exclude        https://*.youtube.com/*
// @exclude        https://youtube.com/*
// @exclude        http://*.facebook.com/*
// @exclude        https://*.facebook.com/*
// @exclude        http://userscripts.org/*
// @exclude        https://userscripts.org/*
// @exclude        http://userscripts-mirror.org/*
// @exclude        https://greasyfork.org/*
// @exclude        https://openuserjs.org/*
// @exclude        http://*.deviantart.com/*
// @exclude        http://www.jslint.com/*
// @exclude        https://www.jslint.com/*
// @exclude        file:///*/perf.html*
// @exclude        http://ninjakiwi.com/*
// @exclude        https://ninjakiwi.com/*
// @exclude        http://jsfiddle.net/*
// @exclude        https://jsfiddle.net/*
// @exclude        http://*.wikipedia.org/*
// @exclude        https://*.wikipedia.org/*
// @downloadURL    https://userscripts.org/scripts/source/30096.user.js
// @updateURL      https://userscripts.org/scripts/source/30096.meta.js
// @require        https://raw.githubusercontent.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// @copyright      Efisio Zephyr
// @version        0.2.0
// @grant          none
// @run-at         document-start
// ==/UserScript==

/* CHANGELOG
0.2.0 (5/27/2016)
    - refactor main process out into an independent function
    - run main process again at JSL status "complete" to adapt to some situations that adding listeners later

0.1.1 (5/26/2016)
    - add process for another jquery existence (window.jQuery)
    - add jquery .off() to removes event handlers that were attached with .on().
    
0.1.0 (5/26/2016)
    - reproduction
    - update required JSL script to 1.3.1
    - update exclusions

1.1.3 (3/20/2014)
    - fixed a variable reference error
    - made the event blacklist regex case-insensitive

1.1.2 (3/19/2014)
    - changed include to http and https protocols only

*/



(function () {

    'use strict';

    // Anti-Disabler modified by Joe Simmons
    /*
    Other mild credit:
        absurdlyobfuscated
        Jeroenz0r
        rinopo_d
    */

    var handlers_blacklist = [
            'oncontextmenu',
            'onbeforecopy',
            'oncopy',
            'oncut',
            'ondrag',
            'ondragend',
            'ondragenter',
            'ondragleave',
            'ondragover',
            'ondragstart',
            'ondrop',
            'onmousedown',
            'onmouseup',
            //'onmouseover',
            //'onmouseout',
            //'onmouseenter',
            //'onmouseleave',
            'onselect',
            'onselectstart'
        ],
        //rEventBlacklist = new RegExp( handlers_blacklist.join('|').replace(/^on/g, ''), 'i' ),
        rEventBlacklist = new RegExp( handlers_blacklist.join('|').replace(/^on/, '').replace(/\|on/g, '|'), 'ig' ),
        oldAEL, win;

    // unwraps the element so we can use its methods freely
    function unwrap(elem) {
        if (elem) {
            if (typeof XPCNativeWrapper === 'function' && typeof XPCNativeWrapper.unwrap === 'function') {
                return XPCNativeWrapper.unwrap(elem);
            } else if (elem.wrappedJSObject) {
                return elem.wrappedJSObject;
            }
        }

        return elem;
    }

    win = unwrap(window);

    // don't let blacklisted events get added by addEventListener
    win.rEventBlacklist = rEventBlacklist;
    win.oldAEL = win.Element.prototype.addEventListener; // store a reference to the original addEventListener
    win.Element.prototype.addEventListener = function (name) {
        if ( !window.rEventBlacklist.test(name) ) {
            return window.oldAEL.apply(this, arguments);
        }
    };

    function antiDisabler(event) {
        var all = document.getElementsByTagName('*'),
            doc = win.document,
            body = win.document.body,
            isPrototype = typeof doc.observe === 'function' && typeof doc.stopObserving === 'function',
            len, e, i, jQall, jQdoc; 

        handlers_blacklist.forEach(function (event) {
            doc[event] = null;
            body.removeAttribute(event);
            if (isPrototype === true) {
                doc.stopObserving(event); // disable Prototype observation
            }
        });
        body.style.MozUserSelect = 'text';

        // Disabling of specific elements
        for (i = 0, len = all.length; i < len; i += 1) {

            e = unwrap( all[i] );

            handlers_blacklist.forEach(function (event) {
                e[event] = null;
                e.removeAttribute(event);
            });

            if (e.style.MozUserSelect === 'none') {
                e.style.MozUserSelect = 'text';
            }

        }

        // Disabling by jQuery
        var events_blacklist = handlers_blacklist.map(name => name.replace(/^on/i, ''));
        
        // $
        if (typeof win.$ === 'function' && typeof win.$.prototype.unbind === 'function') {
            jQall = win.$('*');
            jQdoc = win.$(doc);
            events_blacklist.forEach(function (event) {
                jQall.unbind(event);
                jQdoc.unbind(event);
            });
        }

        if (typeof win.$ === 'function' && typeof win.$.prototype.off === 'function') {
            jQall = win.$('*');
            jQdoc = win.$(doc);
            events_blacklist.forEach(function (event) {
                jQall.off(event);
                jQdoc.off(event);
            });
        }

        /*
        if (typeof win.jQuery === 'function' && typeof win.jQuery.prototype.unbind === 'function') {
            win.jQuery(win).unbind('keypress'); // Remove keyboard blocking - comment line out if you don't want it
        }
        */

        // jQuery
        if (typeof win.jQuery === 'function' && typeof win.jQuery.prototype.unbind === 'function') {
            jQall = win.jQuery('*');
            jQdoc = win.jQuery(doc);
            events_blacklist.forEach(function (event) {
                jQall.unbind(event);
                jQdoc.unbind(event);
            });
        }

        if (typeof win.jQuery === 'function' && typeof win.jQuery.prototype.off === 'function') {
            jQall = win.jQuery('*');
            jQdoc = win.jQuery(doc);
            events_blacklist.forEach(function (event) {
                jQall.off(event);
                jQdoc.off(event);
            });
        }
        
        /*
        if (typeof win.jQuery === 'function' && typeof win.jQuery.prototype.unbind === 'function') {
            win.jQuery(win).unbind('keypress'); // Remove keyboard blocking - comment line out if you don't want it
        }
        */

        if (typeof win.ProtectImg !== 'undefined') {
            win.ProtectImg = function () {
                return true;
            };
        }
    };
    
    // remove other listeners when the page loads
    JSL.runAt('interactive', antiDisabler);
    JSL.runAt('complete', antiDisabler);

}());