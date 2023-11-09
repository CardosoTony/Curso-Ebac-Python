$(document).ready(() => {
   $('header button').click(() => {
      $('form').slideDown();
   })

   $('#cancel-btn').click(() => {
      $('form').slideUp();
   })

   $('form').on('submit', (e) => {

      e.preventDefault();

      const linkNewImg = $('#link-new-img').val();
      const newItem = $('<li style="display: none"></li>');

      $(`<img src="${linkNewImg}">`).appendTo(newItem);

      $(`
         <div class="overlay-img-link">
            <a href="${linkNewImg}" target="_blank" title="Ver tamanho real">
               Ver tamanho real
            </a>
         </div>
      `).appendTo(newItem);
      
      $(newItem).appendTo('ul');
      $(newItem).fadeIn(1000);
      $('#link-new-img').val('');
   })
})
