export function renderSettings() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    viewport.innerHTML = `
        <div class="view-header">
            <h1>Settings</h1>
            <p>Configure your Roblox identity and API access</p>
        </div>

        <div class="settings-container">
            <section class="settings-group">
                <div class="section-divider">
                    <div class="icon-box"><i class="fas fa-user"></i></div>
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
                    <div class="icon-box"><i class="fas fa-cog"></i></div>
                    <span>ACCOUNT</span>
                    <div class="line"></div>
                </div>
                <div class="glass-card settings-card">
                    <div class="input-field">
                        <label>User ID</label>
                        <input type="text" class="custom-input small-input" placeholder="Enter User ID">
                    </div>
                    <div class="input-field">
                        <label>Cookie (.ROBLOSECURITY)</label>
                        <input type="password" class="custom-input small-input" placeholder="Paste your .ROBLOSECURITY cookie">
                    </div>
                    <div class="input-field">
                        <label>Group ID</label>
                        <input type="text" class="custom-input small-input" placeholder="Leave blank for personal uploads">
                    </div>
                </div>
            </section>

            <section class="settings-group">
                <div class="section-divider">
                    <div class="icon-box"><i class="fas fa-key"></i></div>
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
    `;

    // Инициализация кнопок
    const getApiBtn = document.getElementById('get-api-btn');
    if (getApiBtn) {
        getApiBtn.onclick = () => window.open('https://create.roblox.com/dashboard/credentials', '_blank');
    }

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
