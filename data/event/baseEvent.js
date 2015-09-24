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
            var ret = this.active(arguments);
            this.sign = ret[0];
            this.data = ret[1];
        },
        callback: function() {
            this[this.sign](this.data);
            this.done(arguments);
        },
        sign: 'pass',
        data: {}
    };
    return Cls_baseEvent;
});