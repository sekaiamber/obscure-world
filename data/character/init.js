/* global $ */
define([
    './race',
    './attribute',
    './experience',
    './package',
    './equipment'
], function(Race, Attribute, experience, Package, equipment) {
    'use strict';
    var Cls_character = function(name, raceName, age, level) {
        this.age = age;
        this.level = level;
        this.name = name;
        this.package = new Package();
        this.equipment = equipment;
        $.extend(this, new Race(raceName));
        $.extend(this, new Attribute(raceName, age, level));
        $.extend(this, experience);
    };
    Cls_character.prototype = {
        LevelUp: function(lv) {
            if(lv == 0) return;
            lv = lv || 1;
            var levelUp = this.attribute.levelUp[Math.min(Math.max(this.age, 10), 26)]
            for (var i = 0; i < this.attribute.current.length; i++) {
                this.attribute.current[i] += levelUp[i] * lv;
            }
            this.level += lv;
            this.onLevelUp();
        },
        AgeUp: function() {
            var ageUp = this.attribute.ageUp[Math.min(Math.max(this.age, 10), 25) + 1]
            for (var i = 0; i < this.attribute.current.length; i++) {
                this.attribute.current[i] += ageUp[i];
            }
            this.age++;
            this.onAgeUp();
        },
        onLevelUp: function() {},
        onAgeUp: function() {},
    };
    return Cls_character;
});
