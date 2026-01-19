// Obtener elementos del DOM
const card = document.getElementById('card');
const btnGenerate = document.getElementById('btnGenerate');
const btnAuto = document.getElementById('btnAuto');
const btnStop = document.getElementById('btnStop');

// Arrays de palos y valores
const suits = [
    { symbol: '♠', name: 'spade', color: 'black' },
    { symbol: '♣', name: 'club', color: 'black' },
    { symbol: '♥', name: 'heart', color: 'red' },
    { symbol: '♦', name: 'diamond', color: 'red' }
];

const values = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];

// Variable para controlar el auto-generador
let autoGenerateInterval = null;

// Función auxiliar: generar número aleatorio
function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}

// Función para generar una carta aleatoria
function generateRandomCard() {
    const randomSuit = suits[getRandomNumber(suits.length)];
    const randomValue = values[getRandomNumber(values.length)];

    renderCard(randomSuit, randomValue);
}

// Array de imágenes del Joker
const jokerBackgrounds = [
  '/img/descarga (1).jpg',
  '/img/descarga (3).jpg',
  '/img/descarga (4).jpg',
  '/img/descarga.jpg'
];


// Función para renderizar la carta en el DOM
function renderCard(suit, value) {
    const topSuit = card.querySelector('.top-suit');
    const number = card.querySelector('.number');
    const bottomSuit = card.querySelector('.bottom-suit');
    
    topSuit.textContent = suit.symbol;
    number.textContent = value;
    bottomSuit.textContent = suit.symbol;
    
    card.className = 'card';
    card.classList.add(suit.color);

    // Seleccionar un fondo Joker aleatorio
    const randomBg = jokerBackgrounds[getRandomNumber(jokerBackgrounds.length)];
    card.style.backgroundImage = `url('${randomBg}')`;
    card.style.backgroundSize = 'cover';
    card.style.backgroundPosition = 'center';

    // Animación
    card.style.transform = 'scale(0.9)';
    setTimeout(function() {
        card.style.transform = 'scale(1)';
    }, 100);
}

// Event Listeners
btnGenerate.addEventListener('click', function () {
    generateRandomCard();
});

btnAuto.addEventListener('click', function () {
    if (autoGenerateInterval) {
        alert('Ya está en modo automático');
        return;
    }

    autoGenerateInterval = setInterval(function () {
        generateRandomCard();
    }, 3000);

    btnAuto.textContent = '✓ Auto-Generando...';
    btnAuto.style.opacity = '0.5';
});

btnStop.addEventListener('click', function () {
    if (autoGenerateInterval) {
        clearInterval(autoGenerateInterval);
        autoGenerateInterval = null;

        btnAuto.textContent = 'Auto-Generar (cada 3s)';
        btnAuto.style.opacity = '1';
    }
});

// Generar una carta inicial
generateRandomCard();

