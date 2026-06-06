import { MainModule } from './main.js';

export function renderDashboard() {
    // Устанавливаем правильный путь
    window.history.pushState(null, null, '/dash');

    const viewport = document.getElementById('view-port');
   // Внутри renderDashboard()
    const robloxData = JSON.parse(localStorage.getItem('roblox_account'));

    // Внутри renderDashboard() используй эту структуру:
const robloxSection = robloxData ? `
    <div class="roblox-card">...активный профиль...</div>
` : `
    <div class="empty-frame">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/>
        </svg>
        <span>Empty</span>
    </div>
`;

// Логика отрисовки профиля
const profileContent = robloxData ? `
    <div class="profile-card">
        <img src="${robloxData.avatarUrl}" alt="Avatar">
        <div class="profile-info">
            <h3>${robloxData.name} (@${robloxData.handle})</h3>
            <p>ID: ${robloxData.id}</p>
        </div>
        <div class="status-badge">● Online</div>
    </div>
` : `
    <div class="profile-card empty">
        <div class="icon-box"> <!-- Здесь будет грустная иконка -->
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/>
            </svg>
        </div>
        <h3>Empty</h3>
    </div>
`;

    // SVG иконки для Overview
    const icons = {
        play: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 3l14 9-14 9V3z"/></svg>`,
        check: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>`,
        cross: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
        clock: `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
        sad: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>`
    };

    viewport.innerHTML = `
        <div class="dashboard-wrapper">
            <!-- 1. OVERVIEW -->
            <div class="category-label">Overview</div>
            <div class="grid-4">
                <div class="stat-card"><h3>TOTAL RUNS</h3><p>0</p><div class="icon-box">${icons.play}</div></div>
                <div class="stat-card"><h3>UPLOADED</h3><p>0</p><div class="icon-box">${icons.check}</div></div>
                <div class="stat-card"><h3>FAILED</h3><p>0</p><div class="icon-box">${icons.cross}</div></div>
                <div class="stat-card"><h3>LAST RUN</h3><p>Never</p><div class="icon-box">${icons.clock}</div></div>
            </div>

            <!-- 2. ROBLOX ACCOUNT -->
            <div class="category-label">Roblox Account</div>
            ${robloxData ? `
                <div class="profile-card">
                    <img src="${robloxData.avatarUrl}" alt="Avatar">
                    <div class="profile-info">
                        <h3>${robloxData.name} (@${robloxData.handle})</h3>
                        <p>ID: ${robloxData.id}</p>
                    </div>
                    <div class="status-badge">● Online</div>
                </div>
            ` : `
                <div class="profile-card empty">
                    <div class="icon-box">${icons.sad}</div>
                    <h3>Empty</h3>
                </div>
            `}

            <!-- 3. ACCOUNT STATUS -->
            <div class="category-label">Account Status</div>
            <div class="grid-3">
                <div class="status-card"><h3>API KEY</h3><p class="active">Active</p></div>
                <div class="status-card"><h3>USER ID</h3><p>${robloxData ? robloxData.id : "N/A"}</p></div>
                <div class="status-card"><h3>UPLOAD TARGET</h3><p>Personal</p></div>
            </div>
        </div>
    `;
}
