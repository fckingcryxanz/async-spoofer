// Этот код должен быть в твоем файле роутера (например, main.js или router.js)

// 1. Находим кнопки в боковом меню (убедись, что ID совпадают с HTML)
const navDashboard = document.getElementById('nav-dashboard'); // ID твоей кнопки Dashboard
const navStudio = document.getElementById('nav-studio');       // ID твоей кнопки Studio
const navSettings = document.getElementById('nav-settings');   // ID твоей кнопки Settings

// 2. Привязываем клики к функциям
if (navDashboard) {
    navDashboard.addEventListener('click', () => {
        renderDashboard(); // Вызов функции из dashboard.js
    });
}

if (navStudio) {
    navStudio.addEventListener('click', () => {
        renderStudio(); // Вызов функции из studio.js
    });
}

if (navSettings) {
    navSettings.addEventListener('click', () => {
        renderSettings(); // Вызов функции из settings.js
    });
}

// Находим все кнопки в меню
const navItems = document.querySelectorAll('.nav-item');
const viewport = document.getElementById('view-port');

navItems.forEach(item => {
    item.addEventListener('click', () => {
        // 1. ПЕРЕКЛЮЧЕНИЕ СВЕЧЕНИЯ
        // Убираем класс 'active' у всех кнопок
        navItems.forEach(i => i.classList.remove('active'));
        // Добавляем класс 'active' только той, на которую кликнули
        item.classList.add('active');

        // 2. ПЛАВНАЯ АНИМАЦИЯ КОНТЕНТА
        const pageKey = item.getAttribute('data-page');
        
        // Плавно растворяем текущий контент
        viewport.style.opacity = '0';

        // Ждем 300мс (пока идет CSS анимация opacity) и меняем HTML
        setTimeout(() => {
            if (pages[pageKey]) {
                pages[pageKey](); // Загружаем новую страницу
            } else {
                // Если страницы еще нет, показываем заглушку
                viewport.innerHTML = `<h1>Вкладка ${pageKey} еще в разработке</h1>`;
            }
            
            // Плавно проявляем новый контент
            viewport.style.opacity = '1';
        }, 300);
    });
});

// Загружаем Дашборд по умолчанию при открытии сайта
renderDashboard();

export default async function handler(req, res) {
    // Настройка CORS заголовков, чтобы браузер не блокировал запросы
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, x-roblosecurity');

    // Обработка предварительного запроса браузера (Preflight)
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { targetUrl } = req.body;
        const roblosecurityCookie = req.headers['x-roblosecurity'];

        if (!roblosecurityCookie) {
            return res.status(400).json({ error: 'Missing x-roblosecurity header' });
        }

        // Делаем запрос к серверам Roblox от имени сервера Vercel
        const robloxResponse = await fetch(targetUrl, {
            method: 'GET',
            headers: {
                // Важно передать куки именно в таком формате
                'Cookie': `.ROBLOSECURITY=${roblosecurityCookie}`,
                'Accept': 'application/json',
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        // Читаем ответ как текст, чтобы избежать краша при пустом или не-JSON ответе
        const responseText = await robloxResponse.text();
        
        let responseData;
        try {
            responseData = JSON.parse(responseText);
        } catch (e) {
            // Если Roblox вернул ошибку в виде обычного текста или HTML
            return res.status(robloxResponse.status).json({ 
                error: 'Roblox returned non-JSON response', 
                raw: responseText 
            });
        }

        // Возвращаем фронтенду ответ от Roblox с тем же HTTP-статусом
        return res.status(robloxResponse.status).json(responseData);

    } catch (error) {
        console.error('Proxy Error:', error);
        return res.status(500).json({ 
            error: 'Internal Server Error', 
            message: error.message 
        });
    }
}
