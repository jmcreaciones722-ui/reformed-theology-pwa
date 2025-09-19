#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando PWA de Teología Reformada...');
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

// Función para crear archivo .env si no existe
function createEnvFile() {
    const envPath = path.join(__dirname, 'server', '.env');
    const envExamplePath = path.join(__dirname, 'server', 'env.example');

    if (!fs.existsSync(envPath)) {
        if (fs.existsSync(envExamplePath)) {
            fs.copyFileSync(envExamplePath, envPath);
            console.log('📝 Archivo .env creado desde env.example');
            console.log('⚠️  IMPORTANTE: Edita server/.env y agrega tu OPENAI_API_KEY\n');
        } else {
            const envContent = `# Configuración del Servidor
PORT=3001
NODE_ENV=development
CLIENT_URL=http://localhost:3000

# OpenAI API - REEMPLAZA CON TU API KEY
OPENAI_API_KEY=your_openai_api_key_here

# Base de Datos (opcional para futuras implementaciones)
DATABASE_URL=sqlite:./theology.db

# Rate Limiting
RATE_LIMIT_POINTS=10
RATE_LIMIT_DURATION=60
`;
            fs.writeFileSync(envPath, envContent);
            console.log('📝 Archivo .env creado');
            console.log('⚠️  IMPORTANTE: Edita server/.env y agrega tu OPENAI_API_KEY\n');
        }
    } else {
        console.log('📝 Archivo .env ya existe\n');
    }
}

// Función para verificar Node.js
function checkNodeVersion() {
    const nodeVersion = process.version;
    const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

    if (majorVersion < 18) {
        console.error('❌ Se requiere Node.js 18 o superior');
        console.error(`   Versión actual: ${nodeVersion}`);
        console.error('   Descarga la última versión desde: https://nodejs.org/');
        process.exit(1);
    }

    console.log(`✅ Node.js ${nodeVersion} detectado\n`);
}

// Función para crear directorios necesarios
function createDirectories() {
    const dirs = [
        'client/public/icons',
        'client/public/screenshots',
        'server/logs',
        'shared/types'
    ];

    dirs.forEach(dir => {
        const fullPath = path.join(__dirname, dir);
        if (!fs.existsSync(fullPath)) {
            fs.mkdirSync(fullPath, { recursive: true });
            console.log(`📁 Directorio creado: ${dir}`);
        }
    });
    console.log('');
}

// Función principal
async function main() {
    try {
        console.log('🔍 Verificando prerrequisitos...');
        checkNodeVersion();

        console.log('📁 Creando directorios necesarios...');
        createDirectories();

        console.log('📝 Configurando variables de entorno...');
        createEnvFile();

        console.log('📦 Instalando dependencias del proyecto raíz...');
        runCommand('npm install');

        console.log('📦 Instalando dependencias del cliente...');
        runCommand('npm install', path.join(__dirname, 'client'));

        console.log('📦 Instalando dependencias del servidor...');
        runCommand('npm install', path.join(__dirname, 'server'));

        console.log('🎉 ¡Configuración completada exitosamente!');
        console.log('\n📋 Próximos pasos:');
        console.log('1. Edita server/.env y agrega tu OPENAI_API_KEY');
        console.log('2. Ejecuta: npm run dev');
        console.log('3. Abre http://localhost:3000 en tu navegador');
        console.log('\n🔗 Enlaces útiles:');
        console.log('- Cliente: http://localhost:3000');
        console.log('- Servidor: http://localhost:3001');
        console.log('- API Health: http://localhost:3001/api/health');
        console.log('\n📚 Documentación completa en README.md');
        console.log('\n👥 Desarrollado por Juan Pereira y Maria de Pereira');

    } catch (error) {
        console.error('❌ Error durante la configuración:', error.message);
        process.exit(1);
    }
}

// Ejecutar configuración
main();
