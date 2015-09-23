/* global world */
/* global $ */
define({
    timer: function() {
        
    },
    character: function(character) {
        var node = $("<li class='character'></li>");
        node.append("<div class='name'>" + character.name + "</div>");
        node.append("<div class='age'>" + character.age + "</div>");
        node.append("<div class='race'>" + character.race.name + "</div>");
        node.append("<div class='level'>Lv." + character.level + "</div>");
        node.append("<div class='exp'>" + character.experience + "/" + + character.levelExp[1] + "</div>");
        character.$dom = node;
        character.onLevelUp = function(character) {
            $('.level', character.$dom).html('Lv.' + character.level);
        };
        character.onAgeUp = function(character) {
            $('.age', character.$dom).html(character.age);
        };
        character.onExpChange = function(character) {
            $('.exp', character.$dom).html(character.experience + "/" + + character.levelExp[1]);
        };
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
            }, event.barunit);
        $('.text', pro).html(event.current.format);
        return pro;
    }
});