# Instrucciones para Estandarizar Navegación

Este documento explica cómo conectar todas las páginas HTML para que compartan la misma navegación y estética.

## Sistema de Navegación Compartida

Se ha creado un sistema de navegación compartida que permite que todas las páginas HTML tengan la misma barra de navegación y footer, manteniendo una estética consistente en todo el sitio.

## Archivos Creados

1. **`js/shared-nav.js`**: Script que inyecta automáticamente la navegación y footer en todas las páginas
2. **`pages/noticias.html`**: Nueva página para publicar noticias científicas
3. **`js/news.js`**: Script para gestionar las noticias científicas
4. **`scripts/standardize-pages.js`**: Script Node.js para automatizar la estandarización de páginas

## Cómo Funciona

### Para Páginas Nuevas

Simplemente agrega estos elementos en tu HTML:

```html
<body>
    <!-- Navegación compartida se inyectará aquí -->
    <div id="shared-navbar"></div>
    
    <!-- Tu contenido aquí -->
    
    <!-- Footer compartido se inyectará aquí -->
    <div id="shared-footer"></div>
    
    <script src="../js/shared-nav.js"></script>
    <!-- Tus otros scripts aquí -->
</body>
```

**Nota**: Ajusta la ruta de `shared-nav.js` según la ubicación de tu archivo:
- Si estás en la raíz: `js/shared-nav.js`
- Si estás en `pages/`: `../js/shared-nav.js`
- Si estás en `pages/articles/`: `../../js/shared-nav.js`

### Para Páginas Existentes

#### Opción 1: Manual (Recomendado para pocas páginas)

1. Busca el `<nav>` o `<header class="navbar">` existente y reemplázalo con:
   ```html
   <div id="shared-navbar"></div>
   ```

2. Busca el `<footer>` existente y reemplázalo con:
   ```html
   <div id="shared-footer"></div>
   ```

3. Agrega el script antes del cierre de `</body>`:
   ```html
   <script src="../../js/shared-nav.js"></script>
   ```

4. Asegúrate de tener los CSS correctos en el `<head>`:
   ```html
   <link rel="stylesheet" href="../../css/style.css">
   <link rel="stylesheet" href="../../css/components.css">
   ```

#### Opción 2: Automática (Para muchas páginas)

Usa el script Node.js para automatizar el proceso:

```bash
# Estandarizar todas las páginas en pages/articles/
node scripts/standardize-pages.js

# Estandarizar una página específica
node scripts/standardize-pages.js pages/articles/NombreArchivo.html
```

## Páginas Ya Actualizadas

Las siguientes páginas ya han sido actualizadas como ejemplo:
- `index.html` - Página principal (ya tenía navegación, solo se agregó enlace a noticias)
- `pages/guias.html` - Guías de estudio
- `pages/mundos.html` - Mundos literarios
- `pages/noticias.html` - Noticias científicas (nueva)
- `pages/articles/Trigonometria.html` - Ejemplo de artículo

## Estructura de Navegación

La navegación incluye:
- **Inicio**: Link a la página principal
- **Guías Estudio**: Link a `pages/guias.html`
- **Mundos 3D**: Link a `pages/mundos.html`
- **Noticias Científicas**: Link a `pages/noticias.html` (nuevo)
- **Contacto**: Link a la sección de contacto en la página principal

## Página de Noticias

La nueva página de noticias (`pages/noticias.html`) permite:
- Filtrar noticias por categoría (Física, Química, Biología, Astronomía, Matemáticas)
- Ver noticias en formato de tarjetas
- Agregar nuevas noticias editando el array en `js/news.js`

### Agregar una Nueva Noticia

Edita `js/news.js` y agrega un objeto al array `newsData`:

```javascript
{
    id: 6,
    title: "Título de la noticia",
    excerpt: "Resumen breve de la noticia...",
    category: "fisica", // fisica, quimica, biologia, astronomia, matematicas
    date: "2025-01-16", // Formato YYYY-MM-DD
    image: null, // URL de imagen o null
    icon: "fas fa-atom", // Icono de Font Awesome
    link: "#" // Link a la noticia completa
}
```

## Estilos Consistentes

Todos los estilos están centralizados en:
- `css/style.css` - Variables y estilos base
- `css/components.css` - Componentes reutilizables (navbar, botones, cards)
- `css/home.css` - Estilos específicos de la página principal
- `css/library.css` - Estilos para las bibliotecas (guías y mundos)

## Responsive Design

La navegación es completamente responsive:
- En pantallas grandes: menú horizontal
- En pantallas pequeñas: menú hamburguesa que se despliega verticalmente

## Próximos Pasos

1. Ejecutar el script de estandarización en todas las páginas HTML restantes
2. Personalizar las noticias científicas agregando contenido real
3. Opcional: Conectar las noticias a una base de datos o API

## Notas

- El script `shared-nav.js` detecta automáticamente la ubicación de la página y ajusta las rutas
- La navegación se inyecta cuando el DOM está listo
- El sistema es compatible con páginas que ya tienen contenido React u otros frameworks
