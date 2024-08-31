// SH2.js

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
    // Bloqueia os campos do formulário e o botão de envio
    document.getElementById("email").disabled = true;
    document.getElementById("password").disabled = true;

    const botaoEntrar = document.getElementById("botao-3");
    botaoEntrar.disabled = true;

    // Adiciona a classe desativado
    botaoEntrar.classList.add("desativado");

    // Aguarda 2 segundos antes de decidir se há um erro ou não
    setTimeout(() => {

        const erro = verificarErro();

        // Desbloqueia os campos do formulário
        document.getElementById("email").disabled = false;
        document.getElementById("password").disabled = false;

        if (erro) {

            // Exibe a mensagem de erro real
            mensagemErroDiv.innerHTML = "Ocorreu um erro! Confira seus dados.";
            document.getElementById("mensagem-erro").style.display = "block";

            // Reseta os campos do formulário
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";

            // Remove a classe desativado
            botaoEntrar.classList.remove("desativado");
            botaoEntrar.disabled = false;
        } else {

            // Esconde a mensagem de erro
            document.getElementById("mensagem-erro").style.display = "none";

            // Redireciona para SoftHair.html
            ir_para_principal();
        }
    }, 2000);
}


function verificarErro() {
    const emailInput = document.getElementById("email");
    const senhaInput = document.getElementById("password");

    if (emailInput.value.trim() === "" ||
        senhaInput.value.length < 8) {
        return true;
    }

    if (!isValidEmail(emailInput.value)) {
        mensagemErroDiv.innerHTML = "Por favor, insira um endereço de e-mail válido.";
        return true;
    }

    return false; 
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

    function verificarAntesDeEnviar(event) {
        event.preventDefault();  // Evita o envio automático do formulário

        // Realiza a verificação
        const erro = verificarErro();

        if (!erro) {
            // Se não houver erro, chama validarFormulario
            validarFormulario();
        }
    }
