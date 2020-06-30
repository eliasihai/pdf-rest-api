/** @format */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const { ok } = require("assert");
const { json } = require("body-parser");
const util = require("util");
const { error } = require("console");
const { type } = require("os");

let pdfs = fs.readFileSync("D:/Node JS/testbase64/testbase64/pdf.json", "utf8");
let objPDFS = JSON.parse(pdfs);
let directoryPath = path.join(__dirname + "/../");
console.log(directoryPath);
router.get("/", (_, res) => {
  res.json({ ok: true, objPDFS });
});

router.get("/getByName/:name", (req, res) => {
  const { name } = req.params;
  const pdfName = objPDFS.filter((pdfName) => pdfName.name === name)[0];
  if (pdfName != undefined) {
    res.json({ ok: true, pdf_Name: pdfName });
  } else {
    res.status(401).send("und  " + pdfName);
  }
});

router.get("/getByID/:id", (req, res) => {
  const { id } = req.params;
  const pdfID = objPDFS.filter((pID) => pID.id === parseInt(id))[0];
  if (pdfID != undefined) {
    res.json({ ok: true, pdf_ID: pdfID });
  } else {
    res.status(401).send(pdfID);
  }
});

router.get("/getImg/images1", (req, res) => {
  const images_pos_0 = objPDFS.map((item) => {
    const container = {};
    container.id = item.id;
    container.name = item.name;
    container.img = item.imagesBase64[0];

    return container;
  });
  if (images_pos_0 != undefined) {
    res.json({ ok: true, images_pos_0 });
  } else {
    res.status(401).send(images_pos_0);
  }
});

router.get("/getImgLazy/:id", (req, res) => {
  let { id } = req.params;
  let numInt = parseInt(id);
  let total = parseInt(numInt + 5);
  const lazy_image_pos_0 = objPDFS.slice(numInt, total).map((item) => {
    const container = {};
    container.id = item.id;
    container.name = item.name;
    container.img = item.imagesBase64[0];

    return container;
  });
  if (lazy_image_pos_0 != undefined) {
    res.json({ ok: true, imgs_lazy: lazy_image_pos_0 });
  } else {
    res.status(401).send(lazy_image_pos_0);
  }
});

router.get("/getNumOfPDFS/:id", (req, res) => {
  let { id } = req.params;
  let numInt = parseInt(id);
  let total = parseInt(numInt + 5);
  const pdfID = objPDFS.filter((pID) => pID.id === parseInt(id))[0];
  const arr = [];
  arr.push(pdfID);
  const images_lazy = pdfID.imagesBase64.slice(numInt, total).map((item) => {
    const container = [];
    container.push(item);
    return container;
  });

  if (pdfID != undefined) {
    res.json({ ok: true, pdfID: images_lazy });
  } else {
    res.status(401).send("none");
  }
});

router.get("/getImg/test", (req, res) => {
  const imarr = [
    {
      id: 0,
      images: ["a.png", "b.png", "c.png"],
    },
    {
      id: 1,
      images: ["e.png", "f.png", "g.png"],
    },
  ];
  const a = imarr.map((item) => {
    const container = {};
    container[item.id] = item.images[0];
    container.age = 10;
    return container;
  });
  res.json({ ok: true, a });
  // if (imgs != undefined) {
  //   res.json({ ok: true, id: ids });
  // } else {
  //   res.status(401).send(img);
  // }
});

//POSTS METHODS

router.post("/postPDF/pdf", function (req, res) {
  let textArr = [];
  let id = req.body.id;
  let pdfName = req.body.pdfName;
  textArr = req.body.textArr;
  let arr = [];
  arr.push({ id: id, pdfName: pdfName, textArr });
  fs.writeFileSync(
    __dirname + "/" + pdfName + ".json",
    JSON.stringify(arr),
    "utf-8",
    function (err, data) {
      if (err) return console.log(err);
      console.log(data);
    },
  );

  res.send(arr);
});
//
router.post("/get/textAnnotation/:name/:obj", function (req, res) {
  let { name } = req.params;
  let { obj } = req.params;
  fs.writeFileSync(
    directoryPath + "/" + name + ".json",
    JSON.stringify(name + obj),
    // util.inspect(newArr),
    "utf-8",
    function (err, data) {
      if (err) return console.log(err);
      console.log(data);
    },
  );
  res.json({ ok: true, name: name, obj: obj });
});

