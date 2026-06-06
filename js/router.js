// js/router.js
import { renderDashboard } from '../main/dashboard.js';
import { renderStudio } from '../main/studio.js';
import { renderSettings } from '../main/settings.js';

const pages = {
    'dashboard': renderDashboard,
    'studio': renderStudio,
    'settings': renderSettings
};

// Функция инициализации роутера, которую мы вызовем после проверки авторизации
export function initRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewport = document.getElementById('view-port');

    if (!viewport) {
        console.error("Роутер: Элемент #view-port не найден на странице!");
        return;
    }

    navItems.forEach(item => {
        // Удаляем старые слушатели, если они были (на всякий случай)
        item.replaceWith(item.cloneNode(true));
    });

    // Перезапрашиваем элементы после клонирования, чтобы повесить чистые события
    const freshNavItems = document.querySelectorAll('.nav-item');

    freshNavItems.forEach(item => {
        item.addEventListener('click', (e) => {
            const pageKey = item.getAttribute('data-page');
            
            if (!pageKey) return;

            // 1. Переключение активного класса (свечения)
            freshNavItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            // 2. Плавная анимация контента через opacity
            viewport.style.opacity = '0';

            // Ждем 300мс (пока идет CSS-анимация), меняем HTML и возвращаем видимость
            setTimeout(() => {
                if (pages[pageKey]) {
                    pages[pageKey](); // Загружаем страницу
                } else {
                    // Если функция рендера не найдена в объекте pages
                    viewport.innerHTML = `<h1 style="text-align:center; margin-top:50px; opacity:0.5;">Вкладка "${pageKey}" еще в разработке</h1>`;
                }
                viewport.style.opacity = '1';
            }, 300);
        });
    });
}
