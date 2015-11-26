/* global $ */
define([
   '../var/collection',
   '../var/helper' 
], function(Collection, helper) {
    'use strict';
    var Cls_package = function() {};
    Cls_package.prototype = new Collection();
    $.extend(Cls_package.prototype, {
        RemoveItem: function(pid) {
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                if (t.packageId == pid) {
                    this.splice(i, 1);
                    return;
                }
            }
        },
        AddItem: function(item) {
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                if (t.id == item.id && t.max > t.count) {
                    if(t.max >= t.count + item.count) {
                        t.count += item.count;
                        return;
                    } else {
                        item.count -= t.max - t.count;
                        t.count = t.max;
                    }
                }
            }
            item.packageId = helper.uuid();
            this.push(item);
        },
        GetItem: function(pid) {
            for (var i = 0; i < this.length; i++) {
                var t = this[i];
                if (t.packageId == pid) {
                    return t;
                }
            }
        },
        money: 0,
        diary: null
    });
    return Cls_package;
});
