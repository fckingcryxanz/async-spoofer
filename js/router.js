// js/router.js
import { renderDashboard } from '../main/dashboard.js';
import { renderStudio } from '../main/studio.js';
import { renderSettings } from '../main/settings.js';

// Объект со всеми страницами. 
// Ключи ДОЛЖНЫ совпадать с data-page="..." у твоих кнопок в HTML!
const pages = {
    'dashboard': renderDashboard,
    'studio': renderStudio,
    'settings': renderSettings
};

export function initRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewport = document.getElementById('view-port');

    if (!viewport) {
        console.error("Роутер: #view-port не найден на странице!");
        return;
    }

    // Вешаем один чистый обработчик на каждую кнопку
    navItems.forEach(item => {
        // Убираем старые слушатели перед добавлением нового, чтобы ничего не дублировалось
        item.onclick = (e) => {
            const pageKey = item.getAttribute('data-page');
            if (!pageKey) return;

            // 1. Переключаем активный класс подсветки в сайдбаре
            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 2. Анимация плавного переключения контента
            viewport.style.opacity = '0';

            setTimeout(() => {
                if (pages[pageKey]) {
                    pages[pageKey](); // Рендерим нужную страницу
                } else {
                    viewport.innerHTML = `<h1 style="text-align:center; margin-top:50px; opacity:0.3; font-family:sans-serif;">Вкладка "${pageKey}" в разработке</h1>`;
                }
                viewport.style.opacity = '1';
            }, 200); // 200мс на анимацию затухания
        };
    });
}
