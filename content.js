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
const Fechar = modalWiki.querySelector(".window button");

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