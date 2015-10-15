/* global $ */
define([
    '../data/event',
    './battleEvent',
    './exploreEvent',
    '../var/helper'
], function(data, Battle, Explore, helper) {
    'use strict';
    $.extend(data, {
        events: {},
        start: function() {
            if(this._id == null) {
                var cls = this;
                this._id = window.setInterval(function(){
                    cls.occure();
                }, this.unit);
                this.onEventStart(this);
                cls.occure();
            };
        },
        stop: function() {
            if(this._id) {
                window.clearInterval(this._id);
            }
            this._id = null;
        },
        _id: null,
        occure: function() {
            this.current = this.getEvent();
            this.current.occure();
            this.onEventOccure(this);
        },
        onEventOccure: function(event) {},
        onEventStart: function(event) {},
        getEvent: function() {
            var kind = helper.getRandom(data.probability, data.probabilityTotal)
            return this.events[kind];
        },
        update: function(domain) {
            this.events.battle = new Battle(domain);
            this.events.explore = new Explore(domain);
        }
    });
    return data;
});

