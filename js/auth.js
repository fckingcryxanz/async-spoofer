// js/auth.js

const DISCORD_OAUTH_URL = "https://discord.com/oauth2/authorize?client_id=1512632747703799938&response_type=code&redirect_uri=https%3A%2F%2Fsubtle-buttercream-91fd63.netlify.app%2F&scope=guilds.join+identify"; 

export function checkAuthAndRoute() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');

    // Если вернулся код от Discord — Шаг 1 успешно пройден
    if (code) {
        window.history.replaceState({}, document.title, window.location.pathname);
        localStorage.setItem('discord_verified', 'true');
    }

    const isDiscordVerified = localStorage.getItem('discord_verified') === 'true';
    const isFullUnlocked = localStorage.getItem('is_authenticated') === 'true';
    const mainAppContainer = document.getElementById('main-app-container');

    // Если нет даже верификации Discord — жестко включаем Шаг 1
    if (!isDiscordVerified && !isFullUnlocked) {
        if (mainAppContainer) mainAppContainer.style.display = 'none';
        renderLoginContainer(1);
        return;
    }

    // Если Discord пройден, но ключ еще не введен — включаем Шаг 2
    if (isDiscordVerified && !isFullUnlocked) {
        if (mainAppContainer) mainAppContainer.style.display = 'none';
        renderLoginContainer(2);
        return;
    }

    // Если всё полностью пройдено — пускаем в главное приложение
    const loginWrapper = document.getElementById('login-screen-element');
    if (loginWrapper) loginWrapper.remove();

    if (mainAppContainer) {
        mainAppContainer.style.display = 'flex';
    }

    // Синхронизация вкладок с роутером
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
            document.getElementById('tab-dashboard')?.click(); 
        }
    }, 100);
}

