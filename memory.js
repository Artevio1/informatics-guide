let firstCard = null;
let secondCard = null;
let lockBoard = false;

function initMemoryGame() {
    const board = document.getElementById('memoryBoard');
    if (!board) return;
    board.innerHTML = '';
    [firstCard, secondCard, lockBoard] = [null, null, false];

    // Берем 6 терминов
    const gameCards = [];
    itTerms.slice(0, 6).forEach(item => {
        gameCards.push({ text: item.t, id: item.t });
        gameCards.push({ text: item.d.substring(0, 40) + '...', id: item.t });
    });

    gameCards.sort(() => 0.5 - Math.random());

    gameCards.forEach(data => {
        const card = document.createElement('div');
        card.className = 'memory-card';
        card.dataset.id = data.id;
        card.innerHTML = `<span style="display:none">${data.text}</span>`;
        card.onclick = flipCard;
        board.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard || this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('span').style.display = 'block';

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    if (firstCard.dataset.id === secondCard.dataset.id) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        [firstCard, secondCard, lockBoard] = [null, null, false];
    } else {
        setTimeout(() => {
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            firstCard.querySelector('span').style.display = 'none';
            secondCard.querySelector('span').style.display = 'none';
            [firstCard, secondCard, lockBoard] = [null, null, false];
        }, 1000);
    }
}