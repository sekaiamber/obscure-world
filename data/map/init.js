define([
    './domain',
    './monster'
], function(domain, monster) {
    'use strict';
    return {
        map: domain,
        monster: monster
    };
});