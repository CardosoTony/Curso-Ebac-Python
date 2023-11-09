const form = document.getElementById('form-atividade');
const imgAprovado = '<img src="./images/aprovado.png" alt="Emoji celebrando" />';
const imgReprovado = '<img src="./images/reprovado.png" alt="Emoji decepcionado" />';
const atividades = [];
const notas = [];
const spanAprovado = '<span class="resultado aprovado">Aprovado</span>';
const spanReprovado = '<span class="resultado reprovado">Reprovado</span>';
const notaMin = parseFloat(prompt('Digite a nota mínima:'));

let lines = '';

form.addEventListener('submit', function (e) {
   e.preventDefault();

   adicionaLinha();
   atualizaTabela();
   atualizaMediaFinal();
});

function adicionaLinha() {
   const inputNomeAtividade = document.getElementById('nome-atividade');
   const inputNotaAtividade = document.getElementById('nota-atividade');

   if (atividades.includes(inputNomeAtividade.value)) {
      alert(`A atividade: ${inputNomeAtividade.value} já foi inserida`);
   } else {
      atividades.push(inputNomeAtividade.value);
      notas.push(parseFloat(inputNotaAtividade.value));

      let line = '<tr>';
      line += `<td>${inputNomeAtividade.value}</td>`;
      line += `<td>${inputNotaAtividade.value}</td>`;
      line += `<td>${inputNotaAtividade.value >= notaMin ? imgAprovado : imgReprovado}</td>`;
      line += '</tr>';

      lines += line;
   }

   inputNomeAtividade.value = '';
   inputNotaAtividade.value = '';
}

function atualizaTabela() {
   const corpoTabela = document.querySelector('tbody');
   corpoTabela.innerHTML = lines;
}

function atualizaMediaFinal() {
   const mediaFinal = calculaMediaFinal();

   document.getElementById('media-final-valor').innerHTML = mediaFinal.toFixed(2);
   document.getElementById('media-final-resultado').innerHTML = mediaFinal >= notaMin ? spanAprovado : spanReprovado;
}

function calculaMediaFinal() {
   let somaDasNotas = 0;

   for (let i = 0; i < notas.length; i++) {
      somaDasNotas += notas[i];
   }

   return somaDasNotas / notas.length;
}
