var prevPlace=1;

$(document).ready(function(){
$("#navbarSupportedContent a").on('click',function (e) {


    document.getElementsByClassName("nav-item-"+this.getAttribute("data-nav"))[0].children[0].classList.add("active");
    document.getElementsByClassName("nav-item-"+prevPlace)[0].children[0].classList.remove("active");
    prevPlace = this.getAttribute("data-nav");

    e.preventDefault();
    var target = this.hash;
    $target = $(target);
    $('html, body').stop().animate({
        'scrollTop':  $target.offset().top //no need of parseInt here
    }, 900, 'swing', function () {
        window.location.hash = target;
    });
});
});


const sections = document.querySelectorAll("section");
const navLi = document.querySelectorAll("nav li");
window.addEventListener("scroll", () => scrollCustom());

function scrollCustom(){
  {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop - sectionHeight / 3) {
        current = "nav-item-"+section.getAttribute("data-nav");
      }
    });
  
    navLi.forEach((li) => {
      if(li.children[0].classList.contains("active")){
        li.children[0].classList.remove("active");
      }
      if (li.classList.contains(current)) {
        li.children[0].classList.add("active");
      }
    });
  }
}