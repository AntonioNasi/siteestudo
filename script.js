let timer = null;
let time = 0;
let running = false;
let study = true;
let currentCycle = 0;

function getStudySeconds(){

    return Number(
        document.getElementById("studyTime").value
    ) * 60;

}

function getBreakSeconds(){

    return Number(
        document.getElementById("breakTime").value
    ) * 60;

}

function updateDisplay(){


    let minutes = Math.floor(time / 60);

    let seconds = time % 60;


    document.getElementById("minutes").innerHTML =
    minutes;


    document.getElementById("seconds").innerHTML =
    seconds
    .toString()
    .padStart(2,"0");


}

function startTimer(){


    if(time <= 0){

        time = study 
        ? getStudySeconds()
        : getBreakSeconds();

    }



    if(running){

        return;

    }



    running = true;



    document
    .querySelector(".container")
    .classList.add("focus-mode");



    timer = setInterval(()=>{


        time--;


        updateDisplay();



        if(time <= 0){


            changeMode();


        }



    },1000);



}

function pauseTimer(){



    if(running){


        clearInterval(timer);


        running = false;



        document.querySelector(
        "#status"
        ).innerHTML =
        "Pausado";


        return;


    }



    startTimer();



}

function changeMode(){


    clearInterval(timer);


    running=false;



    tocarAlarme();



    if(study){



        currentCycle++;



        atualizarCiclo();



        let totalCycles =
        Number(
        document.getElementById("cycles").value
        );



        if(currentCycle >= totalCycles){



            document.getElementById("status")
            .innerHTML =
            "Estudo concluído!";



            time=0;


            updateDisplay();


            return;

        }



        study=false;



        time=getBreakSeconds();



        document.getElementById("status")
        .innerHTML =
        "Intervalo";



    }else{


        study=true;



        time=getStudySeconds();



        document.getElementById("status")
        .innerHTML =
        "Hora de estudar";


    }



    startTimer();


}

function atualizarCiclo(){


    let total =
    document.getElementById("cycles").value;



    document.getElementById("cycle")
    .innerHTML =

    "Ciclo "
    +
    currentCycle
    +
    "/"
    +
    total;


}

function resetTimer(){



    clearInterval(timer);



    timer=null;


    running=false;



    study=true;



    currentCycle=0;



    time=getStudySeconds();



    updateDisplay();



    atualizarCiclo();



    document.getElementById("status")
    .innerHTML =
    "Preparado para estudar";



}

function toggleFocusMode(){


    document
    .querySelector(".container")
    .classList.toggle("focus-mode");


}


// ================================
// videos youtube
// ================================

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


    if(!area) return;



    videosLofi.forEach(video=>{


        area.innerHTML += `


        <div class="video-card">


        <iframe

        src="https://www.youtube.com/embed/${video}"

        allow="autoplay"

        allowfullscreen>

        </iframe>


        </div>


        `;


    });


}

carregarVideos();

// ================================
// SONS AMBIENTES
// ================================

let ambienteAudio = null;

const sons = {

chuva:
"audio/chuva.mp3",

biblioteca:
"audio/biblioteca.mp3",

cafe:
"audio/cafe.mp3",

teclado:
"audio/teclado.mp3"

};

function playSound(nome){



    if(ambienteAudio){


        ambienteAudio.pause();


    }



    ambienteAudio =
    new Audio(sons[nome]);



    ambienteAudio.loop=true;



    ambienteAudio.volume =
    document.getElementById("volume").value;



    ambienteAudio.play();



}

function stopSound(){



    if(ambienteAudio){


        ambienteAudio.pause();


        ambienteAudio.currentTime=0;


    }


}

function changeVolume(){



    if(ambienteAudio){


        ambienteAudio.volume =
        document.getElementById("volume").value;


    }


}

// ================================
// ALARME SUAVE
// ================================

function tocarAlarme(){


    const audio =
    new AudioContext();



    const oscilador =
    audio.createOscillator();



    const volume =
    audio.createGain();



    oscilador.frequency.value=520;


    volume.gain.value=0.05;



    oscilador.connect(volume);


    volume.connect(audio.destination);



    oscilador.start();



    setTimeout(()=>{


        oscilador.stop();


    },600);


}

function atualizarCicloInicial(){


    let total =
    document.getElementById("cycles").value;



    document.getElementById("cycle").innerHTML =

    "Ciclo 0/" + total;


}

atualizarCicloInicial();