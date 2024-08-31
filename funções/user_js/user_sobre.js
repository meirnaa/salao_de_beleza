// Acordeão 1
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute('aria-expanded');
  
  for (i = 0; i < items.length; i++) {
    items[i].setAttribute('aria-expanded', 'false');
  }
  
  if (itemToggle == 'false') {
    this.setAttribute('aria-expanded', 'true');
  }
}

// Adiciona o evento de clique a cada botão do acordeão 1
items.forEach(item => item.addEventListener('click', toggleAccordion));

// Adiciona um ouvinte de evento ao botão de sair
document.querySelector('.login-container a').addEventListener('click', function () {
    atualizarCarrinhoIcon()
  });
  
  function atualizarCarrinhoIcon(){
    const produtos = contarProdutosDiferentes()
    const elemento_resultado = document.getElementById('quantidade-carrinho');
          elemento_resultado.innerText = `${produtos}`
  }
  
  function contarProdutosDiferentes() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    const produtosDistintos = new Set(carrinho.map(produto => produto.nome));
    const quantidadeProdutos = produtosDistintos.size;
    return quantidadeProdutos;
  }

  window.onload = () => {
    atualizarCarrinhoIcon()
  };

  // Adiciona um ouvinte de evento ao botão de sair
document.querySelector('.login-container a').addEventListener('click', function () {
    // Chama a função para remover o carrinho
    limparCarrinho();
    ajustarAlturaContainer()
    atualizarCarrinhoIcon()
  });

  function limparCarrinho() {
    localStorage.removeItem('carrinho');
    atualizarCarrinhoIcon()
  }