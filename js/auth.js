// js/auth.js

const overlay = document.getElementById('auth-overlay');

function checkAuth() {
    const isAuth = localStorage.getItem('is_authenticated') === 'true';

    if (isAuth) {
        // Если авторизован, просто убираем шторку
        overlay.style.display = 'none';
    } else {
        // Если нет — рендерим красивый вход прямо в шторку
        renderLoginScreen();
    }
}

function renderLoginScreen() {
    overlay.innerHTML = `
        <div style="display: flex; justify-content: center; align-items: center; height: 100vh; background: #050505;">
            <div style="background: rgba(12, 12, 12, 0.8); padding: 40px; border-radius: 20px; border: 1px solid #333; text-align: center; max-width: 400px; width: 90%;">
                <h2 style="color: white; margin-bottom: 20px;">Async Portal</h2>
                <input type="text" id="key-input" placeholder="Введите лицензионный ключ" style="width: 100%; padding: 12px; margin-bottom: 15px; background: #1a1a1a; border: 1px solid #444; color: white; border-radius: 8px;">
                <button id="auth-btn" style="width: 100%; padding: 12px; background: #b967ff; color: white; border: none; border-radius: 8px; cursor: pointer;">Войти</button>
            </div>
        </div>
    `;

    document.getElementById('auth-btn').onclick = () => {
        // Тут можно добавить проверку ключа
        localStorage.setItem('is_authenticated', 'true');
        location.reload(); // Перезагружаем страницу, чтобы скрыть оверлей
    };
}

checkAuth();
