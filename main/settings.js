// 1. Функция рендера страницы (она у тебя уже есть, проверь инпуты)
function renderSettings() {
    const viewport = document.getElementById('view-port');
    
    // Вставляем HTML-контент страницы настроек
    viewport.innerHTML = `
        <div class="settings-container">
            <h2>Settings</h2>
            <p>Configure your authorization tokens</p>
            <hr style="border-color: rgba(255,255,255,0.05); margin: 20px 0;">
            
            <div class="input-group">
                <label>.ROBLOSECURITY Cookie</label>
                <!-- УБЕДИСЬ, ЧТО ТУТ СТОИТ id="cookie-input" -->
                <input type="password" id="cookie-input" class="custom-input small-input" placeholder="_|WARNING:-DO-NOT-SHARE-THIS...">
            </div>

            <div class="input-group" style="margin-top: 15px;">
                <label>User ID (Auto-detects)</label>
                <!-- УБЕДИСЬ, ЧТО ТУТ СТОИТ id="userid-input" -->
                <input type="text" id="userid-input" class="custom-input small-input" placeholder="User ID" readonly style="opacity: 0.7; cursor: not-allowed;">
            </div>
            
            <button class="save-btn" style="margin-top: 20px;">Save Changes</button>
        </div>
    `;

    // 🔥 САМЫЙ ВАЖНЫЙ МОМЕНТ: Вызываем логику автоопределения ТОЛЬКО ПОСЛЕ того, 
    // как инпуты появились в viewport.innerHTML!
    setupAutoUserId();
}

// 2. Сама функция автоопределения (теперь она внутри safe-зоны)
function setupAutoUserId() {
    const cookieInput = document.getElementById('cookie-input');
    const userIdInput = document.getElementById('userid-input');

    // Проверяем, появились ли элементы, чтобы избежать краша скрипта
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
                    console.log(`Authorized as: ${data.displayName}`);
                } else {
                    userIdInput.value = 'Invalid Cookie';
                }
            } catch (error) {
                console.error('Error fetching User ID:', error);
                userIdInput.value = 'API Error';
            }
        } else if (cookieVal === '') {
            userIdInput.value = '';
        }
    });
}
