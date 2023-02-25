var CACHE_NAME = 'sponsor-offline-v1.0.0';

self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll([
            './',
            './script.js',
            './style.css',
            './images/coffee.png',
            './manifest.json',
            '../static/jquery.min.js',
            '../simple/images/BTCQR.jpg',
            '../simple/images/alipayQR.jpg',
            '../simple/images/wechatQR.jpg'
        ])),
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => response || fetch(e.request)),
    );
});