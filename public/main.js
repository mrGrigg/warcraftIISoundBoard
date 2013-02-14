require(['require', 'config'], function(require) {
    require(['flightStart'], function() {
        require(['app/boot/page'], function(initialize) {
          initialize();
        });
    });
});