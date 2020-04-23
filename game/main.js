$(window).ready(function(){
    // onload
    start();
    update();
});

class Screen{
    init(cnv){
        this.canvas = cnv;
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    get FPS(){
        return 60;
    }

    w(){
        return this.canvas.width;
    }

    h(){
        return this.canvas.height;
    }
}

var s = new Screen();

var keys = [];
var mouse = [];

var whiteField = new Image;
whiteField.src="img/whiteField.png";
var blackField = new Image;
blackField.src="img/blackField.png";
var specialField = new Image;
specialField.src="img/specialField.png";
var cursor = new Image;
cursor.src="img/cursor.png"

function start(){
    s.init(document.getElementById("game"));

    if (document.attachEvent) document.attachEvent('mousemove', cursorPos);
    else document.addEventListener('mousemove', cursorPos);

    if (document.attachEvent) document.attachEvent('onclick', click);
    else document.addEventListener('click', click);

    whiteField.onload = function(){
    }
    blackField.onload = function(){
    }
    specialField.onload = function(){
    }
    cursor.onload = function(){
    }
}

var mouseX=9999999;
var mouseY=9999999;
function cursorPos(e) {
    e = e || window.event;

    mouseX = e.pageX;
    mouseY = e.pageY;
}

function update(){
    setTimeout(function(){
         update();  
    }, 1000 / s.FPS);
    s.ctx.clearRect(0, 0, s.w(), s.h());
    
    renderMap(9);
    s.ctx.drawImage(cursor, mouseX, mouseY, 50, 50);
    console.log(mouseX, mouseY);
    
}

function renderMap(size){
    var fieldSize;
    if(s.w()>s.h()){
        fieldSize = s.h()/size;
    }else{

        fieldSize = s.w()/size;
    }

    var center = {
        x: (s.w()-fieldSize)/2,
        y: (s.h()-fieldSize)/2
    };

    var startCord = {
        x: center.x-(Math.trunc(size/2)*fieldSize),
        y: center.y-(Math.trunc(size/2)*fieldSize)
    };

    for(i=0; i<size; i++){
        for(j=0; j<size; j++){
            if(i==0&&j==0)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(i==size-1&&j==size-1)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(i==0&&j==size-1)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(i==size-1&&j==0)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(i==parseInt(size/2)&&j==parseInt(size/2))s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(i%2==0){
                if(j%2==0)
                    s.ctx.drawImage(blackField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
                if(j%2==1)
                    s.ctx.drawImage(whiteField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            }else{
                if(j%2==1)
                    s.ctx.drawImage(blackField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
                if(j%2==0)
                    s.ctx.drawImage(whiteField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            }
        }
    }   
}

window.onresize = function(){
    /* tu może będzie kod */
}