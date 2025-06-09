var animationTime = 1500;

onLoad();
function onLoad(){
    onSelectorClicked();
}


  window.addEventListener('load', () => {
    // 2) Sprawdź, czy URL ma hash (np. ? #contact)
    const hash = window.location.hash;
    if (!hash) return;

    // 3) Zaraz po load wyrzuć przeglądarkę na górę strony
    window.scrollTo(0, 0);

    // 4) Czekaj 2 sekundy (czas trwania animacji na #hero)
    setTimeout(() => {
      // 5) Dopiero teraz płynnie przewiń do docelowej sekcji
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 2000); // 2000 ms = 2 s
  });

  if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }


window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

  window.addEventListener('load', function () {

    window.scrollTo(0, 0);

    document.getElementsByClassName('load-container')[0].style.width =
        (document.getElementsByClassName('img-me')[0].offsetWidth.toString()+"px");

    setTimeout(function(){
        document.getElementsByClassName('loading')[0].style.opacity = "0";
        setTimeout(function(){
            document.getElementsByClassName('loading')[0].style.display = "none";
        }, 500);
    }, animationTime);

    var modalId = window.location.hash; // Pobieramy hash z URL
    setTimeout(() => {
        // 5) Dopiero teraz płynnie przewiń do docelowej sekcji
        // Otwieramy modal na podstawie hash
        if (modalId && $(modalId).length > 0 && $(modalId).hasClass('modal')) {
            $(modalId).modal('show');
        }
      }, animationTime);

    setTimeout(() => {
        // 5) Dopiero teraz płynnie przewiń do docelowej sekcji
        const targetEl = document.querySelector(hash);
        if (targetEl) {
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, animationTime);

    var loads = document.getElementsByClassName("load");
    loads[0].classList.add("top");
    loads[1].classList.add("bottom");
    loads[2].classList.add("left");
    loads[3].classList.add("right");
    
    document.getElementsByClassName('load-container')[0].classList.add("mx-auto");
  })


  function handleBackPress(event) {
    event.preventDefault();
    event.stopPropagation();
    $('.modal').modal('hide');
    $('.modal-backdrop').remove();
  }
  
  var closedModalHashStateId = "#modalClosed";
  var openModalHashStateId = "#modalOpen";

  
    if(window.location.hash == ""){
        window.location.hash = closedModalHashStateId;
    }
  
  $(window).on('popstate', this.handleBackPress);
  document.addEventListener("backbutton", this.handleBackPress, false);     // to otwiera modala po id
  
  $('.modal').on('show.bs.modal', function(e) {
    window.history.pushState('forward', null, './'+openModalHashStateId);
  });
  
  $('.modal').on('hide.bs.modal', function(e) {
    window.history.back();
    // $(".modal iframe").attr("src", $(".modal iframe").attr("src"));
  });


  (function (window) {

    'use strict';

    window.code = window.code || {};

    window.code.lightweightYoutubePlayer = function () {

        var dataYoutubeVideos = '[data-youtube]';

        var youtubeVideos = [...document.querySelectorAll(dataYoutubeVideos)];

        function init() {
            youtubeVideos.forEach(function(element) {
                bindYoutubeVideoEvent(element);
            });
        }

        function bindYoutubeVideoEvent(element) {
            var button = element.querySelector('[data-youtube-button]');

            button.addEventListener('click', createIframe);
        }

        function createIframe(event) {
            var url = event.target.dataset.youtubeButton;
            var youtubePlaceholder = event.target.parentNode;

            var htmlString = '<div class="video__youtube"> <iframe class="video__iframe" src="' + url + '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

            youtubePlaceholder.style.display = 'none';
            youtubePlaceholder.insertAdjacentHTML('beforebegin', htmlString);
            youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
        }

        return {
           init: init
        }
    };

})(window)

ready();

function ready() {
    var lightweightYoutubePlayer = new code.lightweightYoutubePlayer()

    if (document.readyState != 'loading') {
        page.init()
    } else {
        document.addEventListener('DOMContentLoaded', lightweightYoutubePlayer.init);
    }
}

// Błagam nie zabijaj mnie za bałagan Kubusiu z przyszłości
// to niżej to żeby się zamykało menu po kliknięciu w nawigacji na telefonie

document.addEventListener('DOMContentLoaded', function () {
    var navbarCollapse = document.getElementById('navbarSupportedContent');
    var navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        // jeśli navbar jest rozwinięty, zwijamy go po kliknięciu
        if (navbarCollapse.classList.contains('show')) {
          navbarCollapse.classList.remove('show');
        }
      });
    });
  });