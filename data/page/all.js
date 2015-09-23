define([
    '../ui',
    './timer',
    './character',
    './map',
    './event'
], function(ui, Timer, Character, Map, Event) {
    'use strict';
    Timer(ui);
    Character(ui);
    Map(ui);
    Event(ui);
    return ui;
});