// SH1.js

function toggleSenhaVisibility() {
    const passwordInput = document.getElementById("password");
    const olhoIcon = document.getElementById("olho-icon");

    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        olhoIcon.classList.remove("fa-eye-slash");
        olhoIcon.classList.add("fa-eye");
    } else {
        passwordInput.type = "password";
        olhoIcon.classList.remove("fa-eye");
        olhoIcon.classList.add("fa-eye-slash");
    }
}

function ir_para_SH1() {
    window.location.href = 'inscrever_se.html';
}

function ir_para_SH2() {
    window.location.href = 'login.html';
}

function ir_para_principal() {
    window.location.href = '../user_html/user_inicio.html';
}

var mensagemErroDiv = document.getElementById("mensagem-erro-texto");

function validarFormulario() {

    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('password').value;

    const dados = {
        nome: nome,
        telefone: telefone,
        email: email,
        senha: senha
    };

    // Realiza a validação do formulário
    const erro = verificarErro(dados);

    // Bloqueia os campos do formulário e o botão de envio
    document.getElementById("nome").disabled = true;
    document.getElementById("telefone").disabled = true;
    document.getElementById("email").disabled = true;
    document.getElementById("password").disabled = true;

    const botaoCriarConta = document.getElementById("botao-3");
    botaoCriarConta.disabled = true;

    // Adiciona a classe desativado
    botaoCriarConta.classList.add("desativado");

    // Aguarda 2 segundos antes de decidir se há um erro ou não
    setTimeout(() => {

    if (erro){ 
        // Exibe mensagem de erro se houver
        exibirMensagemErro("Ocorreu um erro! Confira seus dados.");

        // Desbloqueia os campos do formulário e o botão de envio
        document.getElementById("nome").disabled = false;
        document.getElementById("telefone").disabled = false;
        document.getElementById("email").disabled = false;
        document.getElementById("password").disabled = false;

        const botaoCriarConta = document.getElementById("botao-3");
        botaoCriarConta.disabled = true;

        // Reseta os campos do formulário
        document.getElementById("nome").value = "";
        document.getElementById("email").value = "";
        document.getElementById("password").value = "";
        document.getElementById("telefone").value = "";

        // Remove a classe desativado
        botaoCriarConta.classList.remove("desativado");
        botaoCriarConta.disabled = false;

    } else {

        // Esconde a mensagem de erro
        document.getElementById("mensagem-erro").style.display = "none";

        console.log('Dados:', dados);

        enviarParaServidor(dados);
      // Redireciona para SoftHair.html
      ir_para_principal();
      }
    }, 2000);
}

function verificarErro(dados) {
    // Realiza a validação dos dados
    if (
        dados.nome.trim() === "" ||
        dados.email.trim() === "" ||
        dados.telefone.trim() === "" ||
        dados.senha.length < 8 || dados.telefone.length > 11 || !isValidEmail(dados.email)
    ) {
        return true;
    }

    return false;
}

function isValidEmail(email) {
    // Função para validar o formato do e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function exibirMensagemErro(mensagem) {
    mensagemErroDiv.innerHTML = mensagem;
    document.getElementById("mensagem-erro").style.display = "block";
}

function enviarParaServidor(dados) {
    fetch('http://localhost:5277/Usuario/Create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dados),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Resposta do servidor:', data);
    })
    .catch(error => {
        console.error('Erro ao enviar para o servidor:', error);
    });
}