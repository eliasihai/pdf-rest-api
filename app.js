/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const secure = require("express-force-https");
const app = express();
const https = require("https");
const fs = require("fs");
const port = process.env.PORT || 4041;

const key = fs.readFileSync("./key.pem");
const cert = fs.readFileSync("./cert.pem");
const server = https.createServer({ key: key, cert: cert }, app);
// const options = {
//   key: fs.readFileSync("key.pem"),
//   cert: fs.readFileSync("cert.pem"),
// };

//Import Routes
const pdfsRoute = require("./routes/pdf");
const usersRoute = require("./routes/user");
// Cors
app.use(cors());
// app.use(secure);

app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));
app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use("/pdfs", pdfsRoute);
// app.use("/users", usersRoute);

app.get("/", (req, res) => {
  res.send("Your Express App");
});

// app.get('/', (req, res) => { res.send('this is an secure server') });
// server.listen(3001, () => { console.log('listening on 3001') });

// Listen to the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
