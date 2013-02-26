define(function(require) {
    var component
        , defineComponent = require('components/flight/lib/component')
        , unitTemplate = Handlebars.compile(require('text!templates/unit.html'));

    function element() {
        //Set the direction the unit is facing
        this.setSpritePosition = function(direction, flip) {
            var sprite = component.$node.find('.sprite');

            //Always clear flip at the beginning
            sprite.removeClass('flip');

            if (flip) {
                sprite.addClass('flip');
            }

            sprite.css('background-position', direction);
        };

        this.getDirection = function(event) {
            //Get the classes from the element ['top', 'left', 'direction']
            var classNames = this.className.split(' ')
                , direction = classNames[0]
                , modifier = classNames[1]
                , positions;

            component._direction = direction;
            component._modifier = modifier;

            //Get the position based on the direction and modifier
            positions = component._position.step[direction][modifier];

            //Positions is an array of background positions
            component._positions = component._position.step[direction][modifier];
            component._frame = 0;
            
            //Clear the walking animation if it exists
            component.stopWalking();

            //Get a move on
            component._walking = setInterval(component.animateSprite, 150);
        };

        this.animateSprite = function() {
            var positions = component._positions
                , frame = component._frame;

            component.setSpritePosition(positions[frame]);

            component._frame = (component._frame + 1) % component._positions.length;
        };

        this.setUnitActive = function() {
            component._active = true;
        };

        this.setUnitInactive = function() {
            component._active = false;

            component.stopWalking();

            component.stand();
        };

        this.stopWalking = function() {
            if (typeof component._walking !== null) {
                clearInterval(component._walking);
            }
        };

        this.stand = function() {
            var direction = component._direction
                , modifier = component._modifier
                , flip = false;

            //These positions are just the reflection of the right facing sprite
            if (modifier === 'left' || direction === 'left') {
                flip = true;
            }

            component.setSpritePosition(component._position.stand[direction][modifier], flip);
        };

        this.createSpritePositionArray = function() {
            component._position = {
                step: {
                    top: {
                        left: ''
                        , right: ''
                        , center: ''
                    }
                    , right: {
                        center: ''
                    }
                    , bottom: {
                        left: ''
                        , right: ''
                        , center: [
                            '-315px -72px'
                            , '-315px -128px'
                            , '-315px -178px'
                            , '-315px -226px'
                        ]
                    }
                    , left: {
                        center: ''
                    }
                }
                , stand: {
                    top: {
                        left: '-99px -12px' //flip-x
                        , right: '-99px -12px'
                        , center: '-22px -10px'
                    }
                    , right: {
                        center: '-176px -12px'
                    }
                    , bottom: {
                        left: '-244px -12px' //flip-x
                        , right: '-244px -12px'
                        , center: '-315px -12px'
                    }
                    , left: {
                        center: '-176px -12px' //flip-x
                    }
                }
            };

            //Set the default position as stand down
            component._step = false;

            component.setSpritePosition(component._position.stand.bottom.center);
        };

        this.playSpriteAudio = function(event) {
            //Remove the event so only one sound can play at a time
            component.$node.off('click', '.sprite', component.playSpriteAudio);

            // console.log('Play count:', component._playCount);
            component._soundArray[component._playCount].play();

            //Incriment the sound count
            component._playCount = (component._playCount + 1) % component._soundArray.length;
        };

        //Create the sounds array for this unit
        this.createSoundArray = function() {
            var newSound = {}
                , sounds = [
                    'Hready.ogg'
                    , 'Hwhat1.ogg'
                    , 'Hwhat2.ogg'
                    , 'Hwhat3.ogg'
                    , 'Hwhat4.ogg'
                    , 'Hwhat5.ogg'
                    , 'Hwhat6.ogg'
                    , 'Hyessir1.ogg'
                    , 'Hyessir2.ogg'
                    , 'Hyessir3.ogg'
                    , 'Hyessir4.ogg'
                    , 'Hpissed1.ogg'
                    , 'Hpissed2.ogg'
                    , 'Hpissed3.ogg'
                    , 'Hpissed4.ogg'
                    , 'Hpissed5.ogg'
                    , 'Hpissed6.ogg'
                    , 'Hpissed7.ogg'
                ];

            for (i = 0; i < sounds.length; i++) {
                newSound = component.newSound(sounds[i]);
                component._soundArray.push(newSound);
            }
        };

        this.newSound = function(fileName) {
            var soundUrl = '/sounds/human/' + fileName
                , newSound = {
                    volume: 0.5
                    , onend: component.bindClickToPlay
                    , urls: [soundUrl]
                };

            return new Howl(newSound);
        };

        this.bindClickToPlay = function() {
            component.$node.on('click', '.sprite', component.playSpriteAudio);
        };

        this.render = function() {
            component.$node
                .addClass(component.attr.elementClass)
                .append(unitTemplate());
        };

        this.after('initialize', function() {
            component = this;

            //Render first
            component.render();
            
            //Create all the default values
            component._playCount = 0;
            component._soundArray = [];
            component.createSoundArray();
            component.createSpritePositionArray();

            //Mouseover event for the direction elements
            component.on('mouseenter', component.setUnitActive);
            component.on('mouseleave', component.setUnitInactive);
            component.$node.on('mouseover', '.direction', component.getDirection);
            
            //Bind the click event to play the sound
            component.bindClickToPlay();
        });
    }

    return defineComponent(element);
});

/*
        this.setSpritePosition = function(event) {
            var walkDirection = 'step-';
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
            if (typeof component._walking !== null) {
                clearInterval(component._walking);
            }
            component._walking = setInterval(component.animateSprite, 150);
        };
*/

/*

        this.setWalkDirection = function(newDirection) {
            var sprite = component.$node.find('.sprite')
                , oldDirection = this.getWalkDirection(sprite[0]);

            sprite.removeClass(oldDirection);
            sprite.addClass(newDirection + '-1');
        };

        this.getWalkDirection = function(element) {
            var walkDirection = element.className.match(/step-\S+/)[0];

            return walkDirection;
        };

        this.animateSprite = function() {
            component._step = true;

            var sprite = component.$node.find('.sprite')
                , oldWalkDirection = component.getWalkDirection(sprite[0])
                , oldSpriteFrame = parseInt(oldWalkDirection.match(/\d/)[0], 10)
                , newSpriteFrame = oldSpriteFrame + 1
                , newWalkdirection;

            if (newSpriteFrame > 4) {
                newSpriteFrame = 1;
            }

            newWalkdirection = oldWalkDirection.replace(/\d/, newSpriteFrame);

            sprite.removeClass(oldWalkDirection);
            sprite.addClass(newWalkdirection);
        };
*/