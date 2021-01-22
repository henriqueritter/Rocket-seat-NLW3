import React from "react";

// carrega as fonts do expo
import { useFonts } from "expo-font";
// fontes importadas do google-fonts
import {
  Nunito_600SemiBold,
  Nunito_700Bold,
  Nunito_800ExtraBold,
} from "@expo-google-fonts/nunito";

import Routes from "./src/routes";

export default function App() {
  // funcao que carrega as fonts, elas sao chamadas pelos proprios nomes na estilizacao
  const [fontsLoaded] = useFonts({
    Nunito_600SemiBold,
    Nunito_700Bold,
    Nunito_800ExtraBold,
  });
  // se as fontes nao estiverem carregadas nao mostre nada
  if (!fontsLoaded) {
    return null;
  }

  return <Routes />;
}
