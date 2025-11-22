# 🎮 Biblioteca Gamer - Backend API

API REST para gestionar una biblioteca de videojuegos y sus reseñas, desarrollada con Node.js, Express y MongoDB.

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Modelos de Datos](#modelos-de-datos)
- [Ejemplos de Uso](#ejemplos-de-uso)
- [Próximos Pasos](#próximos-pasos)

## ✨ Características

- ✅ CRUD completo para juegos
- ✅ CRUD completo para reseñas
- ✅ Relaciones entre juegos y reseñas
- ✅ Estadísticas de reseñas por juego
- ✅ Validaciones de datos
- ✅ Manejo de errores
- ✅ Timestamps automáticos
- ✅ Documentación completa

## 🛠 Tecnologías

- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **MongoDB** - Base de datos NoSQL
- **Mongoose** - ODM para MongoDB
- **dotenv** - Variables de entorno
- **nodemon** - Desarrollo (auto-restart)

## 🚀 Instalación

1. **Clona o descarga el proyecto**
```bash
cd backend
```

2. **Instala las dependencias**
```bash
npm install
```

3. **Configura las variables de entorno** (ver sección Configuración)

4. **Ejecuta el servidor**
```bash
npm run dev
```

El servidor estará disponible en `http://localhost:3000`

## ⚙️ Configuración

### Variables de Entorno (.env)

1. **Copia el archivo de ejemplo:**
```bash
cp .env.example .env
```

2. **Edita el archivo `.env` con tus credenciales:**

```env
# MONGODB LOCAL (para desarrollo)
MONGO_URI=mongodb://localhost:27017/biblioteca_gamer

# MONGODB ATLAS (nube - reemplaza con tus credenciales)
# MONGO_URI=mongodb+srv://tu_usuario:tu_contraseña@cluster0.xxxxx.mongodb.net/biblioteca_gamer

# Puerto del servidor
PORT=3000
```

### Configuración de MongoDB Atlas

1. **Crea una cuenta gratuita en [MongoDB Atlas](https://www.mongodb.com/atlas)**
2. **Crea un cluster gratuito**
3. **Ve a Database Access → Add Database User**
4. **Ve a Network Access → Add IP Address (o 0.0.0.0/0 para desarrollo)**
5. **Ve a Clusters → Connect → Connect your application**
6. **Copia la URL de conexión y pégala en tu `.env`**

⚠️ **Importante:** El archivo `.env` contiene credenciales sensibles y NO se sube al repositorio por seguridad.

### Base de Datos

- **MongoDB Local**: Asegúrate de tener MongoDB instalado y ejecutándose
- **MongoDB Atlas**: Verifica que tu IP esté en la lista blanca y las credenciales sean correctas

## 📚 Uso

El servidor se ejecuta con:
```bash
npm run dev
```

Para probar los endpoints puedes usar:
- **Thunder Client** (extensión de VS Code)
- **Postman**
- **curl**
- **Insomnia**

## 🛣️ Endpoints

### 🎮 Juegos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/juegos` | Obtener todos los juegos |
| `GET` | `/api/juegos/:id` | Obtener un juego por ID |
| `POST` | `/api/juegos` | Crear un nuevo juego |
| `PUT` | `/api/juegos/:id` | Actualizar un juego |
| `DELETE` | `/api/juegos/:id` | Eliminar un juego |

### ⭐ Reseñas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| `GET` | `/api/resenas` | Obtener todas las reseñas |
| `GET` | `/api/resenas/:id` | Obtener una reseña por ID |
| `GET` | `/api/resenas/juego/:juegoId` | Obtener reseñas de un juego |
| `GET` | `/api/resenas/estadisticas/:juegoId` | Estadísticas de reseñas |
| `POST` | `/api/resenas` | Crear una nueva reseña |
| `PUT` | `/api/resenas/:id` | Actualizar una reseña |
| `DELETE` | `/api/resenas/:id` | Eliminar una reseña |

## 📊 Modelos de Datos

### Juego
```javascript
{
  nombre: String (requerido, único),
  plataforma: String (requerido),
  portadaURL: String (opcional),
  estado: String (enum: ['Pendiente', 'Jugado', 'Completado']),
  horasJugadas: Number (default: 0, min: 0),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

### Reseña
```javascript
{
  juego: ObjectId (referencia a Juego, requerido),
  puntuacion: Number (requerido, 1-5),
  usuario: String (opcional, default: 'Usuario Anonimo'),
  contenido: String (requerido),
  createdAt: Date (automático),
  updatedAt: Date (automático)
}
```

## 🔧 Ejemplos de Uso

### Crear un Juego
```bash
POST http://localhost:3000/api/juegos
Content-Type: application/json

{
  "nombre": "The Last of Us Part II",
  "plataforma": "PlayStation 5",
  "portadaURL": "https://example.com/tlou2.jpg",
  "estado": "Completado",
  "horasJugadas": 25
}
```

### Crear una Reseña
```bash
POST http://localhost:3000/api/resenas
Content-Type: application/json

{
  "juego": "ID_DEL_JUEGO_AQUI",
  "puntuacion": 5,
  "usuario": "GamerPro123",
  "contenido": "¡Increíble juego! La narrativa es excepcional y los gráficos son impresionantes."
}
```

### Obtener Estadísticas
```bash
GET http://localhost:3000/api/resenas/estadisticas/ID_DEL_JUEGO

Respuesta:
{
  "_id": "ID_DEL_JUEGO",
  "promedioCalificacion": 4.5,
  "totalResenas": 8,
  "puntuacionMinima": 3,
  "puntuacionMaxima": 5
}
```

## 🔄 Códigos de Respuesta

- `200` - OK (operación exitosa)
- `201` - Created (recurso creado exitosamente)
- `400` - Bad Request (datos inválidos)
- `404` - Not Found (recurso no encontrado)
- `500` - Internal Server Error (error del servidor)

## 📁 Estructura del Proyecto

```
backend/
├── controllers/
│   ├── juegoController.js      # Lógica de negocio para juegos
│   └── resenaControllers.js    # Lógica de negocio para reseñas
├── models/
│   ├── Juego.js               # Esquema de datos para juegos
│   └── Resenas.js             # Esquema de datos para reseñas
├── routes/
│   ├── juegosRoutes.js        # Rutas para endpoints de juegos
│   └── resenaRoutes.js        # Rutas para endpoints de reseñas
├── .env                       # Variables de entorno
├── server.js                  # Punto de entrada de la aplicación
├── package.json              # Dependencias y scripts
└── README.md                 # Este archivo
```

## 🚀 Próximos Pasos

### Para completar la aplicación:

1. **🖥️ Frontend**
   - React.js + Vite
   - Vue.js
   - HTML/CSS/JavaScript vanilla

2. **🔒 Seguridad**
   ```bash
   npm install cors helmet express-rate-limit
   ```

3. **🧪 Testing**
   ```bash
   npm install jest supertest
   ```

4. **📖 Documentación API**
   ```bash
   npm install swagger-ui-express swagger-jsdoc
   ```

5. **✅ Validaciones adicionales**
   ```bash
   npm install express-validator
   ```

### Middleware recomendado para producción:
```javascript
// server.js
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

app.use(cors());
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // límite de requests
}));
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Soporte

Si encuentras algún problema o tienes alguna pregunta:

1. Revisa que MongoDB esté ejecutándose
2. Verifica las variables de entorno en `.env`
3. Asegúrate de estar en el directorio correcto al ejecutar `npm run dev`
4. Revisa los logs del servidor para errores específicos

---

**¡Tu API está lista para usar! 🎉**

*Desarrollado con ❤️ para la gestión de bibliotecas gaming*