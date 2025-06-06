var showPage=0;
var aboutContainer = document.getElementById("about-left");

async function aboutTextInsert(){
    aboutContainer.classList.add("hiding");
    await new Promise(r => setTimeout(r, 800));
    document.getElementById("about-text").innerHTML= aboutText[showPage];
    document.getElementById("about-text-header").innerHTML = aboutHeader[showPage];
    document.getElementById("about-img").setAttribute("src", "assets/about/"+(showPage+1)+".webp");
    aboutContainer.classList.remove("hiding");
} 
aboutTextInsert(showPage);
function lArrow(){
    if(showPage>0){
        showPage-=1;
        aboutTextInsert();
        document.getElementsByClassName("arrow")[0].classList.remove("arrow-inactive");
        if(showPage==0){
            document.getElementsByClassName("arrow-left")[0].classList.add("arrow-inactive");
        }
    }
}

function rArrow(){
    if(showPage<4){
        showPage+=1;
        aboutTextInsert();
        document.getElementsByClassName("arrow-left")[0].classList.remove("arrow-inactive");
        if(showPage==4){
            document.getElementsByClassName("arrow")[0].classList.add("arrow-inactive");
        }
    }    
}