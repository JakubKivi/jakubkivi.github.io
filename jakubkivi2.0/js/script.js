var btn = document.getElementById("navBut");
var wave = document.getElementById("wave-navbar-collapse");

var fold = false;

btn.onclick =function(){
	if(!fold){
		wave.classList.add("wave-navbar-collpase-unfold");
		fold=true;
	}
	else{
		wave.classList.remove("wave-navbar-collpase-unfold");
		fold=false;
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
  activeNav.classList.add("navbar-selected-custom");
  activeNav.classList.remove("helper-custom");
  if(activeNav!=element)
    element.classList.remove("navbar-selected-custom");
}


$(document).ready(function(){
  $('body').scrollspy({target: ".navbar", offset: 50});   

  $("#navbarNav a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top-120
      }, 600, function(){
   
        window.location.hash = hash;
        // var activeNav = document.getElementsByClassName("navbar-selected-custom").item(0);
        // activeNav.classList.remove("navbar-selected-custom");
        // this.parentElement.classList.add("navbar-selected-custom");
      });
    }
  });

  $("#headerArrow a").on('click', function(event) {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top-120
      }, 600, function(){
   
        window.location.hash = hash;
      });
    
  });


});

