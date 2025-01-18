const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const cors = require("cors");
const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors({ origin: true })); // enable origin cors

app.use(serveStatic(path.join(__dirname, "dist")));

app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.options("*", cors());
app.use(
  cors({
    origin: ["*"],
    credentials: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  app.use(cors());
  next();
});

// const port = process.env.PORT || 8080;
// app.listen(port);

const server = app.listen(process.env.PORT || 8080, () => {
  const port = server.address().port;
  console.log(`Express is working on port ${port}`);
});
