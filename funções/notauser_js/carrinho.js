// ...

function irParaInicio(){
  window.location.href = '../notauser_html/inicio.html'
}

function mensagem_resumo() {
      const elemento_resultado = document.getElementById('shopping-resumo');
      elemento_resultado.innerText = `
                          O seu carrinho está vazio! \n
                Não deixe de verificar as nossas ofertas do dia.`
}

window.onload = () => {
  mensagem_resumo();
  atualizarCarrinhoIcon()
};

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
