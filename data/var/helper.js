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
    onStdout: function() {},
    stdout: function(key, data) {
        this.onStdout(key, data);
    }
});