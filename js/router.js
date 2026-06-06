// js/router.js

export function initRouter() {
    const navItems = document.querySelectorAll('.nav-item');
    const viewPort = document.getElementById('view-port');

    // Функция загрузки страницы
    async function loadPage(pageName) {
        // Здесь ты можешь загружать контент из файлов (например, page.html)
        // Пока сделаем простую имитацию
        const content = {
            'dashboard': '<h1>Dashboard</h1><p>Добро пожаловать в панель.</p>',
            'tutorial': '<h1>Tutorial</h1><p>Инструкция по использованию spoofer.</p>',
            'studio': '<h1>Studio</h1><p>Настройки обработки ассетов.</p>',
            'hub': '<h1>Hub</h1><p>Конфигурации и настройки.</p>',
            'settings': '<h1>Settings</h1><p>Личные данные и аккаунт.</p>'
        };

        viewPort.innerHTML = content[pageName] || '<h1>404</h1>';
    }

    // Обработка кликов
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Убираем класс active у всех
            navItems.forEach(el => el.classList.remove('active'));
            // Добавляем текущему
            item.classList.add('active');

            // Загружаем контент
            loadPage(item.dataset.page);
        });
    });

    // Загружаем дашборд по умолчанию
    loadPage('dashboard');
}
