
function limparCarrinho() {
    localStorage.removeItem('carrinho');
    ajustarAlturaContainer()
    atualizarCarrinhoIcon()
}

// Adiciona um ouvinte de evento ao botão de sair
document.querySelector('.login-container a').addEventListener('click', function () {
    // Chama a função para remover o carrinho
    limparCarrinho();
    atualizarCarrinhoIcon()
});

function obter_produtos() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosDistintos = new Set(carrinho.map(produto => produto.nome));
    const quantidadeProdutos = produtosDistintos.size;
    return quantidadeProdutos;
  }

// Função para adicionar produtos ao container
function exibirProdutosNoCarrinho() {
    const carrinho = ProdutosArmazenados();
    const containerProdutos = document.querySelector('.produtos-tabela');
  
    // Limpa o conteúdo existente na div
    containerProdutos.innerHTML = '';
  
    // Itera sobre cada produto no carrinho
    carrinho.forEach(produto => {
        // Cria um elemento de div para representar o produto
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
    
        // Adiciona o nome do produto à div
        const nomeDiv = document.createElement('div');
        nomeDiv.classList.add('produtos-produtos');
        const nomeParagrafo = document.createElement('p');
        nomeParagrafo.innerText = produto.nome;
        nomeDiv.appendChild(nomeParagrafo);
        produtoDiv.appendChild(nomeDiv);
    
        // Adiciona a quantidade do produto à div
        const quantidadeDiv = document.createElement('div');
        quantidadeDiv.classList.add('produtos-quant');
        const quantidadeParagrafo = document.createElement('p');
        quantidadeParagrafo.innerText = `${produto.quantidade}`;
        quantidadeDiv.appendChild(quantidadeParagrafo);
        produtoDiv.appendChild(quantidadeDiv);
    
        // Adiciona o preço do produto à div
        const precoDiv = document.createElement('div');
        
            precoDiv.classList.add('produtos-preco');
            const precoParagrafo = document.createElement('p');
            precoParagrafo.innerText = `R$ ${produto.preco.toFixed(2)}`;
            precoDiv.appendChild(precoParagrafo);
            produtoDiv.appendChild(precoDiv);

        // Adiciona botão de remover
        const removerBotao = document.createElement('div');
        removerBotao.innerHTML = '<i class="fas fa-minus"></i>';
        removerBotao.addEventListener('click', () => removerProduto(produto.nome));
        produtoDiv.appendChild(removerBotao);
    
        // Adiciona o produto à div "produtos-tabela"
        containerProdutos.appendChild(produtoDiv);
        ajustarAlturaContainer()
        atualizarCarrinhoIcon()
    });
}

// Função para remover um produto ou decrementar a quantidade
function removerProduto(nomeProduto) {
    let carrinho = ProdutosArmazenados();
    
    // Encontra o produto no carrinho
    const produtoIndex = carrinho.findIndex(produto => produto.nome === nomeProduto);
    
    if (produtoIndex !== -1) {
        // Se a quantidade for maior que 1, decrementa a quantidade
        if (carrinho[produtoIndex].quantidade > 1) {
            carrinho[produtoIndex].quantidade--;
        } else {
            // Se a quantidade for 1, remove completamente o item do carrinho
            carrinho.splice(produtoIndex, 1);
        }
        
        // Atualiza o carrinho no localStorage
        localStorage.setItem('carrinho', JSON.stringify(carrinho));
        
        // Exibe novamente os produtos atualizados
        exibirProdutosNoCarrinho();
        
        // Atualiza o resumo da compra
        exibirResumoCompra();
        ajustarAlturaContainer()
        atualizarCarrinhoIcon()
    }
}

// Função para ajustar a altura do contêiner de acordo com os produtos
function ajustarAlturaContainer() {
    const containerProdutos = document.querySelector('.produtos-tabela');
    containerProdutos.style.height = 'auto'; // Redefine a altura para 'auto'
    const alturaConteudo = containerProdutos.scrollHeight + 'px';
    containerProdutos.style.height = alturaConteudo;
}

