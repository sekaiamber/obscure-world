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
            this.explore();
        },
        explore: function() {
            this.setStatus('success', [50]);
        },
        success: function(exp) {
            var l = world.characters.length;
            for (var i = 0; i < l; i++) {
                var cha = world.characters[i];
                cha.AddExp(exp);
            }
            this.done();
        },
        fail: function(exp) {
            var l = world.characters.length;
            for (var i = 0; i < l; i++) {
                var cha = world.characters[i];
                cha.AddExp(exp);
            }
            this.done();
        }
    });
    return Cls_exploreEvent;
});
