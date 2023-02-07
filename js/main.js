const form = document.getElementById("novoItem");
const lista = document.getElementById('lista');

                // ao inves de criar um array vazio, primeiro estamos vendo se existe algo la.
const itens = JSON.parse(localStorage.getItem("itens")) || []

itens.forEach( (elemento) => {
    criaElemento(elemento)
})

// ele vai escultar um evento de submit
form.addEventListener("submit", (evento) => {
    evento.preventDefault();

    
    const nome = evento.target.elements["nome"]
    const quantidade = evento.target.elements["quantidade"]
    
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value,
    }

        // verificando se no meu array já existe ou n o item selecionado
    const existe= itens.find( elemento => elemento.nome === nome.value )
    // pra realizar a busca perfeitam vamos add um ID em cada item.
    if(existe) {
        itemAtual.id = existe.id

        atualizaElemento(itemAtual)

    }else {
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length-1]).id + 1 : 0;

        criaElemento(itemAtual)
        itens.push(itemAtual)
    }


  

    localStorage.setItem("itens", JSON.stringify(itens))
    

    nome.value = ""
    quantidade.value = ""

})

function criaElemento(item) {
    const novoItem = document.createElement('li')

    // adicionando uma classe para o novo item da lista
    novoItem.classList.add('item')

    const numeroItem = document.createElement('strong')
    numeroItem.innerHTML = item.quantidade;
    // add um id para cada item utilizando a propriedade dataAttributes
    numeroItem.dataset.id = item.id

    novoItem.appendChild(numeroItem)

    novoItem.innerHTML += item.nome

    novoItem.appendChild(botaoDeleta(item.id))

    lista.appendChild(novoItem)

    
}

function atualizaElemento(item) {
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.quantidade
}

function botaoDeleta(id) {
    const elementoBotao  = document.createElement("button")
    elementoBotao.innerText = "X"

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id)
    })

    return elementoBotao
} 
function deletaElemento(tag, id) {
    tag.remove()

    // removendo um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1)

    // repassando a lista para o localStorage, com os items ja excluidos
    localStorage.setItem("itens", JSON.stringify(itens))

}