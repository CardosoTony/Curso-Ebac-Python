$(document).ready(() => {

   $('#telefone').mask('(00) 00000-0000');
   $('#cpf').mask('000.000.000-00');
   $('#cep').mask('00000-000');

   $('form').validate({
      rules: {
         name: {required: true},
         email: {required: true},
      },
      messages: {
         name: 'Insira seu nome.',
         email: 'E-mail obrigatório',
      },

      submitHandler: () => {
         alert('Cadastro enviado com sucesso.');
         form.reset();
      }
   })

})