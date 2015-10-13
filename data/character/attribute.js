define([
    '../dataReader',
    '../data/attribute'
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
        this.Life = function() {return this.attribute.current[0];}
        this.Mana = function() {return this.attribute.current[1];}
        this.Stamina = function() {return this.attribute.current[2];}
        this.Str = function() {return this.attribute.current[3];}
        this.Int = function() {return this.attribute.current[4];}
        this.Dex = function() {return this.attribute.current[5];}
        this.Will = function() {return this.attribute.current[6];}
        this.Luck = function() {return this.attribute.current[7];}
        this.AP = function() {return this.attribute.current[8];}
        // float attribute
        // attack
        this.Attack = function() {
            
        }
        this.Wounded = function() {
            
        }
        this.MagicAttack = function() {
            
        }
        this.Crit = function() {
            
        }
        this.Balance = function() {
            
        }
        this.DefensePenetration = function() {
            
        }
        // defence
        this.Defense = function() {
            
        }
        this.Protect = function() {
            
        }
        this.MagicDefense = function() {
            
        }
        this.MagicProtect = function() {
            
        }
    };
});
