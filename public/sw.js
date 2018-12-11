// Create an appCache on serviceWorker installation
self.addEventListener('install',(event) => {
    event.waitUntil(
        caches.open('appCache')
    );
});


self.addEventListener('fetch',(event) => {
    // Fetch the request and respond from cache
    event.respondWith(caches.match(event.request).then((response) => {
        if(response) {
            console.log("Found the request ", event.request, " in cache.");
            return response;
        } else { //if request is not cached then cache the request-response
            console.log(event.request, " not found in the cache.");
            return fetch(event.request).then((response) => {
                //clone the response as using it twice generates a console error
                var responseClone = response.clone();
                caches.open('appCache').then((cache) => {
                    cache.put(event.request, responseClone);
                });
                return response;
            }).catch((error) => {
                console.error(error);
            });
        }
    }));
});