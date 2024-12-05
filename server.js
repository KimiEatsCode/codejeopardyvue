const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors({ origin: true })); // enable origin cors

app.use(serveStatic(path.join(__dirname, "dist")));
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

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, PATCH,DELETE, OPTIONS"
//   );
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   next();
// });

const port = process.env.PORT || 8080;
app.listen(port);

console.log(
  `Message from server js on front end for heroku deploy - App is listening on port: ${port}`
);
