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

