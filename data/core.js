/* global $ */
define([
    'config'
], function(config) {
    'use strict';
    var world = {
        hooks: {}
    };
    // extend config
    $.extend(world, config);
    world.hooks['world'] = world;
    return world;
});