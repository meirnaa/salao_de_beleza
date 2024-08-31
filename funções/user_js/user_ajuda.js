function limparCarrinho() {
    localStorage.removeItem('carrinho');
}

// Adiciona um ouvinte de evento ao botão de sair
document.querySelector('.login-container a').addEventListener('click', function () {
    // Chama a função para remover o carrinho
    limparCarrinho();
    ajustarAlturaContainer()
});

function atualizarCarrinhoIcon(){
    const produtos = contarProdutosDiferentes()
    const elemento_resultado = document.getElementById('quantidade-carrinho');
          elemento_resultado.innerText = `${produtos}`
  }