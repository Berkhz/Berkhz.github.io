let mensagem = document.querySelector('.form-control');
let valorCPF, valorEmail, valorSenha;

function valorBotao() {
  var botao = document.querySelector("button");
  botao.classList.add("loading");
  botao.disabled = true;

  setTimeout(function() {
    botao.classList.remove("loading");
    botao.disabled = false;
  }, 5000);

  valorCPF = document.getElementById('number').value; // Valor do CPF inserido
  valorEmail = document.getElementById("email").value; // Valor do email inserido
  valorSenha = document.getElementById("password").value; // Valor da senha inserida

  localStorage.setItem("cpf", valorCPF);
  localStorage.setItem("email", valorEmail);
  localStorage.setItem("senha", valorSenha);

  console.log(valorCPF);
  console.log(valorEmail);
  console.log(valorSenha);

  window.location.href = "home.html";
}

function verificarLogin() {
  const cpfArmazenado = localStorage.getItem("cpf");
  const senhaArmazenada = localStorage.getItem("senha");

  // Obter número de tentativas armazenado no localStorage
  let numeroTentativas = localStorage.getItem("numeroTentativas");

  // Se não houver valor armazenado, definir como 0
  if (!numeroTentativas) {
    numeroTentativas = 0;
  }

  if (valorCPF === cpfArmazenado && valorSenha === senhaArmazenada) {
    // Valores correspondem, pode prosseguir para o login
    window.location.href = "dashboard.html";
  } else {
    // Valores não correspondem, incrementar o número de tentativas
    numeroTentativas++;
    localStorage.setItem("numeroTentativas", numeroTentativas);

    if (numeroTentativas >= 3) {
      // Se excedeu o número de tentativas permitidas, redirecionar para a tela de registro
      window.location.href = "index.html";
    } else {
      // Valores incorretos, exibir mensagem de erro
      mensagem.innerHTML = 'Os valores informados estão incorretos. Verifique novamente.';
    }
  }
}

function validarCPF(valorCPF) {
  if (valorCPF.length < 11 || valorCPF.length > 11) // CPF inválido por tamanho
  { 
    mensagem.innerHTML = 'Tamanho do CPF inválido!';
  } 
  else if (valorCPF === valorCPF.split('').reverse().join('')) // CPF inválido por caracteres iguais
  { 
    mensagem.innerHTML = 'CPF não pode conter todos os números iguais!';
  } 
  else // Validação do CPF por cálculo
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