// ========================================
// SERVICE WORKER - KELOMPOK SUKSES
// ========================================

const CACHE_NAME = 'kelompok-sukses-v1';
const ASSETS_TO_CACHE = [
    '/',
    '/index.html',
    '/style.css',
    '/script.js',
    '/manifest.json'
];

// Install event - cache files
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log('Cache opened');
            return cache.addAll(ASSETS_TO_CACHE).catch(err => {
                console.log('Cache addAll error:', err);
                // Jangan fail jika beberapa file tidak bisa di-cache
            });
        })
    );
    self.skipWaiting();
});

// Activate event - cleanup old caches
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - cache first strategy
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip non-GET requests
    if (request.method !== 'GET') {
        return;
    }

    // Skip external API calls
    if (url.origin !== self.location.origin) {
        return;
    }

    // Cache first, fallback to network
    event.respondWith(
        caches.match(request).then(response => {
            if (response) {
                return response;
            }

            return fetch(request).then(response => {
                // Jangan cache non-success responses
                if (!response || response.status !== 200 || response.type === 'error') {
                    return response;
                }

                const responseClone = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, responseClone);
                });

                return response;
            }).catch(err => {
                console.log('Fetch error:', err);
                // Return cached version or offline page
                return caches.match(request);
            });
        })
    );
});

console.log('🔒 Service Worker Loaded - Offline Support Active');