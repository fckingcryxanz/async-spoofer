const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize?client_id=1512632747703799938&response_type=code&redirect_uri=https%3A%2F%2Fsubtle-buttercream-91fd63.netlify.app%2F&scope=guilds.join+identify";

// Проверка состояния
export function initApp() {
    const isAuth = localStorage.getItem('is_authenticated') === 'true';
    const isDiscord = localStorage.getItem('discord_verified') === 'true';
    const root = document.getElementById('root');

    if (!isAuth && !isDiscord) {
        renderLogin(1); // Шаг 1: Discord
    } else if (!isAuth && isDiscord) {
        renderLogin(2); // Шаг 2: Ключ
    } else {
        loadMainApp(); // Загрузка самой панели
    }
}

function renderLogin(step) {
    const root = document.getElementById('root');
    root.innerHTML = `
        <div class="login-page">
            <div class="auth-card">
                <div class="auth-title">${step === 1 ? 'Connect Discord' : 'Enter License'}</div>
                <div class="auth-subtitle">Async Web Edition — Secure Access</div>
                ${step === 1 ? 
                    `<a href="${DISCORD_OAUTH_URL}" class="modern-btn" style="text-decoration:none; display:block;">Login with Discord</a>` :
                    `<input type="text" id="license-key" class="modern-input" placeholder="XXXXX-XXXXX-XXXXX">
                     <button id="submit-key" class="modern-btn">Authenticate</button>`
                }
            </div>
        </div>
    `;

    // Логика нажатия для шага 2
    if(step === 2) {
        document.getElementById('submit-key').onclick = () => {
            localStorage.setItem('is_authenticated', 'true');
            initApp();
        };
    }
}

function loadMainApp() {
    const root = document.getElementById('root');
    // Тут загружаешь свою панель (можно вставить html-код прямо сюда или подгрузить файл)
    root.innerHTML = `
        <div class="app-container">
            <!-- Твой HTML панели управления -->
            <h1>Dashboard</h1>
            <p>Welcome to Async.</p>
        </div>
    `;
    // Тут инициализируешь свои скрипты панели (router, nav и т.д.)
}

// Запуск при открытии
initApp();
