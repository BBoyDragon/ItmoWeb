document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("booking-form");
    const confirmationTable = document.getElementById("confirmation-table");

    const loadMovies = () => {
        const movieSelect = document.getElementById("movie");
        const movies = [
            { id: 1, name: "Фильм 1" },
            { id: 2, name: "Фильм 2" },
            { id: 3, name: "Фильм 3" }
        ];
        movies.forEach(movie => {
            const option = document.createElement("option");
            option.value = movie.id;
            option.textContent = movie.name;
            movieSelect.appendChild(option);
        });
    };

    const renderTable = (bookings) => {
        confirmationTable.innerHTML = "<tr><th>Имя</th><th>Фильм</th><th>Дата и время</th><th>Количество билетов</th></tr>";
        if (!Array.isArray(bookings)) {
            console.error("Данные bookings не являются массивом:", bookings);
            return;
        }
        bookings.forEach(booking => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${booking.name}</td>
                <td>${booking.movie}</td>
                <td>${booking.datetime}</td>
                <td>${booking.tickets}</td>
            `;
            confirmationTable.appendChild(row);
        });
    };

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        let bookings = JSON.parse(localStorage.getItem("bookingData")) || [];
        if (!Array.isArray(bookings)) {
            bookings = [];
        }
        bookings.push(data);
        localStorage.setItem("bookingData", JSON.stringify(bookings));

        renderTable(bookings);
    });

    let savedData = JSON.parse(localStorage.getItem("bookingData")) || [];
    if (!Array.isArray(savedData)) {
        savedData = [];
    }
    renderTable(savedData);

    loadMovies();
});
