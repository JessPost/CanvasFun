window.onload = function () {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particleArray = [];
    let particleQuantity = 100;
    let color = 0;

    //set a sound
    let orb = new Howl({
        src: ['OrbSounds/orbs2.mp3'],
        volume: 9,
    });
    Howler.stop();
    Howler.unload();
    orb.play();

    function createOrbs() {
        //random x ,y, size
        this.x = Math.floor(Math.random() * canvas.width);
        this.y = Math.floor(Math.random() * canvas.height);
        this.size = Math.random() * 5 + 2;
        this.color = color += 5;
        //https://www.w3schools.com/colors/colors_hsl.asp
        this.colorValue = 'hsl(' + color + ', 100%, 50%)';
        //think of 4 quadrants on a graph
        //https://www.i-pathways.org/public/sampleLesson/math/p2.jsp#:~:text=Quadrant%20III%3A%20Both%20x%20and%20y%2Dcoordinate%20are%20negative.
        this.directionX = Math.floor(Math.random() * 5) - 1.5;//to make them move neg and pos on x axis moving; -1.5 to +1.5, left and right
        this.directionY = Math.floor(Math.random() * 5) - 1.5;//to make them move neg and pos on xy axis moving; -1.5 to +1.5, down and up
    }

    function drawOrbs() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        color = color + 5;

        for (var i = 0; i < particleQuantity; i++) {
            //store array at i 
            let temporaryI = particleArray[i];
            // console.log(temporaryI)

            for (var j = 0; j < particleQuantity; j++) {
                //store j
                var temporaryJ = particleArray[j];
                // console.log(temporaryJ)

                if (distanceBetween(temporaryI, temporaryJ) < 150) {
                    //connecting line
                    ctx.beginPath();
                    ctx.moveTo(temporaryI.x, temporaryI.y);
                    ctx.lineTo(temporaryJ.x, temporaryJ.y);
                    // ctx.strokeStyle = 'hsl(' + color + ', 100%, 50%)';
                    ctx.strokeStyle = temporaryI.colorValue;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                    ctx.closePath();
                }
            }


            ctx.shadowBlur = 5;
            ctx.shadowColor = '#A9A9A9';
            ctx.shadowOffsetX = 1;
            ctx.shadowOffsetY = -1;

            //center circle
            ctx.beginPath();
            ctx.arc(temporaryI.x, temporaryI.y, temporaryI.size * 1.75, Math.PI * 2, 0);
            ctx.fillStyle = 'hsl(' + color + ', 100%, 50%)';
            ctx.fill();
            ctx.closePath();

            //first ring circle
            ctx.beginPath();
            ctx.arc(temporaryI.x, temporaryI.y, temporaryI.size * 2.75, Math.PI * 2, 0);
            ctx.strokeStyle = temporaryI.colorValue;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            //second ring circle
            ctx.beginPath();
            ctx.arc(temporaryI.x, temporaryI.y, temporaryI.size * 4, Math.PI * 2, 0);
            ctx.strokeStyle = 'hsl(' + color + ', 100%, 50%)';
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            //third ring circle
            ctx.beginPath();
            ctx.arc(temporaryI.x, temporaryI.y, temporaryI.size * 5.25, Math.PI * 2, 0);
            ctx.strokeStyle = temporaryI.colorValue;
            ctx.lineWidth = 2;
            ctx.stroke();
            ctx.closePath();

            //check screen boundaries
            if (temporaryI.x + temporaryI.size >= canvas.width || temporaryI.x - temporaryI.size <= 0) {
                temporaryI.directionX = -temporaryI.directionX;
            }
            if (temporaryI.y + temporaryI.size >= canvas.height || temporaryI.y - temporaryI.size <= 0) {
                temporaryI.directionY = -temporaryI.directionY;
                //console.log("x: " + temporaryI.directionX + ", y: " + temporaryI.directionY)
            }

            //speed of movement
            temporaryI.x = temporaryI.x + temporaryI.directionX / 1.5;
            temporaryI.y = temporaryI.y + temporaryI.directionY / 1.5;
            // console.log("x: " + temporaryI.x + ", y: " + temporaryI.y)
        }
    }

    //find the distance between 2 circles
    function distanceBetween(pointA, pointB) {
        //calculate center points of particles find hypotenuse
        //https://en.wikipedia.org/wiki/Pythagorean_theorem
        //https://www.w3resource.com/javascript-exercises/javascript-math-exercise-35.php
        const distanceX = pointA.x - pointB.x; //distance on x axis
        const distanceY = pointA.y - pointB.y; //distance on y axis
        const distanceBtwn = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2)); //hypotenuse
        //console.log(distanceBtwn)
        return distanceBtwn;
    }

    //create the orbs in the array
    function startingOrbs() {
        for (let i = 0; i < particleQuantity; i++) {
            particleArray.push(new createOrbs);
        }
    }
    startingOrbs();

    //animation
    function animation() {
        drawOrbs();
        requestAnimationFrame(animation);
    }
    animation();

    //for resizing purposes
    canvas.addEventListener('resize', function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth;
    });
}

