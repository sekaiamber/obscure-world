/* global $ */
define([
    '../data/page'
],function(data) {
    'use strict';
    return (function(ui) {
        $(document).ready(function(){
            ui.setHooksCallback('world', 'onAddCharacter', function(character) {
                var node = data.character(character);
                $('#main .character-list .list').append(node);
            });
        });
    });
});
