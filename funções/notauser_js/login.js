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
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const botaoEntrar = document.getElementById("botao-3");
    botaoEntrar.disabled = true;
    botaoEntrar.classList.add("desativado");

    // Simula a espera de 2 segundos para a validação
    setTimeout(() => {
        const erro = verificarErro();

        // Desbloqueia os campos do formulário
        document.getElementById("email").disabled = false;
        document.getElementById("password").disabled = false;

        if (erro) {
            mensagemErroDiv.innerHTML = "Ocorreu um erro! Confira seus dados.";
            document.getElementById("mensagem-erro").style.display = "block";
            document.getElementById("email").value = "";
            document.getElementById("password").value = "";
            botaoEntrar.classList.remove("desativado");
            botaoEntrar.disabled = false;
        } else {
            // Verifica se a conta existe no localStorage
            if (verificarConta(email, password)) {
                // Conta encontrada, redireciona para a página principal
                ir_para_principal();
            } else {
                // Conta não encontrada, exibe mensagem de erro com link para redefinir senha
                mensagemErroDiv.innerHTML = `
                    Login ou senha incorretos! 
                    <br>
                    <a href="redefinir_senha.html">Esqueceu a senha? Clique aqui.</a>
                `;
                document.getElementById("mensagem-erro").style.display = "block";
                botaoEntrar.classList.remove("desativado");
                botaoEntrar.disabled = false;
            }            
        }
    }, 2000);
}

// Função para verificar se a conta existe no localStorage
function verificarConta(email, password) {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    return storedEmail === email && storedPassword === password;
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