// function validarRG(rg) {
//   rg = rg.replace(/[^\d]+/g, '');

//   var cont = 9;
//   var soma = 0;
//   // Somatório das multiplicações dos 8 primeiros dígitos do rg
//   for (digito in rg.substring(0, 8)) {
//     soma += parseInt(rg.substring(0, 8)[digito]) * cont;
//     cont -= 1;
//   }
//   // Calcula dv fazendo somatório mod 11
//   var dv = soma % 11;

//   // Verifica se dv calculado coincide com dv fornecido no RG (último dígito)
//   if ((dv == 10) && (rg[8] == 'X')) {
//     return true;
//   }
//   else if (parseInt(rg[8]) == dv) {
//     return true;

//   } else {
//     return false;
//   }
// }

function validarCNPJ(cnpj) {
  cnpj = cnpj.replace(/[^\d]+/g, '');

  if (cnpj.length != 14) return false;


  // Elimina CNPJs invalidos conhecidos
  if (cnpj == "00000000000000" ||
    cnpj == "11111111111111" ||
    cnpj == "22222222222222" ||
    cnpj == "33333333333333" ||
    cnpj == "44444444444444" ||
    cnpj == "55555555555555" ||
    cnpj == "66666666666666" ||
    cnpj == "77777777777777" ||
    cnpj == "88888888888888" ||
    cnpj == "99999999999999")
    return false;

  // Valida DVs
  tamanho = cnpj.length - 2
  numeros = cnpj.substring(0, tamanho);
  digitos = cnpj.substring(tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(0))
    return false;

  tamanho = tamanho + 1;
  numeros = cnpj.substring(0, tamanho);
  soma = 0;
  pos = tamanho - 7;
  for (i = tamanho; i >= 1; i--) {
    soma += numeros.charAt(tamanho - i) * pos--;
    if (pos < 2)
      pos = 9;
  }
  resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
  if (resultado != digitos.charAt(1))
    return false;

  return true;

}

function validarCPF(strCPF) {
  strCPF = strCPF.replace(/[^\d]+/g, '');

  if (strCPF.length != 11) return false;

  let Soma = 0;
  let Resto;

  // Elimina CPFs invalidos conhecidos
  if (strCPF == "00000000000" ||
    strCPF == "11111111111" ||
    strCPF == "22222222222" ||
    strCPF == "33333333333" ||
    strCPF == "44444444444" ||
    strCPF == "55555555555" ||
    strCPF == "66666666666" ||
    strCPF == "77777777777" ||
    strCPF == "88888888888" ||
    strCPF == "99999999999")
    return false;

  for (i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10))) return false;

  Soma = 0;
  for (i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if ((Resto == 10) || (Resto == 11)) Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11))) return false;
  return true;
}

const camposEndereco = [
  'id_cep',
  'id_logradouro',
  'id_bairro',
  'id_cidade',
  'id_uf'
]

