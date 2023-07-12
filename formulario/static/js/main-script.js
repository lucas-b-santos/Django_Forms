const camposParaValidar = [
  'id_rg', 
  'id_telefone',
  'id_cep',
  'id_estado'
]

$(document).ready(function () {
  'use strict';

  /*O Django gera automaticamente os IDs dos campos concatenando a palavra id com o nome do campo
   (id_*nome-do-campo*); logo, eu aplico as máscaras nos devidos campos como é mostrado abaixo.*/
  $("#id_rg").mask("00.000.000-0");
  $("#id_cep").mask("00000-000");
  $('#id_telefone').mask('(00) 00000-0000');

  // Máscara específica para CPF e CNPJ (aceita 11 ou 14 dígitos)
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
  form.addEventListener('submit', function (event) {
    for (let i = 0; i < form.length; i++) {
      form[i].classList.remove("is-invalid");
      form[i].classList.remove("is-valid");
    }

    let formValido = true;
    let regEx =  /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ ]+$/

    for (let i = 0; i < form.length; i++) {
      if (form[i].getAttribute("id") === "id_cpf_cnpj") {
        if ([14, 18].includes(form[i].value.length)) {
          form[i].classList.add('is-valid');
        } else {
          form[i].classList.add('is-invalid');
          formValido = false;
        }
      } else if (camposParaValidar.includes(form[i].getAttribute("id"))) {
        if (form[i].getAttribute("minlength") == form[i].value.length) {
          form[i].classList.add('is-valid');
        } else {
          form[i].classList.add('is-invalid');
          formValido = false;
        }
      } else {
        if (!form[i].value && form[i].hasAttribute("id")) {
          form[i].classList.add('is-invalid');
          formValido = false;
        } else if (form[i].getAttribute("type") == "text") {
          if (regEx.test(form[i].value)) {
            form[i].classList.add('is-valid');
          } else {
            form[i].classList.add('is-invalid');
            formValido = false;
          }
        } else {
          form[i].classList.add('is-valid');
        }
      }
      }

    if (!formValido) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

