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
