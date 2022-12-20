import express from "express";
import axios from "axios";
import qs from "qs";
const router = express.Router();

var redirect_URL = "https://3c48-118-163-94-193.ngrok.io/";
var lineBot_URL = "https://notify-bot.line.me";
var lineApi_URL = "https://notify-api.line.me";

let data = {
  grant_type: "authorization_code",
  code: "",
  redirect_uri: `${redirect_URL}`,
  client_id: "pUWtbhwF8uF8KIvRZC17A1",
  client_secret: "i7H83T9nXXxlEzekLAjIxlTmAIaDywmL5rnUNLUXgBV",
};
// Users Token
let token = { aaron: "sI1LxakQ3M5BXk22a5yV9KwngTZxzvrJ5LTAWcuN2VJ" };

router.get("/login/line_notify", function (req, res, next) {
  console.log("line_notify");
  const { tag } = req.query;
  res.redirect(
    `${lineBot_URL}/oauth/authorize?response_type=code&client_id=pUWtbhwF8uF8KIvRZC17A1&redirect_uri=${redirect_URL}&scope=notify&state=${tag}`
  );
});

router.get("/callback", async function (req, res, next) {
  console.log("/callback");
  const { code, tag } = req.query;
  data.code = code;
  console.log("code:", code, "tag:", tag);
  try {
    const oauthToken = await axios.post(
      `${lineBot_URL}/oauth/token`,
      qs.stringify(data),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    token[tag] = oauthToken.data.access_token;
    console.log("token:", token);

    res.send("this is callback");
    return null;
  } catch (e) {
    console.log(e);
  }
});

router.get("/emitNotify", async function (req, res, next) {
  let text = req.query.text || "No Data";
  try {
    const status = await axios.post(
      `${lineApi_URL}/api/notify`,
      { message: text },
      {
        headers: {
          Authorization: `Bearer ${token.aaron}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
    console.log("system emit Notify", status.status);
    res.send("success emit !!!");
  } catch (e) {
    console.log(e);
  }
});

router.get("/revoke", async function (req, res, next) {
  try {
    const status = await axios.post(`${lineApi_URL}/api/revoke`, null, {
      headers: {
        Authorization: `Bearer ${token[3]}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log("revoke status", status);
    res.redirect(`${redirect_URL}`);
  } catch (e) {
    console.log(e);
    res.redirect(`${redirect_URL}`);
  }
});

export default router;
