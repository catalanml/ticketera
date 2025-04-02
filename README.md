# Ticketera - Refactorización a Node.js + TypeScript

## 📌 Descripción

Este proyecto es una **refactorización profesional del sistema de gestión de tareas (Ticketera)** desarrollado originalmente en **PHP 8 MVC puro**, migrado progresivamente hacia una arquitectura moderna basada en el **stack MERN (MongoDB, Express, React, Node)**.

> El objetivo es construir un backend escalable, testeable, documentado y mantenible, con estándares y herramientas del mundo real.

---

## 🚀 Características Principales

- **Autenticación JWT**: Registro, inicio de sesión y protección de rutas mediante tokens.
- **Gestión de Tareas** *(en desarrollo)*: Crear, editar, asignar y completar tareas.
- **Gestión de Categorías y Prioridades**: Crear, actualizar y eliminar categorías/prioridades requeridas para las tareas.
- **Validaciones robustas**: Usamos `Zod` para asegurar que los datos cumplan con las reglas esperadas.
- **Documentación interactiva**: Swagger/OpenAPI disponible vía `/docs`.
- **Logging profesional**: Logging estructurado con `Pino`.
- **Tests automatizados**: Tests de integración y servicios con `Vitest` + `Supertest`.
- **Arquitectura profesional**: Separación por controladores, servicios, middlewares y validadores.

---

## 🧱 Tecnologías Utilizadas

### Backend:
- **Node.js 18+**
- **Express**
- **TypeScript**
- **MongoDB + Mongoose**
- **Zod** (validación de datos)
- **Pino** (logging)
- **Swagger (OpenAPI)** (documentación)
- **JWT** (autenticación)

### Testing:
- **Vitest**
- **Supertest**

### Dev Tools:
- ESLint + Prettier
- Nodemon + tsx
- VS Code HTTP Client

---

## 🛠️ Requisitos del Sistema

- Node.js 18+
- MongoDB (local o en la nube)
- npm o yarn
- Entorno UNIX (WSL, Linux o macOS recomendado)

---

## 📦 Instalación y Configuración

1. **Clonar el repositorio**:

```bash
git clone https://github.com/tuusuario/ticketera-node.git
cd ticketera-node
```

2. **Instalar depedencias**:

```bash
npm install
```

3. **Variables de entorno**:

```bash
PORT=3000
MONGO_URI=mongodb://localhost:27017/ticketera
JWT_SECRET=supersecretoseguro
```
Opcional:  agrega .env.test para tests:

```bash
MONGO_URI=mongodb://localhost:27017/ticketera_test
JWT_SECRET=testsecret
```

4. **Ejecutar el servidor en modo desarrollo:**:
```bash
npm run dev
```

---

## 🧪 Tests

Para ejecutar los tests automatizados:

```bash
npm run test
```

Para modo interactivo:

El entorno de pruebas usa una base de datos aislada (ticketera_test) y se limpia automáticamente después de cada suite de tests.

---

## 🧭 Documentación de la API

Una vez que el servidor esté corriendo, puedes acceder a la documentación de Swagger en:

```bash
http://localhost:3000/docs
```

Ahí podrás:

- Ver todos los endpoints documentados

- Probar rutas protegidas con JWT usando el botón "Authorize"

- Explorar esquemas y ejemplos de requests/responses

---

## 📂 Estructura del Proyecto

```bash
src/
├── app.ts                # Configuración principal de Express
├── index.ts              # Punto de entrada (levanta el servidor)
├── config/               # Configuración de base de datos
├── controllers/          # Controladores por entidad
├── services/             # Lógica de negocio desacoplada
├── models/               # Esquemas de Mongoose
├── routes/               # Definición de endpoints
├── middlewares/          # Middlewares personalizados (auth, errores, etc.)
├── utils/                # Utilidades como logger, asyncHandler, etc.
├── docs/                 # Configuración y definiciones de Swagger
├── validators/           # Validaciones de entrada con Zod
└── test/                 # Tests automatizados (unitarios y de integración)
```
---

# 🏗️ Estado del Proyecto

| Módulo                        | Estado        |
|------------------------------|---------------|
| Autenticación JWT            | ✅ Completado |
| Gestión de Categorías        | ✅ Completado |
| Gestión de Prioridades       | ✅ Completado |
| Gestión de Tareas            | 🚧 En desarrollo |
| API RESTful documentada      | ✅ Completado |
| Logging profesional (Pino)   | ✅ Completado |
| Testing con Vitest           | ✅ Completado |
| Interfaz React (Frontend)    | ⏳ Pendiente  |

---

# 🧠 Contexto del Proyecto

Este proyecto comenzó como una aplicación en **PHP 8 MVC puro**, utilizando **HTML + Bootstrap + MySQL**, y ha sido **refactorizado** hacia un backend con **Node.js + TypeScript + MongoDB** para incorporar:

- ✅ Buenas prácticas modernas de desarrollo  
- 🧪 Testing desde el inicio  
- 🧱 Arquitectura desacoplada y escalable  
- 🔌 Preparación para integración con React y futuras APIs públicas  

---

# ✨ Autor

Desarrollado por **[@catalanml](https://github.com/catalanml)**

> Proyecto educativo y de refactorización profesional

