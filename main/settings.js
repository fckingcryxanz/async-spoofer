export function renderSettings() {
    const viewport = document.getElementById('view-port');
    
// public/modules/main/settings.js
export function renderSettings() {
    const viewport = document.getElementById('view-port');
    
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
                            <button class="show-btn">Show</button>
                        </div>
                    </div>
                    <div class="button-row">
                        <button id="get-api-btn" class="primary-btn small">Get API Key</button>
                        <button id="setup-guide-btn" class="secondary-btn small">? Setup Guide</button>
                    </div>
                    <div id="guide-content" class="guide-steps" style="display: none;">
                        </div>
                </div>
            </section>
        </div>
    `;

    // Логика кнопок (Get API и Setup Guide) остается без изменений
}

    // Логика кнопок
    document.getElementById('get-api-btn').onclick = () => {
        window.open('https://create.roblox.com/dashboard/credentials', '_blank');
    };

    const guideBtn = document.getElementById('setup-guide-btn');
    const guideContent = document.getElementById('guide-content');

    guideBtn.onclick = () => {
        if (guideContent.style.display === 'none') {
            guideContent.style.display = 'flex';
            guideBtn.innerText = 'Hide Guide';
        } else {
            guideContent.style.display = 'none';
            guideBtn.innerText = '? Setup Guide';
        }
    };
}
