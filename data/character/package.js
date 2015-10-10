/* global $ */
define([
   '../var/collection' 
], function(Collection) {
    'use strict';
    var Cls_package = function() {};
    Cls_package.prototype = new Collection();
    $.extend(Cls_package.prototype, {
        itemMap: {},
        RemoveItem: function(item) {
            if(typeof item == 'object') {
                item = item.id;
            }
            this.splice(item, 1);
            // TODO
        },
        AddItem: function(item, count) {
            count = count || 1;
            var i = this.Have(item); 
            if(i != undefined) {
                i[1] += count;
            } else {
                var p = [
                    item,
                    count
                ];
                this.itemMap[item.id] = p;
                this.push(p);
            }
        },
        Have: function(item) {
            if(typeof item == 'object') {
                item = item.id;
            }
            return this.itemMap[item];
        },
        Count: function(item) {
            
        },
        money: 0,
        diary: null
    });
    return Cls_package;
});
