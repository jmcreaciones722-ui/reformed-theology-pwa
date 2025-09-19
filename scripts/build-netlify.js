#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Construyendo PWA para Netlify...');
console.log('👥 Desarrollado por: Juan Pereira y Maria de Pereira\n');

// Función para ejecutar comandos
function runCommand(command, cwd = process.cwd()) {
    try {
        console.log(`📦 Ejecutando: ${command}`);
        execSync(command, {
            cwd,
            stdio: 'inherit',
            encoding: 'utf8'
        });
        console.log('✅ Completado\n');
    } catch (error) {
        console.error(`❌ Error ejecutando: ${command}`);
        console.error(error.message);
        process.exit(1);
    }
}

// Función para crear archivos de configuración
function createConfigFiles() {
  console.log('📝 Verificando archivos de configuración...');
  
  // Crear .env para el build si no existe
  const envPath = path.join(__dirname, '..', 'client', '.env');
  if (!fs.existsSync(envPath)) {
    const envContent = `# Variables de entorno para build de Netlify
REACT_APP_API_URL=/.netlify/functions/api
NODE_ENV=production
GENERATE_SOURCEMAP=false
`;
    fs.writeFileSync(envPath, envContent);
    console.log('✅ Archivo .env creado para build');
  } else {
    console.log('✅ Archivo .env ya existe');
  }
  
  // Verificar archivo de configuración de PWA
  const pwaConfigPath = path.join(__dirname, '..', 'client', 'src', 'config', 'pwa.js');
  if (!fs.existsSync(pwaConfigPath)) {
    const pwaConfig = `// Configuración de PWA para producción
export const PWA_CONFIG = {
  name: 'Teología Reformada Chat',
  shortName: 'TeologíaChat',
  description: 'Asistente de IA especializado en teología reformada',
  themeColor: '#1e40af',
  backgroundColor: '#ffffff',
  display: 'standalone',
  orientation: 'portrait-primary',
  startUrl: '/',
  scope: '/',
  lang: 'es'
};
`;
    fs.writeFileSync(pwaConfigPath, pwaConfig);
    console.log('✅ Configuración de PWA creada');
  } else {
    console.log('✅ Configuración de PWA ya existe');
  }
  
  console.log('');
}

// Función para optimizar el build
function optimizeBuild() {
    console.log('⚡ Optimizando build...');

    const buildDir = path.join(__dirname, '..', 'client', 'build');

    // Crear archivo de configuración de Netlify
    const netlifyConfig = `# Configuración de Netlify
[build]
  command = "npm run build:netlify"
  publish = "client/build"

[build.environment]
  NODE_VERSION = "18"
  NPM_VERSION = "9"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "/sw.js"
  [headers.values]
    Cache-Control = "public, max-age=0, must-revalidate"
`;

    fs.writeFileSync(path.join(__dirname, '..', 'netlify.toml'), netlifyConfig);
    console.log('✅ netlify.toml actualizado');

    // Crear archivo de redirects
    const redirectsContent = `# Netlify redirects para SPA
/*    /index.html   200

# API redirects
/api/*  /.netlify/functions/api/:splat  200
`;

    fs.writeFileSync(path.join(buildDir, '_redirects'), redirectsContent);
    console.log('✅ Archivo _redirects creado');

    console.log('');
}

// Función principal
async function main() {
    try {
        console.log('🔍 Verificando prerrequisitos...');

        // Verificar que estamos en el directorio correcto
        if (!fs.existsSync(path.join(__dirname, '..', 'client', 'package.json'))) {
            console.error('❌ No se encontró el directorio client/');
            process.exit(1);
        }

        console.log('📁 Creando archivos de configuración...');
        createConfigFiles();

        console.log('📦 Instalando dependencias del cliente...');
        runCommand('npm install', path.join(__dirname, '..', 'client'));

        console.log('📦 Instalando dependencias de Netlify Functions...');
        runCommand('npm install', path.join(__dirname, '..', 'netlify', 'functions'));

        console.log('🏗️ Construyendo aplicación...');
        runCommand('npm run build', path.join(__dirname, '..', 'client'));

        console.log('⚡ Optimizando para producción...');
        optimizeBuild();

        console.log('🎉 ¡Build completado exitosamente!');
        console.log('\n📋 Archivos generados:');
        console.log('- client/build/ (directorio de publicación)');
        console.log('- netlify.toml (configuración de Netlify)');
        console.log('- netlify/functions/ (funciones serverless)');
        console.log('\n🚀 Listo para deploy en Netlify!');
        console.log('\n📚 Próximos pasos:');
        console.log('1. Subir el proyecto a GitHub');
        console.log('2. Conectar con Netlify');
        console.log('3. Configurar variables de entorno en Netlify');
        console.log('4. Hacer deploy automático');
        console.log('\n👥 Desarrollado por Juan Pereira y Maria de Pereira');

    } catch (error) {
        console.error('❌ Error durante el build:', error.message);
        process.exit(1);
    }
}

// Ejecutar build
main();
