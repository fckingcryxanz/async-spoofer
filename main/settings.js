export function renderSettings() {
    const viewport = document.getElementById('view-port');
    
    viewport.innerHTML = `
        <div class="view-header">
            <h1>Settings</h1>
            <p>Configure your Roblox identity and API access</p>
        </div>

        <div class="settings-container">
            <section class="settings-group">
                <div class="group-label">ACCOUNT PROFILES</div>
                <div class="glass-card settings-card">
                    <div class="input-row">
                        <input type="text" class="custom-input" placeholder="Profile name (e.g. Main Account)">
                        <button class="save-btn">Save Profile</button>
                    </div>
                </div>
            </section>

            <section class="settings-group">
                <div class="group-label">ACCOUNT</div>
                <div class="glass-card settings-card">
                    <div class="input-field">
                        <label>User ID</label>
                        <input type="text" class="custom-input" placeholder="Enter User ID">
                    </div>
                    <div class="input-field">
                        <label>Cookie (.ROBLOSECURITY)</label>
                        <input type="password" class="custom-input" placeholder="Paste your .ROBLOSECURITY cookie">
                    </div>
                    <div class="input-field">
                        <label>Group ID</label>
                        <input type="text" class="custom-input" placeholder="Leave blank for personal uploads">
                    </div>
                </div>
            </section>

            <section class="settings-group">
                <div class="group-label">OPEN CLOUD API KEY</div>
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
                        <div class="step-card">
                            <div class="step-num">1</div>
                            <div class="step-info">
                                <h4>Open Creator Dashboard</h4>
                                <p>Go to create.roblox.com/dashboard/credentials</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-num">2</div>
                            <div class="step-info">
                                <h4>Create API Key</h4>
                                <p>Click 'Create API Key' and give it any name</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-num">3</div>
                            <div class="step-info">
                                <h4>Add Assets Permission</h4>
                                <p>Click 'Add API System' → select 'Assets'</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-num">4</div>
                            <div class="step-info">
                                <h4>Enable Read + Write</h4>
                                <p>Check both Asset:Read and Asset:Write checkboxes</p>
                            </div>
                        </div>
                        <div class="step-card">
                            <div class="step-num">5</div>
                            <div class="step-info">
                                <h4>Copy & Paste</h4>
                                <p>Copy the key string and paste it in the field above</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    `;

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
