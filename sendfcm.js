let FCM = require('fcm-node')
let serverKey = require('./firebase-key.json'); //put the generated private key path here    
let fcm = new FCM(serverKey);
let message = { //this may vary according to the message type (single recipient, multicast, topic, et cetera)
    "to": "/topics/all-content",
    "notification": {
        "title": "Novo conteúdo disponivel!",
        "body": `Para acessá-lo entre no App clicando aqui!`
    }
}
console.log(message);
fcm.send(message, function(err, response)
{
    if (err) {
        console.log("Something has gone wrong!", err)
    } else {
        console.log("Successfully sent with response: ", response)
        process.exit();
    }
});