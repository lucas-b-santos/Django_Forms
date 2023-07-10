$(document).ready(function(){
  /*O Django gera automaticamente os IDs dos campos concatenando a palavra id com o nome do campo
   (id_*nome-do-campo*); logo, eu aplico as máscaras nos devidos campos como é mostrado abaixo.*/
    $("#id_rg").mask("00.000.000-0"); 

    var SPMaskBehavior = function (val) {
        return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
      },
      spOptions = {
        onKeyPress: function(val, e, field, options) {
            field.mask(SPMaskBehavior.apply({}, arguments), options);
          }
      };
    $('#id_telefone').mask(SPMaskBehavior, spOptions);

    var cpfCnpjMaskBehavior = function (val) {
      return val.replace(/\D/g, '').length === 14 ? '00.000.000/0000-00' : '000.000.000-00999';
    },
    cpfCnpjOptions = {
      onKeyPress: function(val, e, field, options) {
          field.mask(cpfCnpjMaskBehavior.apply({}, arguments), options);
        }
    };

    $('#id_cpf_cnpj').mask(cpfCnpjMaskBehavior, cpfCnpjOptions);

  

})

