/* global worldUI */
/* global world */
/* global $ */
define({
    $container: '#main',
    timer: function() {
        
    },
    _processBarChange: function($bar, value, min, max, text) {
        text = text || "";
        $('.text', $bar).html(text);
        var bar = $('.bar', $bar).first();
        if (bar.hasClass('bottom')) {
            bar.css('height', ((value - min) / (max - min)) * 100 + '%')
        } else {
            bar.css('width', ((value - min) / (max - min)) * 100 + '%');
        }
    },
    world_onAddCharacter: function(character) {
        var node = $("<li class='character'></li>");
        var thumb = $("<div class='thumb'></div>");
        var bars = $("<div class='bars'></div>");
        var exp = $("<div class='process-bar exp'><div class='bar bottom'></div><div class='text'></div></div>");
        var life = $("<div class='process-bar life'><div class='bar'></div><div class='text'>0</div></div>");
        var mana = $("<div class='process-bar mana'><div class='bar'></div><div class='text'>0</div></div>");
        bars.append(life).append(mana);
        var name = $("<div class='name'>" + character.name + "</div>");
        var lv = $("<div class='level'>" + character.level + "</div>");
        node.append(thumb).append(bars).append(exp).append(name).append(lv);
        
        character.onLevelUp = function() {
            $('.level', this.$dom).html(this.level);
            this.updateAttribute();
        };
        character._processBarChange = this._processBarChange;
        character.onExpChange = function() {
            this._processBarChange($('.exp.process-bar', this.$dom), this.experience, this.levelExp[0], this.levelExp[1]);
        };
        character.updateAttribute = function() {
            var data = this.Life();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            this._processBarChange($('.life.process-bar', this.$dom), data[1], 0, data[0], data[1]);
            data = this.Mana();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            this._processBarChange($('.mana.process-bar', this.$dom), data[1], 0, data[0], data[1]);
        };
        character.$dom = node;
        character.updateAttribute();
        return node;
        
        
        // node.append("<div class='name'>" + character.name + "</div>");
        // node.append("<div><table><tbody></tbody></table></div>");
        // var tb = $("tbody", node);
        // // info
        // tb.append(this._characterRow('age', '年龄', character.age));
        // tb.append(this._characterRow('race', '种族', character.race.name));
        // tb.append(this._characterRow('level', '等级', character.level));
        // tb.append(this._characterRow('exp', '经验', $("<div class='process-bar'><div class='bar'></div><div class='text'>" + character.experience + "/" + character.levelExp[1] + "</div></div>")));
        // // attribute
        // tb.append(this._characterRow('life', '生命值', $("<div class='process-bar'><div class='bar'></div><div class='text'>0/0</div></div>")));
        // tb.append(this._characterRow('mana', '魔法值', $("<div class='process-bar'><div class='bar'></div><div class='text'>0/0</div></div>")));
        // tb.append(this._characterRow('str', '力量', '0(0)'));
        // tb.append(this._characterRow('int', '智力', '0(0)'));
        // tb.append(this._characterRow('dex', '敏捷', '0(0)'));
        // tb.append(this._characterRow('will', '意志', '0(0)'));
        // tb.append(this._characterRow('luck', '幸运', '0(0)'));
        // tb.append(this._characterRow('atk', '物理攻击力', '0~0'));
        // tb.append(this._characterRow('wound', '负伤率', '0%~0%'));
        // tb.append(this._characterRow('mgcatk', '魔法攻击力', '0'));
        // tb.append(this._characterRow('crit', '暴击率', '0%'));
        // tb.append(this._characterRow('balance', '平衡性', '0%'));
        

        // character.$dom = node;
        // character.onLevelUp = function() {
        //     $('.level .value', this.$dom).html(this.level);
        //     this.updateAttribute();
        // };
        // character.onAgeUp = function() {
        //     $('.age .value', this.$dom).html(this.age);
        //     this.updateAttribute();
        // };
        // character._processBarChange = this._processBarChange;
        // character.onExpChange = function() {
        //     this._processBarChange($('.exp .process-bar', this.$dom), this.experience, this.levelExp[0], this.levelExp[1]);
        // };
        // character.updateAttribute = function() {
        //     var data = this.Life();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     this._processBarChange($('.life .process-bar', this.$dom), data[1], 0, data[0]);
        //     data = this.Mana();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     this._processBarChange($('.mana .process-bar', this.$dom), data[1], 0, data[0]);
        //     data = this.Str();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.str .value', this.$dom).html(data[1] + "(" + data[0] + ")");
        //     data = this.Int();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.int .value', this.$dom).html(data[1] + "(" + data[0] + ")");
        //     data = this.Dex();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.dex .value', this.$dom).html(data[1] + "(" + data[0] + ")");
        //     data = this.Will();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.will .value', this.$dom).html(data[1] + "(" + data[0] + ")");
        //     data = this.Luck();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.luck .value', this.$dom).html(data[1] + "(" + data[0] + ")");
        //     data = this.Attack();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.atk .value', this.$dom).html(data[0] + "~" + data[1]);
        //     data = this.Wounded();
        //     data = [Math.floor(data[0]), Math.floor(data[1])]
        //     $('.wound .value', this.$dom).html(data[0] + "%~" + data[1] + "%");
        //     data = this.MagicAttack();
        //     data = Math.floor(data)
        //     $('.mgcatk .value', this.$dom).html(data);
        //     data = this.Crit();
        //     data = Math.floor(data)
        //     $('.crit .value', this.$dom).html(data + "%");
        //     data = this.Balance();
        //     data = Math.floor(data)
        //     $('.balance .value', this.$dom).html(data + "%");
        // }
        // character.updateAttribute();
        // return node;
    },
    characters_onMapChange: function(location) {
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
    event_onEventStart: function(event) {
        var pro = $('.process').first();
        var bar = $('<div class="bar"></div>');
        var text = $('<div class="text"></div>');
        pro.append(bar);
        pro.append(text);
        return pro;
    },
    event_onEventOccure: function(event) {
        var pro = $('.process').first();
        $('.bar', pro).css('width', '0%');
        // $('.bar', pro).velocity('stop');
        $('.bar', pro).velocity({
                'width': '100%'
            }, event[event.kind].barunit, function() {
                event.current.continue();
            });
        $('.text', pro).html(event.current.format);
        return pro;
    },
    event_onEventProcessing: function(event) {
        
    },
    pageInit: {
        menu: function() {
            $(".menu .new").click(function(){
                $(".menu").css("display", "none");
                $(".menu-new").css("display", "");
            });
            $(".menu-new .submit").click(function() {
                var name = $(".menu-new .name").val();
                var race = $(".menu-new .race").val();
                worldUI.changePage('game', function() {
                    world.AddCharacter(name, race);
                    world.event.start();
                });
            });
            $(".menu-new .back").click(function() {
                $(".menu-new").css("display", "none");
                $(".menu").css("display", "");
            });
        },
        game: function() {
            worldUI.shortcut.start();
        }
    },
    _characterRow: function(cls, name, value) {
        var ret = $("<tr class='" + cls + "'><td class='key'>" + name + "</td><td class='value'></td></tr>");
        $(".value", ret).append(value);
        return ret;
    },
    shortcutCallbacks: {
        openCharacterPanel: function() {
            var nodeId = "__CharacterPanel__";
            var node = $("#" + nodeId);
            if (node.length == 0) {
                node = $('<div id="' + nodeId + '" title="人物信息"></div>');
                node.append("<div class='name'>" + world.characters[0].name + "</div>");
                node.append("<div><table><tbody></tbody></table></div>");
                var tb = $("tbody", node);
                // info
                tb.append(this._characterRow('age', '年龄', world.characters[0].age));
                tb.append(this._characterRow('race', '种族', world.characters[0].race.name));
                tb.append(this._characterRow('level', '等级', world.characters[0].level));
                // attribute
                tb.append(this._characterRow('life', '最大生命值', '0'));
                tb.append(this._characterRow('mana', '最大魔法值', '0'));
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
                node.dialog({
                    close: function() {
                        node.remove();
                    }
                });
            } else {
                node.dialog('close');
            }
        }
    }
});