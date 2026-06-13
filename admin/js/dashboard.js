document.addEventListener('DOMContentLoaded', () => {
    // 1. Verificación de Autenticación
    const token = localStorage.getItem('ad_admin_token');
    if (!token) {
        window.location.href = 'index.html'; // Redirigir si no hay token
        return;
    }

    // Setear nombre de usuario
    const userStr = localStorage.getItem('ad_admin_user');
    if (userStr) {
        const user = JSON.parse(userStr);
        document.getElementById('adminUsername').textContent = user.username;
    }

    // 2. Navegación del Sidebar
    const navItems = document.querySelectorAll('.sidebar-nav li:not(.logout-btn)');
    const panels = document.querySelectorAll('.admin-panel');
    const currentTitle = document.getElementById('currentSectionTitle');

    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Quitar clase active de todos
            navItems.forEach(n => n.classList.remove('active'));
            panels.forEach(p => p.classList.remove('active'));

            // Activar el actual
            item.classList.add('active');
            const targetId = item.getAttribute('data-target');
            document.getElementById(targetId).classList.add('active');
            currentTitle.textContent = item.textContent.trim();

            // Si es necesario cargar datos dinámicos al cambiar de pestaña
            if (targetId === 'panel-iglesias') loadIglesias();
            if (targetId === 'panel-noticias') loadNoticias();
        });
    });

    // 3. Cerrar Sesión
    document.getElementById('logoutBtn').addEventListener('click', () => {
        localStorage.removeItem('ad_admin_token');
        localStorage.removeItem('ad_admin_user');
        window.location.href = 'index.html';
    });

    // 4. Funciones para Cargar Datos de la API (Placeholder)
    async function loadIglesias() {
        const tbody = document.getElementById('tbody-iglesias');
        try {
            const res = await fetch('http://localhost:3000/api/iglesias');
            const data = await res.json();
            
            tbody.innerHTML = '';
            if(data.length === 0) {
                tbody.innerHTML = '<tr><td colspan="4">No hay iglesias registradas</td></tr>';
                return;
            }

            data.forEach(iglesia => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${iglesia.id}</td>
                    <td><strong>${iglesia.name}</strong></td>
                    <td>${iglesia.district || 'N/A'}</td>
                    <td>
                        <button title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button title="Eliminar"><i class="fa-solid fa-trash"></i></button>
                    </td>
                `;
                tbody.appendChild(tr);
            });
        } catch (error) {
            tbody.innerHTML = '<tr><td colspan="4">Error cargando iglesias</td></tr>';
        }
    }

    async function loadNoticias() {
        // Implementación similar a loadIglesias
    }

    // Cargar estadísticas iniciales
    // (Peticiones simuladas, en un proyecto real haríamos un endpoint /api/stats)
    fetch('http://localhost:3000/api/iglesias').then(r=>r.json()).then(d => {
        document.getElementById('stat-iglesias').textContent = d.length || 0;
    }).catch(()=>{});

});
