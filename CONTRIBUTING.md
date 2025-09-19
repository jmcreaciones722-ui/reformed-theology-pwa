# Guía de Contribución

## 👥 Desarrolladores

**Juan Pereira y Maria de Pereira**

## 🚀 Cómo Contribuir

### 1. Configuración del Entorno

```bash
# Clonar el repositorio
git clone <repository-url>
cd reformed-theology-pwa

# Ejecutar script de configuración
node setup.js

# O configurar manualmente
npm run install:all
```

### 2. Configurar Variables de Entorno

```bash
# Copiar archivo de ejemplo
cp server/env.example server/.env

# Editar con tu API key de OpenAI
# Abrir server/.env y agregar:
OPENAI_API_KEY=tu_api_key_aqui
```

### 3. Ejecutar en Desarrollo

```bash
# Desarrollo completo (cliente + servidor)
npm run dev

# O por separado
npm run client:dev  # Puerto 3000
npm run server:dev  # Puerto 3001
```

## 📝 Estándares de Código

### TypeScript
- Usar tipos estrictos
- Documentar interfaces y tipos
- Evitar `any` cuando sea posible

### React
- Componentes funcionales con hooks
- Props tipadas con interfaces
- Separar lógica de presentación

### Estilos
- Usar Tailwind CSS
- Clases semánticas y reutilizables
- Responsive design mobile-first

### Backend
- Validación de entrada
- Manejo de errores consistente
- Logging apropiado

## 🧪 Testing

```bash
# Tests del cliente
cd client && npm test

# Tests del servidor
cd server && npm test

# Tests completos
npm test
```

## 📦 Estructura de Commits

```
tipo(scope): descripción breve

Descripción más detallada si es necesario

- Lista de cambios
- Otros cambios relevantes

Closes #123
```

### Tipos de Commit
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bugs
- `docs`: Documentación
- `style`: Formato, espacios, etc.
- `refactor`: Refactorización de código
- `test`: Tests
- `chore`: Tareas de mantenimiento

### Ejemplos
```
feat(chat): agregar categorización automática de mensajes
fix(api): corregir validación de entrada en chat
docs(readme): actualizar instrucciones de instalación
```

## 🔄 Flujo de Trabajo

### 1. Crear Rama
```bash
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/corregir-bug
```

### 2. Desarrollar
- Hacer commits frecuentes y descriptivos
- Mantener el código limpio y documentado
- Probar localmente antes de commitear

### 3. Push y Pull Request
```bash
git push origin feature/nueva-funcionalidad
```

### 4. Crear Pull Request
- Título descriptivo
- Descripción detallada de los cambios
- Screenshots si aplica
- Referenciar issues relacionados

## 🎯 Áreas de Contribución

### Frontend
- Nuevos componentes de UI
- Mejoras en UX/UI
- Optimizaciones de performance
- Tests de componentes

### Backend
- Nuevas APIs
- Mejoras en seguridad
- Optimizaciones de base de datos
- Tests de integración

### PWA
- Funcionalidades offline
- Service Worker
- Notificaciones push
- Performance

### Documentación
- README actualizado
- Guías de usuario
- Documentación de API
- Ejemplos de uso

## 🐛 Reportar Bugs

### Template de Bug Report
```markdown
**Descripción del Bug**
Descripción clara y concisa del problema.

**Pasos para Reproducir**
1. Ir a '...'
2. Hacer clic en '...'
3. Ver error

**Comportamiento Esperado**
Qué debería pasar.

**Comportamiento Actual**
Qué está pasando.

**Screenshots**
Si aplica, agregar screenshots.

**Información Adicional**
- OS: [e.g. Windows 10]
- Navegador: [e.g. Chrome 91]
- Versión: [e.g. 1.0.0]
```

## 💡 Sugerir Funcionalidades

### Template de Feature Request
```markdown
**¿Es tu solicitud relacionada con un problema?**
Descripción clara del problema.

**Describe la solución que te gustaría**
Descripción clara de lo que quieres que pase.

**Describe alternativas consideradas**
Otras soluciones que consideraste.

**Contexto adicional**
Cualquier otro contexto sobre la solicitud.
```

## 📋 Checklist para Pull Requests

- [ ] Código sigue los estándares del proyecto
- [ ] Tests pasan localmente
- [ ] Documentación actualizada
- [ ] Commits descriptivos
- [ ] No hay conflictos de merge
- [ ] Screenshots incluidos si aplica

## 🔒 Seguridad

### Reportar Vulnerabilidades
- **NO** crear issues públicos para vulnerabilidades
- Contactar directamente a los desarrolladores
- Incluir detalles específicos del problema
- Esperar confirmación antes de publicar

### Buenas Prácticas
- Nunca commitear API keys
- Validar toda entrada del usuario
- Usar HTTPS en producción
- Mantener dependencias actualizadas

## 📞 Contacto

**Juan Pereira y Maria de Pereira**
- Email: [contacto@email.com]
- GitHub: [@usuario]

## 🙏 Agradecimientos

¡Gracias por contribuir a este proyecto! Tu ayuda es invaluable para hacer que la teología reformada sea más accesible a través de la tecnología.

---

*"Todo lo que hagáis, hacedlo de corazón, como para el Señor y no para los hombres."* - Colosenses 3:23
