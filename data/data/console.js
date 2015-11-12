/* global $ */
define({
    'battle_start': function(monster) {
        return $('<span>遭遇<span style="color:red;">' + monster.name + '(' + monster.life + ')' + '</span></span>');
    },
    'battle': function(data) {
        if (data[3]) {
            switch (data[3]) {
                case 'miss':
                    return $('<span><span style="color:red;">' + data[0].name + '</span>对<span style="color:red;">' + data[1].name + '</span>的攻击被闪避了，没有造成伤害</span>');
                    break;
                default:
                    break;
            }
        } else {
            return $('<span><span style="color:red;">' + data[0].name + '</span>对<span style="color:red;">' + data[1].name + '</span>造成<span style="color:red;">' + Math.floor(data[2]) + '</span>点伤害</span>');
        }
    },
    'battle_victory': function(monster) {
        return $('<span>战胜<span style="color:red;">' + monster.name + '</span>！获得<span style="color:red;">' + monster.exp + '</span>点经验值！</span>');
    },
    'battle_failed': function(d) {
        return $('<span>你死了，损失当前等级5%经验</span>');
    },
    'charactor_revive': function(c) {
        return $('<span>你复活了</span>');
    }
});