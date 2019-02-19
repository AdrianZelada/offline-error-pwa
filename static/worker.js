var cacheName = 'cache-v1';
var pathsToCache = [
    "/",
    '/error',
    '/static/styles.css',
    '/static/scripts.js',
    '/static/fallback.html',

];
var globalClients = {};
var windowClients = [];
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(pathsToCache);
        }).catch(function(error) {
            console.error('Oops, something bad happened!', error);
        })
    );
});


self.addEventListener('fetch', function(e) {
    console.log(e.request);
    // const allClients = (async function(){
    //     // return await clients.matchAll({
    //     //     type: "window",
    //     //     includeUncontrolled: true
    //     // });
    //
    //     return (async function () {
    //         return await clients.matchAll({
    //             type: "window",
    //             includeUncontrolled: true
    //         });
    //     })();
    //     // await clients.matchAll({
    //     //     type: "window",
    //     //     includeUncontrolled: true
    //     // });
    //
    // })();
    // const allClients = await clients.matchAll({
    //     includeUncontrolled: true
    // });
    // console.log('clients');
    // console.log(allClients)
    // allClients.then((cls)=>{
    //     console.log('cls');
    //     console.log(cls);
    //     if (cls.length > 0) {
    //         globalClients = clients;
    //         windowClients = cls;
    //         console.log(globalClients);
    //     } else {
    //         console.log('No clients')
    //     }

        //
        // const allCls = (async ()=> {
        //     return await globalClients.matchAll({
        //         includeUncontrolled: true
        //     });
        // })()
        //
        // let chatClient;
        //
        // // Let's see if we already have a chat window open:
        // for (const client of allCls) {
        //     const url = new URL(client.url);
        //
        //     if (url.pathname == '/error') {
        //         // Excellent, let's use it!
        //         client.focus();
        //         chatClient = client;
        //         break;
        //     }
        // }
    // });
    e.respondWith(
        fetch(e.request).catch(async function(error) {
            console.log(error)
            const cache = await caches.open(cacheName);
            const cachedResponse = await cache.match(e.request);

            if (cachedResponse) {
                console.log('cachedResponse');
                console.log(cachedResponse);
                // const allClients = await clients.matchAll({
                //     includeUncontrolled: true
                // });
                // console.log('clients');
                // console.log(allClients);
                return cachedResponse;
            } else {

                return new Response('<p>Hello from your friendly neighbourhood service worker!</p>', {
                        headers: { 'Content-Type': 'text/html' }
                    });
                // return await cache.match('/static/fallback.html');

                // console.log('windowClients');
                // console.log(windowClients);
                // e.waitUntil(clients.matchAll({
                //     type: "window",
                //     includeUncontrolled: true
                // }).then(function (allCli) {
                //     console.log('allCli');
                //     console.log(allCli);
                //     // if (clients.openWindow)
                //     //     clients.openWindow('/error');
                //     new Response('<p>Hello from your friendly neighbourhood service worker!</p>', {
                //         headers: { 'Content-Type': 'text/html' }
                //     });
                //     // return fetch(e.request);
                // }))
                // const allClients = await clients.matchAll({
                //     includeUncontrolled: true,
                //     type: "window"
                // });
                // if (clients.openWindow)
                //     clients.openWindow('/error');

            }
            // return caches.open(cacheName).then(function(cache) {
            //     return cache.match(e.request);
            // })
        }));
});