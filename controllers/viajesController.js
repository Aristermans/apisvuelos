const { sql, poolPromise } = require("../db");

const compararPrecios = async (req, res) => {
  try {
    const { destino1, destino2 } = req.query;
    if (!destino1 || !destino2) {
      return res.status(400).json({ error: "Se requieren dos destinos para comparar." });
    }

    const pool = await poolPromise;

    const query = `
      SELECT destino, AVG(precio) AS precio_promedio
      FROM viajes
      WHERE destino IN (@destino1, @destino2)
      GROUP BY destino
    `;

    const result = await pool
      .request()
      .input("destino1", sql.VarChar, destino1)
      .input("destino2", sql.VarChar, destino2)
      .query(query);

    res.json(result.recordset);
  } catch (err) {
    res.status(500).json({ error: "Error al comparar los precios de los viajes." });
  }
};

module.exports = { compararPrecios };
