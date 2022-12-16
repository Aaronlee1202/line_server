import express from "express";
import cors from "cors";
import lineNotifyRouter from "./routes/line-notify.js";
import indexRouter from "./routes/index.js";

const app = express();
app.use(cors("*"));
const port = 8000;

// app.use("/login/line_notify", lineNotifyRouter);

app.get("/", (req, res) => {
  console.log("user get /");
  res.send("This is Express Web App");
  //   if (req.query.code) {
  //     res.redirect(`http://2e08-101-10-6-153.ngrok.io/v1/callback`)
  //   }
});

// API
app.use("/v1", indexRouter);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is running on http://localhost:${port}`);
});
