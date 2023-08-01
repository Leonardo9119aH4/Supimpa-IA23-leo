let RespostaUsuario = null
let RespostaCerta = null
let Pergunta = document.querySelector("main div#pergunta")
let Contador = document.querySelector("main #contador")
let Seletor = 0
let Vidas = 0
let BTR1 = document.querySelector("main #bt1")
let BTR2 = document.querySelector("main #bt2")
let BTR3 = document.querySelector("main #bt3")
let BTR4 = document.querySelector("main #bt4")
let BTR5 = document.querySelector("main #bt5")
let BTR6 = document.querySelector("main #bt6")
const request = await
fetch("perguntas.json")
const dados = await request.json()

function Reset(){
    Seletor = 1
    Vidas = 3
}
function Default(){
    Seletor = 0
    Perguntar()
    RespostaCerta = null
    RespostaUsuario = null
}
function Comparar(){
    if(Seletor>0){
        if(RespostaCerta==RespostaUsuario){
            Seletor++
            RespostaUsuario = null
            Perguntar()
        }
        else{
            if(Vidas<=0){
                Default()
                }
            else{
                Vidas--
                }
            }
        }
    else{
        Reset()
        Perguntar()
    }
}
function Perguntar(){
    Pergunta.innerHTML =  dados[Seletor].pergunta
    RespostaCerta = dados[Seletor].respCerta
    Contador.innerHTML = Seletor.toString() + "/30"
    BTR1.innerHTML = dados[Seletor].btr1
    BTR2.innerHTML = dados[Seletor].btr2
    BTR3.innerHTML = dados[Seletor].btr3
    BTR4.innerHTML = dados[Seletor].btr4
    BTR5.innerHTML = dados[Seletor].btr5
    BTR6.innerHTML = dados[Seletor].btr6
}

//respostas
function b1(){
    RespostaUsuario=1
    Comparar()
}
function b2(){
    RespostaUsuario=2
    Comparar()
}
function b3(){
    RespostaUsuario=3
    Comparar()
}
function b4(){
    RespostaUsuario=4
    Comparar()
}
function b5(){
    RespostaUsuario=5
    Comparar()
}
function b6(){
    RespostaUsuario=6
    Comparar()
}