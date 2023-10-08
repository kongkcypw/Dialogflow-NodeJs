const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const chatbot = require('./chatbot/chatbot')

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

// Post request to endpoint
app.post('/text_query', async(req, res) => {
    console.log(req);
    const {text, userId} = req.body;
    const resultQuery = await chatbot.textQuery(text, userId);
    console.log(resultQuery);
    const resObj = {
        intentName: resultQuery.intent.displayName,
        userQuery: resultQuery.queryText,
        fulfillmentText: resultQuery.fulfillmentText
    }
    res.send(resObj);
})

app.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));