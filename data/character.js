/* global $ */
define([
    'core',
    './character/init',
    'map',
], function(world, Init) {
    'use strict';
    $.extend(world, {
        characters: [],
        AddCharacter: function(name, raceName, age, level) {
            age = age || 10;
            level = level || 1;
            var cha = new Init(name, raceName, age, level);
            cha.location = this.map[cha.race.birth];
            this.characters.push(cha);
            this.onAddCharacter(cha);
        },
        onAddCharacter: function(character) {},
    });
    world.hooks['characters'] = world.characters;
    return world;
});
