var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

var selector = document.getElementsByClassName("portfolio-selector")[0].children;
var activeSelector="calk3";


for (var i = 0; i < selector.length; i++) { 
    selector[i].addEventListener("click", onSelectorClicked);
}

async function onSelectorClicked(element){
    if(element!=null){
        var id = element.currentTarget.getAttribute("data-userid");
    }else{
        var id = activeSelector;
        var firstLoad =true;
    } 
    if(width>769){   //na szerokich ekranach zaznaczamy
        if(id!=activeSelector || firstLoad){    //przy pierwszym trzeba zapalić ale tak to nie zapalamy jak to samo kliknięte
                                                 //usuwamy ten co był
            for (let i = 0; i < selector.length; i++) {     
                if (selector[i].getAttribute("data-userid") === activeSelector) {
                  selector[i].children[0].classList.remove("active");
                  break; // jeśli masz tylko jeden pasujący element
                }
              }

            for (let i = 0; i < selector.length; i++) {     //podświetlamy kliknięty
                if (selector[i].getAttribute("data-userid") === id) {
                  selector[i].children[0].classList.add("active");
                  break; // jeśli masz tylko jeden pasujący element
                }
              }
             


            // selector[id].children[0].classList.add("active");
            activeSelector = id;
            var rightColumn = document.getElementById("right-column");
            rightColumn.style.opacity = 0;
            
            await new Promise(r => setTimeout(r, 500));

            ChangePortfolioContent(id, rightColumn);
        }
    }else if(!firstLoad){   //na wąskich tylko otwieramy modal od razu ale nie jak to jest pietrwsze wykonanie funkcji
        var modalName = '#portfolio-modal-'+id;
        $(modalName).modal();
    }
    console.log("dupksko");
    $(".img-"+id).each(function() {
        const $img = $(this);
        $img.attr("src", $img.data("img")).on("load", function() {
            $img.removeClass("loading-img");
        });
    });

}

function fits(text, place, container) {
  place.innerHTML = text + '...';
  place.offsetHeight; 
  return container.scrollHeight <= container.clientHeight;
}

function findMaxFittingText(text, place, container) {
  let low = 0;
  let high = text.length;
  let result = '';

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const substr = text.slice(0, mid);
    if (fits(substr, place, container)) {
      result = substr;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }
  return result;
}

function isOverflowing(element) {
  return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function startOverflowWatcher(containerSelector) {
  const container = document.getElementById(containerSelector);

  if (!container) {
    console.error(`Container '${containerSelector}' not found.`);
    return;
  }

  setInterval(() => {
    if (isOverflowing(container)) {
      ChangePortfolioContent(activeSelector, container);
    }
  }, 1000);
}

startOverflowWatcher('right-column');

var containerLeft = document.getElementById("box-left-id");
var rightColumn = document.getElementById("right-column");
let lastHeight = containerLeft.clientHeight;

function watchContainerHeight() {
  const newHeight = containerLeft.clientHeight;
  if (newHeight !== lastHeight) {
    lastHeight = newHeight;
    ChangePortfolioContent(activeSelector, rightColumn);
  }
  requestAnimationFrame(watchContainerHeight);
}

watchContainerHeight();

function ChangePortfolioContent(a, r){
    var myModal = document.getElementById("modal-"+a);

    var textPlace = document.getElementById("portfolio-text");
    var container = document.getElementById("right-column");

    var fullText = myModal.getElementsByClassName("portfolio-text")[0].innerHTML;
    var fittingText = findMaxFittingText(fullText, textPlace, container);

    var isTruncated = fittingText.length < fullText.length;

    textPlace.innerHTML = isTruncated ? fittingText + '...' : fullText;

    document.getElementById("readMore").setAttribute("data-target", "#portfolio-modal-"+a );
    
    document.getElementById("portfolio-image").innerHTML = 
    myModal.getElementsByClassName("img-container")[0].innerHTML;

    document.getElementById("portfolio-title").innerHTML = 
    myModal.getElementsByClassName("modal-title")[0].innerHTML;

    r.style.opacity = 1;
}

async function switchModal(targetModalId) {
    const openModalEl = document.querySelector('.modal.show');
    const targetModalEl = document.getElementById(targetModalId);
  
    // Zamykanie obecnie otwartego modala
    if (openModalEl) {
      $(openModalEl).modal('hide');
    }
    
    await new Promise(r => setTimeout(r, 500));
    // Otwieranie nowego modala
    if (targetModalEl) {
      $(targetModalEl).modal('show');
    } else {
      console.error(`Modal with ID "${targetModalId}" not found.`);
    }
  }