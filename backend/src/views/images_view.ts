//importa o model para dizer qual tipo é esperado
import Image from "../models/Image";

export default {
  //renderiza a imagem passada no parametro para exibir os campos ababixo
  render(image: Image) {
    // se nao houver imagem retorne a imagem padrao
    if (!image) {
      return {
        id: 1,
        // url: `http://192.168.11.103:3333/uploads/no-image.jpg`,
        url: `${process.env.API_URL}/uploads/no-image.jpg`,
      };
    }
    return {
      id: image.id,
      // url: `http://192.168.11.103:3333/uploads/${image.path}`,
      url: `${process.env.API_URL}/uploads/${image.path}`,
    };
  },
  //renderiza varias imagens
  renderMany(images: Image[]) {
    //para cada orfanato do array retorne o orfanato renderizado pelo metodo acima
    return images.map((image) => this.render(image));
  },
};
