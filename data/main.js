/* global $ */
define([
    'world',
    'ui',
    './page/all'
], function(world, ui, page) {
    'use strict';
    $(document).ready(function(){
        ui.changePage('menu');
    });
    return ui;
});