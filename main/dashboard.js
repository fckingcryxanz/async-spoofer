import { MainModule } from './main.js';

export function renderDashboard() {
    // Установка URL при открытии
    window.history.pushState({}, '', '/dash');

    const viewport = document.getElementById('view-port');
    const robloxData = JSON.parse(localStorage.getItem('roblox_account'));

    // SVG иконки
    const icon = {
        runs: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b967ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 20V10M12 20V4M6 20v-6"/></svg>`,
        uploaded: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
        failed: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4d4d" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`,
        time: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>`
    };

    viewport.innerHTML = `
        <div class="dashboard-container">
            <div class="view-header-custom">
                <div>
                    <h1 style="margin:0; font-size: 24px;">ECLIPSE <span class="badge">FREE</span></h1>
                    <p style="opacity: 0.6; margin-top: 5px;">Web Edition — Spoof anything, anywhere</p>
                </div>
                <div class="version-badge">VERSION 2.6.0</div>
            </div>

            <div class="category-label">OVERVIEW</div>
            <div class="dashboard-grid">
                <div class="card">${icon.runs} <h3>TOTAL RUNS</h3><p>0</p></div>
                <div class="card">${icon.uploaded} <h3>UPLOADED</h3><p>0</p></div>
                <div class="card">${icon.failed} <h3>FAILED</h3><p>0</p></div>
                <div class="card">${icon.time} <h3>LAST RUN</h3><p>Never</p></div>
            </div>

            <div class="category-label">COMMUNITY</div>
            <div class="community-frame">
                <h3>ECLIPSE COMMUNITY</h3>
                <p>1.1M Assets Spoofed • 374 Current Users</p>
            </div>

            ${robloxData ? `
                <div class="category-label">ROBLOX ACCOUNT</div>
                <div class="roblox-frame">
                    <img src="${robloxData.avatarUrl}" alt="Avatar">
                    <div class="roblox-info">
                        <h3>${robloxData.name} (@${robloxData.handle})</h3>
                        <p>ID: ${robloxData.id}</p>
                    </div>
                    <div class="status-indicator">● Online</div>
                </div>
            ` : ''}

            <div class="category-label">ACCOUNT STATUS</div>
            <div class="dashboard-grid">
                <div class="card"><h3>API KEY</h3><p style="color: #00ff88;">Active</p></div>
                <div class="card"><h3>USER ID</h3><p>${robloxData ? robloxData.id : "N/A"}</p></div>
                <div class="card"><h3>UPLOAD TARGET</h3><p>Personal</p></div>
            </div>
        </div>
    `;
}
