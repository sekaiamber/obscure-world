define([
    '../data/timer'
], function(data) {
    'use strict';
    var Cls_timer = function(current) {
        current = current || this.data.start;
        this.current = current;
    };
    Cls_timer.prototype = {
        current: -1,
        data: data,
        start: function() {
            if(this._id == null) {
                var cls = this;
                this._id = window.setInterval(function(){
                    cls.addTick();
                }, this.data.unit);
            }
        },
        stop: function() {
            if(this._id) {
                window.clearInterval(this._id);
            }
            this._id = null;
        },
        _id: null,
        addTick: function() {
            this.current++;
            this.onChange(this);
        },
        onChange: function(timer) {},
        toString: function() {
            var _t = this.current;
            var ret = '';
        }
    };
    return Cls_timer;
});