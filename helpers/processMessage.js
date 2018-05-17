'use strict'
const API_AI_TOKEN = "1dc85d84d7aa4fb0887e361a69bde6ed";
const apiAiClient = require("apiai")(API_AI_TOKEN);
const FACEBOOK_ACCESS_TOKEN ="EAAFj4C8it5cBAAQsC7OdqRn1TLAb5WSpWVD2Q5Ib7wzWmpNrYTfs27cZBLVoZBpjcMSqi7E07RGrfH1FpqhVs32yJrI87K5Ts87cAumbiXvLbzwh6ZCli19mTOYzswOXjxTMv5DYxKOqeJFajAGY2kXfGQwmS9icWx8RZB8y1JkZA7yjqhbB5";
const request = require("request");
const sendTextMessage = (senderId, text) => {
 request({
 url: "https://graph.facebook.com/v2.6/me/messages",
 qs: { access_token: FACEBOOK_ACCESS_TOKEN },
 method: "POST",
 json: {
 recipient: { id: senderId },
 message: { text },
 }
 });
};
module.exports = (event) => {
 const senderId = event.sender.id;
 const message = event.message.text;
const apiaiSession = apiAiClient.textRequest(message, {sessionId: "crowdbotics_bot"});
apiaiSession.on("response", (response) => {
 const result = response.result.fulfillment.speech;
sendTextMessage(senderId, result);
 });
apiaiSession.on("error", error => console.log(error));
 apiaiSession.end();
};