/* global $ */
define([
   '../var/collection' 
], function(Collection) {
    'use strict';
    var Cls_package = function() {};
    Cls_package.prototype = new Collection();
    $.extend(Cls_package.prototype, {
        AddItem: function(item, count) {
            count = count || 1;
        },
        RemoveItem: function(item, count) {
            
        },
        Count: function(item) {
            
        },
        money: 0,
        diary: null
    });
    return Cls_package;
});
