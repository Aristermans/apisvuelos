const express = require("express");
const router = express.Router();
const { compararPrecios } = require("../controllers/viajesController");

router.get("/viajes/comparar", compararPrecios);

module.exports = router;
