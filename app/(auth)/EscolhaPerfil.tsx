import { useRouter } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaEscolhaPerfil() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logoProAtivo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.areaBranca}>
        <Text style={styles.titulo}>Qual o perfil desejado?</Text>

        <TouchableOpacity
          style={styles.botaoProfissional}
          onPress={() => router.push("/CadastroProfissional")}
        >
          <Text style={styles.textoBotaoProfissional}>Profissional</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoCliente}
          onPress={() => router.push("/CadastroCliente")}
        >
          <Text style={styles.textoBotaoCliente}>Cliente</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A651",
    justifyContent: "flex-start",
  },
  header: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 20,
  },
  logo: {
    width: 380,
    height: 380,
  },
  areaBranca: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: 30,
    alignItems: "center",
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#00A651",
    marginBottom: 30,
  },
  botaoProfissional: {
    backgroundColor: "#f57c00",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  textoBotaoProfissional: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoCliente: {
    backgroundColor: "#f57c00",
    paddingVertical: 14,
    borderRadius: 10,
    marginBottom: 20,
    width: "80%",
    alignItems: "center",
  },
  botaoVoltar: {
    borderWidth: 2,
    borderColor: "#fff",
    color: "#00A651",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    marginBottom: 20,
  },
  textoBotaoCliente: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  textoBotaoVoltar: {
    color: "#00A651",
    fontSize: 16,
    fontWeight: "bold",
  },
});
