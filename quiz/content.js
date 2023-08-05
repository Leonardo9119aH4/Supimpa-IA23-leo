const elQuiz = document.querySelector(".quiz")
const elPergunta = elQuiz.querySelector(".pergunta")
const elAlt = elQuiz.querySelector(".alternativas")
const elAcertos = elQuiz.querySelector("#acertos")
const elErros = elQuiz.querySelector("#erros")

async function main() {
  const request = await fetch("quiz.json")
  const quiz = await request.json()
  let nPerg = 0
  let Erros = 0
  let Acertos = 0
  let Pontos = 0

  function Perguntar(nPerguntas) {
    elPergunta.innerHTML = quiz[nPerguntas].pergunta
    elAlt.innerHTML = ""
    quiz[nPerguntas].alternativas.forEach(alt => elAlt.innerHTML += `<button>${alt}</button>`)
  }

  elAlt.addEventListener("click", ev => {
    const AltC = ev.target;
    const aAlt = [...elAlt.children]
    const nAltC = aAlt.indexOf(AltC)
    if(nPerg > quiz.length){
        if (nAltC == quiz[nPerg].resposta) {
            Perguntar(++nPerg)
            Acertos++
            return
          }
          Erros++
          if(elHard.checked){
              nPerg = 0
          }
          return
    }
    elAcertos.innerHTML = "Acertos: " + Acertos
    elErros.innerHTML = "Erros: " + Erros
    nPerg = 0
    Erros = 0
    Acertos = 0
    Perguntar(nPerg)
  })
}

main()
