/* global $ */
define([
    '../data/event',
], function(data) {
    'use strict';
    $.extend(data, {
        start: function() {
            if(this._id == null) {
                var cls = this;
                this._id = window.setInterval(function(){
                    cls.occure();
                }, this.unit);
                this.onEventStart(this);
                cls.occure();
            };
            this.totalProbability = 0;
            for (var key in this.probability) {
                if (this.probability.hasOwnProperty(key)) {
                    this.totalProbability += this.probability[key];
                }
            } 
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
            this.onEventOccure(this);
        },
        onEventOccure: function(event) {},
        onEventStart: function(event) {},
        getEvent: function() {
            var p = Math.random() * this.totalProbability;
            var pp = 0;
            var kind = '';
            for (var key in this.probability) {
                if (this.probability.hasOwnProperty(key)) {
                    kind = key;
                    pp += this.probability[key];
                    if(pp >= p) {
                        break;
                    }
                }
            }
            return this[kind];
        }
    });
    return data;
});

