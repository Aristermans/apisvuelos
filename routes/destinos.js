const express = require("express");
const router = express.Router();
const { getDestinos, getDestinoById } = require("../controllers/destinosController");

router.get("/destinos", getDestinos);
router.get("/destinos/:id", getDestinoById);

module.exports = router;
