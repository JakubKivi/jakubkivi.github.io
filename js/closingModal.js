var closedModalHashStateId = "#main";
var openModalHashStateId = "#window";

var FPS = 5;

/* Updating the hash state creates a new entry
 * in the web browser's history. The latest entry in the web browser's
 * history is "modal.html#modalClosed". */
if(window.location.hash != "#contact")window.location.hash = closedModalHashStateId;


var chosenModal = document.getElementById('mod');

chosenModal.onclick = function() {
	console.log('loool');
	window.location.hash = openModalHashStateId;
	toCloseModal();
}

function toCloseModal(){
	setTimeout(function(){
         toCloseModal();  
    }, 1000 / FPS);

	if(window.location.hash==closedModalHashStateId){
		//document.getElementsByTagName("mod")[0].setAttribute("aria-hidden", "true"); 
	}
}