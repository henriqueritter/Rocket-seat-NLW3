//tipagem do request, response
import { Request, Response } from "express";

//para realizar o vinculo entre o model e a tabela no banco
import { getRepository } from "typeorm";
import Orphanage from "../models/Orphanage";

export default {
  //lista todos os orfanatos
  async index(request: Request, response: Response) {
    const orphanagesRepository = getRepository(Orphanage);

    const orphanages = await orphanagesRepository.find();
    // com condicao ->
    // const orphanages = await orphanagesRepository.find({where});

    return response.status(200).json(orphanages);
  },

  //retorna apenas um orfanato
  async show(request: Request, response: Response) {
    const { id } = request.params;
    const orphanagesRepository = getRepository(Orphanage);

    const orphanage = await orphanagesRepository.findOneOrFail(id);

    return response.status(200).json(orphanage);
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

    //cria mas nao salva no banco
    const orphanage = orphanagesRepository.create({
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
      images,
    });

    //FUNCAO ASYNC!!!
    //salva(commita) o objeto repositorio criado na aplicacao no banco
    await orphanagesRepository.save(orphanage);

    return response.status(201).json(orphanage);
  },
};
