const form = document.getElementById('valid-number');
const aField = document.getElementById('first-number');
const bField = document.getElementById('second-number');
let formValid = false;

function validateNumber(bValue) {
   return parseInt(bValue) > parseInt(aField.value);
}

form.addEventListener('submit', function (e) {
   e.preventDefault();

   formValid = validateNumber(bField.value);
   if (formValid) {
      const containerSuccessMsg = document.querySelector('.success-message');
      containerSuccessMsg.classList.add('visible');
      document.querySelector('.error-message').style.display = 'none';

      aField.value = '';
      bField.value = '';
      bField.classList.remove('error');

      setTimeout(() => {
         containerSuccessMsg.classList.remove('visible');
      }, 800);
   } else {
      bField.classList.add('error');
      document.querySelector('.error-message').style.display = 'block';
      containerSuccessMsg.classList.remove('visible');
   }
});
