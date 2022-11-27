import path from "path";
import http from "http";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { router } from "./router";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

export const io = new Server(server);

mongoose
  .connect("mongodb://localhost:27017")
  .then(() => {
    const PORT = 3001;

    io.on("conect", () => {});

    app.use(
      "/uploads",
      express.static(path.resolve(__dirname, "..", "uploads"))
    ); // usado para informar que nessa rota (http://localhost:3001/uploads/nomeimage.png) os arquivos são estaticos, assim retornando a imagem em si.

    app.use(express.json()); // obrigatorio vir antes das rotas
    app.use(cors());
    app.use(router);

    server.listen(PORT, () => {
      console.log(`SERVER IS RUNNING IN PORT: ${PORT}`);
    });
  })
  .catch(() => console.log("erro ao conectar ao mongo"));
