function squareBlink() {
  
    var square =  document.getElementById("squareBlink")
    var text =  document.getElementById("second-line-text")
    if(square.classList.contains("square-blink-off")){
        square.classList.remove("square-blink-off");
        text.classList.remove("text-positioning");
    }else{
        square.classList.add("square-blink-off");
        text.classList.add("text-positioning");
    }
}

window.setInterval(function(){
    squareBlink();
}, 1000);


var  iTyping = 0;
var jTyping=0;
var txt = ['Programmer.', 'Robocisit.','Electronic engineer.', 'Traveller.', 'What else?'];
var speed = 70;
var backspace = false;

var text = document.getElementById("second-line-text");

async function typing() {
  text.textContent = txt[jTyping].substring(0, iTyping);

  if ( iTyping > txt[jTyping].length){
    await new Promise(r => setTimeout(r, 2000));
    backspace = true;
  } 
  if ( iTyping == -1) backspace = false;
  iTyping =  iTyping + (backspace ? -1 : 1);
  if( iTyping != -1) setTimeout(typing, speed);
  else{
    await new Promise(r => setTimeout(r, 1500));
    jTyping+=1;
    if(jTyping >= txt.length) jTyping=0;
    typing();
  } 
}

typing();

