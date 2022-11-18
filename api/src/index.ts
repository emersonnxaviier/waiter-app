import path from "path";
import express from "express";
import mongoose from "mongoose";
import { router } from "./router";

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const app = express();
    const PORT = 3001;

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    ); // usado para informar que nessa rota (http://localhost:3001/uploads/nomeimage.png) os arquivos são estaticos, assim retornando a imagem em si.

    app.use(express.json()); // obrigatorio vir antes das rotas
    app.use(router);

    app.listen(PORT, () => {
      console.log(`SERVER IS RUNNING IN PORT: ${PORT}`);
    });
  })
  .catch(() => console.log("erro ao conectar ao mongo"));
