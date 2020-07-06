/** @format */

const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const https = require("https");

const options = {
  key: fs.readFileSync("key.pem"),
  cert: fs.readFileSync("cert.pem"),
};

let pdfs = fs.readFileSync("D:/Node JS/testbase64/testbase64/pdf.json", "utf8");
let objPDFS = JSON.parse(pdfs);
let directoryPath = path.join(__dirname + "/../");
console.log(directoryPath);

//Get all pdfs
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
    if (Object.keys(objPDFS).length === 0) {
      fs.writeFileSync(
        directoryPath + "/savedPDFS.json",
        JSON.stringify({ pdfID }),
        // util.inspect({ id: id, name: name, textArr }),
        "utf-8",
        function (err, data) {
          if (err) return console.log(err);
          console.log(data);
        },
      );
      res.json({ ok: true, pdfID });
    } else {
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
    }
  } else {
    res.status(401).send(pdfID);
  }
});

router.post("/posts/newJson/:id", function (req, res) {
  let newArr = [];
  let newPDFSJSON;
  let newPDFS;
  let { id } = req.params;
  const pdfID = objPDFS.filter((pID) => pID.id === parseInt(id))[0];
  if (pdfID === undefined) {
    res.send("ID is not exist");
    res.end();
  } else {
    // Creating a new file if the file not exist.
    if (!fs.existsSync(directoryPath + "/savedPDFS.json")) {
      let result = [];
      fs.writeFile(
        directoryPath + "/savedPDFS.json",
        result,
        // util.inspect(newArr),
        function (err, file) {
          if (err) return res.send(err);
          res.send("File has been created");
        },
      );
    }
    newPDFS = fs.readFileSync(directoryPath + "/savedPDFS.json", "utf8");
    //If savedPDFS is not empty, copy all the objects to him.
    if (newPDFS == 0) {
      newArr.push(pdfID);
      fs.writeFileSync(
        directoryPath + "/savedPDFS.json",
        JSON.stringify(newArr),
        // util.inspect(pdfs),
        "utf-8",
        function (err, data) {
          if (err) return console.log(err);
          console.log(data);
        },
      );
      newPDFS = fs.readFileSync(directoryPath + "/savedPDFS.json", "utf8");
      newPDFSJSON = JSON.parse(newPDFS);
      // res.sendStatus(200)
      try {
        res.json({ ok: true, newPDFSJSON });
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    } else {
      newPDFS = fs.readFileSync(directoryPath + "/savedPDFS.json", "utf8");
      newPDFSJSON = JSON.parse(newPDFS);
      newPDFSJSON.push(pdfID);
      fs.writeFileSync(
        directoryPath + "/savedPDFS.json",
        JSON.stringify(newPDFSJSON),
        // util.inspect({ id: id, name: name, textArr }),
        "utf-8",
        function (err, data) {
          if (err) return console.log(err);
          console.log(data);
        },
      );
      newPDFS = fs.readFileSync(directoryPath + "/savedPDFS.json", "utf8");
      newPDFSJSON = JSON.parse(newPDFS);
      try {
        res.json({ ok: true, newPDFSJSON });
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }
  }
});
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
