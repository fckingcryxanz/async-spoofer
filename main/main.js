export const MainModule = {
   // Пример подключения события для кнопки меню
document.getElementById('nav-dashboard').onclick = () => {
    MainModule.navigate('/dash', renderDashboard);
};

document.getElementById('nav-settings').onclick = () => {
    MainModule.navigate('/settings', renderSettings);
};
    navigate: (path, renderFunction) => {
        window.history.pushState(null, '', path);
        if (renderFunction) renderFunction();
    },
    
    init: () => {
        console.log("Main Module Loaded");
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
