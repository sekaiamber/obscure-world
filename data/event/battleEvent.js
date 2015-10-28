/* global $ */
define([
    '../core',
    './baseEvent',
    '../data/event',
    '../var/helper'
], function(world, Base, data, helper) {
    'use strict';
    var Cls_battleEvent = function(domain){
        this.domain = domain;
    };
    Cls_battleEvent.prototype = new Base();
    $.extend(Cls_battleEvent.prototype, {
        format: data.battle.format,
        active: function() {
            var domain = world.map[world.characters[0].location.id];
            var mid = helper.getRandom(
                domain.monster,
                domain.monsterProbabilityTotal
            );
            var monster = world.monster.getMonsterObj(mid);
            this.battle(world.characters, monster, 1);
        },
        battle: function(characters, monster) {
            // TODO
            monster.life -= 5;
            this.setStatus('afterBattle', [characters, monster]);
        },
        afterBattle: function(characters, monster) {
            var l = characters.length;
            var lifesum = 0;
            for (var i = 0; i < l; i++) {
                lifesum += characters[i].Life()[1];
            }
            // TODO
            if (lifesum <= 0) {
                this.fail(50);
            } else if (monster.life <= 0) {
                this.success(100);
            } else {
                this.setStatus('battle', [characters, monster]);
                this.notdone();
            }
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
