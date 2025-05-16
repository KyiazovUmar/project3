document.addEventListener('DOMContentLoaded', () => {
    const monthYear = document.getElementById('monthYear');
    const calendarBody = document.getElementById('calendarBody');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель',
        'Май', 'Июнь', 'Июль', 'Август',
        'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    function showCalendar(month, year) {
        calendarBody.innerHTML = '';
        monthYear.textContent = `${monthNames[month]} ${year}`;

        let firstDay = new Date(year, month, 1).getDay(); 
        // JS Sunday=0, make Monday=0:
        firstDay = (firstDay + 6) % 7;

        let daysInMonth = new Date(year, month + 1, 0).getDate();
        let date = 1;

        for (let i = 0; i < 6; i++) {
            const row = document.createElement('tr');

            for (let j = 0; j < 7; j++) {
                const cell = document.createElement('td');
                if (i === 0 && j < firstDay) {
                    cell.classList.add('empty');
                } else if (date > daysInMonth) {
                    cell.classList.add('empty');
                } else {
                    cell.textContent = date;
                    if (date === today.getDate() &&
                        year === today.getFullYear() &&
                        month === today.getMonth()) {
                        cell.classList.add('today');
                    }
                    date++;
                }
                row.appendChild(cell);
            }
            calendarBody.appendChild(row);
            if (date > daysInMonth) break;
        }
    }

    prevBtn.addEventListener('click', () => {
        currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
        currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
        showCalendar(currentMonth, currentYear);
    });

    nextBtn.addEventListener('click', () => {
        currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
        currentMonth = (currentMonth + 1) % 12;
        showCalendar(currentMonth, currentYear);
    });

    showCalendar(currentMonth, currentYear);
});
