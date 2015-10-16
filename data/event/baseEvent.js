define(function() {
    'use strict';
    var Cls_baseEvent = function(){};
    Cls_baseEvent.prototype = {
        format: null,
        done: function() {},
        success: function() {},
        fail: function() {},
        active: function() {},
        pass: function() {},
        occure: function() {
            this.active(arguments);
        },
        continue: function() {
            this[this.sign](this.data);
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