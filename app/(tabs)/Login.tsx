import auth from "@react-native-firebase/auth";
import type { FirebaseError } from 'firebase/app';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text, TextInput, TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function TelaLogin() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const signUp = async () => {
    setLoading(true);
    try {
      await auth().createUserWithEmailAndPassword(email, senha);
      alert("olha o email");
    } catch (e) {
      const error = e as FirebaseError;
      alert("Cadastro falhou " + error);
    } finally {
      setLoading(false);
    }
  }

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, senha);
    } catch (e) {
      const error = e as FirebaseError;
      alert("Login falhou " + error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topArea}>
        <Image source={require('../../assets/images/logoProAtivo2.png')} style={styles.logo} />
      </View>

      <View style={styles.loginArea}>
        <Text style={styles.title}>Entrar no ProAtivo</Text>

        <TextInput
          placeholder="Email"
          keyboardType="email-address"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholderTextColor="#999" // Deixando o placeholder mais escuro
        />

        <TextInput
          placeholder="Senha"
          secureTextEntry
          style={styles.input}
          value={senha}
          onChangeText={setSenha}
          placeholderTextColor="#999"
        />

        <Text style={styles.forgot}>Esqueceu a senha?</Text>

        {loading ? (
          <ActivityIndicator size={'small'} style={{ margin: 28 }} />
        ) : (
          <>
            <TouchableOpacity style={styles.botaoEntrar} onPress={signIn}>
              <Text style={styles.textoBotaoEntrar}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCadastrar}
              onPress={signUp}
            >
              <Text style={styles.textoBotaoCadastrar}>Cadastrar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </SafeAreaView>
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
    fontSize: 16,
    color: "#333" // Corrige o texto digitado que estava claro também
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
