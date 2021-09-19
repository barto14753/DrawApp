let canvas = document.getElementById("canvas");
let palette = document.getElementById("palette");
let context = canvas.getContext("2d");
let earserBtn = document.getElementById("earserBtn");
let clearBtn = document.getElementById("clearBtn");
let pencilBtn = document.getElementById("pencilBtn");
let mouseCircle = document.getElementById('mouse-circle');
let radius = 10;
let start = 0;
let end = Math.PI * 2;
let dragging = false;
let slider = document.getElementById("myRange");
let sizeVal = document.getElementById("sizeValue")
sizeVal.innerHTML = "Size: " + slider.value; // Display the default slider value

$('#color-picker').spectrum({
    type: "color"
});


let SETTINGS = 
{
    "mode": "PENCIL"
}

function initTools()
{
    //let tools = document.querySelectorAll('[id=tool]');
    let tools = document.getElementsByClassName("tool");
    console.log("Tools: " + tools);

    for (let i = 0; i < tools.length; i++) {
        tools[i].addEventListener("click", function() {
            let current = document.getElementsByClassName("active");

            // If there's no active class
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }

            // Add the active class to the current/clicked button
            this.className += " active";
        });
    }

}






document.addEventListener('DOMContentLoaded', () => {
    let mousePosX = 0,
        mousePosY = 0,
        mouseCircle = document.getElementById('mouse-circle');

    document.onmousemove = (e) => {
        mousePosX = e.pageX;
        mousePosY = e.pageY;

        if (palette)
        {
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



function updateMouseCircle()
{
    mouseCircle.style.width = 2*radius + "px";
    mouseCircle.style.height = 2*radius + "px";
    mouseCircle.style.margin = (-1)*radius + "px 0px 0px " + (-1)*radius + "px";
}

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  sizeVal.innerHTML = "Size: " + this.value;

  radius = this.value;
  updateMouseCircle();
  
}



canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

context.lineWidth = radius * 2;


function getCurrentColor()
{
    return $("#color-picker").spectrum("get").toHexString();
}

let putPoint = function(e){
   
	if(dragging){

        if(SETTINGS.mode == "PENCIL")
        {
            context.fillStyle = getCurrentColor();
            context.strokeStyle = getCurrentColor();

        }
        else if(SETTINGS.mode == "EARSER")
        {
            context.fillStyle = "white";
            context.strokeStyle = "white";

        }
        context.lineWidth = 2*radius;
        context.lineTo(e.offsetX, e.offsetY);
        context.stroke();
        context.beginPath();
        context.arc(e.offsetX, e.offsetY, radius, start, end);
        context.fill();
        context.beginPath();
        context.moveTo(e.offsetX, e.offsetY);
	}

}

let engage = function(e){
	dragging = true;
	putPoint(e);
}

let disengage = function(){
	dragging = false;
	context.beginPath();
}

function clearCanvas()
{
    context.clearRect(0, 0, canvas.width, canvas.height);

}

function setEarser()
{
    SETTINGS.mode = "EARSER";
}

function setPencil()
{
    SETTINGS.mode = "PENCIL";
}


function init()
{
    initTools();
    $("#color-picker").spectrum("set", "black");

    canvas.addEventListener('mousedown', engage);
    canvas.addEventListener('mousemove', putPoint);
    canvas.addEventListener('mouseup', disengage);

    clearBtn.addEventListener('mousedown', clearCanvas);
    earserBtn.addEventListener('mousedown', setEarser);
    pencilBtn.addEventListener('mousedown', setPencil);
    

    // earserBtn.onclick = setEarser;
    // pencilBtn.onclick = setPencil;
    
    radius = slider.value;
    updateMouseCircle();
}

init();
