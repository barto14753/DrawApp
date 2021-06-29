var canvas = document.getElementById("canvas");
var menu = document.getElementById("menu");
var ctx = canvas.getContext("2d");

let size = 10;


function draw(event)
{
    let x = (event.pageX);
    let y = (event.pageY);
    console.log(x,y);
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();
    ctx.stroke;

}

document.getElementById("canvas").addEventListener("click", function(event)
{
    draw(event);
});
document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;

        let bounds = menu.getBoundingClientRect();
        if (mousePosX > bounds.left &&
            mousePosX < bounds.right &&
            mousePosY < bounds.bottom &&
            mousePosY > bounds.top)
        {
            mouseCircle.style.visibility = 'hidden';
        }
        else
        {
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


