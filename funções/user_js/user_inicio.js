// Função para inicializar os cartões ativos
function initializeCards() {
    updateActiveCards(1);
}

// Função para atualizar os cartões ativos com base no cartão inicial
function updateActiveCards(startCard) {
    for (let i = 1; i <= 9; i++) {
        const cardElement = document.getElementById(`card-${i}`);
        
        if (i >= startCard && i < startCard + 4) {
            cardElement.classList.add('active');
        } else {
            cardElement.classList.remove('active');
        }
    }
}

// Variável para rastrear o cartão inicial
let startCard = 1;

// Função para avançar para os próximos cartões
function next() {
    startCard = startCard + 1 > 6 ? 1 : startCard + 1;
    updateActiveCards(startCard);
}

// Função para retroceder para os cartões anteriores
function prev() {
    startCard = startCard - 1 < 1 ? 6 : startCard - 1;
    updateActiveCards(startCard);
}

// Chamando a função de inicialização quando a página é carregada
window.addEventListener('load', function () {
    initializeCards();
    atualizarCarrinhoIcon()
});

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

items.forEach(item => item.addEventListener('click', toggleAccordion));


    document.addEventListener("DOMContentLoaded", function() {
        // Seleciona todos os links que contêm âncoras
        var links = document.querySelectorAll('a[href^="#"]');

        // Adiciona um evento de clique a cada link
        links.forEach(function(link) {
            link.addEventListener("click", function(event) {
                event.preventDefault();

                // Obtém o destino da âncora a partir do atributo href
                var targetId = this.getAttribute("href").substring(1);
                var targetElement = document.getElementById(targetId);

                // Rola a página para o elemento de destino
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: "smooth" // Adiciona rolagem suave (opcional)
                    });
                }
            });
        });
    });


    //funções do carrinho


    
       // Função para adicionar produto ao carrinho
       function adicionarAoCarrinho(nome, preco) {
        console.log(`Adicionando ao carrinho: ${nome} - R$ ${preco}`);
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
        ajustarAlturaContainer()
        atualizarCarrinhoIcon()
    }
  
    document.querySelectorAll('.botao-add').forEach(botao => {
      botao.addEventListener('click', function () {
          const card = this.closest('.card');
          const nome = card.querySelector('.nome').innerText;
          const precoTexto = card.querySelector('.promotional-price').innerText;
  
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
  
    function limparCarrinho() {
        localStorage.removeItem('carrinho');
    }
    
    // Adiciona um ouvinte de evento ao botão de sair
    document.querySelector('.login-container a').addEventListener('click', function () {
        // Chama a função para remover o carrinho
        limparCarrinho();
        ajustarAlturaContainer()
        atualizarCarrinhoIcon()
    });
    
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