let profiles = []; // Массив для хранения сохраненных аккаунтов

export function renderSettings() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    viewport.innerHTML = `
        <div class="page-transition">
            <div class="view-header">
                <h1>Settings</h1>
                <p>Configure your Roblox identity and API access</p>
            </div>

            <div class="settings-container">
                
                <!-- 1. ACCOUNT PROFILES (Секция оформлена как надо) -->
                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <span>ACCOUNT PROFILES</span>
                        <div class="line"></div>
                    </div>
                    
                    <div class="glass-card settings-card">
                        <!-- Подраздел SAVED ACCOUNTS внутри карточки -->
                        <div style="font-size: 11px; color: rgba(255,255,255,0.5); letter-spacing: 1px; margin-bottom: 10px;">
                            SAVED ACCOUNTS
                        </div>
                        
                        <!-- Список профилей -->
                        <div id="saved-accounts-list"></div>

                        <!-- Линия-разделитель между списком и формой -->
                        <div style="height: 1px; background: rgba(255,255,255,0.05); margin: 15px 0;"></div>

                        <!-- Форма создания нового профиля -->
                        <div class="input-row">
                            <input type="text" id="profile-name-input" class="custom-input small-input" placeholder="Profile name (e.g. Main Account)">
                            <button id="save-profile-btn" class="save-btn">Save Profile</button>
                        </div>
                    </div>
                </section>

                <!-- 2. ACCOUNT -->
                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                        </div>
                        <span>ACCOUNT</span>
                        <div class="line"></div>
                    </div>
                    <div class="glass-card settings-card">
                        <div class="input-field">
                            <label>User ID</label>
                            <input type="text" id="userid-input" class="custom-input small-input" placeholder="Enter User ID" readonly style="opacity: 0.7; cursor: not-allowed;">
                        </div>
                        <div class="input-field">
                            <label>Cookie (.ROBLOSECURITY)</label>
                            <input type="password" id="cookie-input" class="custom-input small-input" placeholder="Paste your .ROBLOSECURITY cookie">
                        </div>
                        <div class="input-field">
                            <label>Group ID</label>
                            <input type="text" class="custom-input small-input" placeholder="Leave blank for personal uploads">
                        </div>
                    </div>
                </section>

                <!-- 3. OPEN CLOUD API KEY -->
                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3"></path></svg>
                        </div>
                        <span>OPEN CLOUD API KEY</span>
                        <div class="line"></div>
                    </div>
                    <div class="glass-card settings-card highlight-border">
                        <div class="input-field">
                            <label>API Key</label>
                            <div class="input-row">
                                <input type="password" id="api-key-input" class="custom-input small-input" placeholder="Paste your Open Cloud API key">
                                <button class="show-btn" onclick="const input = document.getElementById('api-key-input'); input.type = input.type === 'password' ? 'text' : 'password'; this.innerText = input.type === 'password' ? 'Show' : 'Hide';">Show</button>
                            </div>
                        </div>
                        <div class="button-row">
                            <button id="get-api-btn" class="primary-btn small">Get API Key</button>
                            <button id="setup-guide-btn" class="secondary-btn small">? Setup Guide</button>
                        </div>

                        <div id="guide-content" class="guide-steps" style="display: none;">
                            <div class="step-card"><div class="step-num">1</div><div class="step-info"><h4>Open Dashboard</h4><p>create.roblox.com/dashboard/credentials</p></div></div>
                            <div class="step-card"><div class="step-num">2</div><div class="step-info"><h4>Create Key</h4><p>Click 'Create API Key'</p></div></div>
                            <div class="step-card"><div class="step-num">3</div><div class="step-info"><h4>Permissions</h4><p>Add 'Assets' system</p></div></div>
                            <div class="step-card"><div class="step-num">4</div><div class="step-info"><h4>Read/Write</h4><p>Enable both</p></div></div>
                            <div class="step-card"><div class="step-num">5</div><div class="step-info"><h4>Done</h4><p>Paste the key above</p></div></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;

    // Инициализация
    setupAutoUserId();
    setupProfileLogic();
    renderProfilesList();

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
}

// Рендер списка профилей на экран
function renderProfilesList() {
    const list = document.getElementById('saved-accounts-list');
    if (!list) return;
    
    list.innerHTML = ''; 

    if (profiles.length === 0) {
        list.innerHTML = `<div style="text-align: center; color: rgba(255,255,255,0.3); padding: 10px; font-size: 13px;">No profiles saved yet.</div>`;
        return;
    }

    profiles.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'profile-item-card';

        // Шифруем ключ (если есть)
        let maskedKey = 'No key';
        if (p.apiKey) {
            maskedKey = '••••••••••••' + p.apiKey.substring(p.apiKey.length - 4); 
        }

        // Формируем статус-строку
        let status = "No ID set · No key";
        if (p.userId && !p.apiKey) status = `User ID: ${p.userId} · No key`;
        if (p.userId && p.apiKey) status = `User ID: ${p.userId} · API Key: ${maskedKey}`;

        const initial = p.name ? p.name.charAt(0).toUpperCase() : '?';

        // HTML самой карточки с иконками Update и Delete
        item.innerHTML = `
            <div style="display:flex; align-items:center; gap: 15px;">
                <div class="avatar-circle">${initial}</div>
                <div>
                    <div style="font-weight:bold; font-size: 14px;">${p.name}</div>
                    <div style="font-size:11px; opacity:0.6; margin-top: 3px;">${status}</div>
                </div>
            </div>
            <div class="profile-actions">
                <!-- Кнопка Update (Зеленый рестарт) -->
                <button class="action-btn update-btn" title="Update with current ID & Key" onclick="updateProfile(${index})">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="23 4 23 10 17 10"></polyline>
                        <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
                    </svg>
                </button>
                <!-- Кнопка Delete (Красный крестик) -->
                <button class="action-btn delete-btn" title="Delete Profile" onclick="deleteProfile(${index})">
                    <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

