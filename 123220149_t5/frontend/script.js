document.addEventListener('DOMContentLoaded', function () {
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');
    const editModal = document.getElementById('editModal');
    const editNoteForm = document.getElementById('editNoteForm');
    const closeModal = document.querySelector('.close');

    let notes = [];
    let editIndex = null;

    // Fungsi untuk mendapatkan waktu saat ini
    function getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }

    // Fungsi untuk mendapatkan cuaca (contoh statis)
    function getWeather() {
        const weatherConditions = ["Sunny", "Cloudy", "Rainy", "Stormy"];
        const randomWeather = weatherConditions[Math.floor(Math.random() * weatherConditions.length)];
        const temperature = Math.floor(Math.random() * 30) + 10; // Suhu antara 10-40°C
        return `${randomWeather}, ${temperature}°C`;
    }

    // Fungsi untuk mendapatkan quote (contoh statis)
    function getQuote() {
        const quotes = [
            "The best way to predict the future is to create it.",
            "Stay hungry, stay foolish.",
            "Do what you can, with what you have, where you are.",
            "Simplicity is the ultimate sophistication."
        ];
        return quotes[Math.floor(Math.random() * quotes.length)];
    }

    noteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const catatan = document.getElementById('catatan').value;
        const date = document.getElementById('date').value;

        const note = {
            name,
            catatan,
            date
        };

        notes.push(note);
        renderNotes();
        noteForm.reset();
    });

    function renderNotes() {
        notesList.innerHTML = '';
        notes.forEach((note, index) => {
            const noteItem = document.createElement('div');
            noteItem.classList.add('note-item');

            // Widget Jam
            const timeWidget = `
                <div class="note-widget">
                    <h3>Current Time</h3>
                    <p class="widget-time">${getCurrentTime()}</p>
                </div>
            `;

            // Widget Cuaca
            const weatherWidget = `
                <div class="note-widget">
                    <h3>Weather</h3>
                    <p>${getWeather()}</p>
                </div>
            `;

            // Widget Quote of the Day
            const quoteWidget = `
                <div class="note-widget">
                    <h3>Quote of the Day</h3>
                    <p class="widget-quote">"${getQuote()}"</p>
                </div>
            `;

            noteItem.innerHTML = `
                <div class="note-content">
                    <p><strong>${note.name}</strong> - ${note.date}</p>
                    <p>${note.catatan}</p>
                </div>
                ${timeWidget}
                ${weatherWidget}
                ${quoteWidget}
                <div class="note-actions">
                    <button class="edit-btn" onclick="openEditModal(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteNote(${index})">Delete</button>
                </div>
            `;
            notesList.appendChild(noteItem);
        });
    }

    window.openEditModal = function (index) {
        editIndex = index;
        const note = notes[index];
        document.getElementById('editName').value = note.name;
        document.getElementById('editCatatan').value = note.catatan;
        document.getElementById('editDate').value = note.date;
        editModal.style.display = 'block';
    };

    editNoteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('editName').value;
        const catatan = document.getElementById('editCatatan').value;
        const date = document.getElementById('editDate').value;

        notes[editIndex] = { name, catatan, date };
        renderNotes();
        editModal.style.display = 'none';
    });

    window.deleteNote = function (index) {
        notes.splice(index, 1);
        renderNotes();
    };

    closeModal.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    window.addEventListener('click', function (e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });
});