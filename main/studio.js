export function renderStudio() {
    const viewport = document.getElementById('view-port');
    if (!viewport) return;

    viewport.innerHTML = `
        <div class="page-transition">
            <!-- Заголовок страницы -->
            <div class="view-header">
                <h1>Studio Control</h1>
                <p>Connect your Roblox Studio plugin to scan and remap assets</p>
            </div>

            <!-- Верхняя строка: Слияние статуса и настроек ID -->
            <div class="studio-top-row">
                <!-- Карточка статуса -->
                <div class="glass-card settings-card" style="border-left: 4px solid #ff4a4a; display: flex; align-items: center; gap: 15px; padding: 18px;">
                    <div class="status-pulse-dot"></div>
                    <div>
                        <h4 style="margin: 0; font-size: 14px; color: #ff4a4a; letter-spacing: 0.5px;">PLUGIN DISCONNECTED</h4>
                        <p style="margin: 3px 0 0 0; font-size: 11px; opacity: 0.5;">Untitled Experience · Place 13728061</p>
                    </div>
                </div>

                <!-- Карточка быстрой настройки сессии -->
                <div class="glass-card settings-card" style="display: flex; justify-content: space-between; align-items: center; padding: 18px;">
                    <div>
                        <span style="font-size: 10px; opacity: 0.4; letter-spacing: 1px; display: block; margin-bottom: 4px;">SESSION CONFIG</span>
                        <p style="margin: 0; font-size: 13px;">
                            Add session ID <code id="session-id" style="background: rgba(185, 103, 255, 0.15); color: #c384ff; padding: 2px 6px; border-radius: 4px; font-family: monospace; font-weight: bold;">e5kj4ix7ixl</code> to plugin.
                        </p>
                    </div>
                    <button id="copy-session-btn" class="secondary-btn small" style="margin: 0; padding: 6px 12px; font-size: 12px;">Copy ID</button>
                </div>
            </div>

            <!-- Разделитель центрального хаба -->
            <div class="section-divider">
                <div class="icon-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                </div>
                <span>SCAN OPERATIONS</span>
                <div class="line"></div>
            </div>

            <!-- Главный Рабочий Хаб -->
            <div class="studio-main-hub">
                
                <!-- Левая колонка: Панель команд -->
                <div class="glass-card settings-card" style="padding: 20px;">
                    <span style="font-size: 11px; opacity: 0.5; letter-spacing: 1px; display: block; margin-bottom: 15px;">COMMAND CONSOLE</span>
                    
                    <!-- Главная кнопка запуска -->
                    <button id="main-scan-btn" class="primary-btn" style="width: 100%; background: #512da8; box-shadow: 0 0 15px rgba(81, 45, 168, 0.3); padding: 14px; font-weight: bold; margin-bottom: 15px;">
                        Scan Animations
                    </button>

                    <!-- Выбор активного типа -->
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <button class="custom-input" style="background: rgba(255,255,255,0.04); border-color: rgba(185, 103, 255, 0.3); color: #fff; text-align: center; cursor: pointer; font-size: 13px; font-weight: 500;">
                            Animations
                        </button>
                        <button class="custom-input" style="background: rgba(255,255,255,0.01); border-color: rgba(255,255,255,0.03); color: rgba(255,255,255,0.2); text-align: center; cursor: not-allowed; font-size: 13px;" disabled>
                            Audio (PRO)
                        </button>
                    </div>

                    <p style="text-align: center; font-size: 11px; opacity: 0.4; margin-top: 15px; margin-bottom: 0;">
                        Free version — only animation scanning available · <span style="color: #b967ff; cursor: pointer; font-weight: bold;">Upgrade to PRO</span>
                    </p>
                </div>

                <!-- Правая колонка: Только нужные счетчики результатов -->
                <div class="glass-card settings-card" style="padding: 20px; display: flex; flex-direction: column; gap: 12px;">
                    <span style="font-size: 11px; opacity: 0.5; letter-spacing: 1px; display: block;">LIVE COUNTERS</span>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; height: 100%;">
                        <!-- Анимации -->
                        <div class="live-counter-card">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#b967ff" stroke-width="2" style="filter: drop-shadow(0 0 5px rgba(185,103,255,0.5));"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                            <span id="studio-anim-count" style="font-size: 26px; font-weight: bold; color: #fff; font-family: 'Inter', sans-serif;">0</span>
                            <span style="font-size: 9px; opacity: 0.4; letter-spacing: 0.5px; font-weight: bold;">ANIMATIONS</span>
                        </div>

                        <!-- Аудио -->
                        <div class="live-counter-card">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#00ff88" stroke-width="2" style="filter: drop-shadow(0 0 5px rgba(0,255,136,0.5));"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
                            <span id="studio-audio-count" style="font-size: 26px; font-weight: bold; color: #fff; font-family: 'Inter', sans-serif;">0</span>
                            <span style="font-size: 9px; opacity: 0.4; letter-spacing: 0.5px; font-weight: bold;">AUDIO</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    `;

    // Инициализация внутренних скриптов вкладки
    setupStudioLogic();
}

function setupStudioLogic() {
    // Копирование Session ID
    const copyBtn = document.getElementById('copy-session-btn');
    if (copyBtn) {
        copyBtn.onclick = () => {
            const sessionId = document.getElementById('session-id').innerText;
            navigator.clipboard.writeText(sessionId).then(() => {
                copyBtn.innerText = 'Copied!';
                setTimeout(() => copyBtn.innerText = 'Copy ID', 1500);
            });
        };
    }

    // Имитация/обработчик кнопки сканирования
    const scanBtn = document.getElementById('main-scan-btn');
    if (scanBtn) {
        scanBtn.onclick = () => {
            scanBtn.innerText = 'Scanning...';
            scanBtn.style.opacity = '0.7';
            
            // Сюда пойдет реальный запрос к вашему плагину через API
            setTimeout(() => {
                scanBtn.innerText = 'Scan Animations';
                scanBtn.style.opacity = '1';
            }, 2000);
        };
    }
}
