/* global $ */
define([
    'core',
    './event/init',
    'character',
    'timer',
    'map',
], function(world, event) {
    'use strict';
    $.extend(world, {
        event: event
    });
    world.hooks['event'] = world.event;
});