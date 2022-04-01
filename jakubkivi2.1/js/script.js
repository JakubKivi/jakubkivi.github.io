var navBtn = document.getElementById("navBut");
var wave = document.getElementById("wave-navbar-collapse");

var navbarFold = false;
var moving = false;

navBtn.onclick =function(){
	if(!navbarFold){
		wave.classList.add("wave-navbar-collpase-unfold");
		navbarFold=true;
	}
	else{
		wave.classList.remove("wave-navbar-collpase-unfold");
		navbarFold=false;
	}
}

function hover(element)
{
  var activeNav = document.getElementsByClassName("navbar-selected-custom").item(0);
  activeNav.classList.add("helper-custom");
  activeNav.classList.remove("navbar-selected-custom");
  element.classList.add("navbar-selected-custom");
}

function hoverOff(element)
{
  var activeNav = document.getElementsByClassName("helper-custom").item(0);
  if(activeNav != null){
    activeNav.classList.add("navbar-selected-custom");
    activeNav.classList.remove("helper-custom");
    if(activeNav!=element)
      element.classList.remove("navbar-selected-custom");
  }
}


$(document).ready(function(){
  $('body').scrollspy({target: ".navbar", offset: 50});   

  $("#navbarNav a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;
      moving = true;

      $('html, body').animate({
        scrollTop: $(hash).offset().top-100
      }, 600, function(){
        moving = false;
        scrollCustom();
      });
    }
  });

  $("#headerArrow a").on('click', function(event) {
      event.preventDefault();

      var hash = this.hash;
      moving = true;
      $('html, body').animate({
        scrollTop: $(hash).offset().top-100
      }, 600, function(){
        moving = false;
        scrollCustom();
      });
  });
});

var navStart = document.getElementById("navStart");

navStart.onclick =function(){
  navStart.classList.add("navbar-selected-custom");
  var activeNav = document.getElementsByClassName("helper-custom").item(0);
  activeNav.classList.remove("helper-custom");
  
  wave.classList.remove("wave-navbar-collpase-unfold");
  navbarFold=false;
}

var navAbout = document.getElementById("navAbout");

navAbout.onclick =function(){
  navAbout.classList.add("navbar-selected-custom");
  var activeNav = document.getElementsByClassName("helper-custom").item(0);
  activeNav.classList.remove("helper-custom");

  wave.classList.remove("wave-navbar-collpase-unfold");
  navbarFold=false;
}

var navPortfolio = document.getElementById("navPortfolio");

navPortfolio.onclick =function(){
  navPortfolio.classList.add("navbar-selected-custom");
  var activeNav = document.getElementsByClassName("helper-custom").item(0);
  activeNav.classList.remove("helper-custom");
  
  wave.classList.remove("wave-navbar-collpase-unfold");
  navbarFold=false;
}

var navContact = document.getElementById("navContact");

navContact.onclick =function(){
  navContact.classList.add("navbar-selected-custom");
  var activeNav = document.getElementsByClassName("helper-custom").item(0);
  activeNav.classList.remove("helper-custom");
  
  wave.classList.remove("wave-navbar-collpase-unfold");
  navbarFold=false;
}                              ////TO DO: Change it to get by class and loop through all instances

const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav div ul li");
window.addEventListener("scroll", () => scrollCustom());

function scrollCustom(){
  {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });
  
    navLi.forEach((li) => {
      if(li.classList.contains("helper-custom")){
        li.classList.remove("helper-custom");
      }
      if(li.classList.contains("navbar-selected-custom")){
        li.classList.remove("navbar-selected-custom");
      }
      if (li.classList.contains(current) && !moving) {
        li.classList.add("navbar-selected-custom");
      }
    });
  }
}

function checkboxNames()
{
  var texts = document.getElementsByClassName("progress-text");
  console.log( {texts});
  if (document.getElementById('checkboxNames').checked) 
  {
    for(var i=0; i< texts.length; i++){
      texts.item(i).classList.remove("display-none");
    }
  } else {
    for(var i=0; i< texts.length; i++){
      texts.item(i).classList.add("display-none");
    }
  }
}

var rad = document.aboutForm.btn;
var prev = null;

for (var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
      
      
      var owls = document.getElementsByClassName("owl-carousel");
      var all = document.getElementsByClassName("skills-all");
      var web = document.getElementsByClassName("skills-web");
      var robo = document.getElementsByClassName("skills-robo");
      var game = document.getElementsByClassName("skills-game");
      var tools = document.getElementsByClassName("skills-others");
      var lang = document.getElementsByClassName("skills-lang");
      if (this !== prev) {
        prev = this;
        console.log(this.value);
        for (var i = 0; i < owls.length; i++) {
          owls.item(i).classList.add("display-none-skill");
        }
        switch (this.value) {

          // if (box.classList.contains('hidden')) {
          //   box.classList.remove('hidden');          //TODO
          //   setTimeout(function () {
          //     box.classList.remove('visuallyhidden');
          //   }, 20);
          // } else {
          //   box.classList.add('visuallyhidden');    
          //   box.addEventListener('transitionend', function(e) {
          //     box.classList.add('hidden');
          //   }, {
          //     capture: false,
          //     once: true,
          //     passive: false
          //   });
          // }


          case "lang":
            lang.item(0).classList.remove("display-none-skill");
          break;
          case "web":
            web.item(0).classList.remove("display-none-skill");
          break;
          case "robo":
            robo.item(0).classList.remove("display-none-skill");
          break;
          case "game":
            game.item(0).classList.remove("display-none-skill");
          break;
          case "tools":
            tools.item(0).classList.remove("display-none-skill");
          break;
          default:
            all.item(0).classList.remove("display-none-skill");
          break;
        }
      }
    });
}

$('.owl-carousel').owlCarousel({
  loop:true,
  autoplay:false,
  autoplayTimeout: 2000,
  autoplayHoverPause: true,
  autoplaySpeed: 2000,

  dotsSpeed: 600,


  //nav:false,
  //center:true,
  startPosition:0,
  //freeDrag:true,
  responsive:{
      0:{
          items:1,
          dotsEach:1
      },
      400:{
          items:3,
          dotsEach:3
      },
      600:{
          items:5,
          dotsEach:5
      },
      900:{
          items:7,
          dotsEach:7
      },
      1200:{
          items:9,
          dotsEach:9
      }
  }
})