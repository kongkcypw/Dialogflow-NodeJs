const express = require('express');
const bodyParser = require('body-parser');
const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send('Hi, from server');
}); 

require('./routes/df-routes')(app);

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));