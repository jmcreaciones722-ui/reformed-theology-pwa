const CACHE_NAME = 'theology-pwa-v1.0.0';
const urlsToCache = [
    '/',
    '/static/js/bundle.js',
    '/static/css/main.css',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png'
];

// Install service worker
self.addEventListener('install', (event) => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Service Worker: Cacheando archivos');
                return cache.addAll(urlsToCache);
            })
            .then(() => {
                console.log('Service Worker: Instalación completada');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('Service Worker: Error en la instalación', error);
            })
    );
});

// Activate service worker
self.addEventListener('activate', (event) => {
    console.log('Service Worker: Activando...');
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Eliminando cache antiguo', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => {
            console.log('Service Worker: Activación completada');
            return self.clients.claim();
        })
    );
});

// Fetch events
self.addEventListener('fetch', (event) => {
    // Skip non-GET requests
    if (event.request.method !== 'GET') {
        return;
    }

    // Skip requests to external APIs
    if (event.request.url.includes('localhost:3001') ||
        event.request.url.includes('api.openai.com')) {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // Return cached version if available
                if (response) {
                    console.log('Service Worker: Sirviendo desde cache', event.request.url);
                    return response;
                }

                // Otherwise fetch from network
                console.log('Service Worker: Obteniendo desde red', event.request.url);
                return fetch(event.request)
                    .then((response) => {
                        // Check if valid response
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // Clone the response
                        const responseToCache = response.clone();

                        // Add to cache for future use
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch((error) => {
                        console.error('Service Worker: Error en fetch', error);

                        // Return offline page for navigation requests
                        if (event.request.mode === 'navigate') {
                            return caches.match('/') || new Response('Aplicación no disponible offline', {
                                status: 503,
                                statusText: 'Service Unavailable'
                            });
                        }

                        throw error;
                    });
            })
    );
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('Service Worker: Background sync', event.tag);

    if (event.tag === 'background-sync') {
        event.waitUntil(
            // Handle background sync tasks
            handleBackgroundSync()
        );
    }
});

// Push notifications
self.addEventListener('push', (event) => {
    console.log('Service Worker: Push recibido');

    const options = {
        body: event.data ? event.data.text() : 'Nueva lección diaria disponible',
        icon: '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'Ver lección',
                icon: '/icons/icon-96x96.png'
            },
            {
                action: 'close',
                title: 'Cerrar',
                icon: '/icons/icon-96x96.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Teología Reformada', options)
    );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
    console.log('Service Worker: Click en notificación', event.action);

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/?action=daily-lesson')
        );
    }
});

// Helper function for background sync
async function handleBackgroundSync() {
    try {
        // Handle any pending offline actions
        console.log('Service Worker: Procesando sincronización en segundo plano');

        // This is where you would handle queued messages, lessons, etc.
        // when the user comes back online

    } catch (error) {
        console.error('Service Worker: Error en background sync', error);
    }
}

// Message handling
self.addEventListener('message', (event) => {
    console.log('Service Worker: Mensaje recibido', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
