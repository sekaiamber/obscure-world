/* global $ */
define(function(){
    'use strict';
    return function(source, key) {
        var ret = {};
        $.extend(true, ret, source[key]);
        return ret;
    }
});