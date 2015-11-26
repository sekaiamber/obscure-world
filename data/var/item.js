define(function() {
    'use strict';
    var Cls_item = function(data, count) {
        this.count = count || 1;
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                this[key] = data[key];
            }
        }
    }
    Cls_item.prototype = {
        packageId : null,
    }
    return Cls_item;
});