/* global $ */
define(function() {
    'use strict';
    var Cls_collection = function() {};
    Cls_collection.prototype = [];
    $.extend(Cls_collection.prototype, {
        SetMeta: function(meta) {
            for (var i = 0; i < meta.length; i++) {
                this[i] = meta[i];
            }
        }
    });
    return Cls_collection;
});
