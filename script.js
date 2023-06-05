let mensagem = document.querySelector('.form-control');

function valorBotao() {
  var botao = document.querySelector("button");
  botao.classList.add("loading");
  botao.disabled = true;

  setTimeout(function() {
    botao.classList.remove("loading");
    botao.disabled = false;
  }, 5000);

  const valorCPF = document.getElementById('number').value; 
  const valorSenha = document.getElementById("password").value; 

  localStorage.setItem("cpf", valorCPF);
  localStorage.setItem("password", valorSenha);

  window.location.href = "home.html";
}

function verificarLogin() {
  let tentativasLogin = 0; // Inicializa o contador de tentativas
  const valorCPF = document.getElementById('number').value; // Valor do CPF inserido
  const valorSenha = document.getElementById('password').value; // Valor da senha inserida

  const cpfArmazenado = localStorage.getItem("cpf");
  const senhaArmazenada = localStorage.getItem("password");

  if (valorCPF === cpfArmazenado && valorSenha === senhaArmazenada) {
    // Valores correspondem, pode prosseguir para o login
    window.location.href = "landing.html";
  } else {
    tentativasLogin++;
    if (tentativasLogin >= 3) {
      mensagem.innerHTML = 'Você excedeu o número máximo de tentativas de login. <br> Por favor, registre-se novamente.';
      mensagem.classList.add('mensagem');
      setTimeout(function() {
        window.location.href = 'index.html'; // Redireciona para a tela de registro
      }, 3000); // Espera 3 segundos antes de redirecionar
    } else {
      // Valores incorretos, exibir mensagem de erro
      mensagem.innerHTML = 'Os valores informados estão incorretos. <br> Tente novamente!';
      mensagem.classList.add('mensagem');

      let count = 3;
      const countdown = setInterval(function() {
        mensagem.innerHTML = 'Nova tentativa em: ' + count;
        count--;

        if (count < 0) {
          clearInterval(countdown);
          location.reload(); // Atualizar a página
        }
      }, 1000);
    }
  }
}

function validarCPF(valorCPF) {
  if (valorCPF.length < 11 || valorCPF.length > 11) 
  { 
    mensagem.innerHTML = 'Tamanho do CPF inválido!';
  } 
  else if (valorCPF === valorCPF.split('').reverse().join('')) 
  { 
    mensagem.innerHTML = 'CPF não pode conter todos os números iguais!';
  } 
  else 
  {
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(valorCPF.charAt(i)) * (10 - i);
    }

    let primeiroDigito = 11 - (soma % 11);
    if (primeiroDigito > 9) 
    {
      primeiroDigito = 0;
    }

    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(valorCPF.charAt(i)) * (11 - i);
    }
    let segundoDigito = 11 - (soma % 11);
    if (segundoDigito > 9) {
      segundoDigito = 0;
    }

    if (parseInt(valorCPF.charAt(9)) === primeiroDigito && parseInt(valorCPF.charAt(10)) === segundoDigito) 
    {
      mensagem.innerHTML = 'CPF válido';
    } 
    else 
    {
      mensagem.innerHTML = 'CPF inválido';
    }
  }
}