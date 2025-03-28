const express = require("express");
const router = express.Router();
const { getViajes, getviajesById } = require("../controllers/obtenerviajescontroller");

router.get("/viajes/todo", getViajes);
router.get("/viajes/todo/:id", getviajesById);

module.exports = router;
