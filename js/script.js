/* ╔══════════════════════════════════════════════════════════════╗
   ║  ASAMBLEAS DE DIOS — GUINEA ECUATORIAL                      ║
   ║  Main JavaScript                                             ║
   ╚══════════════════════════════════════════════════════════════╝ */

document.addEventListener('DOMContentLoaded', () => {

    // ─── SCROLL ANIMATIONS (Intersection Observer) ───
    const animados = document.querySelectorAll('.animado');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.15
    };

    const animacionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger delay for items in grids
                const siblings = entry.target.parentElement.querySelectorAll('.animado');
                let delay = 0;

                if (siblings.length > 1) {
                    const siblingIndex = Array.from(siblings).indexOf(entry.target);
                    delay = siblingIndex * 100;
                }

                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);

                animacionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animados.forEach(el => animacionObserver.observe(el));


    // ─── COUNTER ANIMATION ───
    const contadores = document.querySelectorAll('.estadisticas__numero');
    let contadoresAnimados = false;

    const contadorObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !contadoresAnimados) {
                contadoresAnimados = true;
                contadores.forEach(contador => animarContador(contador));
                contadorObserver.disconnect();
            }
        });
    }, { threshold: 0.3 });

    if (document.getElementById('estadisticas')) {
        contadorObserver.observe(document.getElementById('estadisticas'));
    }

    function animarContador(el) {
        const objetivo = parseInt(el.getAttribute('data-objetivo'), 10);
        const duracion = 2000;
        const inicio = performance.now();

        function actualizar(ahora) {
            const progreso = Math.min((ahora - inicio) / duracion, 1);
            // Ease-out cubic
            const ease = 1 - Math.pow(1 - progreso, 3);
            const valor = Math.floor(ease * objetivo);
            
            el.textContent = formatearNumero(valor);

            if (progreso < 1) {
                requestAnimationFrame(actualizar);
            } else {
                el.textContent = formatearNumero(objetivo);
            }
        }

        requestAnimationFrame(actualizar);
    }

    function formatearNumero(num) {
        if (num >= 1000) {
            return num.toLocaleString('es-GQ');
        }
        return num.toString();
    }


    // ─── HAMBURGER MENU ───
    const btnHamburguesa = document.getElementById('btn-hamburguesa');
    const navLista = document.getElementById('nav-lista');
    let overlay = null;

    if (btnHamburguesa && navLista) {
        // Create overlay element
        overlay = document.createElement('div');
        overlay.classList.add('nav-overlay');
        document.body.appendChild(overlay);

        btnHamburguesa.addEventListener('click', toggleMenu);
        overlay.addEventListener('click', cerrarMenu);

        // Close menu on link click
        navLista.querySelectorAll('.nav__link').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    cerrarMenu();
                }
            });
        });
    }

    function toggleMenu() {
        const isOpen = navLista.classList.toggle('abierto');
        btnHamburguesa.classList.toggle('activo');
        btnHamburguesa.setAttribute('aria-expanded', isOpen);
        overlay.classList.toggle('activo');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function cerrarMenu() {
        navLista.classList.remove('abierto');
        btnHamburguesa.classList.remove('activo');
        btnHamburguesa.setAttribute('aria-expanded', 'false');
        overlay.classList.remove('activo');
        document.body.style.overflow = '';
    }

    // Close menu on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            cerrarMenu();
        }
    });


    // ─── STICKY NAV SHADOW ───
    const nav = document.querySelector('.nav');

    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 10) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        }, { passive: true });
    }


    // ─── SMOOTH SCROLL for anchor links ───
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navHeight = nav ? nav.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    cerrarMenu();
                }
            }
        });
    });


    // ─── FORM VALIDATION ───
    const form = document.getElementById('form-contacto');

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;

            // Validate nombre
            const nombre = document.getElementById('nombre');
            const errorNombre = document.getElementById('error-nombre');
            if (!nombre.value.trim()) {
                setError(nombre, errorNombre, 'Por favor ingresa tu nombre');
                isValid = false;
            } else {
                clearError(nombre, errorNombre);
            }

            // Validate email
            const email = document.getElementById('email');
            const errorEmail = document.getElementById('error-email');
            if (!email.value.trim()) {
                setError(email, errorEmail, 'Por favor ingresa tu correo');
                isValid = false;
            } else if (!isValidEmail(email.value)) {
                setError(email, errorEmail, 'Ingresa un correo válido');
                isValid = false;
            } else {
                clearError(email, errorEmail);
            }

            // Validate mensaje
            const mensaje = document.getElementById('mensaje-texto');
            const errorMensaje = document.getElementById('error-mensaje');
            if (!mensaje.value.trim()) {
                setError(mensaje, errorMensaje, 'Por favor escribe un mensaje');
                isValid = false;
            } else {
                clearError(mensaje, errorMensaje);
            }

            if (isValid) {
                const btn = document.getElementById('btn-enviar');
                const originalText = btn.innerHTML;
                btn.innerHTML = '<span>Enviando...</span><i class="fas fa-spinner fa-spin"></i>';
                btn.disabled = true;

                // Preparar datos
                const formData = {
                    nombre: nombre.value.trim(),
                    email: email.value.trim(),
                    mensaje: mensaje.value.trim()
                };

                // Asunto y telefono si existen
                const asunto = document.getElementById('asunto');
                if(asunto) formData.asunto = asunto.value.trim();
                const telefono = document.getElementById('telefono');
                if(telefono) formData.telefono = telefono.value.trim();

                fetch('http://localhost:3000/api/contacto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                })
                .then(response => {
                    if(!response.ok) throw new Error('Error en la red');
                    return response.json();
                })
                .then(data => {
                    btn.classList.add('enviado');
                    btn.innerHTML = '<span>¡Mensaje enviado!</span><i class="fas fa-check"></i>';
                    
                    // Reset form after delay
                    setTimeout(() => {
                        form.reset();
                        btn.classList.remove('enviado');
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 3000);
                })
                .catch(error => {
                    console.error('Error:', error);
                    btn.innerHTML = '<span>Error al enviar</span><i class="fas fa-times"></i>';
                    setTimeout(() => {
                        btn.innerHTML = originalText;
                        btn.disabled = false;
                    }, 3000);
                });
            }
        });

        // Clear errors on input
        form.querySelectorAll('.form-input').forEach(input => {
            input.addEventListener('input', function() {
                const errorSpan = this.parentElement.querySelector('.form-error');
                if (errorSpan) {
                    clearError(this, errorSpan);
                }
            });
        });
    }

    function setError(input, errorEl, message) {
        input.classList.add('error');
        errorEl.textContent = message;
    }

    function clearError(input, errorEl) {
        input.classList.remove('error');
        errorEl.textContent = '';
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }


    // ─── MOBILE DROPDOWN TOGGLE ───
    if (window.innerWidth <= 768) {
        enableMobileDropdowns();
    }

    window.addEventListener('resize', () => {
        if (window.innerWidth <= 768) {
            enableMobileDropdowns();
        }
    });

    function enableMobileDropdowns() {
        const dropdownLinks = document.querySelectorAll('.nav__item--mega > .nav__link, .nav__item--dropdown > .nav__link');

        dropdownLinks.forEach(link => {
            // Avoid duplicate listeners
            if (link.dataset.mobileInit) return;
            link.dataset.mobileInit = 'true';

            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    const submenu = this.nextElementSibling;
                    if (submenu) {
                        const isVisible = submenu.style.display === 'flex';
                        // Close all others
                        document.querySelectorAll('.mega-menu, .dropdown-menu').forEach(m => {
                            m.style.display = 'none';
                        });
                        submenu.style.display = isVisible ? 'none' : 'flex';
                    }
                }
            });
        });
    }

});
