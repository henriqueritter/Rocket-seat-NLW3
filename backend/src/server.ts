import express from "express";
import "./database/connection";

import routes from "./routes";

const app = express();

//faz com que o express reconheca JSON
app.use(express.json());

//importa e utiliza as rotas que estao no outro arquivo
app.use(routes);

app.listen(3333);
