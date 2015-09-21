/* global $ */
define([
    'core',
    './character/init',
    'map',
], function(world, Init) {
    'use strict';
    $.extend(world, {
        characters: [],
        AddCharacter: function(raceName, age, level) {
            age = age || 10;
            level = level || 1;
            var cha = new Init(raceName, age, level);
            cha.location = this.map[cha.race.birth];
            this.characters.push(cha);
        },
    });
    return world;
});
