var closedModalHashStateId = "#main";
var openModalHashStateId = "#window";

//window.location.hash = closedModalHashStateId;

var FPS = 5;

/* Updating the hash state creates a new entry
 * in the web browser's history. The latest entry in the web browser's
 * history is "modal.html#modalClosed". */
if(window.location.hash != "#contact"
    &&window.location.hash != "#taflModal"
    &&window.location.hash != "#araModal"
    &&window.location.hash != "#calkModal"
    &&window.location.hash != "#lampModal"
    &&window.location.hash != "#wyswModal"
    &&window.location.hash != "#jackModal"
    &&window.location.hash != "#zasiModal"
    &&window.location.hash != "#grzesModal")
        window.location.hash = closedModalHashStateId;


document.querySelectorAll('.portfolio-item').forEach(item => {
  item.addEventListener('click', event => {
    console.log('loool');
 	window.location.hash = openModalHashStateId;
 	toCloseModal();
  })
})

$(document).ready(function() {
    $('.modal').each(function() {
        $this = $(this);
        $this.on('shown.bs.modal', function() {
            //toggleVideo('playVideo', $(this));
        });

        $this.on('hidden.bs.modal', function(){
           toggleVideo('pauseVideo', $(this));
        })
   });

    function toggleVideo(state, div) {
        var iframe = div.find("iframe")[0].contentWindow;
        iframe.postMessage('{"event":"command","func":"' + state + '","args":""}', '*');
    }
});  

document.addEventListener("keydown", ({key}) => {
    if (key === "Escape"&&window.location.hash == openModalHashStateId){
        window.location.hash = closedModalHashStateId;
    }
})

document.querySelectorAll('.close').forEach(item => {
  item.addEventListener('click', event => {
    window.location.hash = closedModalHashStateId;

  })
})

function handleBackPress(event) {
    console.log("dupa");
    event.preventDefault();
    event.stopPropagation();
    $('.modal-dialog').modal('hide');
    $('.modal-backdrop').remove();
}

function toCloseModal(){
	setTimeout(function(){
         toCloseModal();  
    }, 1000 / FPS);

	if(window.location.hash==closedModalHashStateId){
		$('.modal').modal('hide');
        $('.yvideo').each(function(){
            $(this).stopVideo();
        });
	}
}