window.addEventListener('load', ajustarAlturaContainer);

// Função para calcular o preço total
function calcularPrecoTotal() {
    const carrinho = ProdutosArmazenados();
    let precoTotal = 0;
  
    carrinho.forEach(produto => {
      if (produto.preco !== null) {
        precoTotal += produto.preco * produto.quantidade;
      }
    });
  
    return precoTotal.toFixed(2);
  }
  
  // Função para calcular a quantidade total
  function calcularQuantidadeTotal() {
    const carrinho = ProdutosArmazenados();
    let quantidadeTotal = 0;
  
    carrinho.forEach(produto => {
      quantidadeTotal += produto.quantidade;
    });
  
    return quantidadeTotal;
  }

  function contarProdutosDiferentes() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosDistintos = new Set(carrinho.map(produto => produto.nome));
    const quantidadeProdutos = produtosDistintos.size;
    return quantidadeProdutos;
}

function atualizarCarrinhoIcon(){
  const produtos = contarProdutosDiferentes()
  const elemento_resultado = document.getElementById('quantidade-carrinho');
        elemento_resultado.innerText = `${produtos}`
}

  // Função para exibir o resumo da compra
function exibirResumoCompra() {
    const precoTotal = calcularPrecoTotal();
    const quantidadeTotal = calcularQuantidadeTotal();

    const produtos = contarProdutosDiferentes()
    if(produtos === 0){
        const elemento_resultado = document.getElementById('produtos-quantidade');
        elemento_resultado.innerText = `(Nenhum produto adicionado)`
      } else if(produtos === 1){
        const elemento_resultado = document.getElementById('produtos-quantidade');
        elemento_resultado.innerText = `(${produtos} produto)`
      } else {
        const elemento_resultado = document.getElementById('produtos-quantidade');
        elemento_resultado.innerText = `(${produtos} produtos)`
      }
  
    // Limpar o conteúdo das divs antes de adicionar os novos valores
    const elementoPrecoTotal = document.getElementById('total-total');
    elementoPrecoTotal.innerHTML = '';

    const elementoTotal = document.getElementById('total');
    elementoTotal.innerHTML = '';
  
    const elementoQuantidadeTotal = document.getElementById('quantidade-quantidade');
    elementoQuantidadeTotal.innerHTML = '';
  
    // Exibir o preço total
    const paragrafoPrecoTotal = document.createElement('p');
    paragrafoPrecoTotal.innerText = `R$ ${precoTotal}`;
    elementoPrecoTotal.appendChild(paragrafoPrecoTotal);

    // Exibir o preço total
    const paragrafoTotal = document.createElement('p');
    paragrafoTotal.innerText = `R$ ${precoTotal}`;
    elementoTotal.appendChild(paragrafoTotal);
  
    // Exibir a quantidade total
    const paragrafoQuantidadeTotal = document.createElement('p');
    if (quantidadeTotal === 1) {
        paragrafoQuantidadeTotal.innerText = `(${quantidadeTotal} item)`;
        elementoQuantidadeTotal.appendChild(paragrafoQuantidadeTotal);
    } else {
        paragrafoQuantidadeTotal.innerText = `(${quantidadeTotal} itens)`;
        elementoQuantidadeTotal.appendChild(paragrafoQuantidadeTotal);
    }
}


  function ProdutosArmazenados() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log(carrinho); // Adicione este console.log
    return carrinho;
}

function ir_para_agenda() {
  window.location.href = 'user_finalizar.html';
  atualizarCarrinhoIcon()
}
  
  // Adicione a chamada à função no seu código
  window.onload = () => {
    exibirProdutosNoCarrinho();
    exibirResumoCompra(); // Adicione esta linha
    ajustarAlturaContainer()
    atualizarCarrinhoIcon()
  }


  function ir_para_pagamento(){
    window.location.href = 'user_pagamento.html';
    atualizarCarrinhoIcon()
  }