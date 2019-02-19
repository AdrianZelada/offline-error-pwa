if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/offhtml.js')
        .then(function(registration) {
            console.log('Service worker registered! offhtml');
        })
        .catch(function(error) {
            console.error('Service worker registration failed.');
        });
}
