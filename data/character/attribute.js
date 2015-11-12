define([
    '../dataReader',
    '../data/attribute',
    './equipment'
], function(Reader, data) {
    'use strict';
    return function(race, age, level) {
        level -= 1;
        race = race || 'human';
        this.attribute = Reader(data, race);
        age = Math.min(Math.max(age, 10), 17);
        this.attribute.current = this.attribute.initial[age];
        var levelUp = this.attribute.levelUp[Math.min(Math.max(age, 10), 26)]
        for (var i = 0; i < this.attribute.current.length; i++) {
            this.attribute.current[i] += levelUp[i] * level;
        }
        // basic attribute
        this.Life = function() {
            var b = this.attribute.current[0];
            return [b, Math.max(b + this.dLife, 0)];
        }
        this.dLife = 0;
        this.Mana = function() {
            var b = this.attribute.current[1];
            return [b, Math.max(b + this.dMana, 0)];
        }
        this.dMana = 0;
        this.Stamina = function() {
            var b = this.attribute.current[2];
            return [b, Math.max(b + this.dStamina, 0)];
        }
        this.dStamina = 0;
        this.Str = function() {
            var b = this.attribute.current[3];
            return [b, b + this.dStr];
        }
        this.dStr = 0;
        this.Int = function() {
            var b = this.attribute.current[4];
            return [b, b + this.dInt];
        }
        this.dInt = 0;
        this.Dex = function() {
            var b = this.attribute.current[5];
            return [b, b + this.dDex];
        }
        this.dDex = 0;
        this.Will = function() {
            var b = this.attribute.current[6];
            return [b, b + this.dWill];
        }
        this.dWill = 0;
        this.Luck = function() {
            var b = this.attribute.current[7];
            return [b, b + this.dLuck];
        }
        this.dLuck = 0;
        this.AP = function() {return this.attribute.current[8];}
        // float attribute
        // attack
        this.Attack = function() {
            var ret = [0, 0];
            var wt = this.equipment.weaponType();
            // Str
            if(wt == 0 || wt == 1 || wt == 2) {
                ret[0] += this.Str()[1] / 3;
                ret[1] += this.Str()[1] / 2.5;
            }
            // Dex
            if(wt == 3) {
                ret[0] += this.Dex()[1] / 3;
                ret[1] += this.Dex()[1] / 2.5;
            }
            return ret;
        }
        this.Wounded = function() {
            var ret = [0, 0];
            // Will
            ret[0] += this.Will()[1] / 20;
            ret[1] += this.Will()[1] / 7;
            return ret;
        }
        this.MagicAttack = function() {
            // Int
            return this.Int()[1] / 5;
        }
        this.Crit = function() {
            var ret = 0;
            // Will
            ret += this.Will()[1] / 10;
            // Luck
            ret += this.Luck()[1] / 5;
            return ret;
        }
        this.Balance = function() {
            var ret = 0;
            var wt = this.equipment.weaponType();
            if(wt == 0) ret += 30;
            // Dex
            ret += Math.min(this.Dex()[1] / 4, 50);
            return ret;
        }
        this.DefensePenetration = function() {
            var ret = 0;
            // Dex
            ret += this.Dex()[1] / 15;
            return ret;
        }
        // defence
        this.Defense = function() {
            var ret = 0;
            // Str
            ret += this.Str()[1] / 10;
            return ret;
        }
        this.Protect = function() {
            var ret = 20;
            return ret;
        }
        this.MagicDefense = function() {
            var ret = 0;
            // Int
            ret += this.Int()[1] / 20;
            return ret;
        }
        this.Duck = function(target) {
            var ret = 0.3;
            return ret;
        };
    };
});
