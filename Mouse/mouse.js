window.onload = function () {

    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let coordinatesArray = [];
    let tailLength = 25;
    let color = 0;
    let randomRadius = 0;

    //create mouse object - undefine to have blank canvas and to let the eventlistener start fresh
    var mouseCoordinates = {
        x: undefined,
        y: undefined,
    }

    //set a sound
    let mouse = new Howl({
        src: ["MouseSounds/mouse.mp3"],
        volume: 0.3,
    });

    //Animate circles
    function createAnimatedCircles() {
        ctx.clearRect(0, 0, innerWidth, innerHeight);
        // store previous x and y coordinates
        coordinatesArray.push({
            x: mouseCoordinates.x,
            y: mouseCoordinates.y,
        });

        if (coordinatesArray.length > tailLength) {
            //remove first circle from the array
            //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift 
            coordinatesArray.shift();
        }

        // make more random sized circles
        for (let i = 0; i < coordinatesArray.length; i++) {
            //random number for radius
            randomRadius = Math.floor(Math.random() * 25) + 5;
            ctx.beginPath();
            //console.log("radius: " + randomRadius)
            ctx.arc(coordinatesArray[i].x, coordinatesArray[i].y, randomRadius, 0, Math.PI * 2);
            ctx.globalAlpha = 0.3;
            ctx.fillStyle = 'hsl(' + color + ', 100%, 50%)';
            ctx.strokeStyle = 'hsl(' + color + ', 100%, 50%)';
            ctx.lineWidth = 5;
            color = color + 0.009;
            ctx.fill();
            ctx.stroke();
        }
        requestAnimationFrame(createAnimatedCircles);
    }
    createAnimatedCircles();

    //for resizing purposes
    canvas.addEventListener('resize', function () {
        canvas.height = window.innerHeight;
        canvas.width = window.innerWidth
    });

    //mouse movement
    canvas.addEventListener('mousemove', function (event) {
        mouseCoordinates.x = event.x;
        mouseCoordinates.y = event.y;
        mouse.play();
    });
}