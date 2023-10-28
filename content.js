const btAleatorio = document.querySelector("#aleatorio"); //botão página aleatória
const MenuHamb = document.querySelector("menu"); //menu lateral
const btMenuHamb = MenuHamb.querySelector("#btLHamburger"); //botão menu hamburger lateral

btAleatorio.addEventListener("click", random =>{
    const paginas = [
        "/index.html",
        "/quiz/index.html",
        "/wiki/Comandos/basico/index.html",
        "/wiki/Comandos/cmdblock/index.html",
        "/wiki/Comandos/comandos/index.html",
        "/wiki/Comandos/mctools/index.html",
        "/wiki/Redstone/basico/blocosMusicais/index.html",
        "/wiki/Redstone/basico/pistoes/index.html",
        "/wiki/Redstone/basico/redstone/index.html",
        "/wiki/Redstone/intermediario/cargas/index.html",
        "/wiki/Redstone/intermediario/circuitos/index.html",
        "/wiki/Redstone/intermediario/portasLogicas/index.html",
        "/wiki/Vini13/index.html"
    ]
    const nAleatorio = Math.floor(Math.random() * paginas.length);
    const pgAleatoria = paginas[nAleatorio];
    window.location.href = pgAleatoria;
})

btMenuHamb.addEventListener("click", LOpen =>{
    MenuHamb.classList.toggle("open-menu");
})

//

const elQuiz = document.querySelector(".lquiz");
const elWiki = document.querySelector(".lwiki");
const modalWiki = document.querySelector("#WikiList");
const segredo = modalWiki.querySelector(".window")
const Fechar = modalWiki.querySelector(".window button");
const Invalido = new Audio("globalAssets/win7sino.wav");
let isDragging = false;
let offsetX, offsetY;

elQuiz.addEventListener("click", eq =>{
    window.location.href = "./quiz/index.html";
})
elWiki.addEventListener("click", ew =>{
    modalWiki.classList.add("active");
})
Fechar.addEventListener("click", X =>{
    modalWiki.classList.remove("active");
})
document.addEventListener("keydown", esc =>{
    if(esc.keyCode === 27){
        modalWiki.classList.remove("active");
    }
})
modalWiki.addEventListener("click", ev =>{
    if(ev.target!=segredo){
        Invalido.play();
    }
})

segredo.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.clientX - segredo.getBoundingClientRect().left;
    offsetY = e.clientY - segredo.getBoundingClientRect().top;
    segredo.style.cursor = "grabbing";
});
document.addEventListener("mouseup", function() {
    isDragging = false;
    segredo.style.cursor = "grab";
});
document.addEventListener("mousemove", function(e) {
    if (isDragging) {
        segredo.style.left = e.clientX - offsetX + "px";
        segredo.style.top = e.clientY - offsetY + "px";
    }
});