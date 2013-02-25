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
            component._walking = setInterval(component.animateSprite, 500);
        };

        this.setWalkDirection = function(newDirection) {
            var sprite = component.$node.find('.sprite')
                , oldDirection = this.getWalkDirection(sprite[0]);

            sprite.removeClass(oldDirection);
            sprite.addClass(newDirection + '-1');
        };

        this.getWalkDirection = function(element) {
            var walkDirection = element.className.match(/walk-\S+/)[0];

            return walkDirection;
        };

        this.animateSprite = function() {
            var sprite = component.$node.find('.sprite')
                , oldWalkDirection = component.getWalkDirection(sprite[0]);

            var oldSpriteFrame = parseInt(oldWalkDirection.match(/\d/)[0], 10)
                , newSpriteFrame = oldSpriteFrame + 1
                , newWalkdirection;

            if (newSpriteFrame > 3) {
                newSpriteFrame = 1;
            }

            newWalkdirection = oldWalkDirection.replace(/\d/, newSpriteFrame);

            sprite.removeClass(oldWalkDirection);
            sprite.addClass(newWalkdirection);
            console.log('walking from:', oldSpriteFrame, 'to: ', newSpriteFrame);
        };

        this.setUnitActive = function() {
            component._active = true;
        };

        this.setUnitInactive = function() {
            component._active = false;
            clearInterval(component._walking);
        };

        this.after('initialize', function() {
            component = this;
            this.$node
                .addClass(this.attr.elementClass)
                .append(unitTemplate());

            //Mouseover event for the direction elements
            this.on('mouseenter', this.setUnitActive);
            this.on('mouseleave', this.setUnitInactive);
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