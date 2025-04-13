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
    
}

function ChangePortfolioContent(a, r){
    var myModal = document.getElementById("modal-"+a);
    document.getElementById("portfolio-text").innerHTML = 
    myModal.getElementsByClassName("portfolio-text")[0].innerHTML.slice(0, 900 *width/1536) + "... " +
    "<a href=\"\" data-toggle=\"modal\" data-target=\"#portfolio-modal-"+a+"\">Read more. </a>";
    //width/1536 is screen width coefficient to trim text more on smaller screens ;)
    
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