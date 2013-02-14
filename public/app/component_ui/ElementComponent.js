define([
    'components/flight/lib/component'
    , 'text!templates/unit.html'], function(defineComponent) {
    return defineComponent(element);

    function element() {
        this.triggerCustomEvent = function() {
            this.trigger('customEvent', {a: 'a', b: 'b'});
        };

        this.customHandler = function(event, data) {
            console.log(event, data);
        };

        this.endItAll = function() {
            this.teardown();
        };

        this.after('initialize', function() {
            this.$node
                .addClass(this.attr.elementClass)
                .text('Content body');

            this.on('click', this.triggerCustomEvent);

            this.on('customEvent', this.customHandler);

            this.on('dblclick', this.endItAll);
        });
    }
});