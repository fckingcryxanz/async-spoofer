// js/app.js
import { initRouter } from './router.js';

export function loadMainApp() {
    const root = document.getElementById('root');
    
    // Твой HTML-код панели
    root.innerHTML = `
    <div class="app-container">
        <aside class="sidebar">
            <div class="sidebar-logo-block">
                <img src="https://i.postimg.cc/L41NZ4nD/logo.png" alt="Async Logo" class="custom-sidebar-logo">
                <span class="sidebar-brand-text">Async</span>
            </div>

            <div class="nav-group">
                <label>MAIN</label>
                <div class="nav-item active" data-page="dashboard">
                    <div class="icon-box">...svg...</div>
                    <span>Dashboard</span>
                </div>
                <div class="nav-item" data-page="tutorial">
                    <div class="icon-box">...svg...</div>
                    <span>Tutorial</span>
                </div>
                <div class="nav-item" data-page="studio">
                    <div class="icon-box">...svg...</div>
                    <span>Studio</span>
                </div>
            </div>

            <div class="nav-group">
                <label>CONFIG</label>
                <div class="nav-item" data-page="hub">
                    <div class="icon-box">...svg...</div>
                    <span>Hub</span>
                </div>
                <div class="nav-item" data-page="settings">
                    <div class="icon-box">...svg...</div>
                    <span>Settings</span>
                </div>
            </div>
        </aside>

        <main id="view-port">
            <!-- Сюда подгружается контент -->
        </main>
    </div>
    `;

    // Запускаем навигацию
    initRouter();
}
