/** @format */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const users = [{ name: "Tony", email: "tony@mail.com" }];

//GETS BACK ALL THE USERES
router.get("/", async (req, res) => {
  res.json(users);
});
//GETS BACK SPECIFIC USER
router.get("/getUserByName/:name", (req, res) => {
  const { name } = req.params;
  const user = users.filter((user) => user.name === name)[0];
  res.json({ ok: true, user: user });
  //   res.json({ ok: true, pdfs });
});

//SUBMITS A USER
router.post("/postUser/adduser", (req, res) => {
  const { name, email } = req.body;
  if (name && email) {
    users.push({ name, email });
    res.json({ ok: true, users });
  }
});

// POSTS METHODS

router.post("/postUser/user", function (req, res) {
  let textArr=[];
  let id = req.body.id;
  let pdfName = req.body.pdfName;
  textArr = req.body.textArr;
  let arr = [];
  arr.push({ id: id, pdfName: pdfName, textArr});
  fs.writeFileSync(
    __dirname+"/" + pdfName + ".json",
    JSON.stringify(arr),
    "utf-8",
    function (err, data) {
      if (err) return console.log(err);
      console.log(data);
    },
  );

  res.send(arr);
});

module.exports = router;
