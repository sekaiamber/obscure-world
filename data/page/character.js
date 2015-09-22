/* global $ */
define(function() {
    'use strict';
    return (function(ui) {
        $(document).ready(function(){
            ui.setHooksCallback('world', 'onAddCharacter', function(character) {
                var node = $("<li class='character'></li>");
                node.html(character.name + '(' + character.age + ')' + ' lv.' + character.level);
                character.$dom = node;
                $('#main .character-list .list').append(node);
                character.onLevelUp = function(character) {
                    character.$dom.html(character.name + '(' + character.age + ')' + ' lv.' + character.level)
                };
                character.onAgeUp = function(character) {
                    character.$dom.html(character.name + '(' + character.age + ')' + ' lv.' + character.level)
                };
            });
        })
    });
});
