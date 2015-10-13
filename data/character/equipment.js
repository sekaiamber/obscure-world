define([
    './package'
], function(Package) {
    'use strict';
    return {
        head: null,
        neck: null,
        shoulder: null,
        chest: null,
        back: null,
        wrist: null,
        hand: null,
        belt: null,
        leg: null,
        feet: null,
        finger1: null,
        finger2: null,
        trinket1: null,
        trinket2: null,
        weapon: null,
        weaponType: function() {
            // 0: empty, 1: melee, 2: magic, 3: romate
            if (this.weapon == null) {
                return 0;
            }
            return this.weapon.weaponType;
        }
    }
});