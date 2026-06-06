// js/router.js
import { renderDashboard } from '../main/dashboard.js';
import { renderStudio } from '../main/studio.js';
import { renderSettings } from '../main/settings.js';

const pages = {
    'dashboard': renderDashboard,
    'studio': renderStudio,
    'settings': renderSettings
};

export function initRouter() {
    console.log("-> Роутер инициализирован!");
    const navItems = document.querySelectorAll('.nav-item');
    const viewport = document.getElementById('view-port');

    if (!viewport) {
        console.error("-> РОУТЕР ОШИБКА: #view-port не найден!");
        return;
    }

    navItems.forEach(item => {
        item.onclick = (e) => {
            const pageKey = item.getAttribute('data-page');
            console.log(`-> Кликнули по вкладке: ${pageKey}`);
            
            if (!pageKey) return;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            if (pages[pageKey]) {
                pages[pageKey](); // Рендерим мгновенно без таймаутов
            } else {
                viewport.innerHTML = `<h1 style="text-align:center; margin-top:50px; opacity:0.3;">Вкладка "${pageKey}" в разработке</h1>`;
                viewport.style.opacity = '1';
                viewport.style.display = 'block';
            }
        };
    });
}
