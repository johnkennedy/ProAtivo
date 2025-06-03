import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/FirebaseConfig";
import { useRouter } from "expo-router";
import { deslogar } from "@/firebase/deslogar";

export default function TelaPrestador() {
  const [usuario, setUsuario] = useState<{
    nome: string;
    tipo?: string;
    fotoPerfil?: string;
    endereco?: string;
    telefone?: string;
    servicos?: string[];
  } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const carregarUsuario = async () => {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const data = userDoc.data();
          if (data.tipo == "cliente") {
            await deslogar();
            router.replace("/");
          }
          setUsuario({
            nome: currentUser.displayName || data.nome || "Usuário",
            tipo: data.tipo,
            endereco: data.endereco,
            telefone: data.telefone,
            servicos: data.servicos,
          });
        } else {
          Alert.alert("Erro", "Usuário não encontrado no banco de dados.");
          await deslogar();
          router.replace("/");
        }
      } else {
        await deslogar();
        router.replace("/");
      }
    };

    carregarUsuario();
  }, []);

  const handleLogoff = async () => {
    await deslogar();
    router.navigate("/");
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topArea}>
        <Ionicons name="person-circle-outline" size={28} color="#fff" />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.ola}>Olá, {usuario?.nome}</Text>
          <Text style={styles.tipo}>Prestador de Serviço</Text>
        </View>
        <TouchableOpacity onPress={handleLogoff}>
          <Ionicons name="log-out-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollArea}>
        <View style={styles.card}>
          <Text style={styles.titulo}>Seus Dados</Text>

          <View style={styles.item}>
            <Feather name="user" size={18} color="#555" />
            <Text style={styles.label}>Nome:</Text>
            <Text style={styles.valor}>{usuario?.nome}</Text>
          </View>

          <View style={styles.item}>
            <Feather name="map-pin" size={18} color="#555" />
            <Text style={styles.label}>Endereço:</Text>
            <Text style={styles.valor}>{usuario?.endereco}</Text>
          </View>

          <View style={styles.item}>
            <Feather name="phone" size={18} color="#555" />
            <Text style={styles.label}>Telefone:</Text>
            <Text style={styles.valor}>{usuario?.telefone}</Text>
          </View>

          <View style={styles.item}>
            <MaterialIcons name="handyman" size={18} color="#555" />
            <Text style={styles.label}>Serviços:</Text>
          </View>

          {usuario?.servicos?.length ? (
            usuario.servicos.map((serv, idx) => (
              <Text key={idx} style={styles.servico}>
                • {serv}
              </Text>
            ))
          ) : (
            <Text style={styles.servico}>Nenhum serviço cadastrado</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#00A651",
  },
  topArea: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#00A651",
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#eee",
  },
  ola: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  tipo: {
    color: "#fff",
    fontSize: 14,
    marginTop: 2,
  },
  scrollArea: {
    backgroundColor: "#f2f2f2",
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#555",
    marginLeft: 6,
    fontWeight: "600",
  },
  valor: {
    fontSize: 16,
    color: "#222",
    marginLeft: 6,
  },
  servico: {
    fontSize: 16,
    color: "#444",
    marginLeft: 26,
    marginBottom: 4,
  },
});
