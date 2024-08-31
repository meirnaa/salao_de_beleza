  // Adicione a chamada à função no seu código
  window.onload = () => {
    atualizarCarrinhoIcon()
    exibirResumoCompra()
  }

  function contarProdutosDiferentes() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosDistintos = new Set(carrinho.map(produto => produto.nome));
    const quantidadeProdutos = produtosDistintos.size;
    return quantidadeProdutos;
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    atualizarCarrinhoIcon()
  }
  
  // Adiciona um ouvinte de evento ao botão de sair
  document.querySelector('.login-container a').addEventListener('click', function () {
    // Chama a função para remover o carrinho
    limparCarrinho();
    ajustarAlturaContainer()
    atualizarCarrinhoIcon()
  });

function atualizarCarrinhoIcon(){
  const produtos = contarProdutosDiferentes()
  const elemento_resultado = document.getElementById('quantidade-carrinho');
        elemento_resultado.innerText = `${produtos}`
}

function exibirResumoCompra() {
    const precoTotal = calcularPrecoTotal();
    const quantidadeTotal = calcularQuantidadeTotal();

    // Limpar o conteúdo das divs antes de adicionar os novos valores
    const elementoTotal = document.getElementById('total');
    elementoTotal.innerHTML = '';

    const elementoQuantidadeTotal = document.getElementById('quantidade-quantidade');
    elementoQuantidadeTotal.innerHTML = '';

    // Exibir o preço total
    const paragrafoPrecoTotal = document.createElement('p');
    paragrafoPrecoTotal.innerText = `R$ ${precoTotal}`;
    elementoTotal.appendChild(paragrafoPrecoTotal);  // Corrigir a variável aqui

    // Exibir a quantidade total
    const paragrafoQuantidadeTotal = document.createElement('p');
    if (quantidadeTotal === 1) {
        paragrafoQuantidadeTotal.innerText = `(${quantidadeTotal} serviço)`;
        elementoQuantidadeTotal.appendChild(paragrafoQuantidadeTotal);
    } else {
        paragrafoQuantidadeTotal.innerText = `(${quantidadeTotal} serviços)`;
        elementoQuantidadeTotal.appendChild(paragrafoQuantidadeTotal);
    }
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

  function ProdutosArmazenados() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    console.log(carrinho); // Adicione este console.log
    return carrinho;
}

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


// Adicione a chamada à função no seu código
window.onload = () => {
    atualizarCarrinhoIcon()
    exibirResumoCompra()
}

function obterDadosCliente() {
    // Obter referência ao formulário
    const formulario = document.getElementById('formulario');

    // Obter valores dos campos
    const nome = formulario.elements['nome'].value;
    const observacoes = formulario.elements['observacoes'].value;
 
    // Obter o elemento select pelo ID
    const selectPagamento = document.getElementById('pagamento');

    // Obter o valor da opção selecionada
    const opcaoSelecionada = selectPagamento.options[selectPagamento.selectedIndex].value;

    enviarMensagemPedido(nome, observacoes, opcaoSelecionada)
}

// Função para enviar mensagem ao WhatsApp
function enviarMensagemPedido(nome, observacoes, opcaoSelecionada) {
    const carrinho = ProdutosArmazenados(); // Obter o carrinho
    const pedido = construirListaProdutos(carrinho); // Passar o carrinho como argumento
    const valorTotal = calcularPrecoTotal();

    // Construa a mensagem com os detalhes do pedido
    const mensagem = `
    Olá, sou ${nome}.\nMeu pedido é:\n${pedido}\n\nO valor total é: R$ ${valorTotal}.\nAo realizar o meu atendimento, lembre-se que: ${observacoes}\nOpção de pagamento: ${opcaoSelecionada}`;

    const linkWhatsapp = `https://wa.me/5589994302388?text=${encodeURIComponent(mensagem)}`;

    // Abre uma nova guia/janela com o link do WhatsApp
    window.open(linkWhatsapp, '_blank');
}

// Função para construir a lista de produtos com quantidades
function construirListaProdutos(carrinho) {
    return carrinho.map(produto => `${produto.nome} (${produto.quantidade})`).join('\n');
}
