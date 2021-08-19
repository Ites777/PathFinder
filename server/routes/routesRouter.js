var express = require("express");
var router = express.Router();
const { Routes, Reference } = require("../db/models");
const multer = require("multer");
const { Photos, Reviews } = require("../db/models");
const { v4: uuidv4 } = require("uuid");

const DIR = "./public/img";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

var upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router
  .route("/routes")
  .get(async (req, res, next) => {
    const routes = await Routes.findAll();
    res.json(routes);
  })
  .post(upload.single("333"), async (req, res) => {
    console.log(123);
    // console.log(req.file);
    const url = req.protocol + "://" + req.get("host");
    // console.log(req.body);
    const { userId } = req.body;
    // req.body.url = url + '/img/' + req.file.filename
    console.log(req.body);
    try {
      if (req.body) {
        const newRoute = await Routes.create({
          user_id: req.body.user_id,
          routes_id: req.body.routes_id,
          title: req.body.title,
          length: req.body.length,
          difficulty: req.body.difficulty,
          address: req.body.address,
          description: req.body.description,
          lat: req.body.lat,
          lng: req.body.lng,
          url: url + "/img/" + req.file.filename,
        });
        const id = newRoute.dataValues.id;
        const newReference = await Reference.create({
          user_id: userId,
          routes_id: id,
          creator: true,
        });
        res.status(200).json(newRoute);
      }
    } catch (err) {
      res.status(500);
    }
  })
  .patch(async (req, res) => {
    const { id, title, difficulty, address, length, description, lat, lng } =
      req.body;
    try {
      if (req.body) {
        const updatedRoute = await Routes.findOne({
          where: {
            id,
          },
        });
        updatedRoute.update({
          title,
          difficulty,
          address,
          length,
          description,
          lat,
          lng,
        });
        res.status(200).json(updatedRoute);
      }
    } catch (err) {
      res.status(500);
    }
  })
  .delete(async (req, res) => {
    try {
      if (req.body.id) {
        const routeToDelete = await Routes.findOne({
          where: {
            id: req.body.id,
          },
        });
        routeToDelete.destroy();
        res.sendStatus(200);
      }
    } catch (err) {
      res.status(500);
    }
  });

// Карточки созданные пользователем
router.route("/routes/mycards").put(async (req, res, next) => {
  try {
    const references = await Reference.findAll({
      where: {
        user_id: req.body.userId,
        creator: true,
      },
    });
    const idArr = references.map((e) => e.routes_id);
    const myCards = await Routes.findAll({
      where: {
        id: idArr,
      },
    });
    res.status(200).json(myCards);
  } catch (err) {
    res.status(500);
  }
});

router.post("/one", async (req, res) => {
  const { id } = req.body;
  const result = await Routes.findOne({ where: { id: id } });
  res.status(200).json(result);
});
router.post("/background", (req, res) => {
  res.status(200).send({ url: "/img/IMG_0507.png" });
});
router.post("/avatar", async (req, res, next) => {});
module.exports = router;
