var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

let size = 10;

ctx.arc(100, 100, 10, 0, 2 * Math.PI);
ctx.fill();


function draw(event)
{
    let x = (event.pageX - canvas.getBoundingClientRect().left) * canvas.offsetWidth;
    let y = (event.pageY - canvas.getBoundingClientRect().top) * canvas.offsetHeight;
    console.log(x,y);
    ctx.rect(x, y, size, 0, 2 * Math.PI);
    ctx.stroke();

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

        let bounds = canvas.getBoundingClientRect();
        if (mousePosX < bounds.left || 
            mousePosX > bounds.right || 
            mousePosY > bounds.bottom || 
            mousePosY < bounds.top)
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


