const scriptElement = document.currentScript;
const scriptSrc = scriptElement.src;
const dirJS = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));
function SiteAleatorio() {
    const paginas = [
        dirJS + "/../index.html",
        dirJS + "/../quiz/index.html",
        dirJS + "/../wiki/slwiki.html",
        dirJS + "/../wiki/Comandos/slcmd.html",
        dirJS + "/../wiki/Comandos/basico/index.html",
        dirJS + "/../wiki/Comandos/cmdblock/index.html",
        dirJS + "/../wiki/Comandos/comandos/index.html",
        dirJS + "/../wiki/Comandos/mctools/index.html",
        dirJS + "/../wiki/Redstone/slreds.html",
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
  }


