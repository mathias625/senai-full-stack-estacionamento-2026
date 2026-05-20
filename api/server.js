require('dotenv').config();
const express = require('express');
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const carroRoutes = require("./src/routes/carro.routes");
app.use("/carro", carroRoutes);

const alojamentoRoutes = require("./src/routes/alojamento.routes");
app.use("/alojamento", alojamentoRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});