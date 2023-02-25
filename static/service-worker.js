var CACHE_NAME = 'sponsor-offline-v1.0.0';
const OFFLINE_URL = './'


self.addEventListener('install', function (event) {
    console.log('[Service Worker] Install');
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        // Setting {cache: 'reload'} in the new request will ensure that the response
        // isn't fulfilled from the HTTP cache; i.e., it will be from the networks.
        await cache.add(new Request(OFFLINE_URL, { cache: 'reload' }));
    })());

    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activate');

    event.waitUntil((async () => {
        // Enable navigation preload if it's supported.
        // See https://developers.google.com/web/updates/2017/02/navigation-preload
        if ('navigationPreload' in self.registration) {
            await self.registration.navigationPreload.enable();
        }
    })());

    // Tell the active service worker to take control of the page immediately
    self.clients.claim();
});

// self.addEventListener('fetch', function(e) {
//     e.respondWith(
//       caches.match(e.request).then(function(r) {
//             console.log('[Service Worker] Fetching resource: '+e.request.url);
//         return r || fetch(e.request).then(function(response) {
//                   return caches.open(CACHE_NAME).then(function(cache) {
//             console.log('[Service Worker] Caching new resource: '+e.request.url);
//             cache.put(e.request, response.clone());
//             return response;
//           });
//         });
//       })
//     );
//   });


self.addEventListener('fetch', function (event) {
    // console.log('[Service Worker] Fetch',event.request.url);
    if (event.request.mode = 'navigate') {
        event.respondWith((async () => {
            try {
                const preloadResponse = await event.preloadResponse;
                if (preloadResponse) {
                    return preloadResponse;
                }

                const networkResponse = await fetch(event.request);
                return networkResponse;
            } catch (error) {
                console.log('[Service Worker] Fetch failed; returning offline page instead.', error);

                const cache = await caches.open(CACHE_NAME);
                const cacheResponse = await cache.match(OFFLINE_URL);
                return cacheResponse;
            }
        })());
    }
});