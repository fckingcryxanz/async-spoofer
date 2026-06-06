// public/modules/main/dashboard.js
import { MainModule } from './main.js';

export function renderDashboard() {
    const viewport = document.getElementById('view-port');
    
    const content = `
        <div class="dashboard-grid">
            ${MainModule.createCard("Status", "<span class='status-online'>Connected to Roblox</span>")}
            ${MainModule.createCard("Spoofed Audios", "<h2 class='stat-number'>124</h2>")}
            ${MainModule.createCard("Active Sessions", "<p>Studio Instance: #4920</p>")}
        </div>
        <div class="recent-activity">
            <h3>Recent Spoofs</h3>
            <ul class="activity-list">
                <li><span>Explosion.mp3</span> <small>2 mins ago</small></li>
                <li><span>Sword_Slash.wav</span> <small>15 mins ago</small></li>
            </ul>
        </div>
    `;
    
    viewport.innerHTML = `
        <div class="view-header">
            <h1>Welcome back, Developer</h1>
            <p>Everything is running smoothly.</p>
        </div>
        ${content}
    `;
}
