/* global $ */
define([
    '../data/shortcut',
    '../data/page'
], function(data, page) {
    var shortcutHandler = function(e, eObject) {
        var d = data[eObject.type][eObject.mask];
        if (typeof d == 'function') {
            d(e, eObject);
        } else if (typeof d == 'string') {
            var c = page.shortcutCallbacks[d];
            if(c && typeof c == 'function') {
                c.call(page, [e, eObject]);
            }
        }
    };
    for (var t in data) {
        if (data.hasOwnProperty(t)) {
            var map = data[t];
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    // var handler = map[key];
                    $.Shortcuts.add({
                        type: t,
                        mask: key,
                        handler: shortcutHandler
                    });
                }
            }
        }
    }
    return {
        map: data,
        start: function() {
            $.Shortcuts.start();
        }
    }
});