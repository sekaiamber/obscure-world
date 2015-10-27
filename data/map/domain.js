define([
    '../data/domain',
    './monster'
], function(data, monster) {
    'use strict';
    var Cls_domain = function(id, name, neighbor) {
        this.id = id;
        this.name = name;
        this.neighbor = neighbor;
    };
    Cls_domain.prototype = {
        id: -1,
        name: '',
        neighbor: [],
        monster: []
    };
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var source = data[key];
            var obj = new Cls_domain(key, source.name, source.neighbor);
            if (monster.domain[key]) {
                obj.monster = monster.domain[key]
            }
            data[key] = obj;
            
        }
    }
    return data;
});