function SiteAleatorio() {
    let paginas = [
        'index.html'
    ]
    const numeroAleatorio = Math.floor(Math.random() * paginas.length);
    const paginaAleatoria = paginas[numeroAleatorio];
    window.location.href = paginaAleatoria;
  }
  

