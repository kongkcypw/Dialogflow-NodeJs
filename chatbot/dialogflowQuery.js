const dialogflow = require('dialogflow');

const config = require('../configKey');

const projectId = config.googleProjectId;
const sessionId = config.dialogFlowSessionId;
const credentials = {
    client_email: config.googleClientEmail,
    private_key: config.googlePrivateKey
}

const sessionClient = new dialogflow.SessionsClient({projectId, credentials});

const textQuery = async(userText, userId) => {
    const sessionPath = sessionClient.sessionPath(projectId, sessionId+userId);
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                text: userText,
                languageCode: config.dialogFlowSessionLanguageCode
            }
        }
    }
    try{
        const response = await sessionClient.detectIntent(request);
        return response[0].queryResult;
    } catch(err){
        console.log(err);
        return err;
    }
}

const specIntent = [
    "Nearby Store", "Nearby Store - Open", "Nearby Store - All", "Promotion"
];
const intentType = async(intentName) => {
    return (specIntent.includes(intentName))
}

module.exports = {
    textQuery,
    intentType
}