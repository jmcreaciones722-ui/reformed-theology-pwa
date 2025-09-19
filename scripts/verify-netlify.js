#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 Verificando configuración para Netlify...');
console.log('👥 Desarrollado por: Juan Pereira y Maria de Pereira\n');

// Función para verificar si un archivo existe
function checkFile(filePath, description) {
    if (fs.existsSync(filePath)) {
        console.log(`✅ ${description}: ${filePath}`);
        return true;
    } else {
        console.log(`❌ ${description}: ${filePath} - NO ENCONTRADO`);
        return false;
    }
}

// Función para verificar contenido de archivo
function checkFileContent(filePath, searchText, description) {
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        if (content.includes(searchText)) {
            console.log(`✅ ${description}: Encontrado en ${filePath}`);
            return true;
        } else {
            console.log(`❌ ${description}: No encontrado en ${filePath}`);
            return false;
        }
    } else {
        console.log(`❌ ${description}: Archivo no existe ${filePath}`);
        return false;
    }
}

// Función principal de verificación
function verifyNetlifySetup() {
    let allGood = true;

    console.log('📁 Verificando estructura de archivos...\n');

    // Archivos de configuración principales
    allGood &= checkFile('netlify.toml', 'Configuración de Netlify');
    allGood &= checkFile('client/public/_redirects', 'Archivo de redirects');
    allGood &= checkFile('client/public/manifest.json', 'Manifest PWA');
    allGood &= checkFile('client/public/sw.js', 'Service Worker');

    // Netlify Functions
    allGood &= checkFile('netlify/functions/api/chat.js', 'Función de chat');
    allGood &= checkFile('netlify/functions/api/lessons.js', 'Función de lecciones');
    allGood &= checkFile('netlify/functions/package.json', 'Package.json de funciones');

    // Scripts de build
    allGood &= checkFile('scripts/build-netlify.js', 'Script de build para Netlify');

    console.log('\n📝 Verificando contenido de archivos...\n');

    // Verificar configuración de Netlify
    allGood &= checkFileContent('netlify.toml', 'build:netlify', 'Comando de build correcto');
    allGood &= checkFileContent('netlify.toml', 'client/build', 'Directorio de publicación correcto');
    allGood &= checkFileContent('netlify.toml', 'redirects', 'Configuración de redirects');

    // Verificar redirects
    allGood &= checkFileContent('client/public/_redirects', '/*', 'Redirect para SPA');
    allGood &= checkFileContent('client/public/_redirects', '/.netlify/functions', 'Redirect para API');

    // Verificar manifest PWA
    allGood &= checkFileContent('client/public/manifest.json', 'Teología Reformada', 'Nombre de la PWA');
    allGood &= checkFileContent('client/public/manifest.json', 'standalone', 'Display mode PWA');

    // Verificar service worker
    allGood &= checkFileContent('client/public/sw.js', 'CACHE_NAME', 'Configuración de cache');
    allGood &= checkFileContent('client/public/sw.js', 'install', 'Event listener de install');

    // Verificar funciones de Netlify
    allGood &= checkFileContent('netlify/functions/api/chat.js', 'OpenAI', 'Integración OpenAI');
    allGood &= checkFileContent('netlify/functions/api/chat.js', 'CORS', 'Configuración CORS');
    allGood &= checkFileContent('netlify/functions/api/lessons.js', 'OpenAI', 'Integración OpenAI en lecciones');

    // Verificar configuración del cliente
    allGood &= checkFileContent('client/src/services/chatService.ts', '/.netlify/functions/api', 'URL de API correcta');
    allGood &= checkFileContent('client/src/services/lessonsService.ts', '/.netlify/functions/api', 'URL de API correcta');

    console.log('\n📦 Verificando dependencias...\n');

    // Verificar package.json principal
    if (fs.existsSync('package.json')) {
        const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
        if (packageJson.scripts && packageJson.scripts['build:netlify']) {
            console.log('✅ Script build:netlify configurado');
        } else {
            console.log('❌ Script build:netlify no encontrado');
            allGood = false;
        }
    }

    // Verificar dependencias de Netlify Functions
    if (fs.existsSync('netlify/functions/package.json')) {
        const functionsPackage = JSON.parse(fs.readFileSync('netlify/functions/package.json', 'utf8'));
        if (functionsPackage.dependencies && functionsPackage.dependencies.openai) {
            console.log('✅ Dependencia OpenAI en funciones');
        } else {
            console.log('❌ Dependencia OpenAI no encontrada en funciones');
            allGood = false;
        }
    }

    console.log('\n🔧 Verificando configuración de build...\n');

    // Verificar que el script de build existe y es ejecutable
    if (fs.existsSync('scripts/build-netlify.js')) {
        console.log('✅ Script de build existe');
    } else {
        console.log('❌ Script de build no encontrado');
        allGood = false;
    }

    console.log('\n📋 Resumen de verificación:\n');

    if (allGood) {
        console.log('🎉 ¡Todo está configurado correctamente para Netlify!');
        console.log('\n📋 Próximos pasos:');
        console.log('1. Subir el proyecto a GitHub');
        console.log('2. Conectar con Netlify');
        console.log('3. Configurar OPENAI_API_KEY en Netlify');
        console.log('4. Hacer deploy');
        console.log('\n🚀 ¡Tu PWA estará lista para usar!');
    } else {
        console.log('❌ Se encontraron problemas en la configuración');
        console.log('Por favor, revisa los errores arriba y corrígelos antes de hacer deploy');
    }

    console.log('\n👥 Desarrollado por Juan Pereira y Maria de Pereira');

    return allGood;
}

// Ejecutar verificación
const success = verifyNetlifySetup();
process.exit(success ? 0 : 1);
