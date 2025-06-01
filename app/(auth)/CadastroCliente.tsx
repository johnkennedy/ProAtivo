import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import type { FirebaseError } from "firebase/app";
import { sendEmailVerification, type User } from "firebase/auth";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import CustomModal from "../components/CustomModal";
import { criarContaClienteComEmailESenha } from "@/firebase/criarContaCliente";

export default function CadastroCliente() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [telefone, setTelefone] = useState("");
  const [endereco, setEndereco] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const successMessage = "Verifique seu email para confirmar o cadastro.";
  const tipo = "cliente";

  const signUp = async () => {
    setLoading(true);
    try {
      const user = await criarContaClienteComEmailESenha({
        nome,
        email,
        senha,
        tipo,
        endereco,
        telefone,
      });
      if (user) {
        await sendEmailVerification(user as User);
        setIsModalVisible(true);
      }
    } catch (e) {
      const error = e as FirebaseError;
      alert("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    router.replace("/Login");
  };

  const limparCampos = () => {
    setNome("");
    setEmail("");
    setSenha("");
    setEndereco("");
    setTelefone("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={require("../../assets/images/logoProAtivo2.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Cadastro Cliente</Text>

        {/* Nome */}
        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={20} color="#00A651" />
          <TextInput
            placeholder="Seu nome completo"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#999"
            autoCapitalize="words"
          />
        </View>

        {/* Email */}
        <View style={styles.inputGroup}>
          <MaterialIcons name="email" size={20} color="#00A651" />
          <TextInput
            placeholder="seuemail@email.com.br"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
            autoCapitalize="none"
            autoCorrect={false}
          />
        </View>

        {/* Senha */}
        <View style={styles.inputGroup}>
          <Ionicons name="lock-closed-outline" size={20} color="#00A651" />
          <TextInput
            placeholder="**************"
            style={styles.input}
            secureTextEntry
            value={senha}
            onChangeText={setSenha}
            placeholderTextColor="#999"
          />
        </View>

        {/* Telefone */}
        <View style={styles.inputGroup}>
          <FontAwesome5 name="whatsapp" size={20} color="#00A651" />
          <TextInput
            placeholder="Telefone"
            style={styles.input}
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
            placeholderTextColor="#999"
          />
        </View>

        {/* Endereço */}
        <View style={styles.inputGroup}>
          <MaterialIcons name="location-on" size={20} color="#00A651" />
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholderTextColor="#999"
          />
        </View>

        {/* Botões */}
        <TouchableOpacity
          style={styles.botaoCriar}
          onPress={signUp}
          disabled={loading}
        >
          <Text style={styles.textoBotao}>
            {loading ? "Criando..." : "Criar"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotaoLimpar}>Limpar</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => router.back()}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>

        {/* Modal */}
        <CustomModal
          visible={isModalVisible}
          animationType="fade"
          title="Cadastrado com sucesso"
          message={successMessage}
          onRequestClose={handleCloseModal}
        />
      </View>
    </ScrollView>
  );
}

// Lembre-se de adicionar os estilos (styles) para as novas views e inputs!

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#00A651",
    alignItems: "center",
    paddingTop: 60,
    paddingBottom: 30,
  },
  header: {
    marginBottom: 10,
  },
  logo: {
    width: 350,
    height: 350,
  },
  formContainer: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#00A651",
    marginBottom: 20,
    textAlign: "center",
  },
  botaoVoltar: {
    borderWidth: 2,
    borderColor: "#fff",
    color: "#00A651",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: "center",
  },
  textoBotaoVoltar: {
    color: "#00A651",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    marginBottom: 15,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: "#333",
  },
  botaoCriar: {
    backgroundColor: "#f57c00",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
  },
  botaoLimpar: {
    backgroundColor: "#fff",
    borderColor: "#00A651",
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  textoBotaoLimpar: {
    color: "#00A651",
    fontWeight: "bold",
  },
});
