var cacheName = 'cache-v1';
var pathsToCache = [
    '/error',
    '/static/styles.css',
    '/static/scripts.js'
];

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
    console.log(e.request)

    e.respondWith(async function() {
        // Try to get the response from a cache.
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(e.request);
    
        if (cachedResponse) {
          // If we found a match in the cache, return it, but also
          // update the entry in the cache in the background.
          console.log('cacheddd')
          e.waitUntil(cache.add(e.request));
          return cachedResponse;
        } else {

          console.log('reddirec')

            e.waitUntil(async function() {
                const allClients = await clients.matchAll({
                  includeUncontrolled: true
                });
            
                let chatClient;
            
                // Let's see if we already have a chat window open:
                for (const client of allClients) {
                  const url = new URL(client.url);
            
                  if (url.pathname == '/error') {
                    // Excellent, let's use it!
                    client.focus();
                    chatClient = client;
                    break;
                  }
                }
            
                // If we didn't find an existing chat window,
                // open a new one:
                if (!chatClient) {
                  chatClient = await clients.openWindow('/error');
                }
            
                // Message the client:
                chatClient.postMessage("New chat messages!");
                return fetch(e.request);

              }());

        }
    
        // If we didn't find a match in the cache, use the network.
        // return fetch(event.request);
      }());
    // e.respondWith(
    //     fetch(e.request).catch(function() {

    //         e.waitUntil(async function() {
    //             const allClients = await clients.matchAll({
    //               includeUncontrolled: true
    //             });
            
    //             let chatClient;
            
    //             // Let's see if we already have a chat window open:
    //             for (const client of allClients) {
    //               const url = new URL(client.url);
            
    //               if (url.pathname == '/error') {
    //                 // Excellent, let's use it!
    //                 client.focus();
    //                 chatClient = client;
    //                 break;
    //               }
    //             }
            
    //             // If we didn't find an existing chat window,
    //             // open a new one:
    //             if (!chatClient) {
    //               chatClient = await clients.openWindow('/error');
    //             }
            
    //             // Message the client:
    //             chatClient.postMessage("New chat messages!");

    //             return caches.open(cacheName).then(function(cache) {
    //                 return cache.match(e.request);
    //             })
    //           }());


            
    //     })
    // );


    // e.waitUntil(clients.matchAll({
    //     type: "window"
    //   }).then(function(clientList) {
    //     for (var i = 0; i < clientList.length; i++) {
    //       var client = clientList[i];
    //       if (client.url == '/' && 'focus' in client) {
    //         client.focus();
    //         break;
    //       }
    //     }

    //     e.respondWith(
    //         fetch(e.request).catch(function() {
    //             if (clients.openWindow)
    //              clients.openWindow('/error');
    //             return caches.open(cacheName).then(function(cache) {
    //                 return cache.match(e.request);
    //             })
    //         })
    //     );
        
    //   }));
});
