import { renderDashboard } from './modules/main/dashboard.js';
import { renderStudio } from './modules/main/studio.js';

const pages = {
    dashboard: renderDashboard,
    studio: renderStudio
};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
        const pageKey = item.getAttribute('data-page');
        if (pages[pageKey]) {
            pages[pageKey](); // Вызываем функцию отрисовки
        }
    });
});

// Загрузка по умолчанию
renderDashboard();
