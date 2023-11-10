document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('random-form').addEventListener('submit', function (event) {
    event.preventDefault();
    let maxNumber = document.getElementById('number-max').value;
    maxNumber = parseInt(maxNumber);

    let randomNumber = Math.random() * maxNumber;
    console.log(randomNumber + 1);
    randomNumber = Math.floor(randomNumber + 1);

    document.getElementById('result-value').innerText = randomNumber;
    document.querySelector('.result').style.display = 'block';
  })
})