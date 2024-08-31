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

// Adiciona o evento de clique a cada botão do acordeão 2
items2.forEach(item => item.addEventListener('click', toggleAccordion2));

// Ajusta a altura inicial do servicos-container após o carregamento completo da página
window.onload = () => {
  atualizarCarrinhoIcon()
  servicosContainer.style.height = '0';

  // Fecha todos os itens do acordeão 2
  items2.forEach(item => {
    item.setAttribute('aria-expanded', 'false');
    item.nextElementSibling.style.maxHeight = '0';
  });
};
    
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
            preco: Number(preco), // Converte o preço para um número
            quantidade: 1
          });
      }

      // Atualiza o carrinho no localStorage
      localStorage.setItem('carrinho', JSON.stringify(carrinho));

  }


  document.querySelectorAll('.botao-add').forEach(botao => {
    botao.addEventListener('click', function () {
        const card = this.closest('.servico');
        const nome = card.querySelector('.nome').innerText;
        const precoTexto = card.querySelector('.preco').innerText;

        // Remova o "R$" e qualquer espaço em branco do texto do preço
        const preco = parseFloat(precoTexto.replace('R$', '').trim());

        // Mostra a caixa de diálogo
        document.getElementById('confirmacao-dialog').style.display = 'block';

        // Configura os ouvintes de evento para os botões de continuar comprando e ir para o carrinho
        const continuarComprando = document.getElementById('continuar-comprando');
        const irParaCarrinho = document.getElementById('ir-para-carrinho');
        const fechar = document.getElementById('fechar')

        const handleirParaCarrinho = () => {
            window.location.href = './user_carrinho.html';
        };

        const handlecontinuarComprando = () => {
          atualizarCarrinhoIcon()
            // Esconde a caixa de diálogo
            document.getElementById('confirmacao-dialog').style.display = 'none';

            // Remove os ouvintes de evento após o uso
            continuarComprando.removeEventListener('click', handlecontinuarComprando);
            irParaCarrinho.removeEventListener('click', handleirParaCarrinho);
        };

        irParaCarrinho.addEventListener('click', handleirParaCarrinho);
        continuarComprando.addEventListener('click', handlecontinuarComprando);
        fechar.addEventListener('click', handlecontinuarComprando);

        // Adiciona o produto ao carrinho
        adicionarAoCarrinho(nome, preco);
        ajustarAlturaContainer()
        atualizarCarrinhoIcon()
    });
});

  function obterProdutos() {
    const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let quantidade_produtos = carrinho.length;
    return quantidade_produtos;
}

// Função para ajustar a altura do contêiner de acordo com os produtos
function ajustarAlturaContainer() {
  const carrinho = ProdutosArmazenados();
  const alturaItem = 50; // Altura estimada de um item na tabela (ajuste conforme necessário)
  
  // Calcula a altura total necessária
  const alturaTotal = carrinho.length * alturaItem;

  // Define a altura do contêiner
  const containerProdutos = document.querySelector('.produtos-tabela');
  containerProdutos.style.height = `${alturaTotal}px`;
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

function contarProdutosDiferentes() {
  const carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
  const produtosDistintos = new Set(carrinho.map(produto => produto.nome));
  const quantidadeProdutos = produtosDistintos.size;
  return quantidadeProdutos;
}