const express = require("express");
const cors = require("cors");
require("dotenv").config();
const destinosRoutes = require("./routes/destinos");
const viajesRoutes = require("./routes/viajes");
const obtenerRoutes = require("./routes/obtenerviajes")
const obtenertodoRoutes = require("./routes/obtenerdestinoviajes");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", destinosRoutes);
app.use("/api", viajesRoutes);
app.use("/api", obtenerRoutes);
app.use("/api", obtenertodoRoutes);



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
