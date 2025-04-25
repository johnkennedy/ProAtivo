import React from 'react';
import {
  View, Text, TextInput, TouchableOpacity, StyleSheet, Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function TelaLogin() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.topArea}>
        <Image source={require('./assets/logoProAtivo2.png')} style={styles.logo} />
      </View>

      <View style={styles.loginArea}>
        <Text style={styles.title}>Entrar no ProAtivo</Text>

        <TextInput
          placeholder="seuemail@email.com.br"
          keyboardType="email-address"
          style={styles.input}
        />

        <TextInput
          placeholder="************"
          secureTextEntry
          style={styles.input}
        />

        <Text style={styles.forgot}>Esqueceu a senha?</Text>

        <TouchableOpacity style={styles.botaoEntrar}>
          <Text style={styles.textoBotaoEntrar}>Entrar</Text>
        </TouchableOpacity>

        {/* Botão Cadastrar */}
        <TouchableOpacity
          style={styles.botaoCadastrar}
          onPress={() => navigation.navigate("EscolhaPerfil")}
        >
          <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00A651" },
  topArea: {
    alignItems: 'center',
    marginTop: 80,
  },
  logo: {
    width: 380,
    height: 380,
    resizeMode: 'contain'
  },
  loginArea: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#00A651",
    textAlign: "center",
    marginBottom: 30
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16
  },
  forgot: {
    alignSelf: "flex-end",
    color: "#00A651",
    fontSize: 14,
    marginBottom: 20
  },
  botaoEntrar: {
    backgroundColor: "#f57c00",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
  },
  textoBotaoEntrar: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  },
  botaoCadastrar: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#00A651"
  },
  textoBotaoCadastrar: {
    color: "#00A651",
    fontSize: 16,
    fontWeight: "bold"
  }
});
