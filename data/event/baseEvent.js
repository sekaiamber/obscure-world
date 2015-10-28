define(function() {
    'use strict';
    var Cls_baseEvent = function(){};
    Cls_baseEvent.prototype = {
        format: null,
        done: function() {},
        notdone: function() {},
        success: function() {},
        fail: function() {},
        active: function() {},
        pass: function() {},
        occure: function() {
            this.active.apply(this, arguments);
        },
        continue: function() {
            this[this.sign].apply(this, this.data);
        },
        setStatus: function(sign, data) {
            this.sign = sign;
            this.data = data;
        },
        sign: 'pass',
        data: {}
    };
    return Cls_baseEvent;
});