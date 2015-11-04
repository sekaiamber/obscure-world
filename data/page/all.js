define([
    '../ui',
    './timer',
    './character',
    './map',
    './event',
    './helper'
], function(ui, Timer, Character, Map, Event, Helper) {
    'use strict';
    Timer(ui);
    Character(ui);
    Map(ui);
    Event(ui);
    Helper(ui);
    return ui;
});