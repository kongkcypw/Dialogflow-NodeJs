const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

// PORT configuration
const PORT = 3200;

// Configuration for cors
const corsOptions = {
    origin: '*', // Allow for all domains
    credentials: true,
};
app.use(cors(corsOptions));

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Dialogflow routes
const dialogflowRoutes = require('./routes/df-routes');
dialogflowRoutes(app);

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));