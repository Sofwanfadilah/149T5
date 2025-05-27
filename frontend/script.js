document.addEventListener('DOMContentLoaded', function () {
    const formTitle = document.getElementById('formTitle');
    const authForm = document.getElementById('authForm');
    const toggleText = document.getElementById('toggleText');
    const toggleForm = document.getElementById('toggleForm');
    const notesPage = document.getElementById('notesPage');
    const noteForm = document.getElementById('noteForm');
    const notesList = document.getElementById('notesList');
    
    let isLogin = true;  // Status form, true = login, false = register

    // Toggle form between login and register
    toggleForm.addEventListener('click', function (e) {
        e.preventDefault();

        if (isLogin) {
            formTitle.textContent = "Register";
            authForm.innerHTML = `
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <input type="password" id="confirmPassword" placeholder="Confirm Password" required>
                <button type="submit">Register</button>
            `;
            toggleText.innerHTML = `Already have an account? <a href="#" id="toggleForm">Login here</a>`;
        } else {
            formTitle.textContent = "Login";
            authForm.innerHTML = `
                <input type="text" id="username" placeholder="Username" required>
                <input type="password" id="password" placeholder="Password" required>
                <button type="submit">Login</button>
            `;
            toggleText.innerHTML = `Don't have an account? <a href="#" id="toggleForm">Register here</a>`;
        }

        isLogin = !isLogin;  // Toggle the form mode
        document.getElementById('toggleForm').addEventListener('click', function (e) {
            e.preventDefault();
            toggleForm.click();
        });
    });

    // Event listener for form submission (login/register)
    authForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (isLogin) {
            // Login functionality
            login(username, password);
        } else {
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                alert('Password and confirm password do not match!');
                return;
            }
            // Register functionality
            register(username, password);
        }
    });

    // Login function
    function login(username, password) {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                localStorage.setItem('accessToken', data.accessToken);
                alert('Login successful!');
                showNotesPage();
            } else {
                alert('Login failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login failed, please try again.');
        });
    }

    // Register function
    function register(username, password) {
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Registrasi berhasil') {
                alert('Registration successful, please login.');
                formTitle.textContent = "Login";
                isLogin = true;
                authForm.innerHTML = `
                    <input type="text" id="username" placeholder="Username" required>
                    <input type="password" id="password" placeholder="Password" required>
                    <button type="submit">Login</button>
                `;
            } else {
                alert('Registration failed: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registration failed, please try again.');
        });
    }

    // Show notes page after login
    function showNotesPage() {
        document.querySelector('.container').style.display = 'none';
        notesPage.style.display = 'block';
        fetchNotes();
    }

    // Fetch all notes after login
    function fetchNotes() {
        fetch('http://localhost:5000/notes', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            notesList.innerHTML = '';
            data.forEach(note => {
                const noteElement = document.createElement('div');
                noteElement.classList.add('note-item');
                noteElement.innerHTML = `
                    <div class="note-content">
                        <p><strong>${note.name}</strong> - ${new Date(note.date).toLocaleDateString()}</p>
                        <p>${note.catatan}</p>
                    </div>
                    <div class="note-actions">
                        <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
                        <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
                    </div>
                `;
                notesList.appendChild(noteElement);
            });
        })
        .catch(error => {
            console.error('Error fetching notes:', error);
        });
    }

    // Function to add a new note
    noteForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const catatan = document.getElementById('catatan').value;
        const date = document.getElementById('date').value;

        fetch('http://localhost:5000/add-note', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({ name, catatan, date })
        })
        .then(response => response.json())
        .then(data => {
            fetchNotes();
            noteForm.reset();
        })
        .catch(error => {
            console.error('Error adding note:', error);
        });
    });

    // Function to delete a note
    window.deleteNote = function (id) {
        fetch(`http://localhost:5000/delete-note/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            fetchNotes();
        })
        .catch(error => {
            console.error('Error deleting note:', error);
        });
    };

    // Function to edit a note
    window.editNote = function (id) {
        alert(`Edit note with ID: ${id}`);
    };

    // If user is already logged in, show notes page
    if (localStorage.getItem('accessToken')) {
        showNotesPage();
    }
});
