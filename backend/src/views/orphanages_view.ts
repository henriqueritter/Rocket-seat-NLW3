//importa o model para dizer qual tipo é esperado
import Orphanage from "../models/Orphanage";

//importa a view de images
import imagesView from "./images_view";

export default {
  //renderiza o orfanato passado no parametro para exibir os campos ababixo
  render(orphanage: Orphanage) {
    return {
      id: orphanage.id,
      name: orphanage.name,
      latitude: orphanage.latitude,
      longitude: orphanage.longitude,
      about: orphanage.about,
      instructions: orphanage.instructions,
      opening_hours: orphanage.opening_hours,
      open_on_weekends: orphanage.open_on_weekends,
      whatsapp: orphanage.whatsapp,
      images: imagesView.renderMany(orphanage.images),
    };
  },
  //renderiza varios orfanatos
  renderMany(orphanages: Orphanage[]) {
    //para cada orfanato do array retorne o orfanato renderizado pelo metodo acima
    return orphanages.map((orphanage) => this.render(orphanage));
  },
};
