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
                <div class="group-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                    ACCOUNT PROFILES
                </div>
                <div class="glass-card settings-card">
                    <div class="input-row">
                        <input type="text" placeholder="Profile name (e.g. Main Account)">
                        <button class="save-btn">Save Profile</button>
                    </div>
                    <p class="input-hint">Enter your credentials below first, then type a name and save. Each profile stores its own API key, cookie, User ID, and Group ID.</p>
                </div>
            </section>

            <section class="settings-group">
                <div class="group-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
                    ACCOUNT
                </div>
                <div class="glass-card settings-card">
                    <div class="input-field">
                        <label>User ID</label>
                        <input type="text" placeholder="Auto-detected from cookie" disabled>
                    </div>
                    <div class="input-field">
                        <label>Cookie (.ROBLOSECURITY)</label>
                        <input type="password" placeholder="Paste your .ROBLOSECURITY cookie">
                        <p class="input-hint">PRO Stored only in your browser's localStorage — never sent to our servers</p>
                    </div>
                    <div class="input-field">
                        <label>Group ID</label>
                        <input type="text" placeholder="Leave blank for personal uploads">
                        <p class="input-hint">Must match the group that owns the game for animations to work in-game</p>
                    </div>
                </div>
            </section>

            <section class="settings-group">
                <div class="group-label">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3y-3.5"/></svg>
                    OPEN CLOUD API KEY
                </div>
                <div class="glass-card settings-card highlight-border">
                    <div class="api-status">
                        <span class="status-dot red"></span>
                        API Key Required — uploads won't work without this
                    </div>
                    <div class="input-row">
                        <input type="password" placeholder="Paste your Open Cloud API key">
                        <button class="show-btn">Show</button>
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