//Regex para validação de nomes (Pessoa, Estado, Bairro etc)
const regEx1 = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/
const regEx2 = /^(?![ ])(?!.*[ ]{2})((?:e|da|do|das|dos|de|d'|D'|la|las|el|los)\s*?|(?:[A-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð'][^\s]*\s*?)(?!.*[ ]$))+$/;

$(document).ready(function () {
  'use strict';

  /*O Django gera automaticamente os IDs dos campos concatenando a palavra id com o nome do campo
   (id_*nome-do-campo*); logo, eu aplico as máscaras nos devidos campos como é mostrado abaixo.*/
  $("#id_rg").mask("00.000.000-A");
  $('#id_telefone').mask('(00) 00000-0000');
  $('#id_cep').mask('00000-000');

  // Máscara específica para CPF/CNPJ (aceita 11 ou 14 dígitos)
  var cpfCnpjMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 14 ? '00.000.000/0000-00' : '000.000.000-00999';
  },
    cpfCnpjOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(cpfCnpjMaskBehavior.apply({}, arguments), options);
      }
    };

  $('#id_cpf_cnpj').mask(cpfCnpjMaskBehavior, cpfCnpjOptions);

  // Validação de campos client-side
  const form = document.querySelector('form');

  let formValido = true;
  let cepValido = true;
  let enderecosJSON;



  async function pesquisaCEP() {
    return new Promise(async resolve => {
      console.log("FOCUSOUT!!");
      for (let i = 0; i < form.length; i++) {
        if (camposEndereco.includes(form[i].getAttribute("id"))) {
          form[i].classList.remove("is-invalid");
          form[i].classList.remove("is-valid");
        }
      }
  
      if (form.id_cep.value.length != 9) {
        $("#invalid-feedback-cep").html("Informe um CEP válido!");
        form.id_cep.classList.add("is-invalid");
        cepValido = false;
        resolve(false);
      }
  
      const valor = await fetch(`https://viacep.com.br/ws/${form.id_cep.value.replace(/\D/g, '')}/json/`);
      const result = await valor.json();
  
      if (result.erro) {
        cepValido = false;
        $("#invalid-feedback-cep").html("Informe um CEP válido!");
        form.id_cep.classList.add('is-invalid');
        resolve(false);
      }
      cepValido = true;
      enderecosJSON = result;
      form.id_logradouro.value = result.logradouro;
      form.id_bairro.value = result.bairro;
      form.id_cidade.value = result.localidade;
      form.id_uf.value = result.uf;
      form.id_cep.classList.add('is-valid');
      resolve(true);

    });
  }

  form.id_cep.addEventListener('focusout', pesquisaCEP);

  form.addEventListener('submit', async function (event) {

    const pesquisou = await pesquisaCEP();
    console.log(pesquisou);
    console.log(enderecosJSON);
    formValido = true;

    for (let i = 0; i < form.length; i++) {
      if (form[i].getAttribute("id") != "id_cep") {
        form[i].classList.remove("is-invalid");
        form[i].classList.remove("is-valid");
      }
    }

    for (let i = 0; i < form.length; i++) {
      if (!form[i].value && form[i].hasAttribute("id")) {
        $("#invalid-feedback-" + form[i].getAttribute("id").slice(3)).html("Preencha este campo.");
        form[i].classList.add('is-invalid');
        formValido = false;
      } else {
        let partesDataNasc = form.id_data_nascimento.value.split("-");
        let partesDataIni = form.id_data_inicial.value.split("-");
        let partesDataFinal = form.id_data_final.value.split("-");
        let data = new Date(partesDataNasc[0], partesDataNasc[1] - 1, partesDataNasc[2]);
        let dataIni = new Date(partesDataIni[0], partesDataIni[1] - 1, partesDataIni[2]);
        let dataFinal = new Date(partesDataFinal[0], partesDataFinal[1] - 1, partesDataFinal[2]);
        switch (form[i].getAttribute("id")) {
          case "id_cpf_cnpj":
            if (validarCPF(form[i].value) || validarCNPJ(form[i].value)) {
              form[i].classList.add('is-valid');
            } else {
              $("#invalid-feedback-cpf_cnpj").html("Informe um CPF/CNPJ válido!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_rg":
            if (form[i].getAttribute("minlength") == form[i].value.length) {
              form[i].classList.add('is-valid');
            } else {
              $("#invalid-feedback-rg").html("Informe um RG válido!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_telefone":
            if (form[i].getAttribute("minlength") == form[i].value.length) {
              form[i].classList.add('is-valid');
            } else {
              $("#invalid-feedback-telefone").html("Informe um telefone válido!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_nome":
            if (regEx1.test(form[i].value) && regEx2.test(form[i].value)) {
              form[i].classList.add('is-valid');
            } else {
              $("#invalid-feedback-nome").html("Informe um nome válido! (apenas letras)");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_data_nascimento":
            if (data > new Date()) {
              $("#invalid-feedback-data_nascimento").html("Informe uma data de nascimento válida!");
              form[i].classList.add('is-invalid');
              formValido = false;
            } else {
              form[i].classList.add('is-valid');
            }
            break;
          case "id_data_inicial":
            if (dataIni > dataFinal || dataIni < new Date()) {
              $("#invalid-feedback-data_inicial").html("Informe uma data inicial válida!");
              form[i].classList.add('is-invalid');
              formValido = false;
            } else {
              form[i].classList.add('is-valid');
            }
            break;
          case "id_data_final":
            if (dataIni > dataFinal || dataFinal < new Date()) {
              $("#invalid-feedback-data_final").html("Informe uma data final válida!");
              form[i].classList.add('is-invalid');
              formValido = false;
            } else {
              form[i].classList.add('is-valid');
            }
            break;

          case "id_logradouro":
            if (cepValido) {
              if (form.id_logradouro.value.toUpperCase() != enderecosJSON.logradouro.toUpperCase()) {
                $("#invalid-feedback-logradouro").html("CEP e logradouro não correspondem!");
                form[i].classList.add('is-invalid');
                formValido = false;
              } else {
                form[i].classList.add('is-valid');
              }
            } else {
              $("#invalid-feedback-logradouro").html("Infome um CEP válido primeiro!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_bairro":
            if (cepValido) {
              if (form.id_bairro.value.toUpperCase() != enderecosJSON.bairro.toUpperCase()) {
                $("#invalid-feedback-bairro").html("CEP e bairro não correspondem!");
                form[i].classList.add('is-invalid');
                formValido = false;
              } else {
                form[i].classList.add('is-valid');
              }
            } else {
              $("#invalid-feedback-bairro").html("Infome um CEP válido primeiro!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_cidade":
            if (cepValido) {
              if (form.id_cidade.value.toUpperCase() != enderecosJSON.localidade.toUpperCase()) {
                $("#invalid-feedback-cidade").html("CEP e cidade não correspondem!");
                form[i].classList.add('is-invalid');
                formValido = false;
              } else {
                form[i].classList.add('is-valid');
              }
            } else {
              $("#invalid-feedback-cidade").html("Infome um CEP válido primeiro!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;
          case "id_uf":
            if (cepValido) {
              if (form.id_uf.value.toUpperCase() != enderecosJSON.uf.toUpperCase()) {
                $("#invalid-feedback-uf").html("CEP e UF não correspondem!");
                form[i].classList.add('is-invalid');
                formValido = false;
              } else {
                form[i].classList.add('is-valid');
              }
            } else {
              $("#invalid-feedback-uf").html("Infome um CEP válido primeiro!");
              form[i].classList.add('is-invalid');
              formValido = false;
            }
            break;

          default:
            if (form[i].getAttribute("id") != "id_cep") {
              form[i].classList.add('is-valid');
            }
            break;
        }
      }
    }

    if (!formValido) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

