async function main() {
    //botão aleatório
    const scriptElement = document.currentScript;
    const scriptSrc = scriptElement.src;
    const dirJS = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
    const btAleatorio = document.querySelector("#aleatorio");
    btAleatorio.addEventListener("click", run =>{
        const paginas = [
            dirJS + "/../index.html",
            dirJS + "/../quiz/index.html",
            dirJS + "/../wiki/Comandos/basico/index.html",
            dirJS + "/../wiki/Comandos/cmdblock/index.html",
            dirJS + "/../wiki/Comandos/comandos/index.html",
            dirJS + "/../wiki/Comandos/mctools/index.html",
            dirJS + "/../wiki/Redstone/basico/blocosMusicais/index.html",
            dirJS + "/../wiki/Redstone/basico/pistoes/index.html",
            dirJS + "/../wiki/Redstone/basico/redstone/index.html",
            dirJS + "/../wiki/Redstone/intermediario/cargas/index.html",
            dirJS + "/../wiki/Redstone/intermediario/circuitos/index.html",
            dirJS + "/../wiki/Redstone/intermediario/portasLogicas/index.html",
            dirJS + "/../wiki/Vini13/index.html"
        ]
        const nAleatorio = Math.floor(Math.random() * paginas.length);
        const pgAleatoria = paginas[nAleatorio];
        window.location.href = pgAleatoria;
    })
    //menu lateral
    const MenuHamb = document.querySelector("menu"); 
    const btMenuHamb = MenuHamb.querySelector("#btLHamburger"); 
    btMenuHamb.addEventListener("click", LOpen =>{
        MenuHamb.classList.toggle("open-menu");
    })
}
main();


