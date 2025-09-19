# Teología Reformada PWA

Una Progressive Web App (PWA) especializada en teología reformada y doctrina presbiteriana, desarrollada con React, TypeScript y OpenAI.

## 👥 Desarrolladores

**Juan Pereira y Maria de Pereira**

## 🚀 Características

### 🤖 Asistente de IA Especializado
- **Contexto Teológico Profundo**: Entrenado en confesiones reformadas históricas
- **Fuentes Primarias**: Westminster, Heidelberg, Belgic, Dort, Calvino, Berkhof, Hodge
- **Categorización Automática**: Respuestas organizadas por categorías teológicas
- **Referencias Bíblicas**: Citas precisas y contextualizadas

### 📚 Funcionalidades Principales
- **Chat Interactivo**: Conversaciones fluidas sobre teología sistemática
- **Lecciones Diarias**: Contenido estructurado con aplicación práctica
- **Búsqueda Rápida**: Accesos directos a temas comunes
- **Historial de Conversaciones**: Seguimiento de estudios
- **Modo Offline**: Funcionalidad básica sin conexión

### 🎯 Categorías Teológicas
- **Teología Propia**: Atributos de Dios, Trinidad, Providencia
- **Soteriología**: TULIP, justificación, santificación
- **Eclesiología**: Sacramentos, gobierno presbiteriano
- **Escatología**: Milenio, segunda venida, juicio final
- **Cristología**: Encarnación, obra de Cristo
- **Pneumatología**: Doctrina del Espíritu Santo
- **Antropología**: Doctrina del hombre, pecado original
- **Bibliología**: Doctrina de la Escritura

## 🛠️ Stack Tecnológico

### Frontend
- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Headless UI** para componentes
- **Lucide React** para iconos
- **Axios** para peticiones HTTP
- **React Query** para manejo de estado

### Backend
- **Node.js** con Express
- **TypeScript** para tipado
- **OpenAI API** (GPT-4)
- **Rate Limiting** para control de uso
- **CORS** y **Helmet** para seguridad

### PWA
- **Service Worker** para funcionalidad offline
- **Web App Manifest** para instalación
- **Push Notifications** para recordatorios
- **Background Sync** para sincronización

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- API Key de OpenAI

### 1. Clonar el repositorio
```bash
git clone <repository-url>
cd reformed-theology-pwa
```

### 2. Instalar dependencias
```bash
# Instalar todas las dependencias
npm run install:all

# O instalar por separado
npm install
cd client && npm install
cd ../server && npm install
```

### 3. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp server/env.example server/.env

# Editar variables
# Abrir server/.env y agregar tu OPENAI_API_KEY
```

### 4. Ejecutar en desarrollo
```bash
# Ejecutar cliente y servidor simultáneamente
npm run dev

# O ejecutar por separado
npm run client:dev  # Puerto 3000
npm run server:dev  # Puerto 3001
```

## 🔧 Configuración

### Variables de Entorno

#### Servidor (`server/.env`)
```env
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000
OPENAI_API_KEY=your_openai_api_key_here
DATABASE_URL=sqlite:./theology.db
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
```

#### Cliente (opcional)
```env
REACT_APP_API_URL=http://localhost:3001/api
```

## 📱 Uso de la PWA

### Instalación
1. Abrir la aplicación en Chrome/Edge
2. Hacer clic en el icono de instalación en la barra de direcciones
3. Confirmar la instalación

### Funcionalidades Offline
- Acceso a conversaciones guardadas
- Lecciones previamente cargadas
- Interfaz básica sin conexión

### Notificaciones
- Recordatorios de lecciones diarias
- Actualizaciones de contenido
- Notificaciones push (con permiso)

## 🏗️ Estructura del Proyecto

```
theology-pwa/
├── client/                 # Frontend React
│   ├── public/
│   │   ├── manifest.json   # PWA manifest
│   │   ├── sw.js          # Service Worker
│   │   └── icons/         # Iconos PWA
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   ├── contexts/      # Context API
│   │   ├── hooks/         # Custom hooks
│   │   ├── services/      # Servicios API
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # Utilidades
│   └── package.json
├── server/                # Backend Express
│   ├── src/
│   │   ├── controllers/   # Controladores
│   │   ├── middleware/    # Middleware
│   │   ├── routes/        # Rutas API
│   │   └── services/      # Servicios
│   └── package.json
└── shared/               # Tipos compartidos
```

## 🚀 Despliegue

### Build para Producción
```bash
npm run build
```

### Docker (opcional)
```bash
# Construir imagen
docker build -t theology-pwa .

# Ejecutar contenedor
docker run -p 3000:3000 theology-pwa
```

## 🔒 Seguridad

- **Rate Limiting**: Control de solicitudes por IP
- **CORS**: Configuración de orígenes permitidos
- **Helmet**: Headers de seguridad
- **Validación**: Validación de entrada en API
- **Variables de Entorno**: Claves sensibles protegidas

## 📊 Monitoreo

### Logs
- Logs de errores en consola
- Tracking de uso de API
- Métricas de performance

### Analytics (opcional)
- Google Analytics
- Custom metrics
- User behavior tracking

## 🤝 Contribución

1. Fork el proyecto
2. Crear rama de feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🙏 Agradecimientos

- **Comunidad Reformada**: Por la rica tradición teológica
- **OpenAI**: Por la tecnología de IA avanzada
- **React Team**: Por el excelente framework
- **Tailwind CSS**: Por el sistema de diseño

## 📞 Contacto

**Juan Pereira y Maria de Pereira**
- Email: [contacto@email.com]
- Proyecto: [GitHub Repository]

---

*Desarrollado con ❤️ para la gloria de Dios y el avance del Reino*
