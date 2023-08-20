//import { SiteAleatorio } from "../globalAssets/main.js"

const elQuiz = document.querySelector("#quiz")
const elPergunta = elQuiz.querySelector("#pergunta")
let elRP = elPergunta.querySelector("#R") //seleciona uma div resposta na pergunta
const elNP = elQuiz.querySelector("#NP")
const elAlt = elQuiz.querySelector("#alternativas")
const elEr = elQuiz.querySelector("#totalErros") //erros ou tentativas
const elPo = elQuiz.querySelector("#pontos")
const elHard = elQuiz.querySelector("#botao input") //botão do modo difícil
const elPopup = document.querySelector("#popup") //popups
const elGameOver = elPopup.querySelector("#gameOver") //popup de game over
const elParabens = elPopup.querySelector("#parabens") //popup apos zerar o quiz
const fechar = elPopup.querySelectorAll("button") //botões de fechar popup


const hit = new Audio("../globalAssets/hit.mp3")
const bsod = new Audio("../globalAssets/bsod.mp3")
const xpOrb = new Audio("../globalAssets/xp_orb.mp3")
const conquista = new Audio("../globalAssets/rare_achievement.mp3")

async function main() {
  const request = await fetch("quiz.json")
  const quiz = await request.json()

  let nP = 0 //número da pergunta
  let T_Er = 0 //total de erros (modo fácil)
  let Er = 1 //usado para calcular a pontuação (modo fácil)
  let Po = 0 //pontuação (modo fácil)
  let Tent = 0 //tentativas (modo difícil)

  function Reset(){
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
    }
    if(elHard.checked){
      Po++
      xpOrb.play()
    }
  }
  function Erro(){
    T_Er++
      if(!elHard.checked){
        Er++
        hit.play()
      }
      if(elHard.checked){
        Reset()
        Tent++
        bsod.play()
        elPopup.classList.add("aberto")
        elGameOver.classList.add("aberto")
      }
  }
  function Exibir(){
    if(!elHard.checked){
      elEr.innerHTML = "Erros: " + T_Er
    }
    if(elHard.checked){
      elEr.innerHTML = "Tentativas: " + Tent
    }
    elPo.innerHTML = "Pontuação: " + Po
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
  elPergunta.addEventListener("click", ev =>{
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
    else{
      Erro()
      Exibir()
      Perguntar(nP)
    }
  })

  elHard.addEventListener("click", reset => {
    Reset()
    Exibir()
    Perguntar(nP)
  })

  fechar.forEach(close=> {
    close.addEventListener("click", () =>{
      elPopup.classList.remove("aberto")
      elGameOver.classList.remove("aberto")
      elParabens.classList.remove("aberto")
    })
  })
  document.addEventListener("keydown", esc =>{
    if(esc.keyCode === 27){
      elPopup.classList.remove("aberto")
      elGameOver.classList.remove("aberto")
      elParabens.classList.remove("aberto")
    }
  })

  Perguntar(0)
}
main()
