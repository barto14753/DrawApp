$('#color-picker').spectrum({
    type: "color"
});


//$("#picker").spectrum("get");

let tools = document.querySelectorAll('[id=tool]');
console.log("Tools: " + tools);

for (let i = 0; i < tools.length; i++) {
    tools[i].addEventListener("click", function() {
        console.log("Clicked");
        let current = document.getElementsByClassName("active");

        // If there's no active class
        if (current.length > 0) {
            current[0].className = current[0].className.replace(" active", "");
        }

        // Add the active class to the current/clicked button
        this.className += " active";
    });
}

var canvas = document.getElementById("canvas");
var palette = document.getElementById("palette");
var ctx = canvas.getContext("2d");

let mousePressed = false;
let drawDelay = 300;
let size = 3.0;
let mode = "PENCIL" // "MARKER" "ERASER"
let flag = false,
prevX = 0,
currX = 0,
prevY = 0,
currY = 0,
dot_flag = false;

var x = "black",
        y = 2;

function init()
{
    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
    w = canvas.width;
    h = canvas.height;
}

init();

function draw() {
    ctx.beginPath();
    ctx.moveTo(prevX, prevY);
    ctx.lineTo(currX, currY);
    ctx.strokeStyle = x;
    ctx.lineWidth = y;
    ctx.stroke();
    ctx.closePath();
}

function findxy(res, e) {
    if (res == 'down') {
        prevX = currX;
        prevY = currY;
        currX = e.clientX - canvas.offsetLeft;
        currY = e.clientY - canvas.offsetTop;

        flag = true;
        dot_flag = true;
        if (dot_flag) {
            ctx.beginPath();
            ctx.fillStyle = x;
            ctx.fillRect(currX, currY, 2, 2);
            ctx.closePath();
            dot_flag = false;
        }
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX - canvas.offsetLeft;
            currY = e.clientY - canvas.offsetTop;
            draw();
        }
    }
}

function getPos(event) {
    let rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    }
}


document.getElementById("canvas").addEventListener("mousedown", function(event) {
    console.log("Down");
    mousePressed = true;
    draw(event);
});

document.getElementById("canvas").addEventListener("mouseup", function(event) {
    console.log("Up");
    mousePressed = false;
});


document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;

        let bounds = palette.getBoundingClientRect();
        if (mousePosX > bounds.left &&
            mousePosX < bounds.right &&
            mousePosY < bounds.bottom &&
            mousePosY > bounds.top) {
            mouseCircle.style.visibility = 'hidden';
        } else {
            mouseCircle.style.visibility = 'visible';
        }
    }


    let delay = 1,
        revisedMousePosX = 0,
        revisedMousePosY = 0;

    function delayMouseFollow() {
        requestAnimationFrame(delayMouseFollow);

        revisedMousePosX += (mousePosX - revisedMousePosX) / delay;
        revisedMousePosY += (mousePosY - revisedMousePosY) / delay;

        mouseCircle.style.top = revisedMousePosY + 'px';
        mouseCircle.style.left = revisedMousePosX + 'px';
    }
    delayMouseFollow();
});


var slider = document.getElementById("myRange");
var sizeVal = document.getElementById("sizeValue")
sizeVal.innerHTML = "Size: " + slider.value; // Display the default slider value

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  sizeVal.innerHTML = "Size: " + this.value;
}