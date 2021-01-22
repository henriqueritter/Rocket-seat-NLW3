import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

//Para que o Texto do cabecalho seja dinamico recebendo uma string
interface HeaderProps {
  title: string;
  showCancel?: boolean;
}

export default function Header({ showCancel = true, title }: HeaderProps) {
  // if (props.showCancel !== false) {
  //   props.showCancel = true;
  // }

  const navigation = useNavigation();

  function handleGoBackToAppHomepage() {
    navigation.navigate("OrphanagesMap");
  }
  return (
    // insere um texto no cabecalho contendo a prop title
    <View style={styles.container}>
      {/* Botao que simula o botao de retornar  */}
      <BorderlessButton onPress={navigation.goBack}>
        <Feather name="arrow-left" size={24} color="#15b6d6" />
      </BorderlessButton>
      <Text style={styles.title}>{title}</Text>

      {/* Botao X de retornar para main */}
      {showCancel ? (
        <BorderlessButton onPress={handleGoBackToAppHomepage}>
          <Feather name="x" size={24} color="#ff669d" />
        </BorderlessButton>
      ) : (
        <View />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: "#f9fafc",
    borderBottomWidth: 1,
    borderColor: "#dde3f8",
    paddingTop: 44,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontFamily: "Nunito_600SemiBold",
    color: "#8fa7b5",
    fontSize: 16,
  },
});
