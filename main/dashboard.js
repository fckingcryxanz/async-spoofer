import { MainModule } from './main.js';

export function renderDashboard() {
    const viewport = document.getElementById('view-port');
    
    // Проверяем наличие данных аккаунта (если их нет, блок не рисуется)
    const robloxData = JSON.parse(localStorage.getItem('roblox_account'));

    // Формируем контент
    viewport.innerHTML = `
        <div class="dashboard-wrapper">
            <!-- HEADER -->
            <div class="main-header">
                <div>
                    <h1 style="margin:0; font-size: 24px;">ECLIPSE <span style="font-size: 12px; color: #b967ff;">FREE</span></h1>
                    <p style="opacity: 0.6;">Web Edition — Spoof anything, anywhere</p>
                </div>
                <div style="background: #222; padding: 10px 20px; border-radius: 8px;">VERSION 2.6.0</div>
            </div>

            <!-- OVERVIEW -->
            <div class="category-label">Overview</div>
            <div class="stats-grid">
                <div class="card"><h3>TOTAL RUNS</h3><p>0</p></div>
                <div class="card"><h3>UPLOADED</h3><p>0</p></div>
                <div class="card"><h3>FAILED</h3><p>0</p></div>
                <div class="card"><h3>LAST RUN</h3><p style="font-size: 18px;">Never</p></div>
            </div>

            <!-- COMMUNITY -->
            <div class="category-label">Community</div>
            <div class="card">
                <h3>ECLIPSE COMMUNITY</h3>
                <p>1.1M Assets Spoofed &nbsp; 374 Current Users</p>
            </div>

            ${robloxData ? `
                <!-- ROBLOX ACCOUNT (появляется только если есть данные) -->
                <div class="category-label">Roblox Account</div>
                <div class="roblox-card">
                    <img src="${robloxData.avatarUrl}" class="roblox-avatar">
                    <div>
                        <div style="font-weight: bold;">${robloxData.name} (@${robloxData.handle})</div>
                        <div style="font-size: 12px; opacity: 0.6;">ID: ${robloxData.id}</div>
                    </div>
                    <div style="margin-left: auto; color: #00ff88;">● Online</div>
                </div>
            ` : ''}

            <!-- ACCOUNT STATUS -->
            <div class="category-label">Account Status</div>
            <div class="status-grid">
                <div class="card"><h3>API KEY</h3><p style="color: #00ff88;">Active</p></div>
                <div class="card"><h3>USER ID</h3><p>${robloxData ? robloxData.id : 'N/A'}</p></div>
                <div class="card"><h3>UPLOAD TARGET</h3><p>Personal</p></div>
            </div>
        </div>
    `;
}
