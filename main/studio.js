// Переменная для отслеживания текущего выбранного типа сканирования
let currentScanType = 'animations'; 

// Функция генерации случайного Session ID (длина 11 символов, как в Roblox)
function generateRandomSessionId() {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 11; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

export function renderStudio() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    // Генерируем уникальный ID для текущей сессии
    const uniqueSessionId = generateRandomSessionId();

    viewport.innerHTML = `
        <div class="page-transition">
            <!-- Заголовок страницы -->
            <div class="view-header">
                <h1>Studio Control</h1>
                <p>Connect your Roblox Studio plugin to scan and remap assets</p>
            </div>

            <!-- Верхняя строка: Статус и настройки сессии -->
            <div class="studio-top-row">
                <!-- Карточка статуса -->
                <div class="glass-card settings-card" style="border-left: 4px solid #ff4a4a; display: flex; align-items: center; gap: 15px; padding: 18px;">
                    <div class="status-pulse-dot"></div>
                    <div>
                        <h4 style="margin: 0; font-size: 14px; color: #ff4a4a; letter-spacing: 0.5px;">PLUGIN DISCONNECTED</h4>
                        <p style="margin: 3px 0 0 0; font-size: 11px; opacity: 0.5;">Untitled Experience · Place 13728061</p>
                    </div>
                </div>

                <!-- Карточка конфигурации сессии (ID генерируется рандомно) -->
                <div class="glass-card settings-card" style="display: flex; justify-content: space-between; align-items: center; padding: 18px;">
                    <div>
                        <span style="font-size: 10px; opacity: 0.4; letter-spacing: 1px; display: block; margin-bottom: 4px;">SESSION CONFIG</span>
                        <p style="margin: 0; font-size: 13px;">
                            Add session ID <code id="session-id" style="background: rgba(185, 103, 255, 0.15); color: #c384ff; padding: 4px 8px; border-radius: 4px; font-family: monospace !important; font-weight: bold;">${uniqueSessionId}</code> to plugin.
                        </p>
                    </div>
                    <button id="copy-session-btn" class="secondary-btn small" style="margin: 0; padding: 6px 12px; font-size: 12px;">Copy ID</button>
                </div>
            </div>

            <!-- Разделитель -->
            <div class="section-divider">
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <span>SCAN OPERATIONS</span>
                <div class="line"></div>
            </div>

            <!-- Главный Рабочий Хаб -->
            <div class="studio-main-hub">
                
                <!-- Левая колонка: Панель управления -->
                <div class="glass-card settings-card" style="padding: 20px;">
                    <span style="font-size: 11px; opacity: 0.5; letter-spacing: 1px; display: block; margin-bottom: 15px;">COMMAND CONSOLE</span>
                    
                    <!-- Динамическая кнопка запуска -->
                    <button id="main-scan-btn" class="primary-btn" style="width: 100%; background: #512da8; box-shadow: 0 0 15px rgba(81, 45, 168, 0.3); padding: 14px; font-weight: bold; margin-bottom: 15px; transition: all 0.3s ease;">
                        Scan Animations
                    </button>

                    <!-- Переключатели режимов -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button id="tab-anim-btn" class="custom-input" style="background: rgba(185, 103, 255, 0.1); border-color: rgba(185, 103, 255, 0.4); color: #fff; text-align: center; cursor: pointer; font-size: 13px; font-weight: 500;">
                            Animations
                        </button>
                        <button id="tab-audio-btn" class="custom-input" style="background: rgba(255,255,255,0.01); border-color: rgba(255,255,255,0.08); color: rgba(255,255,255,0.6); text-align: center; cursor: pointer; font-size: 13px; font-weight: 500;">
                            Audio
                        </button>
                    </div>

                    <p id="scan-status-text" style="text-align: center; font-size: 11px; opacity: 0.5; margin-top: 15px; margin-bottom: 0; color: #00ff88;">
                        ✓ All scanning modules are unlocked and ready
                    </p>
                </div>

                <!-- Правая浅 колонка: Живые счетчики -->
                <div class="glass-card settings-card" style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                    <span style="font-size: 11px; opacity: 0.5; letter-spacing: 1px; display: block;">LIVE COUNTERS</span>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; height: 100%;">
                        <!-- Анимации -->
                        <div class="live-counter-card">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b967ff" stroke-width="2" style="filter: drop-shadow(0 0 5px rgba(185,103,255,0.5));">
                                <path d="M20 5H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2Z"></path>
                                <path d="m2 11 20-3"></path>
                                <path d="m8 5 3 3"></path>
                                <path d="m14 5 3 3"></path>
                            </svg>
                            <span id="studio-anim-count" style="font-size: 26px; font-weight: bold; color: #fff; font-family: 'Inter', sans-serif;">0</span>
                            <span style="font-size: 9px; opacity: 0.4; letter-spacing: 0.5px; font-weight: bold;">ANIMATIONS</span>
                        </div>

                        <!-- Аудио -->
                        <div class="live-counter-card">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" style="filter: drop-shadow(0 0 5px rgba(0,255,136,0.5));">
                                <path d="M9 18V5l12-2v13"></path>
                                <circle cx="6" cy="18" r="3"></circle>
                                <circle cx="18" cy="16" r="3"></circle>
                            </svg>
                            <span id="studio-audio-count" style="font-size: 26px; font-weight: bold; color: #fff; font-family: 'Inter', sans-serif;">0</span>
                            <span style="font-size: 9px; opacity: 0.4; letter-spacing: 0.5px; font-weight: bold;">AUDIO</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    setupStudioLogic();
}

function setupStudioLogic() {
    const copyBtn = document.getElementById('copy-session-btn');
    const mainScanBtn = document.getElementById('main-scan-btn');
    const tabAnimBtn = document.getElementById('tab-anim-btn');
    const tabAudioBtn = document.getElementById('tab-audio-btn');

    // Кнопка копирования сессии
    if (copyBtn) {
        copyBtn.onclick = () => {
            const sessionId = document.getElementById('session-id').innerText;
            navigator.clipboard.writeText(sessionId).then(() => {
                copyBtn.innerText = 'Copied!';
                setTimeout(() => copyBtn.innerText = 'Copy ID', 1500);
            });
        };
    }

    // Переключение на Animations
    if (tabAnimBtn && tabAudioBtn && mainScanBtn) {
        tabAnimBtn.onclick = () => {
            currentScanType = 'animations';
            mainScanBtn.innerText = 'Scan Animations';
            mainScanBtn.style.background = '#512da8';
            mainScanBtn.style.boxShadow = '0 0 15px rgba(81, 45, 168, 0.3)';
            
            tabAnimBtn.style.background = 'rgba(185, 103, 255, 0.1)';
            tabAnimBtn.style.borderColor = 'rgba(185, 103, 255, 0.4)';
            tabAudioBtn.style.background = 'rgba(255,255,255,0.01)';
            tabAudioBtn.style.borderColor = 'rgba(255,255,255,0.08)';
        };

        // Переключение на Audio
        tabAudioBtn.onclick = () => {
            currentScanType = 'audio';
            mainScanBtn.innerText = 'Scan Audio';
            mainScanBtn.style.background = '#00796b';
            mainScanBtn.style.boxShadow = '0 0 15px rgba(0, 121, 107, 0.3)';
            
            tabAudioBtn.style.background = 'rgba(0, 255, 136, 0.1)';
            tabAudioBtn.style.borderColor = 'rgba(0, 255, 136, 0.4)';
            tabAnimBtn.style.background = 'rgba(255,255,255,0.01)';
            tabAnimBtn.style.borderColor = 'rgba(255,255,255,0.08)';
        };
    }

    // Логика клика по кнопке сканирования
    if (mainScanBtn) {
        mainScanBtn.onclick = () => {
            const originalText = mainScanBtn.innerText;
            mainScanBtn.innerText = 'Scanning...';
            mainScanBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                mainScanBtn.innerText = originalText;
                mainScanBtn.style.opacity = '1';
                
                if (currentScanType === 'animations') {
                    const counter = document.getElementById('studio-anim-count');
                    if (counter) counter.innerText = parseInt(counter.innerText) + 1;
                } else {
                    const counter = document.getElementById('studio-audio-count');
                    if (counter) counter.innerText = parseInt(counter.innerText) + 1;
                }
            }, 1500);
        };
    }
}
