// public/modules/main/main.js
export const MainModule = {
    init: () => {
        console.log("Main Module Loaded");
    },
    // Функция для создания стандартных карточек в стиле iOS
    createCard: (title, content) => {
        return `
            <div class="glass-card">
                <h3>${title}</h3>
                <div class="card-body">${content}</div>
            </div>
        `;

        // 1. Импортируй нужные модули (пример)
import { renderDashboard } from './dashboard.js';
// import { renderStudio } from './studio.js'; 

// 2. Функция обработки переходов
export function navigate(path, renderFunction) {
    window.history.pushState({}, '', path);
    renderFunction();
}

// 3. Инициализация (навешивание событий на кнопки меню)
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('nav-dash').addEventListener('click', () => navigate('/dash', renderDashboard));
    // document.getElementById('nav-studio').addEventListener('click', () => navigate('/studio', renderStudio));
    // и так далее для остальных кнопок
});

