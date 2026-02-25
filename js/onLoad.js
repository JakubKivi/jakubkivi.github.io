var animationTime = 1500;

onLoad();
function onLoad() {
  onSelectorClicked();

  const today = new Date().toISOString().split("T")[0];

  // Znajdujemy input i przypisujemy wartość do atrybutu max
  const dateInput = document.getElementById("journalDate");
  dateInput.setAttribute("max", today);

  // Opcjonalnie: ustawiamy domyślną wartość na dzisiaj
  dateInput.value = today;
}

//========================Scrollowanie do dobrego hasha

window.addEventListener("load", () => {
  // Sprawdź, czy URL ma hash (np. ? #contact)
  const hash = window.location.hash;
  if (!hash) return;

  // Zaraz po load wyrzuć przeglądarkę na górę strony
  window.scrollTo(0, 0);

  // Czekaj 2 sekundy (czas trwania animacji na #hero)
  setTimeout(() => {
    matchHeights();
    // Dopiero teraz płynnie przewiń do docelowej sekcji
    const targetEl = document.querySelector(hash);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth" });
    }
  }, 2000); // 2000 ms = 2 s
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}

//============ Animacja i otwieranie popupów

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

window.addEventListener("load", function () {
  window.scrollTo(0, 0);

  document.getElementsByClassName("load-container")[0].style.width =
    document.getElementsByClassName("img-me")[0].offsetWidth.toString() + "px";

  setTimeout(function () {
    document.getElementsByClassName("loading")[0].style.opacity = "0";
    setTimeout(function () {
      document.getElementsByClassName("loading")[0].style.display = "none";
    }, 500);
  }, animationTime);

  var modalId = window.location.hash; // Pobieramy hash z URL
  setTimeout(() => {
    if (modalId && $(modalId).length > 0 && $(modalId).hasClass("modal")) {
      $(modalId).modal("show");
    }
  }, animationTime);

  if (typeof hash !== "undefined") {
    setTimeout(() => {
      const targetEl = document.querySelector(hash);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }
    }, animationTime);
  }

  var loads = document.getElementsByClassName("load");
  loads[0].classList.add("top");
  loads[1].classList.add("bottom");
  loads[2].classList.add("left");
  loads[3].classList.add("right");

  document.getElementsByClassName("load-container")[0].classList.add("mx-auto");
});

// ========== cofanie żeby zamykało modala na telefonie i w przeglądarce

// Close modal on back navigation
$(window).on("popstate", function () {
  if (window.location.hash !== "#modalOpen") {
    $(".modal").modal("hide");
  }
});

// Push state when modal opens
$(".modal").on("show.bs.modal", function () {
  window.history.pushState(null, null, "#modalOpen");
});

// Revert history if modal is closed via UI
$(".modal").on("hide.bs.modal", function () {
  if (window.location.hash === "#modalOpen") {
    window.history.back();
  }
});

// Cordova/PhoneGap support
document.addEventListener(
  "backbutton",
  function (event) {
    if ($(".modal").hasClass("show") || $(".modal").hasClass("in")) {
      event.preventDefault();
      $(".modal").modal("hide");
    }
  },
  false,
);

// ======================== Do youtube'a żeby załadował dopiero po kliknięciu

(function (window) {
  "use strict";

  window.code = window.code || {};

  window.code.lightweightYoutubePlayer = function () {
    var buttonSelector = "[data-youtube-button]";

    function init() {
      // Use event delegation to handle elements loaded dynamically (e.g., from <template>)
      document.body.addEventListener("click", function (event) {
        // Check if the clicked element or its parent matches the selector
        var button = event.target.closest(buttonSelector);

        if (button) {
          createIframe(button);
        }
      });
    }

    function createIframe(button) {
      var url = button.dataset.youtubeButton;
      // The placeholder is the direct parent of the button
      var youtubePlaceholder = button.parentNode;

      var htmlString =
        '<div class="video__youtube"> <iframe class="video__iframe" src="' +
        url +
        '?autoplay=1" frameborder="0" allowfullscreen></iframe></div>';

      // Insert the iframe and remove the placeholder
      youtubePlaceholder.insertAdjacentHTML("beforebegin", htmlString);
      youtubePlaceholder.parentNode.removeChild(youtubePlaceholder);
    }

    return {
      init: init,
    };
  };
})(window);

ready();

function ready() {
  var lightweightYoutubePlayer = new code.lightweightYoutubePlayer();

  if (document.readyState != "loading") {
    page.init();
  } else {
    document.addEventListener(
      "DOMContentLoaded",
      lightweightYoutubePlayer.init,
    );
  }
}

// Żeby się zamykało menu dropdown po kliknięciu w konkretny section (na wąskim ekranie)

document.addEventListener("DOMContentLoaded", function () {
  var navbarCollapse = document.getElementById("navbarSupportedContent");
  var navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      // jeśli navbar jest rozwinięty, zwijamy go po kliknięciu
      if (navbarCollapse.classList.contains("show")) {
        navbarCollapse.classList.remove("show");
      }
    });
  });
});

// ====== To żeby się ładnie responsywnie dostosowywało nawet w locie

window.addEventListener("resize", matchHeights);

function matchHeights() {
  const left = document.querySelector(".about-left");
  const right = document.querySelector(".about-right");

  if (window.matchMedia("(max-width: 769px)").matches) {
    // Don't apply height sync on mobile layout
    right.style.height = "auto";
    return;
  } else {
    matchPortfolioHeights();
  }

  right.style.height = "auto"; // reset height first
  right.style.height = left.offsetHeight + "px";
}

function matchPortfolioHeights() {
  const left = document.querySelector(".box-left");
  const right = document.querySelector(".right-box");

  if (window.matchMedia("(max-width: 769px)").matches) {
    // Don't apply height sync on mobile layout
    right.style.height = "auto";
    return;
  }

  right.style.height = "auto"; // reset height first
  right.style.height = left.offsetHeight + "px";
}

// ========= to żeby się ładowały modale po kliknięciu <=== do poprawienia wygląda jak gówno xd

document.getElementById("notebook-button").addEventListener("click", () => {
  const template = document.getElementById("template-notebook");
  const container = document.getElementById("notebook-loader");
  if (container.innerHTML.trim() == "") {
    // Clone template content and append to DOM
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
});

document.getElementById("graveyard-button").addEventListener("click", () => {
  const template = document.getElementById("template-graveyard");
  const container = document.getElementById("graveyard-loader");

  if (container.innerHTML.trim() == "") {
    // Clone template content and append to DOM
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
});

document.getElementById("ideas-button").addEventListener("click", () => {
  const template = document.getElementById("template-ideas");
  const container = document.getElementById("ideas-loader");

  if (container.innerHTML.trim() == "") {
    // Clone template content and append to DOM
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
});

document.getElementById("swiatowid-button").addEventListener("click", () => {
  const template = document.getElementById("template-swiatowid");
  const container = document.getElementById("swiatowid-loader");

  if (container.innerHTML.trim() == "") {
    // Clone template content and append to DOM
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
});

document.getElementById("calk4-button").addEventListener("click", () => {
  const template = document.getElementById("template-calk4");
  const container = document.getElementById("calk4-loader");

  if (container.innerHTML.trim() == "") {
    // Clone template content and append to DOM
    const clone = template.content.cloneNode(true);
    container.appendChild(clone);
  }
});
