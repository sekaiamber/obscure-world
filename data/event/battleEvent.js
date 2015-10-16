/* global $ */
define([
    '../core',
    './baseEvent',
    '../data/event',
], function(world, Base, data) {
    'use strict';
    var Cls_battleEvent = function(domain){
        this.domain = domain;
    };
    Cls_battleEvent.prototype = new Base();
    $.extend(Cls_battleEvent.prototype, {
        format: data.battle.format,
        active: function(characters, monster) {
            this.battle(characters, monster);
        },
        battle: function(characters, monster) {
            this.setStatus('success', 100);
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
    return Cls_battleEvent;
});
