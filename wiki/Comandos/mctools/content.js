let titulo = document.querySelector("header h1 a")

setInterval(function piscar() {
    titulo.classList.add("on")
    setTimeout(function desligar(){
        titulo.classList.remove("on")
    }, 1000)
},2000)
