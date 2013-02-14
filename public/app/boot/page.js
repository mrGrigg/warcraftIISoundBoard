'use strict';

define(
    [
        'ui/ElementComponent'
    ],

    function(
        ElementComponent
    ) {

        function initialize() {
            ElementComponent.attachTo('.content');
        }

        return initialize;
  }
);
