define(function(require) {
    var component
        , defineComponent = require('components/flight/lib/component')
        , unitTemplate = Handlebars.compile(require('text!templates/unit.html'));

    function element() {
        this.setDirection = function(event) {
            var walkDirection = 'walk-';
            if ($(this).hasClass('top')) {
                walkDirection += 'up';
            }else if ($(this).hasClass('bottom')) {
                walkDirection += 'down';
            }else if ($(this).hasClass('left')) {
                walkDirection += 'left';
            }else if ($(this).hasClass('right')) {
                walkDirection += 'right';
            }

            component.setWalkDirection(walkDirection);
        };

        this.setWalkDirection = function(newDirection) {
            var sprite = component.$node.find('.sprite')
                , oldDirection = this.getWalkDirection(sprite[0]);

            sprite.removeClass(oldDirection);
            sprite.addClass(newDirection);
        };

        this.getWalkDirection = function(element) {
            var walkDirection = element.className.match(/walk-\S+/)[0];

            return walkDirection;
        };

        this.after('initialize', function() {
            component = this;
            this.$node
                .addClass(this.attr.elementClass)
                .append(unitTemplate());

            //Mouseover event for the direction elements
            this.$node.on('mouseover', '.direction', this.setDirection);
            this.$node.on('click', '.sprite', this.playSpriteAudio);
        });
    }

    return defineComponent(element);
});

/*

        this.playSpriteAudio = function(event) {
            console.log('Sounds');
        };

        this.moveLeft = function(element) {
            // console.log('Left');
        };

        this.moveUp = function(element) {
            // console.log('Up');
        };

        this.moveRight = function(element) {
            // console.log('Right');
        };

        this.moveDown = function(element) {
            // console.log('Down');
        };
*/