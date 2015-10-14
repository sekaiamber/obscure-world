/* global $ */
define([
    'world',
    './ui/init'
], function(world, Init) {
    'use strict';
    return (window.worldUI = new Init(world));
});