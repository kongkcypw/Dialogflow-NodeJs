const chatbot = require('../chatbot/chatbot')

module.exports = app => {

    app.post('/text_query', async(req, res) => {
        console.log(req);
        const {text, userId} = req.body;
        const resultQuery = await chatbot.textQuery(text, userId);
        console.log(resultQuery);
        res.send("Text Query");
    })

}