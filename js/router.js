const routes = {
    dashboard: './modules/main/dashboard.js',
    studio: './modules/main/studio.js',
    hub: './modules/config/hub.js'
};

document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', async () => {
        // Убираем активный класс у всех
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        // Добавляем текущему
        item.classList.add('active');

        const page = item.getAttribute('data-page');
        loadPage(page);
    });
});

async function loadPage(page) {
    const viewport = document.getElementById('view-port');
    viewport.style.opacity = '0';
    
    // Здесь можно имитировать загрузку файла или просто менять HTML
    setTimeout(() => {
        viewport.innerHTML = `<h1>Загрузка ${page}...</h1>`;
        viewport.style.opacity = '1';
    }, 200);
}
