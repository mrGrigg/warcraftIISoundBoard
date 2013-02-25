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
            // component._walking = setInterval(component.animateSprite, 500);
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

        this.playSpriteAudio = function(event) {
            //Remove the event so only one sound can play at a time
            component.$node.off('click', '.sprite', component.playSpriteAudio);

            // console.log('Play count:', component._playCount);
            component._soundArray[component._playCount].play();

            //Incriment the sound count
            component._playCount = (component._playCount + 1) % component._soundArray.length;
        };

        this.bindClickToPlay = function() {
            component.$node.on('click', '.sprite', component.playSpriteAudio);
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
                    // , 'Hwrkdone.ogg'
                    // , 'Hhelp1.ogg'
                    // , 'Hhelp2.ogg'
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

        this.after('initialize', function() {
            component = this;
            component._playCount = 0;
            component._soundArray = [];
            component.createSoundArray();

            component.$node
                .addClass(component.attr.elementClass)
                .append(unitTemplate());

            //Mouseover event for the direction elements
            component.on('mouseenter', component.setUnitActive);
            component.on('mouseleave', component.setUnitInactive);
            component.$node.on('mouseover', '.direction', component.setDirection);
            
            component.bindClickToPlay();
        });
    }

    return defineComponent(element);
});

/*
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