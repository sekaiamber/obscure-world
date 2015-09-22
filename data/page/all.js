define([
    '../ui',
    './timer',
    './character'
], function(ui, Timer, Character) {
    'use strict';
    Timer(ui);
    Character(ui);
    return ui;
});