$(document).ready(() => {
   $('#carousel-img').slick({ autoplay: true });
   $('.menu-hamburger').click(() => { $('nav').slideToggle() });
   $('#telefone').mask('(00) 00000-0000')
   // exemplo se fosse um campo de data
   // $('#data').mask('00/00/0000', {placeholder: '__/__/____'})
   // exemplo se fosse um campo de placa carro (o `S` representa as letras)
   // $('#placa-car').mask('SSS-0000')
   // $('#placa-car-merco').mask('SSS0S00')
   $('form').validate({
      rules: {
         nome: { required: true },
         email: { required: true, email: true },
         telefone: { required: true },
         msg: { required: true },
         vehicleInteresse: { required: false }
      },
      // Caso não queira usar a mensagem padrão, é possível personalizar
      messages: {
         nome: 'Insira seu nome.',
         email: 'Campo obrigatório',
         telefone: 'Campo obrigatório',
         msg: 'Por favor, digite sua mensagem.'
      },
      submitHandler: function (form) {
         console.log(form)
      },
      invalidHandler: function (event, validator) {
         let incorrectFields = validator.numberOfInvalids();
         if (incorrectFields) {
            alert(`Existem ${incorrectFields} campos incorretos.`)
         }
      }
   })

   $('.cars-list button').click(function() {
      const destino = $('#contato');
      const vehicleName = $(this).parent().find('h3').text();

      $('#vehicle-interesse').val(vehicleName);

      $('html').animate({
         scrollTop: destino.offset().top
      }, 1000)
   })
})