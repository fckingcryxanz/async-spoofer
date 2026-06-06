import { MainModule } from './main.js';

export function renderDashboard() {
    // Меняем URL при открытии вкладки
    window.history.pushState({}, '', '/dash');

    const viewport = document.getElementById('view-port');
    const robloxData = JSON.parse(localStorage.getItem('roblox_account'));

    viewport.innerHTML = `
        <div class="dashboard-container">
            <!-- HEADER -->
            <div class="view-header-custom">
                <div class="header-text">
                    <h1>ECLIPSE <span class="badge">FREE</span></h1>
                    <p>Web Edition — Spoof anything, anywhere</p>
                </div>
                <div class="version-badge">VERSION 2.6.0</div>
            </div>

            <!-- OVERVIEW -->
            <div class="category-label">OVERVIEW</div>
            <div class="dashboard-grid">
                ${MainModule.createCard("TOTAL RUNS", "0")}
                ${MainModule.createCard("UPLOADED", "0")}
                ${MainModule.createCard("FAILED", "0")}
                ${MainModule.createCard("LAST RUN", "Never")}
            </div>

            <!-- COMMUNITY -->
            <div class="category-label">COMMUNITY</div>
            <div class="community-frame">
                <h3>ECLIPSE COMMUNITY</h3>
                <p>1.1M Assets Spoofed • 374 Current Users</p>
            </div>

            <!-- ROBLOX ACCOUNT (только если есть данные) -->
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

            <!-- ACCOUNT STATUS -->
            <div class="category-label">ACCOUNT STATUS</div>
            <div class="dashboard-grid">
                ${MainModule.createCard("API KEY", "<span style='color: #00ff88;'>Active</span>")}
                ${MainModule.createCard("USER ID", robloxData ? robloxData.id : "N/A")}
                ${MainModule.createCard("UPLOAD TARGET", "Personal")}
            </div>
        </div>
    `;
}
