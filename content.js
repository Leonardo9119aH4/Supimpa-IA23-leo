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