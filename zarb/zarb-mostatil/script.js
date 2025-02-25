function generateRectangle() {
    const number = parseInt(document.getElementById('number').value);
    const rectangle = document.getElementById('rectangle');
    rectangle.innerHTML = ''; // پاک کردن محتوای قبلی

    if (number < 1 || number > 10 || isNaN(number)) {
        alert('لطفاً عددی بین 1 تا 10 وارد کنید.');
        return;
    }

    for (let i = 1; i <= 10; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        for (let j = 1; j <= number; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.textContent = i * j;
            row.appendChild(cell);
        }
        rectangle.appendChild(row);
    }
}