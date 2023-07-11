var camposValidos = true;

var tamanhoCampos = {
  'rg':12,
  'cpf_cnpj':[14, 18],
  'telefone':15,
  'cep':9
}

$(document).ready(function () {
  'use strict';
  /*O Django gera automaticamente os IDs dos campos concatenando a palavra id com o nome do campo
   (id_*nome-do-campo*); logo, eu aplico as máscaras nos devidos campos como é mostrado abaixo.*/
  $("#id_rg").mask("00.000.000-0");
  $("#id_cep").mask("00000-000");



  var SPMaskBehavior = function (val) {
    return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
  },
    spOptions = {
      onKeyPress: function (val, e, field, options) {
        field.mask(SPMaskBehavior.apply({}, arguments), options);
      }
    };
  $('#id_telefone').mask(SPMaskBehavior, spOptions);

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
  var forms = document.getElementsByClassName('needs-validation'); //pega todos os forms da página
  Array.prototype.filter.call(forms, function (form) {
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      event.stopPropagation();

      for(var i = 0; i < form.length; i++){
        if (form[i].getAttribute("minlength") === form[i].value.length) {
          form[i].classList.add('is-valid');
        } else {
          form[i].classList.add('is-invalid');
        }
      }
      // if (form.checkValidity() === false) {

      // }
      // form.classList.add('was-validated');
    }, false);
  });



})

