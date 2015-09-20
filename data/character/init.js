/* global $ */
define([
    './race',
    './attribute',
], function(Race, Attribute) {
    'use strict';
    var Cls = function(raceName, age, level) {
        this.age = age;
        this.level = level;
        $.extend(this, new Race(raceName));
        $.extend(this, new Attribute(raceName, age, level));
    };
    Cls.prototype = {
        LevelUp: function() {
            var levelUp = this.attribute.levelUp[Math.min(Math.max(this.age, 10), 26)]
            for (var i = 0; i < this.attribute.current.length; i++) {
                this.attribute.current[i] += levelUp[i];
            }
            this.level++;
        },
        AgeUp: function() {
            var ageUp = this.attribute.ageUp[Math.min(Math.max(this.age, 10), 25) + 1]
            for (var i = 0; i < this.attribute.current.length; i++) {
                this.attribute.current[i] += ageUp[i];
            }
            this.age++;
        }
    };
    return Cls
});