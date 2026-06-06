export const MainModule = {
    init: () => {
        console.log("Main Module Loaded");
    },
    
    // Новая функция для навигации
    navigate: (path, renderFunction) => {
        window.history.pushState(null, '', path);
        if (renderFunction) renderFunction();
    },

    // Функция для создания стандартных карточек
    createCard: (title, content) => {
        return `
            <div class="glass-card">
                <h3>${title}</h3>
                <div class="card-body">${content}</div>
            </div>
        `;
    }
};
