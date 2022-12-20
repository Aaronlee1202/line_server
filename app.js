import express from "express";
import cors from "cors";
import lineNotifyRouter from "./routes/line-notify.js";
import indexRouter from "./routes/index.js";
// import "./db/index.js";

const app = express();
app.use(cors("*"));
const port = 8000;

// app.use("/login/line_notify", lineNotifyRouter);

app.get("/", (req, res) => {
  console.log("/", req.query);
  if (req.query.code) {
    const { code, state } = req.query;
    const URL = "https://3c48-118-163-94-193.ngrok.io";
    res.redirect(`${URL}/v1/callback?code=${code}&tag=${state}`);
  } else {
    res.send("This is Express Web App");
  }
});

// API
app.use("/v1", indexRouter);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
