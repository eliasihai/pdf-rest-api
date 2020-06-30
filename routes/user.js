// /** @format */

// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// // const path = require("path");
// const users = [{ name: "Tony", email: "tony@mail.com" }];

// let ppp = fs.readFileSync("D:/Node JS/pdf-rest-api/routes/nice1.json", "utf8");
// // let nicePDF = JSON.parse(ppp);
// //GETS BACK ALL THE USERES
// router.get("/", async (req, res) => {
//   if (ppp === "") {
//     res.send("json is null");
//   }
//   res.json(ppp);
// });
// //GETS BACK SPECIFIC USER
// router.get("/getUserByName/:name", (req, res) => {
//   const { name } = req.params;
//   const user = users.filter((user) => user.name === name)[0];
//   res.json({ ok: true, user: user });
//   //   res.json({ ok: true, pdfs });
// });

// //SUBMITS A USER
// router.post("/postUser/adduser", (req, res) => {
//   const { name, email } = req.body;
//   if (name && email) {
//     users.push({ name, email });
//     res.json({ ok: true, users });
//   }
// });

// // POSTS METHODS

// router.post("/postUser/user", function (req, res) {
//   let textArr = [];
//   let id = req.body.id;
//   let pdfName = req.body.pdfName;
//   textArr = req.body.textArr;
//   let arr = [];
//   arr.push({ id: id, pdfName: pdfName, textArr });
//   if (ppp === "") {
//     fs.writeFileSync(
//       __dirname + "/nice1.json",
//       JSON.stringify(arr),
//       "utf-8",
//       function (err, data) {
//         if (err) return console.log(err);
//         console.log(data);
//       },
//     );
//     res.send("Writed");
//     res.json({ ok: true, arr });
//   } else {
//     fs.appendFileSync(
//       __dirname + "/nice1.json",
//       JSON.stringify({ id: id, pdfName: pdfName, textArr }),
//       "utf-8",
//       function (err, data) {
//         if (err) return console.log(err);
//         console.log(data);
//       },
//     );
//     res.send("Append");
//     res.json({ ok: true, arr });
//   }
// });

// router.delete("/deleteUser/deleteByID/:id", function (req, res) {
//   const { id } = req.params;
//   // const pdfID = ppp.filter((pdfID) => pdfID.id === id)[0];
//   // if (pdfID != undefined) {
//   delete id;
//   res.json({ ok: true });
//   // } else {
//   // res.status(401).send(pdfID);
//   // }
// });

// module.exports = router;
