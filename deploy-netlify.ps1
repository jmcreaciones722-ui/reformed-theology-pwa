# Script de deployment para Netlify - Windows PowerShell
# Desarrollado por Juan Pereira y Maria de Pereira

Write-Host "🚀 Iniciando deployment a Netlify..." -ForegroundColor Green
Write-Host "👥 Desarrollado por: Juan Pereira y Maria de Pereira" -ForegroundColor Cyan
Write-Host ""

# Función para imprimir mensajes
function Write-Success {
    param($Message)
    Write-Host "✅ $Message" -ForegroundColor Green
}

function Write-Warning {
    param($Message)
    Write-Host "⚠️  $Message" -ForegroundColor Yellow
}

function Write-Error {
    param($Message)
    Write-Host "❌ $Message" -ForegroundColor Red
}

# Verificar que estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-Error "No se encontró package.json. Ejecuta este script desde la raíz del proyecto."
    exit 1
}

# Verificar que Node.js esté instalado
try {
    $nodeVersion = node -v
    Write-Success "Node.js $nodeVersion detectado"
} catch {
    Write-Error "Node.js no está instalado. Por favor, instala Node.js 18+ primero."
    exit 1
}

# Verificar versión de Node.js
$nodeVersionNumber = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
if ($nodeVersionNumber -lt 18) {
    Write-Error "Se requiere Node.js 18 o superior. Versión actual: $nodeVersion"
    exit 1
}

# Verificar que npm esté instalado
try {
    $npmVersion = npm -v
    Write-Success "npm $npmVersion detectado"
} catch {
    Write-Error "npm no está instalado."
    exit 1
}

# Verificar configuración de Netlify
Write-Host ""
Write-Host "🔍 Verificando configuración para Netlify..." -ForegroundColor Cyan
try {
    npm run verify:netlify
    Write-Success "Configuración verificada correctamente"
} catch {
    Write-Error "La configuración no está lista para Netlify"
    exit 1
}

# Instalar dependencias
Write-Host ""
Write-Host "📦 Instalando dependencias..." -ForegroundColor Cyan
try {
    npm run install:all
    Write-Success "Dependencias instaladas correctamente"
} catch {
    Write-Error "Error instalando dependencias"
    exit 1
}

# Build para Netlify
Write-Host ""
Write-Host "🏗️ Construyendo aplicación para Netlify..." -ForegroundColor Cyan
try {
    npm run build:netlify
    Write-Success "Build completado correctamente"
} catch {
    Write-Error "Error en el build"
    exit 1
}

# Verificar que el build se haya creado
if (-not (Test-Path "client/build")) {
    Write-Error "El directorio client/build no se creó"
    exit 1
}

Write-Success "Directorio de build creado: client/build"

# Verificar archivos críticos
Write-Host ""
Write-Host "🔍 Verificando archivos críticos..." -ForegroundColor Cyan

$criticalFiles = @(
    "client/build/index.html",
    "client/build/manifest.json",
    "client/build/sw.js",
    "client/build/_redirects",
    "netlify.toml",
    "netlify/functions/api/chat.js",
    "netlify/functions/api/lessons.js"
)

foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Success "Encontrado: $file"
    } else {
        Write-Error "No encontrado: $file"
        exit 1
    }
}

# Mostrar información del build
Write-Host ""
Write-Host "📊 Información del build:" -ForegroundColor Cyan
$buildSize = (Get-ChildItem "client/build" -Recurse | Measure-Object -Property Length -Sum).Sum
$buildSizeMB = [math]::Round($buildSize / 1MB, 2)
Write-Host "   - Tamaño del directorio build: $buildSizeMB MB"
$fileCount = (Get-ChildItem "client/build" -Recurse -File).Count
Write-Host "   - Archivos en build: $fileCount"

# Mostrar próximos pasos
Write-Host ""
Write-Host "🎉 ¡Build completado exitosamente!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos para deployment:" -ForegroundColor Yellow
Write-Host ""
Write-Host "1. 📤 Subir a GitHub:" -ForegroundColor White
Write-Host "   git add ." -ForegroundColor Gray
Write-Host "   git commit -m 'Build for Netlify deployment'" -ForegroundColor Gray
Write-Host "   git push origin main" -ForegroundColor Gray
Write-Host ""
Write-Host "2. 🌐 Conectar con Netlify:" -ForegroundColor White
Write-Host "   - Ir a https://app.netlify.com" -ForegroundColor Gray
Write-Host "   - New site from Git" -ForegroundColor Gray
Write-Host "   - Seleccionar tu repositorio" -ForegroundColor Gray
Write-Host "   - Build command: npm run build:netlify" -ForegroundColor Gray
Write-Host "   - Publish directory: client/build" -ForegroundColor Gray
Write-Host ""
Write-Host "3. 🔑 Configurar variables de entorno en Netlify:" -ForegroundColor White
Write-Host "   - OPENAI_API_KEY=tu_api_key_aqui" -ForegroundColor Gray
Write-Host "   - NODE_ENV=production" -ForegroundColor Gray
Write-Host "   - REACT_APP_API_URL=/.netlify/functions/api" -ForegroundColor Gray
Write-Host ""
Write-Host "4. 🚀 Hacer deploy:" -ForegroundColor White
Write-Host "   - Netlify hará deploy automático" -ForegroundColor Gray
Write-Host "   - O hacer deploy manual desde el dashboard" -ForegroundColor Gray
Write-Host ""
Write-Host "📚 Documentación completa en NETLIFY_DEPLOYMENT.md" -ForegroundColor Cyan
Write-Host ""
Write-Host "👥 Desarrollado por Juan Pereira y Maria de Pereira" -ForegroundColor Magenta
Write-Host "🙏 Que Dios bendiga este proyecto para Su gloria" -ForegroundColor Magenta

# Preguntar si abrir Netlify
Write-Host ""
$openNetlify = Read-Host "¿Abrir Netlify en el navegador? (y/n)"
if ($openNetlify -eq "y" -or $openNetlify -eq "Y") {
    Start-Process "https://app.netlify.com"
}

Write-Host ""
Write-Host "🎯 ¡Listo para deployment en Netlify!" -ForegroundColor Green
