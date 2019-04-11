var posIni = window.pageYOffset;

window.onscroll = function(){
    var posAct = window.pageYOffset;

    if(posIni < posAct){
        //document.getElementById("head").classList.add("menuDrop");
        console.log("abajo");
    }
    else{
        console.log("arriba");
        //document.getElementById("head").classList.remove("menuDrop");
    }

    posIni = posAct;
}

function desplegarMenu(){
    document.getElementById("menuMin").style.right = "0em";
}

function esconderMenu(){
    document.getElementById("menuMin").style.right = "-20em";
}

