const {nodeMailer} = require("../mailer/nodeMailer");
module.exports = {
    Send: async (req, res) => {
        await nodeMailer();
        res.send("OK");
    },
};