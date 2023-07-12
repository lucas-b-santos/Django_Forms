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

  // Máscara específica para telefone (aceita 10 ou 11 dígitos)
  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
    spOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
    };
  $('#id_telefone').mask(SPMaskBehavior, spOptions);

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
  const form = document.querySelector('form')
  form.addEventListener('submit', function (event) {
    for (var i = 0; i < form.length; i++) {
      form[i].classList.remove("is-invalid");
      form[i].classList.remove("is-valid");
    }

    var formValido = true;

    for (var i = 0; i < form.length; i++) {
      if (form[i].getAttribute("id") === "id_cpf_cnpj") {
        if ([14, 18].includes(form[i].value.length)) {
          form[i].classList.add('is-valid');
        } else {
          form[i].classList.add('is-invalid');
          formValido = false;
        }
      } else if (camposParaValidar.includes(form[i].getAttribute("id"))) {
        console.log(form[i].getAttribute("minlength"), form[i].value.length);
        if (form[i].getAttribute("minlength") == form[i].value.length) {
          form[i].classList.add('is-valid');
        } else {
          form[i].classList.add('is-invalid');
          formValido = false;
        }
      } else {
        if (!form[i].value) {
          form[i].classList.add('is-invalid');
          formValido = false;
        } else {
          form[i].classList.add('is-valid');
        }
      }
      }

    
    if ((!formValido) || (!form.checkValidity())) {
      event.preventDefault();
      event.stopPropagation();
    }
  });
});

