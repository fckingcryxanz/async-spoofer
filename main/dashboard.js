import { MainModule } from './main.js';

export function renderDashboard() {
    const viewport = document.getElementById('view-port');
    
    // Пытаемся получить данные аккаунта
    const robloxData = JSON.parse(localStorage.getItem('roblox_account'));

    // Блок Roblox Account (рендерится только если данные есть)
    const robloxAccountSection = robloxData ? `
        <div class="section-label">ROBLOX ACCOUNT</div>
        <div class="roblox-card">
            <img src="${robloxData.avatarUrl}" alt="Avatar" class="roblox-avatar">
            <div class="roblox-info">
                <h3>${robloxData.name} (@${robloxData.handle})</h3>
                <p>ID: ${robloxData.id}</p>
            </div>
            <div class="status-badge"><span class="dot">●</span> Online</div>
        </div>
    ` : '';

    viewport.innerHTML = `
        <div class="dashboard-header">
            <div class="header-left">
                <h1>ECLIPSE <span class="badge-free">FREE</span></h1>
                <p>Web Edition — Spoof anything, anywhere</p>
            </div>
            <div class="header-version">VERSION <span>2.6.0</span></div>
        </div>

        <div class="dashboard-grid">
            ${MainModule.createCard("TOTAL RUNS", "0")}
            ${MainModule.createCard("UPLOADED", "0")}
            ${MainModule.createCard("FAILED", "0")}
            ${MainModule.createCard("LAST RUN", "Never")}
        </div>

        <div class="community-card">
            <div class="community-text">
                <h3>ECLIPSE COMMUNITY</h3>
                <p><strong>1.1M</strong> Assets Spoofed &nbsp; <strong>374</strong> Current Users</p>
            </div>
        </div>

        ${robloxAccountSection}

        <div class="section-label">ACCOUNT STATUS</div>
        <div class="status-grid">
            <div class="stat-box"><span>API KEY</span><h3 style="color: #00ff88;">Active</h3></div>
            <div class="stat-box"><span>USER ID</span><h3>${robloxData ? robloxData.id : 'N/A'}</h3></div>
            <div class="stat-box"><span>UPLOAD TARGET</span><h3>Personal</h3></div>
        </div>
    `;
}
