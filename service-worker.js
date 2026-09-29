const CACHE_NAME = 'chucsteam-v1'

const FILES_TO_CACHE = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './manifest.json',

    './img/icon_192.png',
    './img/icon_512.png',
    './img/favicon.ico',

    './img/re4.png',
    './img/requiem.png',
    './img/village.png'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(FILES_TO_CACHE))
            .then(() => self.skipWaiting())
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames
                    .filter(cacheName => cacheName !== CACHE_NAME)
                    .map(cacheName => caches.delete(cacheName))
            )
        ).then(() => self.clients.claim())
    )
})

self.addEventListener('fetch', event => {
    if (event.request.method !== 'GET') return

    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    )
})
