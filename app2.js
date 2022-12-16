// Require packages and define server related variables
const express = require("express");
const lineNotify = require('express-line-notify');
const ngrok = require('ngrok');

const config = {
    clientId: 'cvzrkagqcr5HcJqLudSQQP',
    clientSecret: 'INa7lyT6HKce3ZOgVBq8wfbNS4fg7uPFN9vVCErWRHa',
  }

const app = express();
app.use(
    '/linenotify',
    lineNotify(config),
    function(req, res) {
        const token = req['line-notify-access-token'];
        const data = req['context']    //data will be { userid: "123", email: "456" }
        console.log('token:', token);
        console.log('data', data);
    });
const port = 8000;

app.get("/", (req, res) => {
  res.send("This is Express Web App");
});

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
