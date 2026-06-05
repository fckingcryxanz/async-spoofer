export default async function handler(req, res) {
    const { targetUrl, method, headers, body } = req.body;

export default async function handler(req, res) {
    // Разрешаем CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-roblosecurity');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        const { targetUrl } = req.body; // Получаем URL из тела POST-запроса
        const robloSecurity = req.headers['x-roblosecurity']; // Получаем куки из нашего кастомного заголовка

        if (!targetUrl) {
            return res.status(400).json({ error: 'targetUrl is required' });
        }

        // Настраиваем заголовки для реального запроса к Roblox
        const fetchHeaders = {
            'User-Agent': 'RobloxStudio/WinInet', // Маскируемся под Студию
            'Accept': 'application/json'
        };

        // Если с фронта прилетел куки, подставляем его в правильном формате
        if (robloSecurity) {
            fetchHeaders['Cookie'] = `.ROBLOSECURITY=${robloSecurity}`;
        }

        // Делаем запрос к самому Роблоксу
        const robloxResponse = await fetch(targetUrl, {
            method: 'GET',
            headers: fetchHeaders
        });

        const data = await robloxResponse.json();
        
        // Возвращаем ответ Роблокса обратно на наш фронтенд
        return res.status(robloxResponse.status).json(data);

    } catch (error) {
        return res.status(500).json({ error: 'Proxy Server Error', details: error.message });
    }
}
