function renderSettings() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    viewport.innerHTML = `
        <div class="settings-container">
            <h2>Settings</h2>
            <p>Configure your authorization tokens</p>
            <hr style="border-color: rgba(255,255,255,0.05); margin: 20px 0;">
            
            <div class="input-group">
                <label>.ROBLOSECURITY Cookie</label>
                <input type="password" id="cookie-input" class="custom-input small-input" placeholder="_|WARNING:-DO-NOT-SHARE-THIS...">
            </div>

            <div class="input-group" style="margin-top: 15px;">
                <label>User ID (Auto-detects)</label>
                <input type="text" id="userid-input" class="custom-input small-input" placeholder="User ID" readonly style="opacity: 0.7; cursor: not-allowed;">
            </div>
            
            <button class="save-btn" style="margin-top: 20px;">Save Changes</button>
        </div>
    `;

    setupAutoUserId();
}

function setupAutoUserId() {
    const cookieInput = document.getElementById('cookie-input');
    const userIdInput = document.getElementById('userid-input');

    if (!cookieInput || !userIdInput) return;

    cookieInput.addEventListener('input', async (e) => {
        const cookieVal = e.target.value.trim();

        if (cookieVal.includes('_|WARNING:-DO-NOT-SHARE-THIS')) {
            userIdInput.value = 'Loading...';

            try {
                const response = await fetch('/api/proxy', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'x-roblosecurity': cookieVal
                    },
                    body: JSON.stringify({
                        targetUrl: 'https://users.roblox.com/v1/users/authenticated'
                    })
                });

                const data = await response.json();

                if (data && data.id) {
                    userIdInput.value = data.id;
                } else {
                    userIdInput.value = 'Invalid Cookie';
                }
            } catch (error) {
                userIdInput.value = 'API Error';
            }
        } else if (cookieVal === '') {
            userIdInput.value = '';
        }
    });
}
