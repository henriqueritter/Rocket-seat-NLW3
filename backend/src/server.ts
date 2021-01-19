import express from "express";
import "./database/connection";

//para realizar o vinculo entre o model e a tabela no banco
import { getRepository } from "typeorm";
import Orphanage from "./models/Orphanage";

const app = express();

//faz com que o express reconheca JSON
app.use(express.json());

// ASYNC por causa do await do save do repositorio
app.post("/orphanages", async (request, response) => {
  //pega os dados do orfanato do request body
  const {
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  } = request.body;

  //transforma o orphanagesRepository em uma instancia que contem
  // todos os metodos para criar, deletar etc.. dentro da tabela/model Orphanage
  const orphanagesRepository = getRepository(Orphanage);

  //cria mas nao salva no banco
  const orphanage = orphanagesRepository.create({
    name,
    latitude,
    longitude,
    about,
    instructions,
    opening_hours,
    open_on_weekends,
  });

  //FUNCAO ASYNC!!!
  //salva(commita) o objeto repositorio criado na aplicacao no banco
  await orphanagesRepository.save(orphanage);

  return response.json({ mess: "hello world" });
});

app.listen(3333);
