/* global $ */
define([
    'core',
    './map/init'
], function(world, map) {
    'use strict';
    $.extend(world, map);
    world.hooks['map'] = world.map;
    return world;
});
