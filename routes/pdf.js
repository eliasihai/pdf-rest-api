/** @format */

const express = require("express");
const router = express.Router();
const fs = require("fs");

let pdfs = fs.readFileSync("D:/Node JS/testbase64/testbase64/pdf.json", "utf8");
let objPDFS = JSON.parse(pdfs);

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
