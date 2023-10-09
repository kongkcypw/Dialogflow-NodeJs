const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const chatbot = require('./chatbot/chatbot');
const http = require("http");
const { Server } = require("socket.io");

// PORT configuration
const PORT = 3200;

// Configuration for cors
const corsOptions = {
    origin: '*', // Allow for all domains
    credentials: true,
};
app.use(cors(corsOptions));

// Server and socket.io
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

// BodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Socket
io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`);

    socket.on("join_chatbot", (chatbotID) => {
        socket.join(chatbotID);
        console.log(`User with ID: ${socket.id} joined room: ${chatbotID}`);
    })

    socket.on("send_message", async (data) => {
        console.log(data);
        // Detect intent 
        const resultQuery = await chatbot.textQuery(data.message, data.userID);
        const isIntentSpecific = await chatbot.intentType(resultQuery.intent.displayName);
        const resObj = {
        intentName: resultQuery.intent.displayName,
        userInputText: resultQuery.queryText,
        fulfillmentText: resultQuery.fulfillmentText,
        chatbotID: data.chatbotID,
        isIntentSpecific: isIntentSpecific,
        time: data.time,
        }
        console.log(resObj)
        socket.emit("receive_message", resObj);
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
    })
})

server.listen(PORT, () => console.log(`Server is now listening on port ${PORT}`));