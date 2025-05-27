document.addEventListener('DOMContentLoaded', function() {
    const formTitle = document.getElementById('formTitle');
    const authForm = document.getElementById('authForm');
    const toggleText = document.getElementById('toggleText');
    const toggleForm = document.getElementById('toggleForm');
    
    let isLogin = true;  // Menyimpan status apakah halaman dalam mode login atau register

    // Toggle antara login dan register
    toggleForm.addEventListener('click', function(e) {
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

        isLogin = !isLogin; // Toggle mode login/register
        // Rebind the toggle form event to the new toggleForm button
        document.getElementById('toggleForm').addEventListener('click', function(e) {
            e.preventDefault();
            toggleForm.click();
        });
    });

    // Event listener untuk formulir login atau register
    authForm.addEventListener('submit', function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (isLogin) {
            // Login
            login(username, password);
        } else {
            // Register
            const confirmPassword = document.getElementById('confirmPassword').value;
            if (password !== confirmPassword) {
                alert("Password dan konfirmasi password tidak cocok!");
                return;
            }
            register(username, password);
        }
    });

    // Fungsi untuk login
    function login(username, password) {
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.accessToken) {
                // Simpan token di localStorage
                localStorage.setItem('accessToken', data.accessToken);
                alert('Login berhasil!');
                window.location.href = 'index.html'; // Redirect ke halaman utama setelah login berhasil
            } else {
                alert('Login gagal: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Login gagal, coba lagi.');
        });
    }

    // Fungsi untuk registrasi
    function register(username, password) {
        fetch('http://localhost:5000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Registrasi berhasil') {
                alert('Registrasi berhasil, silakan login.');
                window.location.href = 'login.html'; // Redirect ke halaman login setelah registrasi berhasil
            } else {
                alert('Registrasi gagal: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Registrasi gagal, coba lagi.');
        });
    }
});
