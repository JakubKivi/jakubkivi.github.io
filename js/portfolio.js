var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

var selector = document.getElementsByClassName("portfolio-selector")[0].children;
var activeSelector=2;

for (var i = 0; i < selector.length; i++) { 
    selector[i].addEventListener("click", onSelectorClicked);
}

async function onSelectorClicked(element){
    if(element!=null){
        var id = element.currentTarget.getAttribute("data-userid");
    }else{
        var id = "0";
        var firstLoad =true;
    } 
    if(width>769){
        if(id!=activeSelector){
            selector[activeSelector].children[0].classList.remove("active");
            selector[id].children[0].classList.add("active");
            activeSelector = id;
            var rightColumn = document.getElementById("right-column");
            rightColumn.style.opacity = 0;
            
            await new Promise(r => setTimeout(r, 500));

            ChangePortfolioContent(id, rightColumn);
        }
    }else if(!firstLoad){
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
