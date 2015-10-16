/* global $ */
define([
    '../data/page'
],function(data) {
    'use strict';
    return (function(ui) {
        $(document).ready(function(){
            ui.setHooksCallback('event', 'onEventStart', function(event) {
                var pro = data.event_onEventStart(event);
            });
            ui.setHooksCallback('event', 'onEventOccure', function(event) {
                var pro = data.event_onEventOccure(event);
            });
            ui.setHooksCallback('event', 'onEventProcessing', function(event) {
                var pro = data.event_onEventProcessing(event);
            });
        });
    });
});
