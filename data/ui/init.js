define([
    './event',
], function(event) {
    'use strict';
    var Cls_ui = function(world, $container) {
        this.world = world;
        this.$container = $container;
    };
    Cls_ui.prototype = {
        $container: null,
        setHooksCallback: function(module, event, callback) {
            this.world.hooks[module][event] = callback;
        },
        changePage: function(url, callback) {
            this.$container.load(url, callback);
        }
    }
    return Cls_ui;
});
