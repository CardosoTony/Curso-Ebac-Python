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

   function formatPhoneNumber(phone) {
      const cleaned = `${phone}`.replace(/\D/g, '');
      const match = cleaned.match(/^(\d{2})(\d{4,5})(\d{4})$/);
      if (match) {
         return `(${match[1]}) ${match[2]}-${match[3]}`;
      }
      return phone;
   }

   function showErrorMessageName(message) {
      msgName.textContent = message;
   }

   function showErrorMessagePhone(message) {
      msgPhone.textContent = message;
   }

   function clearErrorMessage() {
      msgName.textContent = '';
      msgPhone.textContent = '';
   }

   function validateFields() {
      const lowerCaseName = inputName.value.toLowerCase();
      const formattedPhone = formatPhoneNumber(inputPhone.value);

      const nameExists = contacts.some((contact) => contact.name.toLowerCase() === lowerCaseName);
      const phoneExists = contacts.some((contact) => contact.formattedPhone === formattedPhone);

      if (nameExists || phoneExists) {
         if (nameExists) {
            showErrorMessageName(`O contato ${inputName.value.toLowerCase().split(' ').map(capitalize).join(' ')} já existe`);
         }

         if (phoneExists) {
            showErrorMessagePhone(`O telefone ${formattedPhone} já existe`);
         }
         return false;
      }

      return true;
   }

   function sortContactsByName() {
      contacts.sort((a, b) => a.name.localeCompare(b.name));
   }

   function editContact(index) {
      const contact = contacts[index];
      inputName.value = contact.name;
      inputPhone.value = contact.formattedPhone;
      inputEmail.value = contact.email;
      // Atribuir o índice do contato sendo editado a um atributo data-*
      form.setAttribute('data-edit-index', index);
   }

   function createEditButton(index) {
      const editButton = document.createElement('button');
      editButton.textContent = 'Editar';
      editButton.addEventListener('click', () => {
         editContact(index);
      });
      return editButton;
   }

   function addContactToList(contact, index) {
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

      const editButtonCell = document.createElement('td');
      editButtonCell.appendChild(createEditButton(index));

      const removeButtonCell = document.createElement('td');
      removeButtonCell.appendChild(createRemoveButton(index));

      row.appendChild(editButtonCell);
      row.appendChild(removeButtonCell);

      bodyList.appendChild(row);
   }

   function clearFormFields() {
      inputName.value = '';
      inputPhone.value = '';
      inputEmail.value = '';
   }

   function removeContact(index) {
      contacts.splice(index, 1);
      updateList();
   }

   function createRemoveButton(index) {
      const removeButton = document.createElement('button');
      removeButton.textContent = 'Remover';
      removeButton.addEventListener('click', () => {
         removeContact(index);
      });
      return removeButton;
   }

   function updateList() {
      sortContactsByName(); // Ordena os contatos pelo nome antes de atualizar a lista

      const bodyList = document.querySelector('tbody');
      bodyList.innerHTML = '';

      contacts.forEach((contact, index) => {
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

         const editButtonCell = document.createElement('td');
         editButtonCell.appendChild(createEditButton(index));

         const removeButtonCell = document.createElement('td');
         removeButtonCell.appendChild(createRemoveButton(index));

         row.appendChild(editButtonCell);
         row.appendChild(removeButtonCell);

         bodyList.appendChild(row);
      });
   }

   form.addEventListener('submit', (e) => {
      e.preventDefault();

      const editIndex = form.getAttribute('data-edit-index');

      if (editIndex !== null) {
         // Editar contato existente
         contacts[editIndex] = {
            name: inputName.value,
            formattedPhone: formatPhoneNumber(inputPhone.value),
            email: inputEmail.value,
         };
         form.removeAttribute('data-edit-index'); // Limpar o atributo após a edição
      } else {
         // Adicionar novo contato
         if (!validateFields()) {
            return;
         }
         const contact = {
            name: inputName.value,
            formattedPhone: formatPhoneNumber(inputPhone.value),
            email: inputEmail.value,
         };
         contacts.push(contact);
      }

      updateList(); // Atualiza a lista após adicionar o novo contato
      clearFormFields();
      clearErrorMessage();
   });
});
