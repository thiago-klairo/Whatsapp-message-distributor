const router = require("express").Router();
const { send } = require("process");
const { pipeline, Readable, Transform } = require("stream");
const { promisify } = require("util");
const { createWriteStream } = require("fs")
const { sendMessage } = require("../whatsapp")

router.post("/sendMessage", async (req, res) => {
    const { message } = req.body;
    const { phone } = req.body;

    const pipelineAsync = promisify(pipeline);
    {
        const readableStrem = Readable({
            read() {
                phone.forEach(function (number) {
                    const data = JSON.stringify(number);
                    readableStrem.push(data)
                })
                readableStrem.push(null)
            }
        });

        const sendMessageMap = Transform({
            transform(chunk, enconding, cb) {
                const data = JSON.parse(chunk);
                const result = `${data}\n`
                sendMessage(data, message)
                cb(null, result)
            }

        })
        await pipelineAsync(
            readableStrem,
            sendMessageMap,
            createWriteStream("my.csv")
        )
    }
})

module.exports = router;