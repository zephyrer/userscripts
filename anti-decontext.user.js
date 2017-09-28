// ==UserScript==
// @name           Anti-DeContext
// @namespace      EfisioZephyr
// @description    Restore context menus on sites that try to disable them
// @include        http://vipreader.qidian.com/BookReader/*
// @include        http://read.qidian.com/BookReader/*
// @include        http://vipreader.qidian.com/chapter/*
// @include        https://vipreader.qidian.com/chapter/*
// @include        http://read.qidian.com/chapter/*
// @include        https://read.qidian.com/chapter/*
// @include        http://book.zongheng.com/chapter/*
// @include        https://book.zongheng.com/chapter/*
// @downloadURL    https://github.com/zephyrer/userscripts/raw/master/anti-decontext.user.js
// @updateURL      https://github.com/zephyrer/userscripts/raw/master/anti-decontext.meta.js
// @require        https://raw.githubusercontent.com/joesimmons/jsl/master/versions/jsl-1.3.1.js
// @copyright      Efisio Zephyr
// @version        0.1.4.1
// @grant          none
// @run-at         document-start
// ==/UserScript==

/* CHANGELOG
0.1.2 (5/27/2016)
    - update namespace
    
0.1.0 (5/27/2016)
    - simplify to Anti-Uncopy from Anti-Disabler 2

*/



(function () {

    'use strict';

    var handlers_blacklist = [
            'oncontextmenu',
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
    if (win.rEventBlacklist) {
        var restr = win.rEventBlacklist.toString();
        restr = restr.substr(1, restr.lastIndexOf("/") - 1);
        restr += '|' + handlers_blacklist.join('|').replace(/^on/, '').replace(/\|on/g, '|');
        restr = [...new Set(restr.split('|'))].join('|'); // remove duplicates
        win.rEventBlacklist = new RegExp( restr, 'ig');
    } else 
        win.rEventBlacklist = rEventBlacklist;
    if (!win.oldAEL) {
        win.oldAEL = win.Element.prototype.addEventListener; // store a reference to the original addEventListener
        win.Element.prototype.addEventListener = function (name) {
            if ( !window.rEventBlacklist.test(name) ) {
                return window.oldAEL.apply(this, arguments);
            }
        };
    }

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
