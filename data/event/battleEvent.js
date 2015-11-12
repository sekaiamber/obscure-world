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
            var mid = helper.getRandomFromMap(
                domain.monster,
                domain.monsterProbabilityTotal
            );
            var monster = world.monster.getMonsterObj(mid);
            helper.stdout('battle_start', monster);
            this.battle(world.characters, monster, 1);
        },
        battle: function(characters, monster, direction) {
            var atk = 0;
            var cha = world.characters[0];
            if (direction == 1) {
                // player attack monster
                var l = world.characters.length;
                for (var i = 0; i < l; i++) {
                    cha = world.characters[i];
                    atk = cha.Attack();
                    atk = helper.getRandom(atk[0], atk[1]);
                    var crit = Math.random() < Math.min(cha.Crit() / 100, 0.4);
                    if (crit) {
                        // TODO
                        atk *= 2.5;
                    }
                    monster.life -= atk;
                    helper.stdout('battle', [cha, monster, atk]);
                }
            } else {
                // monster attack player
                if (helper.getRandom(0, 1) < cha.Duck()) {
                    helper.stdout('battle', [monster, cha, 0, 'miss']);
                } else {
                    for (var i = 0; i < monster.atktime; i++) {
                        atk = helper.getRandom(monster.atk[0], monster.atk[1]);
                        atk *= 0.2; // change the difficulty
                        cha = world.characters[0];
                        atk *= (100 - Math.min(100, cha.Protect())) / 100;
                        atk -= cha.Defense();
                        atk = Math.max(1, atk);
                        cha.dLife -= atk;
                        cha.onUpdateAttribute();
                        helper.stdout('battle', [monster, cha, atk]);
                    }
                }
            }
            this.setStatus('afterBattle', [characters, monster, 0 - direction]);
        },
        afterBattle: function(characters, monster, direction) {
            var l = characters.length;
            var lifesum = 0;
            for (var i = 0; i < l; i++) {
                lifesum += characters[i].Life()[1];
            }
            if (lifesum <= 0) {
                helper.stdout('battle_failed', monster);
                this.fail('-5%');
            } else if (monster.life <= 0) {
                helper.stdout('battle_victory', monster);
                this.success(monster.exp);
            } else {
                this.setStatus('battle', [characters, monster, direction]);
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
                cha.Revive();
                helper.stdout('charactor_revive', cha);
            }
            this.done();
        }
    });
    return Cls_battleEvent;
});
