const pathsToCache = [
    'error.html'
];
const templateError = 'error.html';
const offlineName = 'offHtml';
self.addEventListener('install', function(event) {
    console.log('install');
    event.waitUntil(
        caches.open(offlineName).then(async function(cache) {
            return cache.addAll(pathsToCache);
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
                    error);
                return caches.open(offlineName).then(function(cache) {
                    return cache.match(templateError);
                });
            })
        );
    }
});


self.addEventListener('message', function(event){
    serverReachable(event);
});

function serverReachable(event) {
    const request = new Request(event.data, {method: 'GET'});
    fetch(request)
        .then(() => {
            event.ports[0].postMessage({
                status:true,
            });
        }).catch((e) => {
            console.error('Server not response');
            setTimeout(function () {
                serverReachable(event);
            }, 1000);
        });
}