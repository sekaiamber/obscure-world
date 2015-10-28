/* global $ */
define([
    '../data/monster',
    '../dataReader'
], function(data, reader) {
    'use strict';
    $.extend(data, {
        getMonsterObj: function(id) {
            return reader(this.data, id);
        }
    });
    return data;
});