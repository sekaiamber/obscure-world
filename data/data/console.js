/* global $ */
define({
    'battle_start': function(monster) {
        return $('<span>遭遇<span style="color:red;">' + monster.name + '(' + monster.life + ')' + '</span></span>');
    },
    'battle': function(data) {
        if (data[2] == 1) {
            return $('<span>你对<span style="color:red;">' + data[1].name + '</span>造成<span style="color:red;">' + Math.floor(data[3]) + '</span>点伤害</span>');
        } else {
            return $('<span><span style="color:red;">' + data[1].name + '</span>对你造成<span style="color:red;">' + Math.floor(data[3]) + '</span>点伤害</span>');
        }
    },
});