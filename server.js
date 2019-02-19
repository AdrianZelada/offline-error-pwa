const express = require('express');
const app = express();


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});



app.get('/error', (request, response) => {
    response.sendFile(__dirname + '/error.html');
});

app.get('/ping', (request, response) => {
    response.json({
        status:'ok',
    })
});

app.use('/', express.static(__dirname + '/static'));
app.use('/worker.js', express.static(__dirname + '/static/worker.js'));
app.use('/offline.js', express.static(__dirname + '/static/offline.js'));
app.use('/offhtml.js', express.static(__dirname + '/static/offhtml.js'));
app.use('/service-worker.js', express.static(__dirname + '/static/service-worker.js'));

app.get('*', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});
app.listen(3000, () => console.log('Server now running at port 3000'));
