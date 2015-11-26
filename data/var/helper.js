define({
    getRandomFromMap: function(map, total) {
        var p = Math.random() * total;
        var pp = 0;
        var kind = '';
        for (var key in map) {
            if (map.hasOwnProperty(key)) {
                kind = key;
                pp += map[key];
                if(pp >= p) {
                    break;
                }
            }
        }
        return kind;
    },
    getRandom: function(min, max) {
        return Math.random() * (max - min) + min;
    },
    uuid: function(key) {
        key = key || parseInt(this.getRandom(1, 100000));
        var d = new Date();
        return d.getTime() + "_" + key + "_" + parseInt(this.getRandom(1, 100000));
    },
    onStdout: function() {},
    stdout: function(key, data) {
        this.onStdout(key, data);
    }
});