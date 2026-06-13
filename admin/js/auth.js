document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    // Comprobar si ya está logueado
    const token = localStorage.getItem('ad_admin_token');
    if (token) {
        window.location.href = 'dashboard.html';
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            loginError.textContent = ''; // Limpiar errores previos

            try {
                // Hacer petición a nuestra API
                const response = await fetch('http://localhost:3000/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                const data = await response.json();

                if (response.ok) {
                    // Guardar token y redirigir
                    localStorage.setItem('ad_admin_token', data.token);
                    localStorage.setItem('ad_admin_user', JSON.stringify(data.user));
                    window.location.href = 'dashboard.html';
                } else {
                    loginError.textContent = data.error || 'Error al iniciar sesión';
                }
            } catch (error) {
                console.error('Error:', error);
                loginError.textContent = 'No se pudo conectar al servidor. Intente más tarde.';
            }
        });
    }
});
