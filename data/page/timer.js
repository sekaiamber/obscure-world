/* global $ */
define(function() {
    'use strict';
    return (function(ui) {
        $(document).ready(function(){
            ui.setHooksCallback('timer', 'onChange', function(timer) {
                $('#main .timer').html(timer.toString());
            });
        });
    });
});
