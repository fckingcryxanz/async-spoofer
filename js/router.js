document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const viewPort = document.getElementById('view-port');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Убираем активный класс
            navItems.forEach(el => el.classList.remove('active'));
            item.classList.add('active');

            // Меняем контент
            const page = item.getAttribute('data-page');
            viewPort.innerHTML = `<h1>${page.toUpperCase()}</h1>`;
        });
    });
});
