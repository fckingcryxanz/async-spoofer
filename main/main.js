// Импортируем все функции рендеринга из соседних файлов
import { renderDashboard } from './dashboard.js';
import { renderTutorial } from './tutorial.js';
import { renderStudio } from './studio.js';
import { renderHub } from './hub.js';
import { renderSettings } from './settings.js';

export const MainModule = {
    init: () => {
        // Список всех твоих страниц и кнопок
        const routes = [
            { id: 'nav-dashboard', path: '/dash', render: renderDashboard },
            { id: 'nav-tutorial', path: '/tutorial', render: renderTutorial },
            { id: 'nav-studio', path: '/studio', render: renderStudio },
            { id: 'nav-hub', path: '/hub', render: renderHub },
            { id: 'nav-settings', path: '/settings', render: renderSettings }
        ];

        // Автоматически назначаем события на все кнопки
        routes.forEach(route => {
            const element = document.getElementById(route.id);
            if (element) {
                element.onclick = () => MainModule.navigate(route.path, route.render);
            }
        });
        
        console.log("Main Module Loaded & Routes Initialized");
    },

    navigate: (path, renderFunction) => {
        window.history.pushState(null, '', path);
        if (renderFunction) renderFunction();
    },

    createCard: (title, content) => {
        return `
            <div class="glass-card">
                <h3>${title}</h3>
                <div class="card-body">${content}</div>
            </div>
        `;
    }
};
