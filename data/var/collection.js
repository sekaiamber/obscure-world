/* global $ */
define(function() {
    'use strict';
    var Cls_collection = function() {};
    Cls_collection.prototype = [];
    $.extend(Cls_collection.prototype, {
        show: [],
        SetMeta: function(meta) {
            for (var i = 0; i < meta.length; i++) {
                this[i] = meta[i];
                this.show[i] = false;
            }
        }
    });
    return Cls_collection;
});