// Логика создания, обновления и удаления
function setupProfileLogic() {
    // Функция обновления (берет новые значения из инпутов)
    window.updateProfile = (index) => {
        const currentUserId = document.getElementById('userid-input').value;
        const currentApiKey = document.getElementById('api-key-input').value;
        
        profiles[index].userId = currentUserId;
        profiles[index].apiKey = currentApiKey;
        
        renderProfilesList(); // Перерисовываем список
    };

    // Функция удаления профиля
    window.deleteProfile = (index) => {
        profiles.splice(index, 1);
        renderProfilesList();
    };

    // Функция сохранения нового профиля
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
        saveBtn.onclick = () => {
            const nameInput = document.getElementById('profile-name-input');
            const name = nameInput.value.trim();
            const userId = document.getElementById('userid-input').value;
            const apiKey = document.getElementById('api-key-input').value;

            if (!name) {
                alert("Please enter a profile name!");
                return;
            }

            profiles.push({ name, userId, apiKey });
            nameInput.value = ''; // Очищаем поле ввода
            renderProfilesList();
        };
    }
}

// Автоопределение ID
function setupAutoUserId() {
    const cookieInput = document.getElementById('cookie-input');
    const userIdInput = document.getElementById('userid-input');

    if (!cookieInput || !userIdInput) return;

    cookieInput.addEventListener('input', async (e) => {
        const cookieVal = e.target.value.trim();
        if (cookieVal.length > 50) {
            userIdInput.value = 'Loading...';
            try {
                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'x-roblosecurity': cookieVal },
                    body: JSON.stringify({ targetUrl: 'https://users.roblox.com/v1/users/authenticated' })
                });
                const data = await response.json();
                userIdInput.value = (data && data.id) ? data.id : 'Invalid Cookie';
            } catch {
                userIdInput.value = 'Error';
            }
        } else {
            userIdInput.value = '';
        }
    });
}
