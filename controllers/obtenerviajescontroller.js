const { sql, poolPromise } = require("../db");

// Obtener todos los viajes
const getViajes = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM viajes");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los viajes" });
  }
};

// Obtener un viaje por ID
const getviajesById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM viajes WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Viaje no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el viaje" });
  }
};

module.exports = { getViajes, getviajesById };
