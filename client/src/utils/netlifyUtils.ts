// Utilidades específicas para Netlify
export const isNetlify = () => {
    return typeof window !== 'undefined' &&
        (window.location.hostname.includes('netlify.app') ||
            window.location.hostname.includes('netlify.com'));
};

export const getApiUrl = () => {
    if (isNetlify()) {
        return '/.netlify/functions/api';
    }
    return process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
};

export const getNetlifyFunctionUrl = (functionName: string) => {
    if (isNetlify()) {
        return `/.netlify/functions/${functionName}`;
    }
    return `http://localhost:3001/api/${functionName}`;
};

export const handleNetlifyError = (error: any) => {
    console.error('Netlify Function Error:', error);

    if (error.response?.status === 500) {
        return 'Error interno del servidor. Por favor, intenta de nuevo.';
    }

    if (error.response?.status === 429) {
        return 'Demasiadas solicitudes. Por favor, espera un momento.';
    }

    if (error.code === 'NETWORK_ERROR') {
        return 'Error de conexión. Verifica tu internet.';
    }

    return 'Error inesperado. Por favor, intenta de nuevo.';
};

export const getNetlifyHeaders = () => {
    return {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    };
};
