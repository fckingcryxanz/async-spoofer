// Импортируй сюда функции рендеринга, если они нужны
// import { renderDashboard } from './dashboard.js';
// import { renderSettings } from './settings.js';

export const MainModule = {
    init: () => {
        console.log("Main Module Loaded");

        // Подключаем события здесь, внутри метода init
        const navDash = document.getElementById('nav-dashboard');
        if (navDash) {
            navDash.onclick = () => MainModule.navigate('/dash', renderDashboard);
        }

        const navSettings = document.getElementById('nav-settings');
        if (navSettings) {
            navSettings.onclick = () => MainModule.navigate('/settings', renderSettings);
        }
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
