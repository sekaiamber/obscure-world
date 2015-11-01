/* global $ */
define([
    '../data/page',
    '../var/helper'
], function(data, helper) {
    'use strict';
    return (function(ui) {
        ui.hooks['helper'] = helper;
        $(document).ready(function(){
            ui.setHooksCallback('helper', 'onStdout', data.helper_onStdout);
        });
    })
});