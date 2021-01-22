import React, { useState, FormEvent, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
//useMapEvents usado para pegar o evento do mouse
import { MapContainer, Marker, TileLayer, useMapEvents } from "react-leaflet";

import { FiPlus } from "react-icons/fi";
import "../styles/pages/create-orphanage.css";
import mapIcon from "../utils/mapIcon";

export default function OrphanagesMap() {
  const history = useHistory();
  //posicao do marker setada pelo click do mouse
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });

  //dados do formulario a ser enviado
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  //estado booleano
  const [open_on_weekends, setOpenOnWeekends] = useState(true);
  //estado do tipo de Arquivos e Array para receber multiplas imagens
  const [images, setImages] = useState<File[]>([]);

  //array de strings com os endereços da preview das imagens com createObjectUrl(do browser)
  const [previewImages, setPreviewImages] = useState<string[]>([]);

  //componente que captura o evento do mouse e seta a posicao do marker
  function HandleMapClickComponent() {
    const map = useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        setPosition({ latitude: lat, longitude: lng });
      },
    });
    return null;
  }

  //funcao para enviar imagens
  function handleSelectImages(event: ChangeEvent<HTMLInputElement>) {
    //se nao tiver colocado imagens ja para de executar esta funcao
    if (!event.target.files) {
      return;
    }
    //set nas imagens convertendo o files para um array
    const selectedImages = Array.from(event.target.files);

    setImages(selectedImages);

    //faz um preview das imagens e salva no estado
    const selectedImagesPreview = selectedImages.map((image) => {
      return URL.createObjectURL(image);
    });
    setPreviewImages(selectedImagesPreview);
  }

  //funcao de enviar dados do formulario
  async function handleSubmit(event: FormEvent) {
    //ira previnir que o formulario recarregue a pagina
    event.preventDefault();

    const { latitude, longitude } = position;

    //como é um multipartForm precisamos criar essa instancia do FormData
    const data = new FormData();

    //adicionamos os campos ao formdata
    data.append("name", name);
    data.append("about", about);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("instructions", instructions);
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));

    //para cada imagem ele faz mais um append contendo a imagem
    images.forEach((image) => {
      data.append("images", image);
    });

    console.log(data);
    await api.post("/orphanages", data);

    alert("Cadastro realizado com sucesso");
    history.push("/app");
  }

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <MapContainer
              center={[-23.6276, -46.5066]}
              zoom={15}
              style={{ width: "100%", height: 280 }}
            >
              <HandleMapClickComponent />
              <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              {/* If para verificar se deve colocar um marker ou nao, se sim ONDE?  */}
              {position.latitude !== 0 ? (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              ) : null}
            </MapContainer>
            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={(event) => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => {
                  return <img key={image} src={image} alt={name} />;
                })}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input
                multiple
                onChange={handleSelectImages}
                type="file"
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={(event) => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <textarea
                id="opening_hours"
                value={opening_hours}
                onChange={(event) => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  className={open_on_weekends ? "active" : ""}
                  type="button"
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  className={!open_on_weekends ? "active" : ""}
                  type="button"
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}
