const express = require('express');
const serveStatic = require('serve-static');
const path = require('path');
// const cors = require('cors')
const app = express();

app.use(serveStatic(path.join(__dirname, 'dist')));

// app.use(cors());



// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`App is listening on port: ${port}`);