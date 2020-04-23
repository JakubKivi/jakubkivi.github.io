$(window).ready(function(){
    // onload
    start();
    update();
});

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while(i--) arr[length-1 - i] = createArray.apply(this, args);
    }

    return arr;
}

class Screen{
    init(cnv){
        this.canvas = cnv;
        this.ctx = this.canvas.getContext("2d");
        
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    get FPS(){
        return 20;
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
var blackPawn = new Image;
blackPawn.src="img/blackPawn.png";
var whitePawn = new Image;
whitePawn.src="img/whitePawn.png";
var king = new Image;
king.src="img/king.png";

var hovered = {
    x: -1,
    y: -1
};
var clicked = {
    x:0,
    y:0
};

var gameName='Brandubh'; // Brandubh, Tablut
var size=0; //by default
var winCondition='corner'; //edge, corner
var killingKing='enable';
var moveThroughtThrone='enable';
var weaponlessKing='disable';
var ableToBackToThrone='enable';


var margin =100;

var mouseX=9999999;
var mouseY=9999999;
var MouseCord;

var fieldSize;
var center;
var startCord;
var isMobile;

var field= createArray(100, 100);  //1 - black, 2 - white, 3 - king, 4 - obstacle

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

function renderMap(size){
    for(i=0; i<size; i++){
        for(j=0; j<size; j++){
            if(winCondition=='corner' && i==0&&j==0)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(winCondition=='corner' && i==size-1&&j==size-1)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(winCondition=='corner' && i==0&&j==size-1)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
            else if(winCondition=='corner' && i==size-1&&j==0)s.ctx.drawImage(specialField, startCord.x+(i*fieldSize), startCord.y+(j*fieldSize), fieldSize, fieldSize);
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

function clearFigures(){
    for(i=1; i<100; i++){
        for(j=1; j<100; j++){
            field[i][j]=0;
        }
    }
};

function putFiguresonMap(){
    function mirroring(){
        for(i=1; i<=parseInt(size/2)+1; i++){
            for(j=1; j<=parseInt(size/2)+1; j++){
                if(field[i][j]==1){
                    field[size-i+1][size-j+1]=1;
                    field[i][size-j+1]=1;
                    field[size-i+1][j]=1;
                }
                if(field[i][j]==2){
                    field[size-i+1][size-j+1]=2;
                    field[i][size-j+1]=2;
                    field[size-i+1][j]=2;
                }
            }
        }
    }
   if(gameName=='Brandubh'){
        for(i=1; i<=parseInt(size/2)+1; i++){
            for(j=1; j<=parseInt(size/2)+1; j++){
                if(j==4){
                    if(i<3||i>5)field[i][j]=1;
                    else field[i][j]=2;
                }
                if(i==4){
                    if(j<3||j>5)field[i][j]=1;
                    else field[i][j]=2;
                }
            }
        }
   }
   if(gameName=='Tablut'){
        for(i=1; i<=parseInt(size/2)+1; i++){
            for(j=1; j<=parseInt(size/2)+1; j++){
                if(j==5){
                    if(i<3||i>5)field[i][j]=1;
                    else field[i][j]=2;
                }
                if(i==5){
                    if(j<3||j>5)field[i][j]=1;
                    else field[i][j]=2;
                }
                if((i==4 && j==1) || (j==4 && i==1))field[i][j]=1;
            }
        }
   }
   mirroring();
   field[parseInt(size/2)+1][parseInt(size/2)+1]=3;
   if(winCondition=='corner')field[1][1]=4;
   if(winCondition=='corner')field[1][size]=4;
   if(winCondition=='corner')field[size][1]=4;
   if(winCondition=='corner')field[size][size]=4;
}

function renderFig(){
    for(i=1; i<=size; i++){
        for(j=1; j<=size; j++){
            if(field[i][j]==1)s.ctx.drawImage(blackPawn, startCord.x+((i-1)*fieldSize), startCord.y+((j-1)*fieldSize), fieldSize, fieldSize);
            if(field[i][j]==2)s.ctx.drawImage(whitePawn, startCord.x+((i-1)*fieldSize), startCord.y+((j-1)*fieldSize), fieldSize, fieldSize);
            if(field[i][j]==3)s.ctx.drawImage(king, startCord.x+((i-1)*fieldSize), startCord.y+((j-1)*fieldSize), fieldSize, fieldSize);
        }
    }
}

function drawHovered(){
    if(mouseX>startCord.x && mouseY>startCord.y && mouseX<(startCord.x+(size*fieldSize)) && mouseY<(startCord.y+(size*fieldSize))){
        if(winCondition=='corner' && mouseCord.x==1&&mouseCord.y==1)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(winCondition=='corner' && mouseCord.x==size&&mouseCord.y==size)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(winCondition=='corner' && mouseCord.x==1&&mouseCord.y==size)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
        else if(winCondition=='corner' && mouseCord.x==size&&mouseCord.y==1)s.ctx.drawImage(specialFieldHovered, startCord.x+((mouseCord.x-1)*fieldSize), startCord.y+((mouseCord.y-1)*fieldSize), fieldSize, fieldSize);
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

function move(){
    var buf=field[clicked.x][clicked.y];
    field[clicked.x][clicked.y]=0;
    field[mouseCord.x][mouseCord.y]=buf;
    clicked.x=0;
    clicked.y=0;
}

function canMove(x,y,tx,ty){
    if(x!=tx&&y!=ty)return false;
    if(x==tx){
        if(ty>y){
            for(i=y+1; i<=ty; i++){
                if(field[x][i]==1 || field[x][i]==2 || field[x][i]==3)return false;
                if(moveThroughtThrone=='disabled');
            }
        }
    }
    return true;
}

function click(e){
    if(mouseX>startCord.x && mouseY>startCord.y && mouseX<(startCord.x+(size*fieldSize)) && mouseY<(startCord.y+(size*fieldSize))){
        if(clicked.x==0 && clicked.y==0){
            if(field[mouseCord.x][mouseCord.y]==1 || field[mouseCord.x][mouseCord.y]==2 || field[mouseCord.x][mouseCord.y]==3){
                clicked.x=mouseCord.x;
                clicked.y=mouseCord.y;
            }else{
                clicked.x=0;
                clicked.y=0;
            }
        }else if(field[clicked.x][clicked.y]==1 || field[clicked.x][clicked.y]==2 || field[clicked.x][clicked.y]==3){
            if(clicked.x!=mouseCord.x || clicked.y!=mouseCord.y){
                if(canMove(clicked.x, clicked.y, mouseCord.x, mouseCord.y))move();
            }else{
                clicked.x=mouseCord.x;
                clicked.y=mouseCord.y;
            }
        }else{
            clicked.x=0;
            clicked.y=0;
        }
    }
}

function start(){
    if(gameName=='Brandubh'){
        size=7;
        winCondition='corner';
        moveThroughtThrone='disabled';
    }
    else if(gameName=='Tablut'){
        size=9;
        winCondition='edge';
        moveThroughtThrone='disabled';
    }
    

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
        fieldSize = (s.h()-margin)/size;
    }else{

        fieldSize = (s.w()-margin)/size;
    }
    center = {
        x: (s.w()-fieldSize)/2,
        y: (s.h()-fieldSize)/2
    };
    startCord = {
        x: center.x-(Math.trunc(size/2)*fieldSize),
        y: center.y-(Math.trunc(size/2)*fieldSize)
    };

    isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    clearFigures();
    putFiguresonMap();
}

function update(){
    setTimeout(function(){
         update();  
    }, 1000 / s.FPS);
    s.ctx.clearRect(0, 0, s.w(), s.h());
    
    renderMap(size);
    if(!isMobile)if(typeof mouseCord!= 'undefined')drawHovered();
    renderFig();
    if(!isMobile)s.ctx.drawImage(cursor, mouseX, mouseY, fieldSize*0.75, fieldSize*0.75);
}

window.onresize = function(){
    s.init(document.getElementById("game"));
    if(s.w()>s.h()){
        fieldSize = (s.h()-margin)/size;
    }else{

        fieldSize = (s.w()-margin)/size;
    }
    center = {
        x: (s.w()-fieldSize)/2,
        y: (s.h()-fieldSize)/2
    };
    startCord = {
        x: center.x-(Math.trunc(size/2)*fieldSize),
        y: center.y-(Math.trunc(size/2)*fieldSize)
    };
    mouseX=-1000;
    mouseY=-1000;
}