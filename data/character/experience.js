define([
    '../data/experience'
], function(data) {
    'use strict';
    return {
        experience: 0,
        levelExp: [data.data[0], data.data[1]],
        AddExp: function(exp) {
            if (typeof exp == 'string') {
                exp = (this.levelExp[1] - this.levelExp[0]) * (parseInt(exp.split('%')[0]) / 100)
            }
            this.experience += exp;
            if(this.experience > data.data[data.data.length - 1]) {
                this.experience = data.data[data.data.length - 1];
                if(this.level == data.data.length - 1) return;
            }
            if(this.experience > this.levelExp[1]) {
                var tar = this.GetLevelByExp(this.experience) - this.level;
                this.LevelUp(tar);
                this.levelExp[0] = data.data[this.level - 1];
                this.levelExp[1] = data.data[this.level];
            };
            this.onExpChange();
        },
        GetLevelByExp: function(exp) {
            var start = 0,
                end = data.data.length - 1,
                mid = Math.floor(end / 2);
            if(data.data[start] == exp) {
                return start + 1;
            };
            if(data.data[end] <= exp) {
                return end;
            }
            while(start !== end - 1) {
                if(data.data[mid] == exp || start == mid) {
                    return mid + 1;
                } else if(data.data[mid] > exp) {
                    end = mid;
                } else {
                    start = mid;
                }
                mid = Math.floor((end - start) / 2) + start;
            }
            return start + 1;
        },
        onExpChange: function() {},
    }
});