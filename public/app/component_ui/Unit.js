define(function(require) {
    var component
        , defineComponent = require('components/flight/lib/component');
        //, unitTemplate = Handlebars.compile(require('text!templates/unit.html'));

    function element() {
        this.after('initialize', function() {
            component = this;
            this.unitTemplate = Handlebars.compile('<div class="unit"> \
    <div class="top left direction"></div> \
    <div class="top center direction"></div> \
    <div class="top right direction"></div> \
    <div class="right center direction"></div>\
    <div class="bottom right direction"></div>\
    <div class="bottom center direction"></div>\
    <div class="bottom left direction"></div>\
    <div class="left center direction"></div>\
    <div class="sprite footman" id="sprite">\
        <div class="dot top-center"></div>\
        <div class="dot center-center"></div>\
        <div class="dot bottom-center"></div>\
    </div>\
</div>')
            //Render first
            this.render();

            //Create all the default values
            this._playCount = 0;
            this._soundArray = [];
            this.createSoundArray();
            this.createSpritePositionArray();

            //Set the default position as stand down
            this._step = false;
            this.setSpritePosition(this._position.stand.bottom.center);

            //Mouseover event for the direction elements
            this.on('mouseenter', this.setUnitActive);
            this.on('mouseleave', this.setUnitInactive);
            this.$node.on('mouseover', '.direction', this.getDirection);

            //Bind the click event to play the sound
            this.bindClickToPlay();
        });

        this.render = function() {
            this.$node
                .addClass(this.attr.elementClass)
                .append(this.unitTemplate());
        };

        this.getDirection = function(event) {
            //Get the classes from the element ['top', 'left', 'direction']
            var classNames = this.className.split(' ')
                , direction = classNames[0]
                , modifier = classNames[1]
                , flip = false
                , positions;

            if (modifier === 'left' || direction === 'left') {
                flip = true;
            }

            component._direction = direction;
            component._modifier = modifier;
            component._flip = flip;

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

        this.stopWalking = function() {
            if (typeof component._walking !== null) {
                clearInterval(component._walking);
            }
        };

        this.stand = function() {
            var direction = component._direction
                , modifier = component._modifier;

            component.setSpritePosition(component._position.stand[direction][modifier]);
        };

        //Set the direction the unit is facing
        this.setSpritePosition = function(direction) {
            var sprite = component.$node.find('.sprite')
                , flip = component._flip;

            //Always clear flip at the beginning
            sprite.removeClass('flip');

            if (flip) {
                sprite.addClass('flip');
            }

            sprite.css('background-position', direction);
        };

        this.setUnitInactive = function() {
            component._active = false;

            component.stopWalking();

            component.stand();
        };

        this.createSpritePositionArray = function() {
            component._position = {
                step: {
                    top: {
                        left: [ //flip-x
                            '-86px -68px'
                            , '-86px -124px'
                            , '-86px -172px'
                            , '-86px -220px'
                        ]
                        , right: [
                            '-86px -68px'
                            , '-86px -124px'
                            , '-86px -172px'
                            , '-86px -220px'
                        ]
                        , center: [
                            '-13px -72px'
                            , '-13px -128px'
                            , '-13px -178px'
                            , '-13px -226px'
                        ]
                    }
                    , right: {
                        center: [
                            '-162px -68px'
                            , '-162px -124px'
                            , '-162px -172px'
                            , '-162px -220px'
                        ]
                    }
                    , bottom: {
                        left: [ //flip-x
                            '-236px -68px'
                            , '-236px -124px'
                            , '-236px -170px'
                            , '-236px -220px'
                        ]
                        , right: [
                            '-236px -68px'
                            , '-236px -124px'
                            , '-236px -170px'
                            , '-236px -220px'
                        ]
                        , center: [
                            '-309px -72px'
                            , '-309px -128px'
                            , '-309px -178px'
                            , '-309px -226px'
                        ]
                    }
                    , left: {
                        center: [ //flip-x
                            '-162px -68px'
                            , '-162px -124px'
                            , '-162px -172px'
                            , '-162px -220px'
                        ]
                    }
                }
                , stand: {
                    top: {
                        left: '-86px -6px' //flip-x
                        , right: '-86px -6px'
                        , center: '-13px -9px'
                    }
                    , right: {
                        center: '-162px -6px'
                    }
                    , bottom: {
                        left: '-236px -8px' //flip-x
                        , right: '-236px -8px'
                        , center: '-309px -10px'
                    }
                    , left: {
                        center: '-162px -6px' //flip-x
                    }
                }
            };
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

        this.playSpriteAudio = function(event, data) {
            //Remove the event so only one sound can play at a time
            component.$node.off('click', '.sprite', component.playSpriteAudio);

            // console.log('Play count:', component._playCount);
            component._soundArray[component._playCount].play();

            //Incriment the sound count
            component._playCount = (component._playCount + 1) % component._soundArray.length;
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
    }

    return defineComponent(element);
});
