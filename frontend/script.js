document.addEventListener('DOMContentLoaded', function () {
    const BASE_URL = 'http://localhost:5000'; // Sesuaikan dengan URL API Anda
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');
    const editModal = document.getElementById('editModal');
    const editNoteForm = document.getElementById('editNoteForm');
    const closeModal = document.querySelector('.close');

    let currentNoteId = null;

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
        const temperature = Math.floor(Math.random() * 30) + 10;
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

    // Fetch all notes dengan widget
    function fetchNotes() {
        fetch(`${BASE_URL}/notes`)
            .then(response => response.json())
            .then(data => {
                notesList.innerHTML = '';
                data.forEach(note => {
                    const noteElement = document.createElement('div');
                    noteElement.classList.add('note-item');
                    
                    // Widget
                    const timeWidget = `
                        <div class="note-widget">
                            <h3>Current Time</h3>
                            <p class="widget-time">${getCurrentTime()}</p>
                        </div>
                    `;

                    const weatherWidget = `
                        <div class="note-widget">
                            <h3>Weather</h3>
                            <p>${getWeather()}</p>
                        </div>
                    `;

                    const quoteWidget = `
                        <div class="note-widget">
                            <h3>Quote</h3>
                            <p class="widget-quote">"${getQuote()}"</p>
                        </div>
                    `;

                    noteElement.innerHTML = `
                        <div class="note-content">
                            <p><strong>${note.name}</strong> - ${new Date(note.date).toLocaleDateString()}</p>
                            <p>${note.catatan}</p>
                        </div>
                        <div class="note-widgets">
                            ${timeWidget}
                            ${weatherWidget}
                            ${quoteWidget}
                        </div>
                        <div class="note-actions">
                            <button class="edit-btn" onclick="openEditModal(${note.id}, '${escapeHtml(note.name)}', '${escapeHtml(note.catatan)}', '${note.date}')">Edit</button>
                            <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
                        </div>
                    `;
                    notesList.appendChild(noteElement);
                });
            })
            .catch(error => console.error('Error fetching notes:', error));
    }

    // Helper function untuk escape HTML
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Add a new note
    noteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const catatan = document.getElementById('catatan').value;
        const date = document.getElementById('date').value;

        fetch(`${BASE_URL}/notes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, catatan, date }),
        })
        .then(response => response.json())
        .then(data => {
            fetchNotes();
            noteForm.reset();
        })
        .catch(error => console.error('Error adding note:', error));
    });

    // Open edit modal
    window.openEditModal = function (id, name, catatan, date) {
        currentNoteId = id;
        document.getElementById('editName').value = name;
        document.getElementById('editCatatan').value = catatan;
        document.getElementById('editDate').value = date.split('T')[0];
        editModal.style.display = 'block';
    };

    // Close edit modal
    closeModal.addEventListener('click', function () {
        editModal.style.display = 'none';
    });

    // Submit edit form
    editNoteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('editName').value;
        const catatan = document.getElementById('editCatatan').value;
        const date = document.getElementById('editDate').value;

        fetch(`${BASE_URL}/notes/${currentNoteId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, catatan, date }),
        })
        .then(response => response.json())
        .then(data => {
            fetchNotes();
            editModal.style.display = 'none';
        })
        .catch(error => console.error('Error updating note:', error));
    });

    // Delete a note
    window.deleteNote = function (id) {
        if (confirm('Are you sure you want to delete this note?')) {
            fetch(`${BASE_URL}/notes/${id}`, {
                method: 'DELETE',
            })
            .then(response => response.json())
            .then(data => {
                fetchNotes();
            })
            .catch(error => console.error('Error deleting note:', error));
        }
    };

    // Close modal when clicking outside
    window.addEventListener('click', function (e) {
        if (e.target === editModal) {
            editModal.style.display = 'none';
        }
    });

    // Initial fetch
    fetchNotes();
});