$(document).ready(() => {
   $('header button').click(() => {
      $('form').slideDown();
   });

   $('#cancel-btn').click(() => {
      $('form').slideUp();
   });

   $('form').on('submit', (e) => {
      e.preventDefault();

      const newTodo = $('#todo-name').val();
      const newTodoLine = $('<li style="display: none"></li>');

      $(`<span>${newTodo}</span>`).appendTo(newTodoLine);

      $(newTodoLine).appendTo('ul');
      $(newTodoLine).fadeIn(800);
      $('#todo-name').val('');
   });

   $('ul').on('click', 'li', function () {
      $(this).toggleClass('through');
   });
});