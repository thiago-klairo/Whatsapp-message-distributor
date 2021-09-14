require("dotenv").config();

const fs = require("fs")
const qrcode = require("qrcode-terminal");
const { Client } = require("whatsapp-web.js");
const SESSION_PATH = process.env.SESSION_FILE_PATH;

let sessionConfig;
if (fs.existsSync(SESSION_PATH)) {
    sessionConfig = require(SESSION_PATH)
}
let client = new Client({

    session: sessionConfig
})


client.on("qr", qr => {
    qrcode.generate(qr, { small: true });
})

client.on("authenticated", (session) => {
    console.log("authenticated")
    sessionConfig = session
    fs.writeFile(SESSION_PATH, JSON.stringify(session), function (err) {
        if (err) {
            console.log(err);
        }
    })
})

client.on("auth_failure", (session) => {
    sessionConfig = "";
    console.log(session, "não foi possível logar")
    fs.writeFile(SESSION_PATH, JSON.stringify(sessionConfig), function (err) {
        if (err) {
            console.log(err);
        }
    })
})

client.on("ready", () => {
    console.log("funcionando ")
})


client.initialize();

const sendMessage = (number = null, text = null) => {
    const phone = `55${number}@c.us`;
    const message = text || "Desculpe, algo deu errado ";
    try {
        client.sendMessage(phone, message);
        console.log({
            phone,
            message
        })
    } catch (error) {
        console.log(error)
    }

}

module.exports = {
    sendMessage
}

