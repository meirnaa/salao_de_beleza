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


// Acordeão 2
const items2 = document.querySelectorAll(".botao-sanfona");
const servicosContainer = document.querySelector(".servicos-container");

function toggleAccordion2() {
  const itemToggle = this.getAttribute('aria-expanded');
  const content = this.nextElementSibling;

  // Fecha todos os itens, se necessário
  items2.forEach(item => {
    if (item !== this) {
      item.setAttribute('aria-expanded', 'false');
      item.nextElementSibling.style.maxHeight = '0';
    }
  });

  if (itemToggle === 'false') {
    // Abre o item clicado
    content.style.maxHeight = content.scrollHeight + 'px';

    // Ajusta a altura do container com base na altura total do conteúdo expandido
    servicosContainer.style.height = (parseInt(servicosContainer.style.height) + content.scrollHeight) + 'px';
  } else {
    // Fecha o item clicado
    content.style.maxHeight = '0';

    // Restaura a altura do container
    servicosContainer.style.height = '0';
  }

  // Altera o estado 'aria-expanded'
  this.setAttribute('aria-expanded', itemToggle === 'false' ? 'true' : 'false');
}

// Adiciona o evento de clique a cada botão do acordeão
items2.forEach(item => item.addEventListener('click', toggleAccordion2));

// Ajusta a altura inicial do servicos-container após o carregamento completo da página
window.onload = () => {
  atualizarCarrinhoIcon()
  servicosContainer.style.height = '0';

  // Fecha todos os itens do acordeão
  items2.forEach(item => {
    item.setAttribute('aria-expanded', 'false');
    item.nextElementSibling.style.maxHeight = '0';
  });
};


    //funções do carrinho


    
    // Função para adicionar produto ao carrinho
    function adicionarAoCarrinho(nome, preco) {
      let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

      // Verifica se o produto já está no carrinho
      const produtoExistente = carrinho.find(item => item.nome === nome);

      if (produtoExistente) {
          // Se o produto já existe, você pode querer atualizar a quantidade ou fazer outra ação
          produtoExistente.quantidade += 1;
      } else {
          // Se o produto não existe no carrinho, adiciona-o
          carrinho.push({
              nome: nome,
              preco: preco,
              quantidade: 1
          });
      }

      // Atualiza o carrinho no localStorage
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

      // Atualiza a exibição dos elementos relacionados ao carrinho
      atualizarExibicaoBotoes();
  }

  // Função para atualizar a exibição dos botões do carrinho
  function atualizarExibicaoBotoes() {
      const containerBotoes = document.querySelector('.carrinho-container');

      // Obtém a quantidade de itens no carrinho
      const quantidadeProdutos = obterProdutos();

      // Atualiza o texto do botão com a quantidade de itens no carrinho
      containerBotoes.innerHTML = `<a href="./carrinho.html"><i class="fa fa-shopping-cart fa-lg"></i>CARRINHO (${quantidadeProdutos})</a>`;
  }

  function obter_produtos(){
      const carrinho = JSON.parse(localStorage.getItem('carrinho')) || []
    
      let quantidade_produtos = carrinho.length;
      return quantidade_produtos
}

document.querySelectorAll('.botao-add').forEach(botao => {
  botao.addEventListener('click', function () {

      // Mostra a caixa de diálogo
      document.getElementById('pedir-login-dialog').style.display = 'block';

      // Configura os ouvintes de evento para o botão de fechar e ir para login
      const login = document.getElementById('ir-pag-login');
      const fechar = document.getElementById('fechar')

      const handleLogin = () => {
          window.location.href = 'login.html';
      };

      const handleFechar = () => {
          // Esconde a caixa de diálogo
          document.getElementById('pedir-login-dialog').style.display = 'none';

          // Remove os ouvintes de evento após o uso
          fechar.removeEventListener('click', handleFechar);
          login.removeEventListener('click', handleLogin);
      };

      login.addEventListener('click', handleLogin);
      fechar.addEventListener('click', handleFechar);
  });
});

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