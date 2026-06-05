document.getElementById('saveBtn').addEventListener('click', () => {
    const config = {
        cookie: document.getElementById('cookie').value,
        apiKey: document.getElementById('apiKey').value
    };
    
    // Сохраняем локально, данные не уходят на сервер при сохранении
    localStorage.setItem('async_config', JSON.stringify(config));
    alert('Settings saved locally!');
});

// Загрузка данных при старте
window.onload = () => {
    const saved = localStorage.getItem('async_config');
    if (saved) {
        const { cookie, apiKey } = JSON.parse(saved);
        document.getElementById('cookie').value = cookie;
        document.getElementById('apiKey').value = apiKey;
    }
};
