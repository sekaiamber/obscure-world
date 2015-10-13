/* global $ */
define([
    'core',
    './character/init',
    'map',
], function(world, Init) {
    'use strict';
    var characters = [];
    characters.moveTo = function(loc) {
        var len = this.length;
        var mloc = world.map[loc];
        for (var i = 0; i < len; i++) {
            var cha = this[i];
            cha.location = mloc;
        }
        this.onMapChange(mloc);
        world.event.update(mloc);
    };
    characters.onMapChange = function(loc) {};
    $.extend(world, {
        characters: characters,
        AddCharacter: function(name, raceName, age, level) {
            raceName = raceName || 'human';
            age = age || 10;
            level = level || 1;
            var cha = new Init(name, raceName, age, level);
            this.characters.push(cha);
            this.characters.moveTo(cha.race.birth);
            this.onAddCharacter(cha);
            return cha;
        },
        onAddCharacter: function(character) {},
    });
    world.hooks['characters'] = world.characters;
    return world;
});
