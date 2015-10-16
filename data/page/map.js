/* global $ */
define([
    '../data/page'
],function(data) {
    'use strict';
    return (function(ui) {
        $(document).ready(function(){
            ui.setHooksCallback('characters', 'onMapChange', function(loc) {
                var node = data.characters_onMapChange(loc);
                $('#main .location').empty().append(node);
            });
        });
    });
});
