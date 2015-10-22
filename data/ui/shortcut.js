/* global $ */
define([
    '../data/shortcut'
], function(data) {
    for (var t in data) {
        if (data.hasOwnProperty(t)) {
            var map = data[t];
            for (var key in map) {
                if (map.hasOwnProperty(key)) {
                    // var handler = map[key];
                    $.Shortcuts.add({
                        type: t,
                        mask: key,
                        handler: function(e) {
                            console.log(e);
                        }
                    });
                }
            }
        }
    }
    $.Shortcuts.start();
    return {
        map: data
        
    }
});