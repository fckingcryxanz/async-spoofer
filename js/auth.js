// js/auth.js

// ⚠️ ВАЖНО: Замени эту ссылку на ту, которую сгенерировал в Discord Developer Portal (OAuth2 -> URL Generator)
const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize?client_id=1512632747703799938&permissions=8&response_type=code&redirect_uri=https%3A%2F%2Fsubtle-buttercream-91fd63.netlify.app%2F&integration_type=0&scope=identify+guilds.join+bot"; 

export function checkAuthAndRoute() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // 1. Если Дискорд вернул код авторизации (?code=...) после успешного входа
    if (code) {
        // Убираем длинный код из адресной строки, чтобы ссылка была чистой
        window.history.replaceState({}, document.title, window.location.pathname);
        
        // Сохраняем "сессию" в браузере (в будущем здесь можно отправлять код на сервер)
        localStorage.setItem('is_authenticated', 'true');
    }

    // 2. Проверяем, авторизован ли пользователь
    const isAuthenticated = localStorage.getItem('is_authenticated') === 'true';
    const mainAppContainer = document.getElementById('main-app-container');

    if (!isAuthenticated) {
        // ЕСЛИ НЕ АВТОРИЗОВАН:
        // Прячем основное приложение (чтобы пустые вкладки не мозолили глаза)
        if (mainAppContainer) {
            mainAppContainer.style.display = 'none';
        }
        // Рисуем экран входа
        renderLoginScreen();
    } else {
        // ЕСЛИ АВТОРИЗОВАН:
        // Удаляем экран входа, если он вдруг отрисован
        const loginWrapper = document.getElementById('login-screen-element');
        if (loginWrapper) loginWrapper.remove();

        // Показываем панель управления
        if (mainAppContainer) {
            mainAppContainer.style.display = 'flex'; // возвращаем flex, чтобы сайдбар и контент встали на места
        }

        // 3. Синхронизация с твоим router.js
        // Даем небольшую задержку (100мс), чтобы твой router.js успел загрузиться и повесить события на кнопки
        setTimeout(() => {
            const currentPath = window.location.pathname;
            
            if (currentPath === '/settings') {
                document.getElementById('tab-settings')?.click();
            } else if (currentPath === '/studio') {
                document.getElementById('tab-studio')?.click();
            } else if (currentPath === '/hub') {
                document.getElementById('tab-hub')?.click();
            } else if (currentPath === '/tutorial') {
                document.getElementById('tab-tutorial')?.click();
            } else {
                // Если мы просто на главной странице (/) — кликаем по Dashboard
                document.getElementById('tab-dashboard')?.click(); 
            }
        }, 100);
    }
}

// Функция отрисовки меню входа
function renderLoginScreen() {
    // Защита от двойной отрисовки
    if (document.getElementById('login-screen-element')) return;

    const loginBlock = document.createElement('div');
    loginBlock.id = 'login-screen-element';
    loginBlock.className = 'login-page-wrapper'; // Класс стилей из style.css

    loginBlock.innerHTML = `
        <div class="login-container-split">
            
            <!-- ЛЕВАЯ СТОРОНА: КНОПКИ ВХОДА -->
            <div class="auth-main-card">
                <div style="text-align: center; margin-bottom: 25px;">
                    <span style="font-size: 11px; color: #b967ff; letter-spacing: 2px; font-weight: bold; background: rgba(185,103,255,0.1); padding: 4px 10px; border-radius: 20px;">STEP 1 OF 2 · VERIFICATION</span>
                </div>
                <h2 style="font-size: 28px; text-align: center; margin: 0 0 10px 0; font-family: 'Inter', sans-serif;">Discord Verification</h2>
                <p style="text-align: center; font-size: 13px; opacity: 0.5; margin: 0 0 30px 0;">Connect your Discord account to get dashboard access</p>

                <!-- Ссылка на авторизацию -->
                <a href="${DISCORD_OAUTH_URL}" class="discord-login-btn">
                    <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
                    Login with Discord
                </a>

                <div style="height: 1px; background: rgba(255,255,255,0.06); margin: 20px 0;"></div>

                <a href="https://discord.gg/GjnubgmcYx" target="_blank" class="discord-join-btn">
                    Join our Discord Server
                </a>
            </div>

            <!-- ПРАВАЯ СТОРОНА: ИНФОРМАЦИЯ -->
            <div class="info-side-card">
                <div>
                    <img src="https://i.postimg.cc/L41NZ4nD/logo.png" style="width: 50px; height: 50px; border-radius: 10px; margin-bottom: 15px; box-shadow: 0 0 15px rgba(185,103,255,0.3);" alt="Logo">
                    <h1 style="font-size: 32px; margin: 0 0 10px 0; font-family: 'Inter', sans-serif;">ASYNC <span style="color: #b967ff;">WEB</span></h1>
                    <p style="font-size: 14px; opacity: 0.6; line-height: 1.5; margin: 0 0 25px 0;">
                        The most advanced animation and asset management system. Gain full control over your studio creations.
                    </p>

                    <div class="feature-badge-row">
                        <div style="color: #b967ff;">✓</div>
                        <div style="font-size: 13px;"><strong>Instant processing</strong> <span style="opacity: 0.5; display:block;">Fast asset uploads & spoofing</span></div>
                    </div>
                    <div class="feature-badge-row">
                        <div style="color: #b967ff;">✓</div>
                        <div style="font-size: 13px;"><strong>End-to-end encryption</strong> <span style="opacity: 0.5; display:block;">All your input data is secured</span></div>
                    </div>
                </div>

                <div class="stats-inline-footer">
                    <div style="text-align: center;"><div style="font-weight: bold; color: #fff;">2.7K+</div><div style="font-size: 10px; opacity: 0.4;">USERS</div></div>
                    <div style="text-align: center;"><div style="font-weight: bold; color: #00ff88;">99.9%</div><div style="font-size: 10px; opacity: 0.4;">UPTIME</div></div>
                    <div style="text-align: center;"><div style="font-weight: bold; color: #b967ff;">24/7</div><div style="font-size: 10px; opacity: 0.4;">SUPPORT</div></div>
                </div>
            </div>

        </div>
    `;

    document.body.appendChild(loginBlock);
}

// Запускаем скрипт сразу после того, как браузер прочитал HTML
document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndRoute();
});
