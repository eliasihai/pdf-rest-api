/** @format */

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4041;

//Import Routes
const pdfsRoute = require("./routes/pdf");
const usersRoute = require("./routes/user");
// Cors
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/pdfs", pdfsRoute);
// app.use("/users", usersRoute);


app.get("/", (req, res) => {
  res.send("Your Express App");
});

// Listen to the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
