# 🚀 Guía de Deployment en Netlify

## 👥 Desarrollado por: Juan Pereira y Maria de Pereira

## 📋 Prerrequisitos

- Cuenta en [Netlify](https://netlify.com)
- Cuenta en [GitHub](https://github.com) (recomendado)
- API Key de OpenAI
- Node.js 18+ instalado localmente

## 🔧 Configuración del Proyecto

### 1. Estructura para Netlify

El proyecto está configurado para funcionar en Netlify con:
- **Frontend**: React PWA en `client/`
- **Backend**: Netlify Functions en `netlify/functions/`
- **Configuración**: `netlify.toml`

### 2. Archivos de Configuración

#### `netlify.toml`
```toml
[build]
  command = "npm run build:netlify"
  publish = "client/build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### `client/public/_redirects`
```
/*    /index.html   200
/api/*  /.netlify/functions/api/:splat  200
```

## 🚀 Proceso de Deployment

### Opción 1: Deploy desde GitHub (Recomendado)

#### 1. Subir a GitHub
```bash
# Inicializar git si no está inicializado
git init

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: PWA Teología Reformada"

# Crear repositorio en GitHub y conectar
git remote add origin https://github.com/tu-usuario/reformed-theology-pwa.git
git branch -M main
git push -u origin main
```

#### 2. Conectar con Netlify
1. Ir a [Netlify Dashboard](https://app.netlify.com)
2. Hacer clic en "New site from Git"
3. Seleccionar "GitHub" y autorizar
4. Elegir el repositorio `reformed-theology-pwa`
5. Configurar:
   - **Build command**: `npm run build:netlify`
   - **Publish directory**: `client/build`
   - **Base directory**: `.` (raíz del proyecto)

#### 3. Configurar Variables de Entorno
En Netlify Dashboard → Site settings → Environment variables:

```
OPENAI_API_KEY=tu_api_key_de_openai
NODE_ENV=production
REACT_APP_API_URL=/.netlify/functions/api
```

#### 4. Hacer Deploy
- Netlify hará deploy automático al hacer push a `main`
- O hacer deploy manual desde el dashboard

### Opción 2: Deploy Manual

#### 1. Build Local
```bash
# Instalar dependencias
npm run install:all

# Build para Netlify
npm run build:netlify
```

#### 2. Subir a Netlify
1. Ir a [Netlify Dashboard](https://app.netlify.com)
2. Arrastrar la carpeta `client/build` a la zona de deploy
3. Configurar variables de entorno en Site settings

## ⚙️ Configuración Avanzada

### Variables de Entorno Requeridas

```env
# OpenAI API (REQUERIDO)
OPENAI_API_KEY=sk-...

# Configuración de la app
NODE_ENV=production
REACT_APP_API_URL=/.netlify/functions/api

# Configuración de build
NODE_VERSION=18
NPM_VERSION=10
```

### Variables Opcionales

```env
# Analytics
REACT_APP_GA_TRACKING_ID=G-XXXXXXXXXX
REACT_APP_HOTJAR_ID=1234567

# PWA
REACT_APP_PWA_NAME=Teología Reformada Chat
REACT_APP_PWA_SHORT_NAME=TeologíaChat
REACT_APP_PWA_DESCRIPTION=Asistente de IA especializado

# Notificaciones
REACT_APP_VAPID_PUBLIC_KEY=your_vapid_key
```

## 🔧 Netlify Functions

### Estructura
```
netlify/functions/
├── api/
│   ├── chat.js          # Endpoint de chat
│   └── lessons.js       # Endpoint de lecciones
└── package.json         # Dependencias
```

### Endpoints Disponibles

#### Chat
- **URL**: `/.netlify/functions/api/chat`
- **Método**: POST
- **Body**: `{ message, sessionId, conversationHistory }`

#### Lecciones
- **URL**: `/.netlify/functions/api/lessons`
- **Métodos**: GET (temas), POST (generar lección)
- **Body**: `{ topic }` (para POST)

## 📱 Configuración PWA

### Manifest
El `manifest.json` está configurado para:
- Instalación en dispositivos móviles
- Iconos en múltiples tamaños
- Tema y colores personalizados
- Shortcuts de acceso rápido

### Service Worker
- Cache offline para recursos estáticos
- Funcionalidad básica sin conexión
- Notificaciones push (con configuración adicional)

## 🔍 Monitoreo y Analytics

### Netlify Analytics
- Activar en Site settings → Analytics
- Métricas de tráfico y performance
- Informes de errores

### Google Analytics (Opcional)
```javascript
// En client/src/index.tsx
if (process.env.REACT_APP_GA_TRACKING_ID) {
  // Configurar GA
}
```

## 🚨 Solución de Problemas

### Error: "OpenAI API key not configured"
- Verificar que `OPENAI_API_KEY` esté configurada en Netlify
- Verificar que la variable esté en "Environment variables"

### Error: "Function not found"
- Verificar que las funciones estén en `netlify/functions/`
- Verificar que `package.json` tenga las dependencias correctas

### Error: "Build failed"
- Verificar que `NODE_VERSION=18` esté configurado
- Verificar que todas las dependencias estén en `package.json`

### PWA no se instala
- Verificar que `manifest.json` esté en `client/public/`
- Verificar que el service worker esté registrado
- Verificar que la app esté servida por HTTPS

## 📊 Performance

### Optimizaciones Incluidas
- Code splitting automático
- Lazy loading de componentes
- Compresión gzip
- Cache de recursos estáticos
- Service Worker para cache offline

### Métricas Recomendadas
- **Lighthouse Score**: >90
- **First Contentful Paint**: <2s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1

## 🔒 Seguridad

### Headers de Seguridad
Configurados en `netlify.toml`:
- X-Frame-Options: DENY
- X-XSS-Protection: 1; mode=block
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin

### Rate Limiting
- Implementado en las Netlify Functions
- Límite de 10 requests por minuto por IP
- Manejo de errores 429

## 📈 Escalabilidad

### Límites de Netlify
- **Bandwidth**: 100GB/mes (plan gratuito)
- **Function invocations**: 125,000/mes (plan gratuito)
- **Build minutes**: 300/mes (plan gratuito)

### Optimizaciones para Escala
- Implementar cache de respuestas
- Usar CDN para recursos estáticos
- Optimizar queries a OpenAI
- Implementar paginación en historial

## 🎯 Próximos Pasos

### Después del Deploy
1. **Configurar dominio personalizado** (opcional)
2. **Activar HTTPS** (automático en Netlify)
3. **Configurar analytics** (opcional)
4. **Probar funcionalidades PWA**
5. **Configurar notificaciones push** (opcional)

### Mejoras Futuras
- Implementar autenticación de usuarios
- Agregar base de datos para historial
- Implementar sistema de favoritos
- Agregar más idiomas
- Implementar modo offline avanzado

## 📞 Soporte

### Recursos
- [Documentación de Netlify](https://docs.netlify.com/)
- [Netlify Functions](https://docs.netlify.com/functions/overview/)
- [PWA Guide](https://web.dev/progressive-web-apps/)

### Contacto
**Juan Pereira y Maria de Pereira**
- Email: [contacto@email.com]
- GitHub: [@usuario]

---

## 🎉 ¡Deploy Completado!

Tu PWA de Teología Reformada está lista para ser usada por la comunidad. 

**URL de tu sitio**: `https://tu-sitio.netlify.app`

¡Que Dios bendiga este proyecto para la gloria de Su nombre!

---

*"Y todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres."* - Colosenses 3:23
