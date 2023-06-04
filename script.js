let mensagem = document.getElementsByClassName('form-control');

function valorBotao() {
  const valorCPF = document.getElementById('number').value; // Valor do CPF inserido
  const valorEmail = document.getElementById("email").value; // Valor do email inserido
  const valorSenha = document.getElementById("password").value; // Valor da senha inserida

  localStorage.setItem("cpf", valorCPF);
  localStorage.setItem("email", valorEmail);
  localStorage.setItem("senha", valorSenha);

  window.location.href = "home.html";
}

//validarCPF(valorCPF);

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