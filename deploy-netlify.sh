#!/bin/bash

# Script de deployment para Netlify
# Desarrollado por Juan Pereira y Maria de Pereira

echo "🚀 Iniciando deployment a Netlify..."
echo "👥 Desarrollado por: Juan Pereira y Maria de Pereira"
echo ""

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    print_error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
fi

# Verificar que Node.js esté instalado
if ! command -v node &> /dev/null; then
    print_error "Node.js no está instalado. Por favor, instala Node.js 18+ primero."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    print_error "Se requiere Node.js 18 o superior. Versión actual: $(node -v)"
    exit 1
fi

print_status "Node.js $(node -v) detectado"

# Verificar que npm esté instalado
if ! command -v npm &> /dev/null; then
    print_error "npm no está instalado."
    exit 1
fi

print_status "npm $(npm -v) detectado"

# Verificar configuración de Netlify
echo ""
echo "🔍 Verificando configuración para Netlify..."
if npm run verify:netlify; then
    print_status "Configuración verificada correctamente"
else
    print_error "La configuración no está lista para Netlify"
    exit 1
fi

# Instalar dependencias
echo ""
echo "📦 Instalando dependencias..."
if npm run install:all; then
    print_status "Dependencias instaladas correctamente"
else
    print_error "Error instalando dependencias"
    exit 1
fi

# Build para Netlify
echo ""
echo "🏗️ Construyendo aplicación para Netlify..."
if npm run build:netlify; then
    print_status "Build completado correctamente"
else
    print_error "Error en el build"
    exit 1
fi

# Verificar que el build se haya creado
if [ ! -d "client/build" ]; then
    print_error "El directorio client/build no se creó"
    exit 1
fi

print_status "Directorio de build creado: client/build"

# Verificar archivos críticos
echo ""
echo "🔍 Verificando archivos críticos..."

CRITICAL_FILES=(
    "client/build/index.html"
    "client/build/manifest.json"
    "client/build/sw.js"
    "client/build/_redirects"
    "netlify.toml"
    "netlify/functions/api/chat.js"
    "netlify/functions/api/lessons.js"
)

for file in "${CRITICAL_FILES[@]}"; do
    if [ -f "$file" ]; then
        print_status "Encontrado: $file"
    else
        print_error "No encontrado: $file"
        exit 1
    fi
done

# Mostrar información del build
echo ""
echo "📊 Información del build:"
echo "   - Tamaño del directorio build: $(du -sh client/build | cut -f1)"
echo "   - Archivos en build: $(find client/build -type f | wc -l)"
echo "   - Tamaño del manifest: $(du -h client/build/manifest.json | cut -f1)"
echo "   - Tamaño del service worker: $(du -h client/build/sw.js | cut -f1)"

# Mostrar próximos pasos
echo ""
echo "🎉 ¡Build completado exitosamente!"
echo ""
echo "📋 Próximos pasos para deployment:"
echo ""
echo "1. 📤 Subir a GitHub:"
echo "   git add ."
echo "   git commit -m 'Build for Netlify deployment'"
echo "   git push origin main"
echo ""
echo "2. 🌐 Conectar con Netlify:"
echo "   - Ir a https://app.netlify.com"
echo "   - New site from Git"
echo "   - Seleccionar tu repositorio"
echo "   - Build command: npm run build:netlify"
echo "   - Publish directory: client/build"
echo ""
echo "3. 🔑 Configurar variables de entorno en Netlify:"
echo "   - OPENAI_API_KEY=tu_api_key_aqui"
echo "   - NODE_ENV=production"
echo "   - REACT_APP_API_URL=/.netlify/functions/api"
echo ""
echo "4. 🚀 Hacer deploy:"
echo "   - Netlify hará deploy automático"
echo "   - O hacer deploy manual desde el dashboard"
echo ""
echo "📚 Documentación completa en NETLIFY_DEPLOYMENT.md"
echo ""
echo "👥 Desarrollado por Juan Pereira y Maria de Pereira"
echo "🙏 Que Dios bendiga este proyecto para Su gloria"

# Opcional: Abrir Netlify en el navegador
if command -v open &> /dev/null; then
    echo ""
    read -p "¿Abrir Netlify en el navegador? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        open https://app.netlify.com
    fi
elif command -v xdg-open &> /dev/null; then
    echo ""
    read -p "¿Abrir Netlify en el navegador? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        xdg-open https://app.netlify.com
    fi
fi

echo ""
echo "🎯 ¡Listo para deployment en Netlify!"
