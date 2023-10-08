const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;
const app = express();

// Configuration for cors
const corsOptions = {
    origin: '*',
    credentials: true,
};
app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

require('./routes/df-routes')(app);


app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));