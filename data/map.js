/* global $ */
define([
    'core',
    './map/init'
], function(world, map) {
    'use strict';
    $.extend(world, {
        map: map
    });
    world.hooks['map'] = world.map;
    return world;
});
