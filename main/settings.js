export function renderSettings() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    // Вставляем HTML
    viewport.innerHTML = `
        <div class="page-transition">
            <div class="view-header">
                <h1>Settings</h1>
                <p>Configure your Roblox identity and API access</p>
            </div>

            <div class="settings-container">
                <!-- Контейнер для списка сохраненных аккаунтов (ДОБАВЛЕН) -->
                <section class="settings-group">
                    <div class="section-divider">
                        <span>SAVED ACCOUNTS</span>
                        <div class="line"></div>
                    </div>
                    <div id="saved-accounts-list"></div>
                </section>

                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <span>ACCOUNT PROFILES</span>
                        <div class="line"></div>
                    </div>
                    <div class="glass-card settings-card">
                        <div class="input-row">
                            <input type="text" id="profile-name-input" class="custom-input small-input" placeholder="Profile name (e.g. Main Account)">
                            <button id="save-profile-btn" class="save-btn">Save Profile</button>
                        </div>
                    </div>
                </section>

                <!-- (Здесь твой остальной код с Account и Open Cloud API Key, который был раньше) -->
                <section class="settings-group">
                    <!-- ... твои существующие разделы ACCOUNT и API KEY ... -->
                    <!-- Убедись, что ID input'ов тут такие же: userid-input, cookie-input, api-key-input -->
                </section>
            </div>
        </div>
    `;

    // 1. Логика кнопок
    const getApiBtn = document.getElementById('get-api-btn');
    if (getApiBtn) getApiBtn.onclick = () => window.open('https://create.roblox.com/dashboard/credentials', '_blank');

    const guideBtn = document.getElementById('setup-guide-btn');
    const guideContent = document.getElementById('guide-content');
    if (guideBtn && guideContent) {
        guideBtn.onclick = () => {
            const isHidden = guideContent.style.display === 'none';
            guideContent.style.display = isHidden ? 'flex' : 'none';
            guideBtn.innerText = isHidden ? 'Hide Guide' : '? Setup Guide';
        };
    }

    // 2. ЗАПУСК ИНИЦИАЛИЗАЦИИ ВСЕХ ФУНКЦИЙ
    setupAutoUserId();      // Авто-заполнение ID
    setupProfileSaving();   // Логика сохранения профиля
}

function setupAutoUserId() {
    const cookieInput = document.getElementById('cookie-input');
    const userIdInput = document.getElementById('userid-input');

    if (!cookieInput || !userIdInput) return;

    cookieInput.addEventListener('input', async (e) => {
        const cookieVal = e.target.value.trim();

        if (cookieVal.length > 100) {
            userIdInput.value = 'Loading...';

            try {
                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-roblosecurity': cookieVal
                    },
                    body: JSON.stringify({
                        targetUrl: 'https://users.roblox.com/v1/users/authenticated'
                    })
                });

                const data = await response.json();

                if (data && data.id) {
                    userIdInput.value = data.id;
                } else {
                    userIdInput.value = 'Invalid Cookie';
                }
            } catch (error) {
                userIdInput.value = 'API Error';
            }
        } else if (cookieVal === '') {
            userIdInput.value = '';
        }
    });
}
 
// Функция для определения текста статуса
function getStatusText(userId, apiKey) {
    if (!userId && !apiKey) return "No ID set · No key";
    if (userId && !apiKey) return `User ID: ${userId} · No key`;
    if (userId && apiKey) return `User ID: ${userId} · API Key: ${apiKey.substring(0, 6)}...`;
    return "No ID set · No key";
}

// Функция сохранения профиля
function setupProfileSaving() {
    const saveBtn = document.getElementById('save-profile-btn');
    const profileList = document.getElementById('saved-accounts-list');
    
    if (!saveBtn) return;

    saveBtn.onclick = () => {
        const name = document.getElementById('profile-name-input').value;
        const userId = document.getElementById('userid-input').value;
        const apiKey = document.getElementById('api-key-input').value;

        if (!name) {
            alert("Введите имя профиля!");
            return;
        }

        const status = getStatusText(userId, apiKey);
        const initial = name.charAt(0).toUpperCase();

        // Создаем HTML плашки (как на твоем скриншоте image_3a8945.png)
        const profileCard = document.createElement('div');
        profileCard.className = 'glass-card settings-card'; // Добавь свои классы для дизайна
        profileCard.innerHTML = `
            <div class="profile-item" style="display: flex; align-items: center; justify-content: space-between; padding: 10px;">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <div class="avatar">${initial}</div>
                    <div>
                        <div style="font-weight: bold;">${name}</div>
                        <div style="font-size: 0.8em; opacity: 0.6;">${status}</div>
                    </div>
                </div>
                <button class="update-btn">UPDATE</button>
            </div>
        `;

        profileList.appendChild(profileCard);
        // Очищаем инпуты
        document.getElementById('profile-name-input').value = '';
    };
}
