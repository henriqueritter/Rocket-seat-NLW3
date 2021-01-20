//tipagem do request, response
import { Request, Response } from "express";

//para realizar o vinculo entre o model e a tabela no banco
import { getRepository } from "typeorm";

import orphanageView from "../views/orphanages_view";

import Orphanage from "../models/Orphanage";

//importa o Yup para validar os dados
import * as Yup from "yup";

export default {
  //lista todos os orfanatos
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find({
      relations: ["images"], //busca as images da relacao
    });
    // com condicao ->
    // const orphanages = await orphanagesRepository.find({where});

    return response.status(200).json(orphanageView.renderMany(orphanages));
  },

  //retorna apenas um orfanato
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id, {
      relations: ["images"],
    });

    return response.status(200).json(orphanageView.render(orphanage));
  },
  // ASYNC por causa do await do save do repositorio
  async create(request: Request, response: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = request.body;

    //recupera dados das imagens enviadas, forçamos o tipo da variavel a ser do tipo
    //express.multer.file[] (sendo array) para que o multer nao tenha problemas
    const requestImages = request.files as Express.Multer.File[];

    //pega o nome das imagens para inserir no objeto do orfanato a ser criado
    const images = requestImages.map((image) => {
      return { path: image.filename };
    });

    //transforma o orphanagesRepository em uma instancia que contem
    // todos os metodos para criar, deletar etc.. dentro da tabela/model Orphanage
    const orphanagesRepository = getRepository(Orphanage);

    //reune os dados para validacao e criacao
    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    };

    //schema para validar os campos, podemos passar uma descricao do erro se quiser
    //dentro dos ()
    const schema = Yup.object().shape({
      name: Yup.string().required("Nome Obrigatório"),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().required().max(300),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.string().required(),
      images: Yup.array(
        Yup.object().shape({
          path: Yup.string().required(),
        })
      ),
    });

    //valida os campos conforme o schema
    await schema.validate(data, {
      //se houver serie de campos com erro ele vai dizer todos os erros na hora e nao apenas alguns
      abortEarly: false,
    });
    //cria mas nao salva no banco
    const orphanage = orphanagesRepository.create(data);

    //FUNCAO ASYNC!!!
    //salva(commita) o objeto repositorio criado na aplicacao no banco
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
