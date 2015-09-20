define([
    '../dataReader',
    '../data/race'
], function(Reader, data) {
    'use strict';
    return function(race) {
        this.race = Reader(data, race);
    };
});