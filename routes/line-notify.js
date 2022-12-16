import express from "express";
import axios from "axios";
const router = express.Router();

var redirect_uri = "https://130e-101-12-18-64.ngrok.io";

router.get("/", function (req, res, next) {
  console.log("user get /redirect");
  const state = "state";
  res.redirect(
    `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=cvzrkagqcr5HcJqLudSQQP&redirect_uri=https://130e-101-12-18-64.ngrok.io/v1/callback&scope=notify&state=${state}`
  );
});

router.get("/callback", async function (req, res, next) {
  console.log("user get /callback");
  console.log(req.query);
  try {
    const oauthToken = await axios
      .post(
        `https://notify-bot.line.me/oauth/token?grant_type=authorization_code&code=${req.query.code}&redirect_uri=https://130e-101-12-18-64.ngrok.io&client_id=cvzrkagqcr5HcJqLudSQQP&client_secret=INa7lyT6HKce3ZOgVBq8wfbNS4fg7uPFN9vVCErWRHa`
      )
      .then((r) => {
        oauthToken = r;
      });
    console.log("oauthToken", oauthToken);
  } catch (e) {
    console.log(e);
    next(e);
  }
  return res.send(oauthToken);
});

export default router;
