let input = document.querySelector("#caixa_de_pesquisa");

let botaoAdd = document.querySelector(".botao");

let c1 = 0;

botaoAdd.addEventListener("click", function(){
    if(input.value != ""){
        if(c1 == 0){
            let subTitle = document.createElement("div");
            subTitle.classList = "titulo";
            subTitle.style.cssText = "font-size: 15pt; padding-bottom: 10px;"

            subTitle.textContent = "Suas tarefas";
            document.body.appendChild(subTitle);
            c1=1;
        }
        let tarefa = document.createElement("div");

        tarefa.classList = "tarefa";

        let valor = document.createElement("div");
        valor.classList = "txt";
        valor.textContent = input.value;

        let botaoCheckIn = document.createElement("button");
        botaoCheckIn.classList = "botao-check";
        botaoCheckIn.style.cssText = "height: 50px; font-size: 18pt;";
        botaoCheckIn.setAttribute("onclick", "seleção(this)");
        botaoCheckIn.innerHTML = '<i class="fas fa-check"></i>';

        let botaoCheckOut = document.createElement("button");
        botaoCheckOut.classList = "botao-remove";
        botaoCheckOut.setAttribute("onclick", "remove(this)");
        botaoCheckOut.style.cssText = "height: 50px; font-size: 18pt;";
        botaoCheckOut.innerHTML = '<i class="fas fa-xmark"></i>';

        let info = document.createElement("div");
        info.classList = "status";
        info.textContent = "Pendente"
        
        
        tarefa.appendChild(valor);
        tarefa.appendChild(botaoCheckOut);
        tarefa.appendChild(botaoCheckIn);
        tarefa.appendChild(info);
        

        document.body.appendChild(tarefa);
        document.querySelector("#caixa_de_pesquisa").value='';

    }
});

function seleção(botao){
        botao.parentNode.childNodes[0].classList.toggle('txt-toggle');
        botao.parentNode.childNodes[3].style = "background-color: green;"
        botao.parentNode.childNodes[3].textContent = "Concluída!"
}
function remove(botao){
        botao.parentNode.remove();
        for(let x= document.getElementsByTagName('div'); x.length == 5;){
            let sub = document.getElementsByClassName('titulo')[1];
            sub.remove();
        }
}

