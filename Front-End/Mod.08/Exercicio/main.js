document.addEventListener('DOMContentLoaded', () => {
   const inputPhone = document.getElementById('tel');
   const msgName = document.getElementById('message-name');
   const msgPhone = document.getElementById('message-phone');
   const form = document.getElementById('form-contact');
   const inputName = document.getElementById('name');
   const inputEmail = document.getElementById('email');

   const contacts = [];

   function capitalize(str) {
      return str[0].toUpperCase() + str.substr(1).toLowerCase();
   }

   // format number (00) 12345-6789 or (00) 1234-5678
   function formatPhoneNumber(phone) {
      const cleaned = `${phone}`.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      if (match) {
         return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return phone;
   }

   function clearErrorMessage() {
      msgName.textContent = '';
      msgPhone.textContent = '';
   }

   function showErrorMessageName(message) {
      msgName.textContent = message;
      setTimeout(() => {
         clearErrorMessage();
      }, 1500);
   }

   function showErrorMessagePhone(message) {
      msgPhone.textContent = message;
      setTimeout(() => {
         clearErrorMessage();
      }, 1500);
   }

   function validateFields() {
      const lowerCaseName = inputName.value.toLowerCase();
      const formattedPhone = formatPhoneNumber(inputPhone.value);

      const nameExists = contacts.some((contact) => contact.name.toLowerCase() === lowerCaseName);
      const phoneExists = contacts.some((contact) => contact.formattedPhone === formattedPhone);

      if (nameExists && phoneExists) {
         showErrorMessageName(`O contato ${inputName.value.toLowerCase().split(' ').map(capitalize).join(' ')} já existe`);
         showErrorMessagePhone(`O telefone ${formattedPhone} já existe`);
         return false;
      }

      if (nameExists) {
         showErrorMessageName(`O contato ${inputName.value.toLowerCase().split(' ').map(capitalize).join(' ')} já existe`);
         return false;
      }

      if (phoneExists) {
         showErrorMessagePhone(`O telefone ${formattedPhone} já existe`);
         return false;
      }

      return true;
   }

   function addContactToList(contact) {
      const bodyList = document.querySelector('tbody');
      const row = document.createElement('tr');
      row.innerHTML = `
         <td class="name">
            <div>
            <img src="./images/user.png">
            <p>${contact.name.toLowerCase().split(' ').map(capitalize).join(' ')}</p>
            </div>
         </td>
         <td class="phone-number">
            <div>
            <img src="./images/phone.png">
            <p id="number-formatted">${contact.formattedPhone}</p>
            </div>
         </td>
         <td class="email-contact">
            <div>
            <img src="./images/email.png">
            <p>${contact.email}</p>
            </div>
         </td>`;
      bodyList.appendChild(row);
   }

   function clearFormFields() {
      inputName.value = '';
      inputPhone.value = '';
      inputEmail.value = '';
   }

   form.addEventListener('submit', (e) => {
      e.preventDefault();

      if (!validateFields()) {
         return;
      }

      const contact = {
         name: inputName.value,
         formattedPhone: formatPhoneNumber(inputPhone.value),
         email: inputEmail.value,
      };

      contacts.push(contact);
      addContactToList(contact);
      clearFormFields();
      clearErrorMessage();
   });
});
