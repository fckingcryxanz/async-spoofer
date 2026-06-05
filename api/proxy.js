import { renderDashboard } from '../main/dashboard.js';
import { renderStudio } from '../main/studio.js';
import { renderSettings } from '../main/settings.js';

const pages = {
    'dashboard': renderDashboard,
    'studio': renderStudio,
    'settings': renderSettings
};

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
