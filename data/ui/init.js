define([
    './event',
], function(event) {
    'use strict';
    var Cls_ui = function(world) {
        this.world = world;
    };
    Cls_ui.prototype = {
        setHooksCallback: function(module, event, callback) {
            this.world.hooks[module][event] = callback;
        }
    }
    return Cls_ui;
});
