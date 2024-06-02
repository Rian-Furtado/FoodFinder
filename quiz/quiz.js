let allFoods = [];
let currentFoodIndex = 0;
let lives = 5;
let correctAnswers = 0;

function startGame() {
  fetch('https://api-broccoli.onrender.com/api/foods')
    .then(response => response.json())
    .then(data => {
      allFoods = data;
      showQuestion();
    })
    .catch(error => console.error('Error:', error));
}

function showQuestion() {
  if (lives === 0 || currentFoodIndex >= allFoods.length) {
    endGame();
    return;
  }

  let food = allFoods[currentFoodIndex];
  let foodCard = document.getElementById('foodCard');
  foodCard.innerHTML = `<h2>${food.name}</h2><p>${food.description}</p><img src="${food.imageUrl}" alt="${food.name}">`;
}

function checkAnswer(userAnswer) {
  let food = allFoods[currentFoodIndex];
  if (userAnswer.toLowerCase() === food.region.toLowerCase()) {
    alert('Resposta correta!');
    correctAnswers++;
    currentFoodIndex++;
  } else {
    alert('Resposta incorreta!');
    lives--;
  }
  showQuestion();
}

function endGame() {
  if (lives === 0) {
    alert(`Você perdeu todas as suas vidas. Você acertou ${correctAnswers} de ${allFoods.length} pratos.`);
    document.getElementById('restartButton').style.display = 'block';
  } else {
    alert(`Parabéns! Você completou o quiz com ${lives} vidas restantes. Você acertou ${correctAnswers} de ${allFoods.length} pratos cadastrados.`);
    document.getElementById('restartButton').style.display = 'block';
  }
}

function restartGame() {
  // Reinicia as variáveis do jogo
  currentFoodIndex = 0;
  lives = 5;
  correctAnswers = 0;

  // Esconde o botão "Jogar Novamente"
  document.getElementById('restartButton').style.display = 'none';

  // Inicia o jogo novamente
  startGame();
}
startGame();