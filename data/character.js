/* global $ */
define([
    'core',
    './character/init',
    'map',
], function(world, Init) {
    'use strict';
    $.extend(world, {
        character: null,
        MakeCharacter: function(raceName, age, level) {
            age = age || 10;
            level = level || 1;
            this.character = new Init(raceName, age, level);
            this.character.location = this.map[this.character.race.birth];
        },
    });
    return world;
});
