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
            console.log(item)
            item = this.GetItem(item);
            console.log(item)
            if (item == undefined) {
                return false;
            } else {
                item = item[0].id;
            }
            console.log(item)
            var targetIdx = 0;
            for (var i = 0; i < this.length; i++) {
                if (this[i][0].id == item) {
                    targetIdx = i;
                    break;
                }
            }
            this.splice(targetIdx, 1);
            delete this.itemMap[item];
            return true;
        },
        AddItem: function(item, count) {
            count = count || 1;
            var i = this.GetItem(item); 
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
        GetItem: function(item) {
            if(typeof item == 'object') {
                item = item.id;
            }
            return this.itemMap[item];
        },
        ItemCount: function(item) {
            var i = this.GetItem(item);
            return i[1];
        },
        money: 0,
        diary: null
    });
    return Cls_package;
});
