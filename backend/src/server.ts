import path from "path";

import "dotenv/config";

import express from "express";
import cors from "cors";
import "express-async-errors";
//path para chegar a pasta das imagens(uploads)
import "./database/connection";

import routes from "./routes";
//erroHandler criado para tratar dos erros d e requisicao
import errorHandler from "./errors/handler";

const app = express();

//Faz com que outros front ends acessem nossa API de qualquer lugar.
app.use(cors());

//faz com que o express reconheca JSON
app.use(express.json());

//importa e utiliza as rotas que estao no outro arquivo
app.use(routes);

//cria rota para a pasta das imagens
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

//trata os erros de express
app.use(errorHandler);

//porta 3333 do node ou porta do heroku
app.listen(process.env.PORT || 3333);
