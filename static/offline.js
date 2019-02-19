
const offlineName = 'offline';
const templateError = '/error';
self.addEventListener('install', function(event) {
    // var offlineRequest = new Request('error.html');
    console.log('install');
    console.log('install');
    const offlineRequest = new Request(templateError);
    event.waitUntil(
        fetch(offlineRequest).then(function(response) {
            return caches.open(offlineName).then(async function(cache) {
                console.log('[oninstall] Cached offline page', response.url);
                // const file = await cache.addAll(pathsToCache);
                return cache.put(offlineRequest, response);
            });
        })
    );
});

self.addEventListener('fetch', function(event) {
    const request = event.request;

    if (request.method === 'GET') {
        event.respondWith(
            fetch(request).catch(function(error) {
                console.error(
                    '[onfetch] Failed. Serving cached offline fallback ' +
                    error
                );
                return caches.open(offlineName).then(function(cache) {
                    // return cache.match('fallback.html');
                    return cache.match(templateError);
                });
            })
        );
    }
});