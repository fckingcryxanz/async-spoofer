document.addEventListener('DOMContentLoaded', () => {
    const gate = document.getElementById('auth-gate');
    const btn = document.getElementById('gate-btn');
    const input = document.getElementById('key-input');

    // Если уже залогинен — сразу прячем шторку
    if (localStorage.getItem('is_authenticated') === 'true') {
        gate.style.display = 'none';
    }

    // Логика кнопки
    if (btn) {
        btn.onclick = () => {
            // Здесь можешь добавить простую проверку ключа
            if (input.value.length > 5) {
                localStorage.setItem('is_authenticated', 'true');
                gate.style.display = 'none'; // Просто убираем шторку, верстка не меняется
            } else {
                alert('Неверный ключ');
            }
        };
    }
});
