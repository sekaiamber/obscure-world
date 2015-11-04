/* global worldUI */
/* global world */
/* global $ */
define({
    $container: '#main',
    $console: '#console',
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
            this.onUpdateAttribute();
        };
        character._processBarChange = this._processBarChange;
        character.onExpChange = function() {
            this._processBarChange($('.exp.process-bar', this.$dom), this.experience, this.levelExp[0], this.levelExp[1]);
        };
        character.onUpdateAttribute = function() {
            var data = this.Life();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            this._processBarChange($('.life.process-bar', this.$dom), data[1], 0, data[0], data[1]);
            data = this.Mana();
            data = [Math.floor(data[0]), Math.floor(data[1])]
            this._processBarChange($('.mana.process-bar', this.$dom), data[1], 0, data[0], data[1]);
        };
        character.$dom = node;
        character.onUpdateAttribute();
        return node;
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
    helper_onStdout: function(key, data) {
        var additem = $('<div class="console-item"></div>');
        if (data && this.adapters[key]) {
            additem.append(this.adapters[key](data));
        } else {
            additem.append(key);
        }
        worldUI.$console.append(additem);
        if ($(".console-item", worldUI.$console).length >= 30) {
            $(".console-item:eq(0)", worldUI.$console).remove();
        }
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
                var character = world.characters[0];
                node = $('<div id="' + nodeId + '" title="人物信息"></div>');
                node.append("<div class='name'>" + character.name + "</div>");
                node.append("<div><table><tbody></tbody></table></div>");
                var tb = $("tbody", node);
                // info
                tb.append(this._characterRow('age', '年龄', character.age));
                tb.append(this._characterRow('race', '种族', character.race.name));
                tb.append(this._characterRow('level', '等级', character.level));
                // attribute
                tb.append(this._characterRow('life', '最大生命值', Math.floor(character.Life()[0])));
                tb.append(this._characterRow('mana', '最大魔法值', Math.floor(character.Mana()[0])));
                tb.append(this._characterRow('str', '力量', Math.floor(character.Str()[1]) + "(" + Math.floor(character.Str()[0]) + ")"));
                tb.append(this._characterRow('int', '智力', Math.floor(character.Int()[1]) + "(" + Math.floor(character.Int()[0]) + ")"));
                tb.append(this._characterRow('dex', '敏捷', Math.floor(character.Dex()[1]) + "(" + Math.floor(character.Dex()[0]) + ")"));
                tb.append(this._characterRow('will', '意志', Math.floor(character.Will()[1]) + "(" + Math.floor(character.Will()[0]) + ")"));
                tb.append(this._characterRow('luck', '幸运', Math.floor(character.Luck()[1]) + "(" + Math.floor(character.Luck()[0]) + ")"));
                tb.append(this._characterRow('atk', '物理攻击力', Math.floor(character.Attack()[0]) + "~" + Math.floor(character.Attack()[1])));
                tb.append(this._characterRow('wound', '负伤率', Math.floor(character.Wounded()[0]) + "%~" + Math.floor(character.Wounded()[1]) + "%"));
                tb.append(this._characterRow('mgcatk', '魔法攻击力', Math.floor(character.MagicAttack())));
                tb.append(this._characterRow('crit', '暴击率', Math.floor(character.Crit()) + '%'));
                tb.append(this._characterRow('balance', '平衡性', Math.floor(character.Balance()) + '%'));
                tb.append(this._characterRow('defensePenetration', '防御贯穿', Math.floor(character.DefensePenetration())));
                tb.append(this._characterRow('defense', '防御', Math.floor(character.Defense())));
                tb.append(this._characterRow('protect', '保护', Math.floor(character.Protect())));
                tb.append(this._characterRow('magicDefense', '魔法防御', Math.floor(character.MagicDefense())));
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