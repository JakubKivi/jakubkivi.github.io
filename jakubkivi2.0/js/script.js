var btn = document.getElementById("navBut");
var wave = document.getElementById("wave-navbar-collapse");

var fold = false;

btn.onclick =function(){
	console.log('dupa');
	if(!fold){
		wave.classList.add("wave-navbar-collpase-unfold");
		fold=true;
	}
	else{
		wave.classList.remove("wave-navbar-collpase-unfold");
		fold=false;
	}
}


const ab1 = KUTE.fromTo(
  '#a1',
  { path: '#a1' },
  { path: '#b1' },    
  { repeat: 9999, duration: 8000, yoyo: true }
);
const ab3 = KUTE.fromTo(
  '#a2',
  { path: '#a2' },
  { path: '#b2' },    
  { repeat: 9999, duration: 4000, yoyo: true }
);
const ab4 = KUTE.fromTo(
  '#a3',
  { path: '#a3' },
  { path: '#b3' },    
  { repeat: 9999, duration: 7000, yoyo: true }
);
const ab5 = KUTE.fromTo(
  '#a4',
  { path: '#a4' },
  { path: '#b4' },    
  { repeat: 9999, duration: 4500, yoyo: true }
);
const ab6 = KUTE.fromTo(
  '#a5',
  { path: '#a5' },
  { path: '#b5' },    
  { repeat: 9999, duration: 5800, yoyo: true }
);
const ab7 = KUTE.fromTo(
  '#a6',
  { path: '#a6' },
  { path: '#b6' },    
  { repeat: 9999, duration: 5000, yoyo: true }
);
const ab8 = KUTE.fromTo(
  '#a7',
  { path: '#a7' },
  { path: '#b7' },    
  { repeat: 9999, duration: 7800, yoyo: true }
);
const ab9 = KUTE.fromTo(
  '#a8',
  { path: '#a8' },
  { path: '#b8' },    
  { repeat: 9999, duration: 8100, yoyo: true }
);
const ab10 = KUTE.fromTo(
  '#a9',
  { path: '#a9' },
  { path: '#b9' },    
  { repeat: 9999, duration: 7900, yoyo: true }
);
const ab11 = KUTE.fromTo(
  '#a10',
  { path: '#a10' },
  { path: '#b10' },    
  { repeat: 9999, duration: 8000, yoyo: true }
);

const ab2 = KUTE.fromTo(
  '#a11',
  { path: '#a11' },
  { path: '#b11' },    
  { repeat: 9999, duration: 6000, yoyo: true }
);

const n = KUTE.fromTo(
  '#n1',
  { path: '#n1' },
  { path: '#n2' },    
  { repeat: 9999, duration: 4000, yoyo: true }
);

window.onload = function() {
  ab1.start();
	ab2.start();
	ab3.start();
	ab4.start();
	ab5.start();
	ab6.start();
	ab7.start();
	ab8.start();
	ab9.start();
	ab10.start();
	ab11.start();
  n.start();
};
