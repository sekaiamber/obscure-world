/* global $ */
define([
    '../core',
    './baseEvent',
    '../data/event',
], function(world, Base, data) {
    'use strict';
    var Cls_exploreEvent = function(domain){
        this.domain = domain;
    };
    Cls_exploreEvent.prototype = new Base();
    $.extend(Cls_exploreEvent.prototype, {
        format: data.explore.format,
        active: function() {
            return ['success', 50];
        },
        success: function(exp) {
            var l = world.characters.length;
            for (var i = 0; i < l; i++) {
                var cha = world.characters[i];
                cha.AddExp(exp);
            }
        },
        fail: function(exp) {
            var l = world.characters.length;
            for (var i = 0; i < l; i++) {
                var cha = world.characters[i];
                cha.AddExp(exp);
            }
        }
    });
    return Cls_exploreEvent;
});
