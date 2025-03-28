const { sql, poolPromise } = require("../db");

const getDestinos = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query("SELECT * FROM destinos");
    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener los destinos" });
  }
};

const getDestinoById = async (req, res) => {
  try {
    const pool = await poolPromise;
    const { id } = req.params;
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM destinos WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: "Destino no encontrado" });
    }

    res.json(result.recordset[0]);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener el destino" });
  }
};

module.exports = { getDestinos, getDestinoById };
