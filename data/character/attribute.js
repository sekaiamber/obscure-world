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
    };
});
