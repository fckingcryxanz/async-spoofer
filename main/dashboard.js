// js/dashboard.js
export function renderDashboard() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    // 1. Загрузка актуальных данных из localStorage
    const stats = JSON.parse(localStorage.getItem('async_stats')) || {
        totalRuns: 0,
        uploaded: 0,
        failed: 0,
        lastRun: 'Never'
    };

    // Проверяем roblox_account, если пустой — берем дефолтные заглушки
    const user = JSON.parse(localStorage.getItem('roblox_account')) || {
        name: 'chief',
        handle: '3xtiga',
        id: '9898069926',
        avatarUrl: 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf3945858c706/150/150/AvatarHeadshot/Png'
    };

    // 2. Рендерим структуру интерфейса прямо в viewport
    viewport.innerHTML = `
        <div class="page-transition">
            <header class="main-header" style="background: linear-gradient(135deg, rgba(20, 19, 26, 0.7), rgba(138, 43, 226, 0.05)); border: 1px solid rgba(255,255,255,0.04); border-radius: 16px; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; backdrop-filter: blur(10px); margin-bottom: 30px;">
                <div style="display: flex; align-items: center; gap: 20px;">
                    <div style="width: 50px; height: 50px; border-radius: 50%; background: radial-gradient(circle, #8a2be2 0%, transparent 70%); display: flex; align-items: center; justify-content: center; border: 2px solid rgba(138, 43, 226, 0.3); box-shadow: 0 0 20px rgba(138, 43, 226, 0.2);">
                        <div style="width: 30px; height: 30px; border-radius: 50%; background: #0b0a10;"></div>
                    </div>
                    <div>
                        <h1 style="margin: 0; font-size: 24px; letter-spacing: 2px; font-weight: 800; display: flex; align-items: center; gap: 10px;">
                            ASYNC <span style="font-size: 10px; border: 1px solid rgba(255,255,255,0.2); padding: 2px 6px; border-radius: 12px; letter-spacing: 1px; color: #fff;">FREE</span>
                        </h1>
                        <p style="margin: 5px 0 0; color: rgba(255,255,255,0.4); font-size: 13px;">Web Edition — Spoof anything, anywhere</p>
                    </div>
                </div>
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255,255,255,0.04); padding: 10px 20px; border-radius: 12px; text-align: center;">
                    <span style="display: block; font-size: 10px; color: rgba(255,255,255,0.4); letter-spacing: 1px;">VERSION</span>
                    <span style="font-size: 16px; font-weight: 600;">2.6.0</span>
                </div>
            </header>

            <section style="margin-bottom: 30px;">
                <div class="section-title" style="font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 2px; display: flex; align-items: center; gap: 8px; margin-bottom: 15px; text-transform: uppercase;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></svg>
                    OVERVIEW
                </div>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px;">
                    <div class="dash-card card-purple">
                        <div class="card-top-row">
                            <span class="card-label">TOTAL RUNS</span>
                            <div class="card-icon-box icon-purple">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                        </div>
                        <h2>${stats.totalRuns}</h2>
                        <div class="card-glow-line line-purple"></div>
                    </div>

                    <div class="dash-card card-cyan">
                        <div class="card-top-row">
                            <span class="card-label">UPLOADED</span>
                            <div class="card-icon-box icon-cyan">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </div>
                        </div>
                        <h2>${stats.uploaded}</h2>
                        <div class="card-glow-line line-cyan"></div>
                    </div>

                    <div class="dash-card card-red">
                        <div class="card-top-row">
                            <span class="card-label">FAILED</span>
                            <div class="card-icon-box icon-red">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </div>
                        </div>
                        <h2>${stats.failed}</h2>
                        <div class="card-glow-line line-red"></div>
                    </div>

                    <div class="dash-card card-gray">
                        <div class="card-top-row">
                            <span class="card-label">LAST RUN</span>
                            <div class="card-icon-box icon-gray">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                        </div>
                        <h2 style="font-size: 20px; font-weight: 700; margin-top: 15px;">${stats.lastRun}</h2>
                        <div class="card-glow-line line-gray"></div>
                    </div>
                </div>
            </section>

            <section style="margin-bottom: 30px;">
                <div class="section-title" style="font-size: 11px; color: rgba(255,255,255,0.4); letter-spacing: 2px; display: flex; align-items: center; gap: 8px; margin-bottom: 15px; text-transform: uppercase;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                    ROBLOX ACCOUNT
                </div>
                
                <div class="roblox-account-bar" style="background: rgba(20, 19, 26, 0.5); border: 1px solid rgba(255,255,255,0.04); border-radius: 12px; padding: 15px 25px; display: flex; justify-content: space-between; align-items: center; backdrop-filter: blur(10px);">
                    <div style="display: flex; align-items: center; gap: 15px;">
                        <img src="${user.avatarUrl}" alt="Avatar" style="width: 44px; height: 44px; border-radius: 8px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);">
                        <div>
                            <div style="font-size: 16px; font-weight: 700; color: #fff;">${user.name} (@${user.handle})</div>
                            <div style="font-size: 11px; color: rgba(255,255,255,0.3); margin-top: 2px;">ID: ${user.id}</div>
                        </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 6px; background: rgba(0, 255, 136, 0.06); border: 1px solid rgba(0, 255, 136, 0.15); padding: 5px 12px; border-radius: 20px;">
                        <span style="width: 6px; height: 6px; background: #00ff88; border-radius: 50%; box-shadow: 0 0 8px #00ff88;"></span>
                        <span style="font-size: 11px; color: #00ff88; font-weight: bold; letter-spacing: 0.5px;">Online</span>
                    </div>
                </div>
            </section>
        </div>
    `;

    // Жёстко заставляем браузер показать контент, убирая прозрачность и скрытие
    viewport.style.opacity = '1';
    viewport.style.display = 'block'; 
    viewport.style.visibility = 'visible';
}
