const { sql, poolPromise } = require("../db");

const obtenerDestinosConDetalles = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        d.id AS destino_id, d.nombre, d.descripcion, d.pais, d.ciudad, 
        v.id AS viaje_id, v.precio, v.duracion, v.fecha_salida, v.cupos_disponibles,
        i.url_imagen
      FROM destinos d
      LEFT JOIN viajes v ON d.id = v.destino_id
      LEFT JOIN imagenes_destinos i ON d.id = i.destino_id
    `);

    const destinosMap = {};

    result.recordset.forEach(row => {
      const destinoId = row.destino_id;
      
      if (!destinosMap[destinoId]) {
        destinosMap[destinoId] = {
          id: destinoId,
          nombre: row.nombre,
          descripcion: row.descripcion,
          pais: row.pais,
          ciudad: row.ciudad,
          imagenes: [],
          viajes: []
        };
      }

      if (row.url_imagen && !destinosMap[destinoId].imagenes.includes(row.url_imagen)) {
        destinosMap[destinoId].imagenes.push(row.url_imagen);
      }

      if (row.viaje_id) {
        destinosMap[destinoId].viajes.push({
          id: row.viaje_id,
          precio: row.precio,
          duracion: row.duracion,
          fecha_salida: row.fecha_salida,
          cupos_disponibles: row.cupos_disponibles
        });
      }
    });

    res.json(Object.values(destinosMap));
  } catch (err) {
    console.error("Error al obtener destinos con detalles:", err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { obtenerDestinosConDetalles };
