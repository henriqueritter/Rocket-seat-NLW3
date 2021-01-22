import React, { useState } from "react";
import { StyleSheet, Text, View, Dimensions } from "react-native";
//Callout é um "popup" do marker
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from "react-native-maps";
//para navegar entre as paginas
// UseFocusEffect para recarregar executar um useEffect sempre que a tela tiver foco
import { useNavigation, useFocusEffect } from "@react-navigation/native";

import api from "../services/api";

import { Feather } from "@expo/vector-icons";

//importamos a imagem do marker
import mapMarker from "../images/map-marker.png";
//Botao de adicionar orfanato
import { RectButton } from "react-native-gesture-handler";

interface Orphanage {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}

export default function OrphanagesMap() {
  const navigation = useNavigation();

  // array de orfanatos
  const [orphanages, setOrphanges] = useState<Orphanage[]>([]);

  // usamos o useFocusEffect que executa  sempre que a tela receber foco
  useFocusEffect(() => {
    api.get("/orphanages").then((response) => {
      setOrphanges(response.data);
    });
  });

  function handleNavigateToOrphanageDetails(id: number) {
    // Para enviar o parametro para essa tela passamos um sgundo parametro na chamada
    navigation.navigate("OrphanageDetails", { id });
  }

  function handleNavigateToCreateOrphanage() {
    // envia o usuario para a tela SelectMapPosition
    navigation.navigate("SelectMapPosition");
  }
  return (
    <View style={styles.container}>
      <MapView
        // Força o mapa do Google tanto IOS quanto android
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -23.623,
          longitude: -46.512,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008,
        }}
      >
        {orphanages.map((orphanage) => {
          return (
            <Marker
              key={orphanage.id}
              icon={mapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8,
              }}
              coordinate={{
                latitude: orphanage.latitude,
                longitude: orphanage.longitude,
              }}
            >
              {/* callout é um tipo de popup, quando clicado vai chamar a funcao passando o ID do orfanato */}
              {/* tooltip diz que vai fazer a estilizacao do ZERO */}
              <Callout
                tooltip={true}
                onPress={() => handleNavigateToOrphanageDetails(orphanage.id)}
              >
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{orphanage.name} </Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>

      {/* footer que exibe a quantidade de orfanatos encontradas */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {orphanages.length} Orfanatos encontrados
        </Text>

        {/* botao de adicionar orfanato */}
        <RectButton
          style={styles.createOrphanageButton}
          onPress={handleNavigateToCreateOrphanage}
        >
          <Feather name="plus" size={20} color="#FFF" />
        </RectButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },

  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    justifyContent: "center",
  },
  calloutText: {
    color: "#0089a5",
    fontSize: 14,
    fontFamily: "Nunito_700Bold",
  },
  footer: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 32,

    backgroundColor: "#FFF",
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    //faz o sombreamento
    elevation: 3,
  },

  footerText: {
    color: "#8fa7b3",
    fontFamily: "Nunito_700Bold",
  },

  createOrphanageButton: {
    width: 56,
    height: 56,
    backgroundColor: "#15c3d6",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center",
  },
});
