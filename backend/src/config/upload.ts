import multer from "multer";
//para lidar com caminhos relativos(pastas e etc)
import path from "path";
export default {
  storage: multer.diskStorage({
    destination: path.join(__dirname, "..", "..", "uploads"),
    //funcao para dar um nome para o arquivo
    filename: (request, file, cb) => {
      const fileName = `${Date.now()}-${file.originalname}`;

      //funcao callback, recebe erro primeiro parametro e retorna arquivo como segundo param
      cb(null, fileName);
    },
  }),
};
