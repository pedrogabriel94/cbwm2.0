const express = require('express');
const venom = require('venom-bot');
const app = express();
var clientGlobal = {};

app.use(express.json({ limit: '5mb' }));

app.post('/sendMessage', async (req, res) => {
    sendMessage(req.body);
});

app.get('/integrity', (req, res) => {
    res.send('Application is live');
});

app.listen(9000, () => {
    console.log('Servidor rodando na porta 3000');
});

venom.create({
    session: 'session-name', //name of session
    headless: true, // Executa o navegador visível
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
}).then((client) => 
    receiveMessage(client)
).catch((erro) => {
    console.log(erro);
});

function receiveMessage(client) {
    clientGlobal = client;
    client.onMessage((message) => {
        let objReceive = {
            "phone": message.from,
            "text": {
                "message": message.body
            },
            "senderName": "nome do usuário"
        }

        fetch(`localhost:3000/recive-message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(objReceive),
        }).then((response) => response.json()).then((data) => {
            console.log(data);
        });
    });
}

function sendMessage(objectMessage){
    client.sendText(objectMessage.phone, objectMessage.message).then((result) => {

    }).catch((erro) => {
        console.log(erro)
    });
}

