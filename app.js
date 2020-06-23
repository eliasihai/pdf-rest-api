/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 4041;

//Import Routes
const pdfsRoute = require('./routes/pdf')
const usersRoute = require('./routes/user')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/pdfs', pdfsRoute);
app.use('/users', usersRoute);

// const users = [{ name: "Tony", email: "tony@mail.com" }];

// console.log(typeof(users));
// let pdfs = fs.readFileSync("D:/Node JS/testbase64/testbase64/pdf.json", "utf8");
// const objPDFS = JSON.parse(pdfs);
// console.log(typeof(objPDFS));

app.get("/", (req, res) => {
  res.send("Your Express App");
});

// Listen to the server
app.listen(port, () => { 
  console.log(`Server is running on port: ${port}`);
});
