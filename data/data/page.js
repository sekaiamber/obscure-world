/* global world */
/* global $ */
define({
    timer: function() {
        
    },
    _processBarChange: function($bar, value, min, max) {
        $('.text', $bar).html(value + "/" + max);
        $('.bar', $bar).css('width', ((value - min) / (max - min)) * 100 + '%')
    },
    _characterRow: function(cls, name, value) {
        var ret = $("<tr class='" + cls + "'><td class='key'>" + name + "</td><td class='value'></td></tr>");
        $(".value", ret).append(value);
        return ret;
    },
    character: function(character) {
        var node = $("<li class='character'></li>");
        node.append("<div class='name'>" + character.name + "</div>");
        node.append("<div><table><tbody></tbody></table></div>");
        var tb = $("tbody", node);
        // info
        tb.append(this._characterRow('age', '年龄', character.age));
        tb.append(this._characterRow('race', '种族', character.race.name));
        tb.append(this._characterRow('level', '等级', character.level));
        tb.append(this._characterRow('exp', '经验', $("<div class='process-bar'><div class='bar'></div><div class='text'>" + character.experience + "/" + character.levelExp[1] + "</div></div>")));
        // attribute
        tb.append(this._characterRow('life', '生命值', $("<div class='process-bar'><div class='bar'></div><div class='text'>0/0</div></div>")));
        tb.append(this._characterRow('mana', '魔法值', $("<div class='process-bar'><div class='bar'></div><div class='text'>0/0</div></div>")));
        tb.append(this._characterRow('str', '力量', '0(0)'));
        tb.append(this._characterRow('int', '智力', '0(0)'));
        tb.append(this._characterRow('dex', '敏捷', '0(0)'));
        tb.append(this._characterRow('will', '意志', '0(0)'));
        tb.append(this._characterRow('luck', '幸运', '0(0)'));
        tb.append(this._characterRow('atk', '物理攻击力', '0~0'));
        tb.append(this._characterRow('wound', '负伤率', '0%~0%'));
        tb.append(this._characterRow('mgcatk', '魔法攻击力', '0'));
        tb.append(this._characterRow('crit', '暴击率', '0%'));
        tb.append(this._characterRow('balance', '平衡性', '0%'));
        

        character.$dom = node;
        character.onLevelUp = function() {
            $('.level .value', this.$dom).html(this.level);
            this.updateAttribute();
        };
        character.onAgeUp = function() {
            $('.age .value', this.$dom).html(this.age);
            this.updateAttribute();
        };
        character._processBarChange = this._processBarChange;
        character.onExpChange = function() {
            this._processBarChange($('.exp .process-bar', this.$dom), this.experience, this.levelExp[0], this.levelExp[1]);
        };
        character.updateAttribute = function() {
            var data = this.Life();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            this._processBarChange($('.life .process-bar', this.$dom), data[1], 0, data[0]);
            data = this.Mana();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            this._processBarChange($('.mana .process-bar', this.$dom), data[1], 0, data[0]);
            data = this.Str();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.str .value', this.$dom).html(data[1] + "(" + data[0] + ")");
            data = this.Int();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.int .value', this.$dom).html(data[1] + "(" + data[0] + ")");
            data = this.Dex();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.dex .value', this.$dom).html(data[1] + "(" + data[0] + ")");
            data = this.Will();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.will .value', this.$dom).html(data[1] + "(" + data[0] + ")");
            data = this.Luck();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.luck .value', this.$dom).html(data[1] + "(" + data[0] + ")");
            data = this.Attack();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.atk .value', this.$dom).html(data[0] + "~" + data[1]);
            data = this.Wounded();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            $('.wound .value', this.$dom).html(data[0] + "%~" + data[1] + "%");
            data = this.MagicAttack();
            data = Math.floor(data)
            $('.mgcatk .value', this.$dom).html(data);
            data = this.Crit();
            data = Math.floor(data)
            $('.crit .value', this.$dom).html(data + "%");
            data = this.Balance();
            data = Math.floor(data)
            $('.balance .value', this.$dom).html(data + "%");
        }
        character.updateAttribute();
        return node;
    },
    location: function(location) {
        var node = $('<div class="domain"></div>');
        node.append('<div class="name">' + location.name + '</div>');
        var neighbor = $('<div class="neighbor"><ul></ul></div>');
        var ul = $('ul', neighbor);
        for (var i = 0; i < location.neighbor.length; i++) {
            var neig = world.map[location.neighbor[i]];
            var li = $('<li domain-id="' + neig.id + '">' + neig.name + '</li>');
            ul.append(li);
        }
        $('li', ul).click(function(){
            world.characters.moveTo(parseInt($(this).attr('domain-id')));
        });
        node.append(neighbor); 
        return node;
    },
    process: function(event) {
        var pro = $('.process').first();
        var bar = $('<div class="bar"></div>');
        var text = $('<div class="text"></div>');
        pro.append(bar);
        pro.append(text);
        return pro;
    },
    processGo: function(event) {
        var pro = $('.process').first();
        $('.bar', pro)
            .css('width', '0%')
            .velocity('stop')
            .velocity({
                'width': '100%'
            }, event.barunit, function() {
                event.current.callback();
            });
        $('.text', pro).html(event.current.format);
        return pro;
    }
});