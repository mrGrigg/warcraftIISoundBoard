define(['components/flight/lib/component'], function(defineComponent) {
    return defineComponent(myFirstComponent);

    function myFirstComponent() {
        this.doSomething = function () {
            console.log('Doing something');
        };

        this.dosomethingElse = function() {
            console.log('Doing something else');
        };

        this.after('initialize', function() {
            this.on('click', this.doSomething);
        });
    }
});