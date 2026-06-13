import os
import re

files = ['index.html', 'presbiterio.html', 'iglesias.html', 'actividades.html', 'noticias-eventos.html', 'necesidades-ayudas.html', 'contactos.html', 'organizacion.html', 'estructura.html']

nav_content = """    <!-- Navegación Principal -->
    <nav class="nav" id="navegacion-principal">
        <div class="contenedor nav__inner">
            <button class="nav__hamburguesa" id="btn-hamburguesa" aria-label="Abrir menú" aria-expanded="false">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav__lista" id="nav-lista">
                <li class="nav__item nav__item--mega">
                    <a href="organizacion.html" class="nav__link" id="nav-link-org">Organización <i class="fas fa-chevron-down nav__arrow"></i></a>
                    <div class="mega-menu">
                        <div class="mega-menu__col">
                            <h4 class="mega-menu__heading">La Organización</h4>
                            <ul>
                                <li><a href="organizacion.html#que-es">¿Qué es Asambleas de Dios?</a></li>
                                <li><a href="organizacion.html#historia">Nuestra Historia</a></li>
                                <li><a href="organizacion.html#mision-vision">Misión y Visión</a></li>
                                <li><a href="organizacion.html#valores">Valores</a></li>
                                <li><a href="organizacion.html#fe">Declaración de Fe</a></li>
                                <li><a href="organizacion.html#alcances">Alcances en Guinea Ecuatorial</a></li>
                            </ul>
                        </div>
                        <div class="mega-menu__col">
                            <h4 class="mega-menu__heading">Estructura</h4>
                            <ul>
                                <li><a href="estructura.html#junta-directiva">Junta Directiva</a></li>
                                <li><a href="estructura.html#departamentos">Departamentos</a></li>
                                <li><a href="estructura.html#distritos">Distritos y Regiones</a></li>
                                <li><a href="iglesias.html">Iglesias Locales</a></li>
                                <li><a href="estructura.html#misioneros">Misioneros</a></li>
                            </ul>
                        </div>
                    </div>
                </li>

                <li class="nav__item nav__item--dropdown">
                    <a href="presbiterio.html" class="nav__link" id="nav-link-presb">Presbiterio Ejecutivo <i class="fas fa-chevron-down nav__arrow"></i></a>
                    <ul class="dropdown-menu">
                        <li><a href="presbiterio.html#carpoforo">Carpóforo Ochaga Elá</a></li>
                        <li><a href="presbiterio.html#segismundo">Segismundo Sam</a></li>
                        <li><a href="presbiterio.html#vicente">Pastor Vicente</a></li>
                        <li><a href="presbiterio.html#tesoreria">Tesorera Nacional</a></li>
                        <li><a href="presbiterio.html#vocales">Vocal I</a></li>
                    </ul>
                </li>

                <li class="nav__item"><a href="iglesias.html" class="nav__link" id="nav-link-igles">Nuestros Pastores</a></li>
                <li class="nav__item"><a href="actividades.html" class="nav__link" id="nav-link-activ">Actividades</a></li>
                <li class="nav__item"><a href="noticias-eventos.html" class="nav__link" id="nav-link-notic">Noticias y Eventos</a></li>
                <li class="nav__item"><a href="necesidades-ayudas.html" class="nav__link" id="nav-link-neces">Necesidades y Ayudas</a></li>
                <li class="nav__item"><a href="contactos.html" class="nav__link" id="nav-link-conta">Contactos</a></li>
            </ul>
        </div>
    </nav>"""

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Replace the nav block
        new_content = re.sub(r'<!-- Navegación Principal -->\s*<nav class="nav" id="navegacion-principal">.*?</nav>', nav_content, content, flags=re.DOTALL)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f'Updated {file}')
