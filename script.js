let timer;

let time;

let running=false;

let study=true;

let currentCycle=0;



function startTimer(){

    let materia =
document.getElementById("subject").value;


if(materia){

document.getElementById("status").innerHTML =
"Estudando: " + materia;

}


if(running) return;


let studyMinutes =
document.getElementById("studyTime").value;


let breakMinutes =
document.getElementById("breakTime").value;



if(time===undefined){

time = study 
? studyMinutes*60 
: breakMinutes*60;

}


running=true;

document
.querySelector(".container")
.classList.add("focus-mode");


timer=setInterval(updateTimer,1000);


}



function updateTimer(){


let minutes=Math.floor(time/60);

let seconds=time%60;



document.getElementById("minutes").innerHTML=
minutes;


document.getElementById("seconds").innerHTML=
seconds.toString().padStart(2,'0');



if(time<=0){

changeMode();

}else{


time--;

}


}




function changeMode(){


clearInterval(timer);

running=false;

tocarAlarme();



if(study){


currentCycle++;

document.getElementById("cycle").innerHTML =
"Ciclo " + currentCycle + "/" +
document.getElementById("cycles").value;


let total =
document.getElementById("cycles").value;



if(currentCycle>=total){

document.getElementById("status").innerHTML=
"Estudo concluído!";

return;

}



study=false;


document.getElementById("status").innerHTML=
"Intervalo";



time =
document.getElementById("breakTime").value*60;



}else{


study=true;


document.getElementById("status").innerHTML=
"Hora de estudar";


time =
document.getElementById("studyTime").value*60;


}



startTimer();


}



function pauseTimer(){


clearInterval(timer);

running=false;


}



function resetTimer(){


clearInterval(timer);


running=false;

study=true;

currentCycle=0;


time =
document.getElementById("studyTime").value*60;



document.getElementById("status").innerHTML=
"Preparado para estudar";


}

const videosLofi = [


"jfKfPfyJRdk",

"5qap5aO4i9A",

"lTRiuFIWV54",

"DWcJFNfaw9c",

"7NOSDKb0HlU",

"rUxyKA_-grg",

"Na0w3Mz46GA",

"kgx4WGK0oNU",

"lO-4n4f5m9Y",

"2OEL4P1Rz04"


];


function carregarVideos(){


let area =
document.getElementById("videos");



videosLofi.forEach(video=>{


area.innerHTML += `


<div class="video-card">


<iframe

src="https://www.youtube.com/embed/${video}"

allow="autoplay">

</iframe>


</div>


`;


});


}



carregarVideos();

function tocarAlarme(){


const audio =
new AudioContext();



const oscilador =
audio.createOscillator();



const volume =
audio.createGain();



oscilador.frequency.value = 520;


volume.gain.value = 0.05;



oscilador.connect(volume);


volume.connect(audio.destination);



oscilador.start();



setTimeout(()=>{


oscilador.stop();


},600);



}

function toggleFocusMode(){


const tela =
document.querySelector(".container");



tela.classList.toggle("focus-mode");



}