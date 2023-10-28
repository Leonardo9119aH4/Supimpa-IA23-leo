const btAleatorio = document.querySelector("#aleatorio"); //botão página aleatória
const MenuHamb = document.querySelector("menu"); //menu lateral
const btMenuHamb = MenuHamb.querySelector("#btLHamburger"); //botão menu hamburger lateral

btAleatorio.addEventListener("click", run =>{
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

const elQuiz = document.querySelector("#quiz")
const elPergunta = elQuiz.querySelector("#pergunta")
let elRP = elPergunta.querySelector("#R") //armazena a div-resposta
const elNP = elQuiz.querySelector("#NP")
const elAlt = elQuiz.querySelector("#alternativas")
const elEr = elQuiz.querySelector("#totalErros") //erros ou tentativas
const elPo = elQuiz.querySelector("#pontos")
const elHard = elQuiz.querySelector("#botao input") //botão do modo difícil
const elCrono = elQuiz.querySelector("#tempo") //cronômetro
const elPopup = document.querySelector("#popup") //popups
const elComeco = elPopup.querySelector("#comeco") //popup inicial
const elGameOver = elPopup.querySelector("#gameOver") //popup de game over
const elParabens = elPopup.querySelector("#parabens") //popup apos zerar o quiz
const fechar = elPopup.querySelectorAll("button") //botões de fechar popup
const fastBack = document.querySelector("#fastback") //aviso rápido de acerto ou erro

let isDragging = false;
let offsetX, offsetY;
let seg = 0;
let min = 0;
let hora = 0;
let emJogo = false;

const hit = new Audio("../globalAssets/hit.mp3")
const bsod = new Audio("../globalAssets/bsod.mp3")
const xpOrb = new Audio("../globalAssets/xp_orb.mp3")
const conquista = new Audio("../globalAssets/rare_achievement.mp3")

elPopup.classList.add("aberto")
elComeco.classList.add("aberto")

async function main() {
  const request = await fetch("quiz.json")
  const quiz = await request.json()

  let nP = 0 //número da pergunta
  let T_Er = 0 //total de erros (modo fácil)
  let Er = 1 //usado para calcular a pontuação (modo fácil)
  let Po = 0 //pontuação (modo fácil)
  let Tent = 0 //tentativas (modo difícil)

  function Reset(){ //inicio da parte das perguntas e pontuação
    nP = 0
    T_Er = 0
    Er = 1
    Po = 0
  }
  function Perguntar(nPe) {
    if(nP < quiz.length){
      elPergunta.innerHTML = quiz[nPe].pergunta
      elAlt.innerHTML = ""
      for (let i = 0; i < quiz[nPe].alternativas.length; i++) {
        elAlt.innerHTML += `<button>${quiz[nPe].alternativas[i]}</button>`
      }
      document.documentElement.style.setProperty("--Col", Math.ceil(quiz[nPe].alternativas.length/3))
      elNP.innerHTML = nPe + 1
      elRP = elPergunta.querySelector("#R")
      if(elRP != null){
        elRP.addEventListener("click", aev =>{
          if(quiz[nP].resposta == "R"){
            Acerto()
          }
          else{
            Erro()
          }
          Exibir()
          Perguntar(nP)
        })
      }
    }
    else{
      Reset()
      Tent = 0
      conquista.play()
      elPopup.classList.add("aberto")
      elParabens.classList.add("aberto")
    }
  }
  function Acerto(){
    Perguntar(++nP)
    if(!elHard.checked){
      Po += 1/Er
      Er = 1
      xpOrb.play()
      fastBack.classList.add("acerto")
      fastBack.innerHTML = "Você acertou!"
      setTimeout(() => {
        fastBack.classList.remove("acerto")
      }, 1000)
    }
    if(elHard.checked){
      Po++
      xpOrb.play()
      fastBack.classList.add("acerto")
      fastBack.innerHTML = "Você acertou!"
      setTimeout(() => {
        fastBack.classList.remove("acerto")
      }, 1000)
    }
  }
  function Erro(){
    T_Er++
      if(!elHard.checked){
        Er++
        hit.play()
        fastBack.classList.add("erro")
        fastBack.innerHTML = "Você errou!"
        setTimeout(() => {
          fastBack.classList.remove("erro")
        }, 1000)
      }
      if(elHard.checked){
        Reset()
        Tent++
        bsod.play()
        elPopup.classList.add("aberto")
        elGameOver.classList.add("aberto")
        fastBack.classList.add("erro")
        fastBack.innerHTML = "Você errou!"
        setTimeout(() => {
          fastBack.classList.remove("erro")
        }, 1000)
      }
  }
  function Exibir(){
    if(!elHard.checked){
      elEr.innerHTML = "Erros: " + T_Er
    }
    if(elHard.checked){
      elEr.innerHTML = "Tentativas: " + Tent
    }
    if(Number.isInteger(Po)){
      elPo.innerHTML = "Pontuação: " + Po
    }
    else{
      elPo.innerHTML = "Pontuação: " + Po.toFixed(2)
    }
  }
  elAlt.addEventListener("click", ev => {
    const AltC = ev.target;
    const aAlt = [...elAlt.children]
    const nAltC = aAlt.indexOf(AltC)
    if (nAltC == quiz[nP].resposta) {
      Acerto()
    }
    else{
      Erro()
    }
    Exibir()
    Perguntar(nP)
  })
  elNP.addEventListener("click", pev => {
    if(quiz[nP].resposta == "NP"){
      Acerto()
    }
    else{
      Erro()
    }
    Exibir()
    Perguntar(nP)
  })
  elHard.addEventListener("click", reset => {
    Reset()
    Exibir()
    Perguntar(nP)
    zeroCrono()
  })
  //fim da parte das perguntas e pontuação e início da parte dos popus
  fechar.forEach(close=> {
    close.addEventListener("click", () =>{
      elPopup.classList.remove("aberto")
      elGameOver.classList.remove("aberto")
      elParabens.classList.remove("aberto")
      elComeco.classList.remove("aberto")
    })
  })
  document.addEventListener("keydown", esc =>{
    if(esc.keyCode === 27){
      elPopup.classList.remove("aberto")
      elGameOver.classList.remove("aberto")
      elParabens.classList.remove("aberto")
      elComeco.classList.remove("aberto")
    }
  })

  elPopup.addEventListener("mousedown", function(e) {
    isDragging = true;
    offsetX = e.clientX - elPopup.getBoundingClientRect().left;
    offsetY = e.clientY - elPopup.getBoundingClientRect().top;
    elPopup.style.cursor = "grabbing";
  });
  document.addEventListener("mouseup", function() {
    isDragging = false;
    elPopup.style.cursor = "grab";
  });
  document.addEventListener("mousemove", function(e) {
    if (isDragging) {
      elPopup.style.left = e.clientX - offsetX + "px";
      elPopup.style.top = e.clientY - offsetY + "px";
    }
  });
  //fim da parte dos popus e início da parte do cronômetro
  function atualCrono() {
    seg++;
    if (seg === 60) {
        seg = 0;
        min++;
        if (min === 60) {
            min = 0;
            hora++;
        }
    }
    elCrono.innerHTML = (hora < 10 ? "0" : "") + hora + ":" + (min < 10 ? "0" : "") + min + ":" + (seg < 10 ? "0" : "") + seg;
  }
  function zeroCrono(){
    seg = 0;
    min = 0;
    hora = 0;
    elCrono.innerHTML = (hora < 10 ? "0" : "") + hora + ":" + (min < 10 ? "0" : "") + min + ":" + (seg < 10 ? "0" : "") + seg;
  }
  interval = setInterval(atualCrono, 1000);
  Perguntar(0)
}
main()
