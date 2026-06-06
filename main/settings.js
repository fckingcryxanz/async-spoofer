export function renderSettings() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    viewport.innerHTML = `
        <div class="settings-container">
            <!-- Секция ACCOUNT PROFILES включает в себя и список, и форму -->
            <section class="settings-group">
                <div class="section-divider"><span>ACCOUNT PROFILES</span></div>
                
                <!-- Список профилей -->
                <div id="saved-accounts-list"></div>

                <!-- Форма создания -->
                <div class="glass-card settings-card" style="margin-top: 20px;">
                    <input type="text" id="profile-name-input" placeholder="Profile name" class="custom-input">
                    <button id="save-profile-btn" class="save-btn" style="width: 100%; margin-top:10px;">Save Profile</button>

                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <!-- Исправленный SVG (старый вызывал ошибку) -->
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
                    </div>
                </section>

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
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;

    // Инициализация событий
    setupAutoUserId();
    setupProfileSaving();
    
    const getApiBtn = document.getElementById('get-api-btn');
    if (getApiBtn) getApiBtn.onclick = () => window.open('https://create.roblox.com/dashboard/credentials', '_blank');
}

function renderProfilesList() {
    const list = document.getElementById('saved-accounts-list');
    list.innerHTML = ''; // Очищаем

    profiles.forEach((p, index) => {
        const item = document.createElement('div');
        item.className = 'profile-card';
        
        // Маскируем API ключ
        const maskedKey = p.apiKey ? '••••••••' : 'No key';
        
        item.innerHTML = `
            <div>
                <div style="font-weight:bold">${p.name}</div>
                <div style="font-size:11px; opacity:0.6">ID: ${p.userId || 'None'} · Key: ${maskedKey}</div>
            </div>
            <div style="display:flex; gap:10px;">
                <button class="icon-btn" onclick="updateProfile(${index})">
                    <svg class="refresh-icon" width="20" height="20" viewBox="0 0 24 24"><path d="M4 12a8 8 0 0 1 8-8v3l4-4-4-4v3a9 9 0 0 0-9 9h2z"/></svg>
                </button>
                <button class="icon-btn" onclick="deleteProfile(${index})">
                    <svg class="delete-icon" width="20" height="20" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12"/></svg>
                </button>
            </div>
        `;
        list.appendChild(item);
    });
}

function setupProfileLogic() {
    // Делаем функции глобальными, чтобы они работали из inline onclick
    window.updateProfile = (index) => {
        // Берем актуальные данные из инпутов (нужно, чтобы они были заполнены)
        const newUserId = document.getElementById('userid-input')?.value;
        const newKey = document.getElementById('api-key-input')?.value;
        
        profiles[index].userId = newUserId || profiles[index].userId;
        profiles[index].apiKey = newKey || profiles[index].apiKey;
        renderProfilesList();
    };

    window.deleteProfile = (index) => {
        profiles.splice(index, 1);
        renderProfilesList();
    };

    document.getElementById('save-profile-btn').onclick = () => {
        const name = document.getElementById('profile-name-input').value;
        if (!name) return alert("Введите имя!");
        
        profiles.push({
            name: name,
            userId: document.getElementById('userid-input')?.value,
            apiKey: document.getElementById('api-key-input')?.value
        });
        renderProfilesList();
    };
}

// ФУНКЦИЯ СОХРАНЕНИЯ ПРОФИЛЯ
function setupProfileSaving() {
    const saveBtn = document.getElementById('save-profile-btn');
    if (!saveBtn) return;

    saveBtn.onclick = () => {
        const name = document.getElementById('profile-name-input').value;
        const userId = document.getElementById('userid-input').value;
        const apiKey = document.getElementById('api-key-input').value;
        const list = document.getElementById('saved-accounts-list');

        if (!name) {
            alert("Введите имя профиля!");
            return;
        }

        // Логика статуса
        let status = "No ID set · No key";
        if (userId && !apiKey) status = `User ID: ${userId} · No key`;
        if (userId && apiKey) status = `User ID: ${userId} · API Key: ${apiKey.substring(0, 6)}...`;

        const item = document.createElement('div');
        item.className = 'glass-card settings-card';
        item.style.marginBottom = '10px';
        item.style.padding = '10px';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <div style="font-weight:bold">${name}</div>
                    <div style="font-size:12px; opacity:0.7">${status}</div>
                </div>
                <button class="small-btn">UPDATE</button>
            </div>
        `;
        list.appendChild(item);
        document.getElementById('profile-name-input').value = '';
    };
}

// АВТООПРЕДЕЛЕНИЕ ID
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
        }
    });
}
