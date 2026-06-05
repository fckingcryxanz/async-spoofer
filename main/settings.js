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
                            <input type="password" class="custom-input" placeholder="Paste your Open Cloud API key">
                            <button class="show-btn">Show</button>
                        </div>
                    </div>
                    <div class="button-row">
                        <button class="primary-btn small">Get API Key</button>
                        <button class="secondary-btn small">? Setup Guide</button>
                    </div>
                </div>
            </section>
        </div>
    `;
}
