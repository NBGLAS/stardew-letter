const CACHE_VERSION = 'stardew-letter-v2';
const CORE_CACHE = `${CACHE_VERSION}-core`;
const RUNTIME_CACHE = `${CACHE_VERSION}-runtime`;

const CORE_ASSETS = [
    './',
    './home.html',
    './index.html',
    './common.js',
    './home.js',
    './script.js',
    './home.css',
    './styles.css',
    './tokens.css',
    './zpix.ttf',
    './images/背景1.png',
    './images/信件（详情页）.png',
    './images/信件.png',
    './images/音乐.gif'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CORE_CACHE).then((cache) => cache.addAll(CORE_ASSETS)).then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys
                .filter((key) => key !== CORE_CACHE && key !== RUNTIME_CACHE)
                .map((key) => caches.delete(key))
        )).then(() => self.clients.claim())
    );
});

function isCacheableRequest(request) {
    return request.method === 'GET' && request.url.startsWith(self.location.origin);
}

async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const response = await fetch(request);
        cache.put(request, response.clone());
        return response;
    } catch (error) {
        const cachedResponse = await cache.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        throw error;
    }
}

async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await cache.match(request);

    const networkPromise = fetch(request).then((response) => {
        cache.put(request, response.clone());
        return response;
    }).catch(() => cachedResponse);

    return cachedResponse || networkPromise;
}

self.addEventListener('fetch', (event) => {
    const { request } = event;

    if (!isCacheableRequest(request)) {
        return;
    }

    const destination = request.destination;
    const url = new URL(request.url);

    if (destination === 'document') {
        event.respondWith(networkFirst(request));
        return;
    }

    if (
        destination === 'image' ||
        destination === 'audio' ||
        destination === 'font' ||
        destination === 'script' ||
        destination === 'style' ||
        url.pathname.endsWith('.gif')
    ) {
        event.respondWith(staleWhileRevalidate(request));
    }
});
