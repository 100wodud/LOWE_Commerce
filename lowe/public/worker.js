/* eslint-disable no-restricted-globals */
var CACHE_NAME = 'pwa-task-manager';
var urlsToCache = [
    '/',
    "./js/main.js",
    "./css/main.css",
    "./manifest.json",
    { url: '/index.html', revision: '383682' }
];
// Install a service worker
self.addEventListener('install', event => {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
        .then(function(cache) {
            console.log('Opened cache');
            return cache.addAll(urlsToCache);
        })
    );
});
// Cache and return requests
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(function(response) {
            // Cache hit - return response
            if (response) {
                return response;
            }
            return fetch(event.request);
        })
    );
});
// Update a service worker
self.addEventListener('activate', event => {
    var cacheWhitelist = ['pwa-task-manager'];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener('push', event => {
    console.log('Push ' + event.data.text());
  
    const title = 'LOWE MALL';
    const options = {
      body: event.data.text()
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });