import express from "express";
import axios from "axios";
import qs from "qs";
const router = express.Router();

var redirect_URL = "https://d45f-118-163-94-193.ngrok.io";

let data = {
  grant_type: "authorization_code",
  code: "",
  redirect_uri: `${redirect_URL}/v1/getCode`,
  client_id: "pUWtbhwF8uF8KIvRZC17A1",
  client_secret: "i7H83T9nXXxlEzekLAjIxlTmAIaDywmL5rnUNLUXgBV",
};
let token = [
  "QTRIM3gr3309dR57XaYeewtLecCmeaEvdywAgodForp",
  "Sfzo4qODHPDqEewyMDzQ1LBXwPoPHpe2CSc4QG0xeVH",
  "ZhTS48ow0EhbV7LLif4vlaX24DAqzi1JMdvtgHm0eMm",
];


router.get("/login/line_notify", function (req, res, next) {
  console.log("user get /redirect");
  const state = "state";
  res.redirect(
    `https://notify-bot.line.me/oauth/authorize?response_type=code&client_id=pUWtbhwF8uF8KIvRZC17A1&redirect_uri=${redirect_URL}/v1/getCode&scope=notify&state=${state}`
  );
});

router.get("/getCode", function (req, res, next) {
  console.log("get code");
  console.log(req.query);
  data.code = req.query.code;
  res.redirect(`${redirect_URL}/v1/callback`);
});

router.get("/callback", async function (req, res, next) {
  console.log("user get /callback");
  console.log(data);
  res.send("this is callback");
  //   data.code = req.query.code;
  try {
    const oauthToken = await axios.post(
      `https://notify-bot.line.me/oauth/token`,
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("oauthToken", oauthToken.data);
    token.push(oauthToken.data.access_token);
    return null;
  } catch (e) {
    console.log(e);
  }
});

router.get("/emitNotify", async function (req, res, next) {
  let text = req.query.text || "No Data";
  try {
    const status = await axios.post(
      "https://notify-api.line.me/api/notify",
      { message: text },
      {
        headers: {
          Authorization: `Bearer ${token[0]}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("system emit Notify", status);
    res.send("success emit !!!");
  } catch (e) {
    console.log(e);
  }
});

router.get("/revoke", async function (req, res, next) {
  try {
    const status = await axios.post(
      "https://notify-api.line.me/api/revoke",
      null,
      {
        headers: {
          Authorization: `Bearer ${token[1]}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("revoke status", status);
    res.redirect(`${redirect_URL}`);
  } catch (e) {
    console.log(e);
    res.redirect(`${redirect_URL}`);
  }
});

export default router;
