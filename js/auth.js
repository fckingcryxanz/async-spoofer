document.addEventListener('DOMContentLoaded', () => {
    const loginContainer = document.getElementById('login-container');
    const appContainer = document.getElementById('app-container');
    const loginBtn = document.getElementById('login-btn');

    // Проверка
    if (localStorage.getItem('is_authenticated') === 'true') {
        loginContainer.classList.add('hidden');
        appContainer.classList.remove('hidden');
    }

    // Обработка кнопки
    if (loginBtn) {
        loginBtn.onclick = () => {
            localStorage.setItem('is_authenticated', 'true');
            location.reload(); // Перезагружаем для входа
        };
    }
});
