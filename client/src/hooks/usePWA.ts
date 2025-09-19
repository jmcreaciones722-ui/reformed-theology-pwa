import { useState, useEffect } from 'react';
import {
    registerServiceWorker,
    requestNotificationPermission,
    isOnline as checkOnlineStatus,
    addOnlineListener,
    addOfflineListener,
    isInstallable
} from '../utils/pwaUtils';

export const usePWA = () => {
    const [isInstalled, setIsInstalled] = useState(false);
    const [isOnline, setIsOnline] = useState(checkOnlineStatus());
    const [canInstall, setCanInstall] = useState(false);
    const [swRegistration, setSwRegistration] = useState<ServiceWorkerRegistration | null>(null);

    useEffect(() => {
        // Register service worker
        registerServiceWorker()
            .then((registration) => {
                if (registration) {
                    setSwRegistration(registration);
                    setIsInstalled(true);
                }
            })
            .catch((error) => {
                console.error('Error registering service worker:', error);
            });

        // Check if PWA is installable
        setCanInstall(isInstallable());

        // Set up online/offline listeners
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        addOnlineListener(handleOnline);
        addOfflineListener(handleOffline);

        // Request notification permission
        requestNotificationPermission();

        // Cleanup
        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return {
        isInstalled,
        isOnline,
        canInstall,
        swRegistration
    };
};
