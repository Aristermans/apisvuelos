const express = require("express");
const router = express.Router();
const { obtenerDestinosConDetalles } = require("../controllers/obtenerviajes");

router.get("/detalles", obtenerDestinosConDetalles);

module.exports = router;
