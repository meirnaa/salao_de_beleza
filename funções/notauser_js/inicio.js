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
        console.log(quantidadeProdutos)
        return quantidadeProdutos;
    }
    
    function atualizarCarrinhoIcon(){
      const produtos = contarProdutosDiferentes()
      const elemento_resultado = document.getElementById('quantidade-carrinho');
            elemento_resultado.innerText = `${produtos}`
    }
  