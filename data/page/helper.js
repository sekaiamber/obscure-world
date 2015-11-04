/* global world */
/* global $ */
define([
    '../data/page',
    '../data/console',
    '../var/helper'
], function(data, adapters, helper) {
    'use strict';
    return (function(ui) {
        world.hooks['helper'] = helper;
        helper.adapters = adapters;
        $(document).ready(function(){
            ui.setHooksCallback('helper', 'onStdout', data.helper_onStdout);
        });
    })
});