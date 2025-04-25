import React from "react";
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from "react-native";

export default function TelaInicial() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <View style={styles.logoContainer}>
        <Image
          source={require('./assets/logoProAtivo1.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.areaVerde}>
        <Text style={styles.titulo}>Bem-vindo ao ProAtivo</Text>
        <Text style={styles.subtitulo}>
          Com o ProAtivo, encontrar profissionais qualificados nunca foi tão fácil.
        </Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.botaoEntrar}
            onPress={() => navigation.navigate("Login")}
            >
            <Text style={styles.textoBotaoEntrar}>Entrar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoCadastrar}
            onPress={() => navigation.navigate("EscolhaPerfil")}
            >
            <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  logoContainer: {
    marginTop: 20,
  },
  logo: {
    width: 380,
    height: 380,
  },
  areaVerde: {
    backgroundColor: "#00A651",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    paddingTop: 40,
    paddingBottom: 20,
    paddingHorizontal: 16,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    gap: 20,
  },
  titulo: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 12,
  },
  subtitulo: {
    fontSize: 15,
    color: "#e0f2f1",
    textAlign: "center",
    marginBottom: 28,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    width: "100%",
    paddingHorizontal: 30,
    gap: 12,
  },
  botaoEntrar: {
    backgroundColor: "#f57c00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  textoBotaoEntrar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoCadastrar: {
    backgroundColor: "#ffffff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  textoBotaoCadastrar: {
  color: "#333",
  fontSize: 16,
  fontWeight: "bold",
},
});
