/* global $ */
define([
    './race',
    './attribute',
], function(Race, Attribute) {
    'use strict';
    var Cls_character = function(name, raceName, age, level) {
        this.age = age;
        this.level = level;
        this.name = name;
        $.extend(this, new Race(raceName));
        $.extend(this, new Attribute(raceName, age, level));
    };
    Cls_character.prototype = {
        LevelUp: function() {
            var levelUp = this.attribute.levelUp[Math.min(Math.max(this.age, 10), 26)]
            for (var i = 0; i < this.attribute.current.length; i++) {
                this.attribute.current[i] += levelUp[i];
            }
            this.level++;
            this.onLevelUp(this);
        },
        AgeUp: function() {
            var ageUp = this.attribute.ageUp[Math.min(Math.max(this.age, 10), 25) + 1]
            for (var i = 0; i < this.attribute.current.length; i++) {
                this.attribute.current[i] += ageUp[i];
            }
            this.age++;
            this.onAgeUp(this);
        },
        onLevelUp: function(character) {},
        onAgeUp: function(character) {},
    };
    return Cls_character;
});
