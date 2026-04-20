// Главная функция отрисовки
function renderCards(data = itTerms) {
    const grid = document.getElementById('termsGrid');
    if (!grid) return;
    grid.innerHTML = '';

    if (data.length === 0) {
        grid.innerHTML = `<p style="text-align:center; grid-column: 1/-1; color: var(--text-light);">Ничего не найдено...</p>`;
        return;
    }

    data.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        
        card.innerHTML = `
            <img src="${item.img}" class="card-img" onerror="this.src='https://via.placeholder.com/300x150/2C2C4E/FFC107?text=${item.t}'">
            <div class="card-content">
                <h3>${item.t}</h3>
                <p>${item.d}</p>
                <a href="https://ru.wikipedia.org/wiki/${item.link}" target="_blank" class="wiki-btn">
                   <i class="fab fa-wikipedia-w"></i> Подробнее
                </a>
            </div>
        `;
        grid.appendChild(card);
    });
}

// ФУНКЦИЯ ПОИСКА (Теперь работает через фильтрацию массива)
function filterTerms() {
    const searchInput = document.getElementById('termSearch');
    if (!searchInput) return;

    const val = searchInput.value.toLowerCase().trim();
    
    // Фильтруем основной массив itTerms из data.js
    const filtered = itTerms.filter(item => 
        item.t.toLowerCase().includes(val) || 
        item.d.toLowerCase().includes(val)
    );

    // Перерисовываем только отфильтрованные карточки
    renderCards(filtered);
}

// Переключение вкладок
function switchTab(tab) {
    const termsSection = document.getElementById('tab-terms');
    const gameSection = document.getElementById('tab-game');
    const btns = document.querySelectorAll('.btn-nav');

    if (tab === 'terms') {
        termsSection.style.display = 'block';
        gameSection.style.display = 'none';
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
        renderCards(); // Обнуляем поиск при возврате
    } else {
        termsSection.style.display = 'none';
        gameSection.style.display = 'block';
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
        if (typeof initMemoryGame === 'function') initMemoryGame();
    }
}

// Запуск при загрузке
document.addEventListener('DOMContentLoaded', () => {
    renderCards();
});