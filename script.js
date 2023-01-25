let input = document.querySelector("#caixa_de_pesquisa");

let chaves = 0;

window.onload = (Event) => {
    for(let i = 0; localStorage.getItem(i) != null; i++){
        console.log(localStorage.getItem(i));
        const conteudo = localStorage.getItem(i).substring(0, localStorage.getItem(i).indexOf('¬'));
        console.log(conteudo + "   toma");
        if((localStorage.getItem(i).substring(localStorage.getItem(i).indexOf('¬')+1, localStorage.getItem(i).indexOf('¬')+2)) == 'p'){
            cria(conteudo);
        }
        else if((localStorage.getItem(i).substring(localStorage.getItem(i).indexOf('¬')+1, localStorage.getItem(i).indexOf('¬')+2)) == 'c'){
            seleção(cria(conteudo).childNodes[2]);
        }
    }
};

window.onkeydown = (Event) =>{
    if(Event.key == "Enter"){
        cria(input.value);
    }
}


function cria(value){
    if(value != ""){
        let c1 = document.getElementsByTagName('div');
        if(c1.length <= 7){
            let subTitle = document.createElement("div");
            subTitle.classList = "titulo";
            subTitle.style.cssText = "font-size: 25pt;"

            subTitle.textContent = "Suas tarefas";
            document.body.insertBefore(subTitle, document.getElementsByTagName('div')[4]);
        }
        let tarefa = document.createElement("div");

        tarefa.classList = "tarefa";
        tarefa.setAttribute("data-ordem", chaves);
        tarefa.setAttribute("data-status", 'p');
        chaves++;

        let valor = document.createElement("div");
        valor.classList = "txt";
        valor.textContent = value;

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
        localStorage.setItem(tarefa.dataset.ordem, tarefa.childNodes[0].textContent + '¬' + tarefa.dataset.status);
        document.querySelector("#caixa_de_pesquisa").value='';

        return tarefa;
    }
}

function remove(botao){
        chaves--;
        localStorage.removeItem(botao.parentNode.dataset.ordem);
        botao.parentNode.remove();

        for(let i = 0; i < chaves; i++){
            let list = document.querySelectorAll(".tarefa");
            list[i].dataset.ordem = i;
        }
        
        localStorage.clear();

        for(let i = 0; i < chaves; i++){
            let list = document.querySelectorAll(".tarefa");
            localStorage.setItem(list[i].dataset.ordem, list[i].childNodes[0].textContent + '¬' + list[i].dataset.status);
        }

        for(let x= document.getElementsByTagName('div'); x.length == 5;){
            let sub = document.getElementsByClassName('titulo')[1];
            sub.remove();
        }
}

function seleção(botao){
    let ordem = botao.parentNode.dataset.ordem;
     if((localStorage.getItem(ordem).substring(localStorage.getItem(ordem).indexOf('¬')+1, localStorage.getItem(ordem).indexOf('¬')+2)) == 'p'){
        botao.parentNode.childNodes[0].classList.toggle('txt-toggle');
        botao.parentNode.childNodes[3].style = "background-color: green;"
        botao.parentNode.childNodes[3].textContent = "Concluída!"
        botao.parentNode.dataset.status = 'c';
        localStorage.setItem(botao.parentNode.dataset.ordem, botao.parentNode.childNodes[0].textContent + '¬' + botao.parentNode.dataset.status)
    }
    else if((localStorage.getItem(ordem).substring(localStorage.getItem(ordem).indexOf('¬')+1, localStorage.getItem(ordem).indexOf('¬')+2)) == 'c'){
        botao.parentNode.childNodes[0].classList.toggle('txt-toggle');
        botao.parentNode.childNodes[3].style = "background-color: rgb(255, 223, 79);"
        botao.parentNode.childNodes[3].textContent = "Pendente"
        botao.parentNode.dataset.status = 'p';
        localStorage.setItem(botao.parentNode.dataset.ordem, botao.parentNode.childNodes[0].textContent + '¬' + botao.parentNode.dataset.status)
    } 
}
