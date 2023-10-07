const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = 3000;
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/test', (req, res) => {
    res.send('Hi, from server');
}); 

require('./routes/df-routes')(app);

// const corsOption = {
//     origin: 'https://localhost:3000'
// }

// app.options('*', cors(corsOption));

// app.use(corsOption);

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));