// Главный рендеринг структуры экрана авторизации
function renderLoginContainer(step) {
    if (document.getElementById('login-screen-element')) {
        // Если общая разметка уже создана, просто обновляем интерактивную левую карточку
        updateAuthCard(step);
        return;
    }

    const loginBlock = document.createElement('div');
    loginBlock.id = 'login-screen-element';
    loginBlock.className = 'login-page-wrapper';

    loginBlock.innerHTML = `
        <div class="login-container-split">
            <!-- ЛЕВАЯ КАРТОЧКА (ДИНАМИЧЕСКИЙ КОНТЕНТ ШАГОВ) -->
            <div class="auth-main-card" id="dynamic-auth-card"></div>

            <!-- ПРАВАЯ КАРТОЧКА: ИНФОРМАЦИЯ О ПРОЕКТЕ (ОСТАЕТСЯ ВСЕГДА) -->
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
    updateAuthCard(step);
}

// Переключение содержимого внутри левой карточки
function updateAuthCard(step) {
    const card = document.getElementById('dynamic-auth-card');
    if (!card) return;

    if (step === 1) {
        // --- РЕНДЕР ШАГА 1 (DISCORD) ---
        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 25px;">
                <span style="font-size: 11px; color: #b967ff; letter-spacing: 2px; font-weight: bold; background: rgba(185,103,255,0.1); padding: 4px 10px; border-radius: 20px;">STEP 1 OF 2 · DISCORD</span>
            </div>
            <h2 style="font-size: 28px; text-align: center; margin: 0 0 10px 0; font-family: 'Inter', sans-serif;">Discord Verification</h2>
            <p style="text-align: center; font-size: 13px; opacity: 0.5; margin: 0 0 30px 0;">Connect your Discord account to continue</p>

            <a href="${DISCORD_OAUTH_URL}" class="discord-login-btn">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.873-.894.077.077 0 0 1-.008-.128c.126-.093.252-.19.372-.287a.075.075 0 0 1 .077-.011c3.92 1.793 8.18 1.793 12.061 0a.073.073 0 0 1 .078.009c.12.099.246.195.373.289a.077.077 0 0 1-.006.127 12.298 12.298 0 0 1-1.873.894.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.156 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.156 2.418z"/></svg>
                Login with Discord
            </a>
            <div style="height: 1px; background: rgba(255,255,255,0.06); margin: 20px 0;"></div>
            <a href="https://discord.gg/GjnubgmcYx" target="_blank" class="discord-join-btn">Join our Discord Server</a>
        `;
    } else if (step === 2) {
        // --- РЕНДЕР ШАГА 2 (LICENSE KEY) ---
        card.innerHTML = `
            <div style="text-align: center; margin-bottom: 15px;">
                <span style="font-size: 11px; color: #b967ff; letter-spacing: 2px; font-weight: bold; background: rgba(185,103,255,0.1); padding: 4px 10px; border-radius: 20px;">STEP 2 OF 2 · LICENSE KEY</span>
            </div>

            <!-- Зеленый статус верификации -->
            <div class="verified-badge">
                ✓ Verified as user
            </div>

            <h2 style="font-size: 28px; text-align: center; margin: 0 0 5px 0; font-family: 'Inter', sans-serif;">Welcome back</h2>
            <p style="text-align: center; font-size: 13px; opacity: 0.5; margin: 0 0 25px 0;">Enter your license key</p>

            <!-- Поле ввода ключа и счетчик символов -->
            <div style="display: flex; justify-content: space-between; font-size: 10px; opacity: 0.4; font-weight: bold; margin-bottom: 5px; letter-spacing: 0.5px;">
                <span>LICENSE KEY</span>
                <span id="char-counter">0 CHARS</span>
            </div>
            
            <div class="license-input-wrapper">
                <input type="text" id="license-key-field" placeholder="XXXXX-XXXXX-XXXXX" autocomplete="off">
            </div>

            <!-- Основные кнопки -->
            <button id="submit-license-btn" class="auth-submit-btn" style="width:100%;">• Authenticate</button>
            <button id="activate-free-btn" class="auth-free-btn" style="width:100%;">Use Free Version</button>
            <p style="text-align: center; font-size: 10px; opacity: 0.3; margin: 8px 0 0 0;">Animation spoofing only — no key required</p>

            <!-- Технические плашки -->
            <div class="mini-badge-row">
                <div class="mini-badge">→ SSL</div>
                <div class="mini-badge">🛡 AES-256</div>
                <div class="mini-badge">→ 0ms LAG</div>
            </div>

            <div style="display: flex; align-items: center; gap: 10px; margin-top: 15px;">
                <div style="height: 1px; background: rgba(255,255,255,0.05); flex: 1;"></div>
                <span style="font-size: 10px; opacity: 0.3; font-weight: bold; letter-spacing: 1px;">NEED A KEY?</span>
                <div style="height: 1px; background: rgba(255,255,255,0.05); flex: 1;"></div>
            </div>

            <!-- Промо-блок магазина -->
            <a href="https://rtxspoofer.sell.app" target="_blank" class="store-promo-card">
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="background: rgba(185,103,255,0.1); padding: 8px; border-radius: 6px; display: flex; align-items: center; justify-content: center;">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b967ff" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3M15.5 7.5L19 4"/></svg>
                    </div>
                    <div>
                        <div style="font-size: 13px; font-weight: bold;">Get a license key</div>
                        <div style="font-size: 11px; opacity: 0.4;">rtxspoofer.sell.app</div>
                    </div>
                </div>
                <div style="opacity: 0.5;">→</div>
            </a>
        `;

        setupStep2Logic();
    }
}

// Логика работы элементов на Шаге 2
function setupStep2Logic() {
    const inputField = document.getElementById('license-key-field');
    const charCounter = document.getElementById('char-counter');
    const submitBtn = document.getElementById('submit-license-btn');
    const freeBtn = document.getElementById('activate-free-btn');

    if (inputField && charCounter) {
        inputField.oninput = () => {
            const len = inputField.value.length;
            charCounter.innerText = `${len} CHARS`;
        };
    }

    // Клик по кнопке активации ключа
    if (submitBtn) {
        submitBtn.onclick = () => {
            if (!inputField || inputField.value.trim() === "") {
                inputField.style.borderColor = "#ff4a4a";
                setTimeout(() => inputField.style.borderColor = "rgba(255,255,255,0.08)", 1000);
                return;
            }

            submitBtn.innerText = 'Verifying...';
            submitBtn.style.opacity = '0.6';

            setTimeout(() => {
                localStorage.setItem('is_authenticated', 'true');
                checkAuthAndRoute();
            }, 1200);
        };
    }

    // Клик по кнопке бесплатной версии
    if (freeBtn) {
        freeBtn.onclick = () => {
            freeBtn.innerText = 'Loading Free Version...';
            freeBtn.style.opacity = '0.6';

            setTimeout(() => {
                localStorage.setItem('is_authenticated', 'true');
                checkAuthAndRoute();
            }, 800);
        };
    }
}

// Слушатель инициализации
document.addEventListener('DOMContentLoaded', () => {
    checkAuthAndRoute();
});
