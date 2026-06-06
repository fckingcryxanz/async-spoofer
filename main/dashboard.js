document.addEventListener('DOMContentLoaded', () => {
    // 1. Инициализация или загрузка данных из localStorage
    const loadData = () => {
        const stats = JSON.parse(localStorage.getItem('async_stats')) || {
            totalRuns: 0,
            uploaded: 0,
            failed: 0,
            lastRun: 'Never'
        };

        const user = JSON.parse(localStorage.getItem('async_user')) || {
            username: 'chief',
            handle: '@3xtiga',
            id: '9898069926',
            avatar: 'https://tr.rbxcdn.com/38c6edcb50633730ff4cf3945858c706/150/150/AvatarHeadshot/Png'
        };

        return { stats, user };
    };

    // 2. Функция рендера UI
    const updateDashboardUI = (data) => {
        // Обновляем статистику
        document.getElementById('total-runs').textContent = data.stats.totalRuns;
        document.getElementById('uploaded-count').textContent = data.stats.uploaded;
        document.getElementById('failed-count').textContent = data.stats.failed;
        document.getElementById('last-run').textContent = data.stats.lastRun;

        // Обновляем данные аккаунта
        document.getElementById('rbx-name').textContent = `${data.user.username} (${data.user.handle})`;
        document.getElementById('rbx-id').textContent = `ID: ${data.user.id}`;
        document.getElementById('rbx-avatar').src = data.user.avatar;
    };

    // 3. Запускаем при загрузке
    const dashboardData = loadData();
    updateDashboardUI(dashboardData);

    // Пример: Как обновлять данные при выполнении спуфа из твоих других скриптов
    window.updateStats = (type) => {
        const currentStats = JSON.parse(localStorage.getItem('async_stats')) || dashboardData.stats;
        
        currentStats.totalRuns++;
        if (type === 'success') {
            currentStats.uploaded++;
        } else if (type === 'fail') {
            currentStats.failed++;
        }
        
        const now = new Date();
        currentStats.lastRun = `${now.getHours()}:${now.getMinutes().toString().padStart(2, '0')}`;

        // Сохраняем обратно в LocalStorage
        localStorage.setItem('async_stats', JSON.stringify(currentStats));
        
        // Перерисовываем UI
        updateDashboardUI({ stats: currentStats, user: dashboardData.user });
    };

    // Для теста можешь вызвать в консоли браузера: window.updateStats('success')
});
