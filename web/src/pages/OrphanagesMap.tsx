import React from "react";

import { Link } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import mapMarkerImg from "../images/map-marker.svg";

import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css"; //style necessario para nao baguncar o map

import "../styles/pages/orphanages-map.css";
import { env } from "process";

function OrphanagesMap() {
  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarkerImg} alt="Happy" />

          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>

        <footer>
          <strong>Santo André</strong>
          <span>São Paulo</span>
        </footer>
      </aside>

      <MapContainer
        center={[-23.6276, -46.5066]}
        zoom={15}
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {/* TileLayer com MAPBOX */}
        {/* <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
        /> */}
      </MapContainer>

      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#FFF" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;
