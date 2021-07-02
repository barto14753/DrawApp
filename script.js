$('#color-picker').spectrum({
    type: "color"
});


//$("#picker").spectrum("get");

var canvas = document.getElementById("canvas");
var palette = document.getElementById("palette");
var ctx = canvas.getContext("2d");

let mousePressed = false;
let drawDelay = 300;
let size = 5.0;

function getPos(event) {
    let rect = canvas.getBoundingClientRect(),
        scaleX = canvas.width / rect.width,
        scaleY = canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    }
}

function draw(event) {
    if (mousePressed) {
        let pos = getPos(event);
        console.log(pos.x, pos.y);
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size, 0, 2 * Math.PI);
        ctx.fill();
        ctx.closePath();
        ctx.stroke;
        //setTimeout(draw, drawDelay);
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


    let delay = 2,
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