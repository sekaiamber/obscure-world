/* global $ */
define([
    './event',
    './shortcut',
    '../data/route',
    '../data/page'
], function(event, shortcut, route, page) {
    'use strict';
    var Cls_ui = function(world) {
        this.world = world;
        this.$container = $(page.$container).first();
        this.$console = $(page.$console).first();
    };
    Cls_ui.prototype = {
        $container: null,
        $console: null,
        setHooksCallback: function(module, event, callback) {
            this.world.hooks[module][event] = callback;
        },
        changePage: function(url, callback, target) {
            var alase = url;
            if (route[url]) {
                url = route[url];
            }
            target = target || this.$container; 
            target.load(url, function(){
                if (page.pageInit[alase]) {
                    page.pageInit[alase]();
                }
                if (callback) {
                    callback(arguments);
                }
            });
        }
    }
    $.extend(Cls_ui.prototype, {shortcut: shortcut});
    return Cls_ui;
});
