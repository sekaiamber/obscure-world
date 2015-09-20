define([
    '../data/domain'
], function(data) {
    'use strict';
    var Cls_domain = function(id, name, neighbor) {
        this.id = id;
        this.name = name;
        this.neighbor = neighbor;
    };
    Cls_domain.prototype = {
        id: -1,
        name: '',
        neighbor: []
    };
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var source = data[key];
            data[key] = new Cls_domain(key, source.name, source.neighbor);
        }
    }
    return data;
});