import { Router } from "express";

//para upload de imgs
import multer from "multer";

//configuracoes do multer
import uploadConfig from "./config/upload";

//import controller
import OrphanagesController from "./controllers/OrphanagesController";

const routes = Router();
//cria upload com as configs do arquivo de config
const upload = multer(uploadConfig);

routes.get("/orphanages/:id", OrphanagesController.show);
routes.get("/orphanages", OrphanagesController.index);

//executa o create do controller na rota post
//executa o upload de varias imagens recebendo as imagens do campo images da requisicao
//(pode serqualquer nome aqui nao precisa ser images)
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

export default routes;
