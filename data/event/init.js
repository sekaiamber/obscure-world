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
            this.onEventStart(this);
            this.occure();
        },
        stop: function() {
            
        },
        _id: null,
        occure: function() {
            this.current = this.getEvent();
            var cls = this;
            this.current.done = function() {
                cls.occure();
            };
            this.current.occure();
            this.onEventOccure(this);
        },
        onEventOccure: function(event) {},
        onEventProcessing: function(event) {},
        onEventStart: function(event) {},
        getEvent: function() {
            var kind = helper.getRandom(data.probability, data.probabilityTotal)
            this.kind = kind;
            return this.events[kind];
        },
        update: function(domain) {
            this.events.battle = new Battle(domain);
            this.events.explore = new Explore(domain);
        }
    });
    return data;
});

