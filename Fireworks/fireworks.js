window.onload = function () {

    const canvas = document.querySelector('canvas')
    const ctx = canvas.getContext('2d')
    //console.log(ctx)
    canvas.width = innerWidth
    canvas.height = innerHeight
    let particles = [];
    const numOfParticles = 100;
    let color = 1;
    const gravityEffect = 0.09;
    const frictionEffect = 1;
    const strengthArray = [3, 6, 8];
    const radiusArray = [2, 3, 4];

    alert("Click anywhere on your screen to activate the fireworks! \nHave fun!!!")

    //sound
    let boom1 = new Howl({
        src: ["Sounds/boom_3.mp3"],
        volume: 0.8,
    });
    let boom2 = new Howl({
        src: ["Sounds/boom_6.mp3"],
        volume: 1,
    });
    let boom3 = new Howl({
        src: ["Sounds/boom_9.mp3"],
        volume: 0.9,
    });
    let boom4 = new Howl({
        src: ["Sounds/boom_other.mp3"],
        volume: 0.8,
    });

    // create Firework Particles class
    class FireworkParticles {
        constructor(x, y, radius, motion) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.motion = motion;

            //transparency to help the fading effect
            this.transparencyFade = 3;
            this.color = 'hsl(' + color + ', 100%, 50%)';
        }

        drawFirework() {
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/save
            //save the current state and then restore after to set display back
            ctx.save();
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalAlpha
            //transparency purposes; setting the globalAlpha to be alpha of each particle 
            ctx.globalAlpha = this.transparencyFade;
            ctx.beginPath();
            ctx.ellipse(this.x, this.y, this.radius * 4, this.radius * 2.5, 2.5, 0.8, 0, 2);
            ctx.fillStyle = this.color;

            ctx.shadowColor = this.color;
            ctx.shadowBlur = 10;
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = 1;
            ctx.fill();
            //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/restore
            //restores back to save state
            ctx.restore();
        }

        particleEffects() {
            this.drawFirework();
            //friction effects x and y coordinates to slow down the motion
            this.motion.x = this.motion.x * frictionEffect;
            this.motion.y = this.motion.y * frictionEffect;
            //gravity effects y coordinate
            this.motion.y = this.motion.y + gravityEffect;

            //take current coordinate and add on motion
            this.x = this.x + this.motion.x;
            this.y = this.y + this.motion.y;
            //to make particles fade out over time
            this.transparencyFade = this.transparencyFade;
        }
    }

    // Animation Loop

    function animation() {
        //background
        ctx.fillStyle = 'rgba(0, 0, 0, 0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        // ctx.clearRect(0, 0, canvas.width, canvas.height);
        //change color
        color = color + 30;

        function fireworkBurnOut(particle, index) {
            if (particle.transparencyFade < 0) {
                //remove particle object once transparency reaches 0 from array
                //splice at the index position remove the 1 item
                //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
                particles.splice(index, 1);
            }
            else {
                //run particleEffects as long as transparency is greater than 0
                particle.particleEffects();
            }
        }

        particles.forEach(fireworkBurnOut);

        requestAnimationFrame(animation);
    }
    animation();
    // requestAnimationFrame(animation);

    //for resizing purposes
    window.addEventListener('resize', function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth
    });

    //each time there is a click create numOfParticles particles
    window.addEventListener('click', function (event) {
        //console.log(event)
        //random values for strength and radiusSize
        let strength = strengthArray[Math.floor(Math.random() * strengthArray.length)];
        let radiusSize = radiusArray[Math.floor(Math.random() * radiusArray.length)];
        // console.log("strength " + strength);
        // console.log("size of radius " + radiusSize);

        //sounds based upon strength and radiusSize
        if (strength === 3 && (radiusSize === 2 || radiusSize === 3)) {
            boom1.play();
        }
        if (strength === 6 && (radiusSize === 3 || radiusSize === 4)) {
            boom3.play();
        }
        if (strength === 8 && (radiusSize === 3 || radiusSize === 4)) {
            boom2.play();
        }
        else {
            boom4.play();
        }

        //x and y coordinates where click event occurred
        const mouseCoordinates = {
            x: canvas.innerWidth / 2,
            y: canvas.innerHeight / 2
        }
        //using clientX and clientY set the mouse coordinates to be equal to the click event coordinates 
        //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/clientX
        mouseCoordinates.x = event.clientX;
        mouseCoordinates.y = event.clientY;
        //console.log('x: ' + mouseCoordinates.x + ', ' + 'y: ' + mouseCoordinates.y)

        for (let i = 0; i < numOfParticles; i++) {
            //Note: cos - for x; sin - for y

            // figuring out the equations to use
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin
            //https://www.mathsisfun.com/sine-cosine-tangent.html
            // console.log(Math.cos(i) * Math.random() * strength)
            // console.log(Math.sin(i) * Math.random() * strength)
            particles.push(
                new FireworkParticles(
                    mouseCoordinates.x,
                    mouseCoordinates.y,
                    radiusSize,
                    {
                        //spread particles out random strengths
                        x: Math.cos(i) * Math.random() * strength,
                        y: Math.sin(i) * Math.random() * strength,
                    },
                ));
        }
    })
}

