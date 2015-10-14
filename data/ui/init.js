/* global $ */
define([
    './event',
    '../data/route',
    '../data/page'
], function(event, route, page) {
    'use strict';
    var Cls_ui = function(world) {
        this.world = world;
        this.$container = $(page.$container).first();
    };
    Cls_ui.prototype = {
        $container: null,
        setHooksCallback: function(module, event, callback) {
            this.world.hooks[module][event] = callback;
        },
        changePage: function(url, callback) {
            if (route[url]) {
                url = route[url];
            }
            this.$container.load(url, callback);
        }
    }
    return Cls_ui;
});
