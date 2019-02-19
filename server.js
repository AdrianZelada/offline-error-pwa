const express = require('express');
const app = express();


app.get('/', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});

app.get('/ping', (request, response) => {
    response.json({
        status:'ok',
    })
});

app.use('/', express.static(__dirname + '/static'));

app.get('*', (request, response) => {
    response.sendFile(__dirname + '/static/index.html');
});
app.listen(3000, () => console.log('Server now running at port 3000'));
