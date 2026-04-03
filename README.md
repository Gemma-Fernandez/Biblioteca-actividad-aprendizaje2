# Gestor de Biblioteca - Proyecto Full Stack

Aplicación web Full Stack desarrollada como supuesto práctico para la gestión del catálogo de una biblioteca. El proyecto cuenta con una API REST en el backend que gestiona los datos en una base de datos SQLite, y una interfaz de usuario en el frontend construida con HTML, CSS y Vanilla JavaScript.

## Cumplimiento de los Requisitos del Proyecto

Este proyecto ha sido desarrollado siguiendo las directrices de la actividad de aprendizaje:

- **Supuesto Real y Modelos Relacionados:** Se ha simulado el entorno de una biblioteca con dos elementos clave: **Autores** y **Libros**. Existe una relación directa entre ellos (Un libro pertenece obligatoriamente a un autor registrado).
- **Backend y API REST:** Se ha construido un backend en Node.js/Express que implementa todas las rutas bajo los estándares REST para ejecutar un CRUD completo (Crear, Leer, Editar, Eliminar) sobre los dos modelos.
- **Frontend interactivo:** Interfaz intuitiva que se comunica de forma asíncrona (`fetch`) con la API para permitir al usuario final ejecutar todas las operaciones CRUD sin recargar la página.
- **Validación robusta:** Los datos enviados desde el frontend son evaluados en el backend utilizando el middleware `express-validator` antes de interactuar con la base de datos. Si se detectan errores, la API rechaza la petición devolviendo los errores estructurados (Status 400).
- **Flujo de trabajo en equipo (Git):** El ciclo de vida del desarrollo se ha gestionado empleando ramas individuales para las nueva características, fusionándose finalmente en la rama principal a través de *Pull Requests*.

## Stack Tecnológico

**Frontend:**
- HTML5, CSS3 y Vanilla JavaScript.
- Comunicación asíncrona nativa (`Fetch API`).

**Backend:**
- **Entorno:** Node.js y Express.js.
- **Base de Datos:** SQLite3.
- **Query Builder:** Knex.js para las consultas SQL.
- **Validación:** express-validator.


## Prerrequisitos

Antes de comenzar, asegúrate de tener instalado en tu sistema (ya sea macOS, Windows o Linux):
- **Node.js** y **npm** (Node Package Manager). Puedes descargarlo e instalarlo desde [nodejs.org](https://nodejs.org/).
- Un navegador web moderno (Safari, Chrome, Firefox).
- **Git** (para clonar el repositorio).

---

## Puesta en Marcha (Instalación y Ejecución)

Sigue estos pasos para llevar el proyecto a tu entorno local:

### 1. Clonar el repositorio
Abre tu terminal y descarga el código del proyecto:
```bash
git clone https://github.com/Gemma-Fernandez/Biblioteca-actividad-aprendizaje2.git
cd PROYECTOBIBLIOTECA
```

### 2. Instalar dependencias del Backend
Abre tu terminal y ejecuta el siguiente comando:
```bash
npm install
npm install express
```

### 3. Arrancar el servidor API
Inicia el servidor backend con el siguiente comando en la terminal para crear la estructura de las tablas del servidor:
```bash
node server.js
```
Pulsa Ctrl+C en la terminal para detener el servidor un momento.
Y ahora pon este comando para inyectar los datos en las tablas:
```bash
node seed.js
```
Para volver a arrancar el servidor ya con datos, vuelve a ejecutar este comando en la terminal:
```bash
node server.js
```

### 4. Abrir el frontend
Localizando el archivo **index.html** y haciendo doble clic sobre él, se abrirá el navegador.  

