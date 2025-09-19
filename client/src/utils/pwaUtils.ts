// PWA utility functions
export const registerServiceWorker = async () => {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registrado exitosamente:', registration);
            return registration;
        } catch (error) {
            console.error('Error al registrar Service Worker:', error);
            throw error;
        }
    } else {
        console.warn('Service Worker no soportado en este navegador');
        return null;
    }
};

export const requestNotificationPermission = async () => {
    if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
    }
    return false;
};

export const showNotification = (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(title, {
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            ...options
        });
    }
};

export const isOnline = () => {
    return navigator.onLine;
};

export const addOnlineListener = (callback: () => void) => {
    window.addEventListener('online', callback);
};

export const addOfflineListener = (callback: () => void) => {
    window.addEventListener('offline', callback);
};

export const isInstallable = () => {
    return 'serviceWorker' in navigator && 'PushManager' in window;
};

export const promptInstall = async () => {
    // This would be used with a custom install prompt
    // The actual implementation depends on your PWA install strategy
    console.log('Prompting user to install PWA');
};

export const checkForUpdates = async () => {
    if ('serviceWorker' in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
            registration.update();
        }
    }
};
