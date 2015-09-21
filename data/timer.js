/* global $ */
define([
    'core',
    './timer/init'
], function(world, Timer) {
    'use strict';
    $.extend(world, {
        timer: new Timer(0)
    });
    return world;
});
