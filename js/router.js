import { renderDashboard } from '../main/dashboard.js';
import { renderStudio } from '../main/studio.js';
// Если у тебя есть другие файлы (tutorial, settings), импортируй их сюда тоже

const pages = {
    dashboard: renderDashboard,
    studio: renderStudio
    // tutorial: renderTutorial,
    // settings: renderSettings
};

// Находим все кнопки в меню
const navItems = document.querySelectorAll('.nav-item');
const viewport = document.getElementById('view-port');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // 1. ПЕРЕКЛЮЧЕНИЕ СВЕЧЕНИЯ
        // Убираем класс 'active' у всех кнопок
        navItems.forEach(i => i.classList.remove('active'));
        // Добавляем класс 'active' только той, на которую кликнули
        item.classList.add('active');

        // 2. ПЛАВНАЯ АНИМАЦИЯ КОНТЕНТА
        const pageKey = item.getAttribute('data-page');
        
        // Плавно растворяем текущий контент
        viewport.style.opacity = '0';

        // Ждем 300мс (пока идет CSS анимация opacity) и меняем HTML
        setTimeout(() => {
            if (pages[pageKey]) {
                pages[pageKey](); // Загружаем новую страницу
            } else {
                // Если страницы еще нет, показываем заглушку
                viewport.innerHTML = `<h1>Вкладка ${pageKey} еще в разработке</h1>`;
            }
            
            // Плавно проявляем новый контент
            viewport.style.opacity = '1';
        }, 300);
    });
});

// Загружаем Дашборд по умолчанию при открытии сайта
renderDashboard();
