import os

files = [
    'index.html', 'presbiterio.html', 'iglesias.html', 'actividades.html', 
    'noticias-eventos.html', 'necesidades-ayudas.html', 'contactos.html', 
    'organizacion.html', 'estructura.html'
]

replacement_org = '<h4 class="mega-menu__heading"><a href="organizacion.html" class="heading-link">La Organización <i class="fas fa-arrow-right"></i></a></h4>'
replacement_est = '<h4 class="mega-menu__heading"><a href="estructura.html" class="heading-link">Estructura <i class="fas fa-arrow-right"></i></a></h4>'

for file in files:
    if os.path.exists(file):
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        content = content.replace('<h4 class="mega-menu__heading">La Organización</h4>', replacement_org)
        content = content.replace('<h4 class="mega-menu__heading">Estructura</h4>', replacement_est)
        
        with open(file, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f'Updated {file}')
