/* global $ */
define([
    '../data/page'
],function(data) {
    'use strict';
    return (function(ui) {
        $(document).ready(function(){
            ui.setHooksCallback('event', 'onEventStart', function(event) {
                var pro = data.process(event);
            });
            ui.setHooksCallback('event', 'onEventOccure', function(event) {
                var pro = data.processGo(event);
            });
        });
    });
});
