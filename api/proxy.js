export default async function handler(req, res) {
    const { targetUrl, method, headers, body } = req.body;

    try {
        const response = await fetch(targetUrl, {
            method: method || 'GET',
            headers: {
                ...headers,
                'User-Agent': 'Roblox/WinInet'
            },
            body: body ? JSON.stringify(body) : undefined
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'Proxy request failed' });
    }
}
