import { criarContaPrestadorComEmailESenha } from "@/firebase/criarContaPrestador";
import {
  Entypo,
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { sendEmailVerification, User } from "@firebase/auth";
import { useRouter } from "expo-router";
import { FirebaseError } from "firebase/app";
import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import ServicosInput from "../components/ServicosInput";
import CustomModal from "../components/CustomModal";

export default function CadastroProfissional() {
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [servicos, setServicos] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const tipo = "prestador";
  const successMessage = "Verifique seu email para confirmar o cadastro.";

  const signUp = async () => {
    setLoading(true);
    try {
      if (servicos.length === 0) {
        alert("Por favor, adicione pelo menos um servico.");
        return;
      }

      const user = await criarContaPrestadorComEmailESenha({
        nome,
        email,
        senha,
        tipo,
        endereco,
        telefone,
        servicos,
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
    setServicos([]);
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
        <Text style={styles.titulo}>Cadastro Profissional</Text>

        <View style={styles.inputGroup}>
          <Ionicons name="person-outline" size={20} color="#00A651" />
          <TextInput
            placeholder="Seu nome completo"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.inputGroup}>
          <MaterialIcons name="email" size={20} color="#00A651" />
          <TextInput
            placeholder="seuemail@email.com"
            style={styles.input}
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            placeholderTextColor="#999"
          />
        </View>

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

        <View style={styles.inputGroup}>
          <Entypo name="location-pin" size={20} color="#00A651" />
          <TextInput
            placeholder="Endereço"
            style={styles.input}
            value={endereco}
            onChangeText={setEndereco}
            placeholderTextColor="#999"
          />
        </View>

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

        <View style={styles.inputGroup}>
          <MaterialCommunityIcons
            name="briefcase-search"
            size={20}
            color="#00A651"
          />
          <View style={{ flex: 1 }}>
            <ServicosInput
              servicos={servicos}
              onAdd={(s) => setServicos([...servicos, s])}
              onRemove={(index) =>
                setServicos(servicos.filter((_, i) => i !== index))
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.botaoCriar} onPress={signUp}>
          <Text style={styles.textoBotao}>Criar</Text>
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