router.post("/post/moveAndDel/:id", function (req, res) {
  let { id } = req.params;
  const pdfID = objPDFS.filter((pID) => pID.id === parseInt(id))[0];
  if (!fs.existsSync(directoryPath + "/savedPDFS.json")) {
    let result = [];
    fs.writeFile(
      directoryPath + "/savedPDFS.json",
      result,
      // util.inspect(newArr),
      function (err, file) {
        if (err) return console.log(err);
        res.send("File has been created");
      },
    );
  }
  if (pdfID != undefined) {
    fs.appendFileSync(
      directoryPath + "/savedPDFS.json",
      JSON.stringify({ pdfID }),
      // util.inspect({ id: id, name: name, textArr }),
      "utf-8",
      function (err, data) {
        if (err) return console.log(err);
        console.log(data);
      },
    );
    res.json({ ok: true, pdf_ID: pdfID });
  } else {
    res.status(401).send(pdfID);
  }
});

// router.post("/post/createANDdelete/:id/:name/:arr", function (req, res) {
//   let { arr } = req.params;
//   let { id } = req.params;
//   let { name } = req.params;
//   if (fs.existsSync(directoryPath + "/savedPDFS.json")) {
//     fs.readFile(directoryPath + "/savedPDFS.json", function (err, data) {
//       if (Object.keys(data).length === 0) {
//         // let firstArr = [];
//         // firstArr.push({ id: id, name: name, arr });
//         fs.writeFileSync(
//           directoryPath + "/savedPDFS.json",
//           JSON.stringify({ id: id, name: name, arr }),
//           // util.inspect({ id: id, name: name, textArr }),
//           "utf-8",
//           function (err, data) {
//             if (err) return console.log(err);
//             console.log(data);
//           },
//         );
//         res.json({ ok: true, id: id, name: name, arr });
//       } else {
//         // res.send(data);
//         let arrJson = [JSON.parse(data)];
//         arrJson.push({ id: id, name: name, arr });
//         fs.appendFile(
//           directoryPath + "/savedPDFS.json",
//           JSON.stringify(arrJson),
//           // util.inspect({ id: id, name: name, textArr }),
//           "utf-8",
//           function (err, data) {
//             if (err) return console.log(err);
//             console.log(data);
//           },
//         );
//         res.json({ ok: true, arrJson: arrJson });
//       }
//     });
//   } else {
//     let result = [];

//     fs.writeFile(
//       directoryPath + "/savedPDFS.json",
//       result,
//       // util.inspect(newArr),
//       function (err, file) {
//         if (err) return console.log(err);
//         res.send("File has been created");
//       },
//     );
//   }
// else {
//   let arr1 = [];
//   arr1.push(arr);
//   let arrLittleToJosn = JSON.parse(arr1)
//   fs.writeFileSync(
//     directoryPath + "/savedPDFS.json",
//     JSON.stringify({ id: id, name: name, arr: arrLittleToJosn }),
//     // util.inspect({ id: id, name: name, textArr }),
//     "utf-8",
//     function (err, data) {
//       if (err) return console.log(err);
//       console.log(data);
//     },
//   );
//   res.json({ id, name, arr });
//   res.end();
// }
// });
// DELETE METHOD

router.delete("/delete/deleteByID/:id", function (req, res) {
  let pdfToDel = fs.readFileSync(
    "D:/Node JS/testbase64/testbase64/pdf.json",
    "utf8",
  );
  let objDelPDFS = JSON.parse(pdfs);

  const { id } = req.params;
  let newJson = { pdfs: objDelPDFS };
  let allpdfs = newJson.pdfs.filter((pdf) => pdf.id !== parseInt(id));

  // arr.push(allpdfs)
  let jsonFile = fs.writeFileSync(
    "D:/Node JS/testbase64/testbase64/pdf.json",
    JSON.stringify(allpdfs, null, 2),
    "utf-8",
    function (err, data) {
      if (err) return console.log(err);
      console.log(data);
    },
  );
  // res.json(allpdfs);
  res.json({ ok: true, jsonFile: objDelPDFS });
});
module.exports = router;
