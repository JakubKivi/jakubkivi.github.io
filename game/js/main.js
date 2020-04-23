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

var whiteField = new Image;
whiteField.src="img/whiteField.png";
var blackField = new Image;
blackField.src="img/blackField.png";
var specialField = new Image;
specialField.src="img/specialField.png";
var cursor = new Image;
cursor.src="img/cursor.png"
var whiteFieldHovered = new Image;
whiteFieldHovered.src="img/whiteFieldHovered.png";
var blackFieldHovered = new Image;
blackFieldHovered.src="img/blackFieldHovered.png";
var specialFieldHovered = new Image;
specialFieldHovered.src="img/specialFieldHovered.png";

var hovered = {
    x: -1,
    y: -1
};

var size=11;

var mouseX=9999999;
var mouseY=9999999;
var MouseCord;

function cursorPos(e) {
    e = e || window.event;

    mouseX = e.pageX;
    mouseY = e.pageY;

    if(mouseX>startCord.x && mouseY>startCord.y && mouseX<(startCord.x+(size*fieldSize)) && mouseY<(startCord.y+(size*fieldSize))){
        var found=false; 
        
        for(i=0; i<=size; i++){
            for(j=0; j<=size; j++){
                if(mouseX<(startCord.x+(i*fieldSize)) && mouseY<(startCord.y+(j*fieldSize)) && !found){
                    mouseCord = {
                        x: i,
                        y: j
                    }       
                    found=true;
                }
            }
        }
    }
}
var fieldSize;
var center;
var startCord;

function renderMap(size){
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
function click(e){
    
}

function drawHovered(){
    if(mouseX>startCord.x && mouseY>startCord.y && mouseX<(startCord.x+(size*fieldSize)) && mouseY<(startCord.y+(size*fieldSize))){
        if(mouseCord.x==1&&mouseCord.y==1)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(mouseCord.x==size&&mouseCord.y==size)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(mouseCord.x==1&&mouseCord.y==size)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(mouseCord.x==size&&mouseCord.y==1)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(mouseCord.x==parseInt(size/2)+1&&mouseCord.y==parseInt(size/2)+1)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(mouseCord.x%2==0){
            if(mouseCord.y%2==0)
                s.ctx.drawImage(blackFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
            else
                s.ctx.drawImage(whiteFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        }else{
            if(mouseCord.y%2==0)
                s.ctx.drawImage(whiteFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
            else 
                s.ctx.drawImage(blackFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        }
    }
}

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

    if(s.w()>s.h()){
        fieldSize = s.h()/size;
    }else{

        fieldSize = s.w()/size;
    }
    center = {
        x: (s.w()-fieldSize)/2,
        y: (s.h()-fieldSize)/2
    };
    startCord = {
        x: center.x-(Math.trunc(size/2)*fieldSize),
        y: center.y-(Math.trunc(size/2)*fieldSize)
    };
}

function update(){
    setTimeout(function(){
         update();  
    }, 1000 / s.FPS);
    s.ctx.clearRect(0, 0, s.w(), s.h());
    
    renderMap(size);
    if(typeof mouseCord!= 'undefined')drawHovered();

    s.ctx.drawImage(cursor, mouseX, mouseY, fieldSize*0.75, fieldSize*0.75);
}

window.onresize = function(){
    /* tu może będzie kod */
}