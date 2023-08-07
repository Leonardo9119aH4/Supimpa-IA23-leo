//import { SiteAleatorio } from "../globalAssets/main.js"

const elQuiz = document.querySelector("#quiz")
const elPergunta = elQuiz.querySelector("#pergunta")
const elRP = elPergunta.querySelector("#R") //seleciona uma div resposta na pergunta
const elNP = elQuiz.querySelector("#NP")
const elAlt = elQuiz.querySelector("#alternativas")
const elEr = elQuiz.querySelector("#totalErros") //erros ou tentativas
const elPo = elQuiz.querySelector("#pontos")
const elHard = elQuiz.querySelector("#botao input")

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
    }
    else{
      Reset()
      Tent = 0
    }
  }
  function Acerto(){
    Perguntar(++nP)
    if(!elHard.checked){
      Po += 1/Er
      Er = 1
    }
    if(elHard.checked){
      Po++
    }
  }
  function Erro(){
    T_Er++
      if(!elHard.checked){
        Er++
      }
      if(elHard.checked){
        Reset()
        Tent++
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

  elHard.addEventListener("click", reset => {
    Reset()
    Exibir()
    Perguntar(nP)
  })

  Perguntar(0)
}
main()
