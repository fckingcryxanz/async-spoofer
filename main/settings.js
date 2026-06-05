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
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                        </div>
                        <span>ACCOUNT PROFILES</span>
                        <div class="line"></div>
                    </div>
                    <div class="glass-card settings-card">
                        <div class="input-row">
                            <input type="text" class="custom-input small-input" placeholder="Profile name (e.g. Main Account)">
                            <button class="save-btn">Save Profile</button>
                        </div>
                    </div>
                </section>

                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
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

                <section class="settings-group">
                    <div class="section-divider">
                        <div class="icon-box">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3y-3.5"></path></svg>
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
                            <div class="step-card"><div class="step-num">4</div><div class="step-info"><h4>Read/Write</h4><p>Enable both checkboxes</p></div></div>
                            <div class="step-card"><div class="step-num">5</div><div class="step-info"><h4>Done</h4><p>Paste the key above</p></div></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    `;

    setupAutoUserId();
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

    // Логика кнопок
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

