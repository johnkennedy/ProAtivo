import React, { useState } from 'react';
import {
  Alert,
  FlatList,
  Image,
  Linking,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { Feather, FontAwesome, Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../types/routes';

type Profissional = {
  id: string;
  nome: string;
  cidade: string;
  profissao: string;
  avaliacao: Number;
  telefone: string;
  imagem: string;
}

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function TelaCliente() {
  const navigation = useNavigation<NavigationProps>();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [busca, setBusca] = useState('');

  const profissionais = [
    {
      id: '1',
      nome: 'John Kennedy',
      cidade: 'Recife - PE',
      profissao: 'Eletricista',
      avaliacao: 4.6,
      telefone: '5581999894288',
      imagem: require("../../assets/images/john.png"),
    },
    {
      id: '2',
      nome: 'Gilberto Belo',
      cidade: 'Olinda - PE',
      profissao: 'Mecânico',
      avaliacao: 4.9,
      telefone: '5581991825494',
      imagem: require("../../assets/images/gilberto.png"),
    },
    {
      id: '3',
      nome: 'Thiago Miguel',
      cidade: 'Jaboatão - PE',
      profissao: 'Pedreiro',
      avaliacao: 4.8,
      telefone: '5581985996672',
      imagem: require("../../assets/images/thiago.png"),
    },
    {
      id: '4',
      nome: 'Tacito Tinôco',
      cidade: 'Paulista - PE',
      profissao: 'Eletricista',
      avaliacao: 4.7,
      telefone: '5581979005823',
      imagem: require("../../assets/images/tacito.png"),
    },
  ];

  const categorias = ['Todos', 'Eletricista', 'Mecânico', 'Pedreiro'];

  const handleLogoff = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => navigation.navigate("TelaInicial") }
      ]
    );
  };

  const abrirWhatsApp = (profissional: Profissional) => {
    const numero = profissional.telefone;
    const mensagem = `Olá ${profissional.nome}, encontrei seu contato no ProAtivo e gostaria de conversar sobre um serviço.`;
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          return Linking.openURL(url);
        } else {
          Alert.alert('Erro', 'WhatsApp não está instalado ou não foi possível abrir.');
        }
      })
      .catch((err) => console.error('Erro ao abrir WhatsApp:', err));
  };

  const profissionaisFiltrados = profissionais.filter((item) =>
    (categoriaSelecionada === 'Todos' || item.profissao === categoriaSelecionada) &&
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  // // Botão do WhatsApp com animação
  // const BotaoWhatsAppAnimado = ({ onPress }) => {
  //   const scale = new Animated.Value(1);

  //   const animarPressIn = () => {
  //     Animated.spring(scale, {
  //       toValue: 0.9,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  //   const animarPressOut = () => {
  //     Animated.spring(scale, {
  //       toValue: 1,
  //       friction: 3,
  //       tension: 40,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  //   return (
  //     <TouchableWithoutFeedback
  //       onPressIn={animarPressIn}
  //       onPressOut={animarPressOut}
  //       onPress={onPress}
  //     >
  //       <Animated.View style={{ transform: [{ scale }] }}>
  //         <FontAwesome name="whatsapp" size={26} color="#25D366" />
  //       </Animated.View>
  //     </TouchableWithoutFeedback>
  //   );
  // };

  return (
    <SafeAreaView style={styles.container}>
      {/* Topo */}
      <View style={styles.topArea}>
        <Image source={require("../../assets/images/fotoPerfil.png")} style={styles.avatar} />
        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text style={styles.ola}>Olá, Maria</Text>
          <Text style={styles.tipo}>Cliente</Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <Ionicons name="notifications-outline" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLogoff}>
            <Ionicons name="log-out-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filtros dentro da área verde */}
      <View style={styles.filtroContainer}>
        {/* Área de busca */}
        <View style={styles.buscaArea}>
          <TextInput
            placeholder="Buscar Profissional"
            placeholderTextColor="#999"
            value={busca}
            onChangeText={setBusca}
            style={styles.inputBusca}
          />
          <TouchableOpacity style={styles.botaoFiltro}>
            <Feather name="filter" size={24} color="#00A651" />
          </TouchableOpacity>
        </View>

        {/* Filtro de Categorias */}
        <View style={styles.filtroCategorias}>
          {categorias.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[styles.botaoCategoria, categoriaSelecionada === cat && styles.categoriaSelecionada]}
              onPress={() => setCategoriaSelecionada(cat)}
            >
              <Text style={[styles.textoCategoria, categoriaSelecionada === cat && styles.textoCategoriaSelecionado]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Lista de Profissionais */}
      <FlatList
        data={profissionaisFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.imagem} style={styles.fotoProfissional} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.nomeProfissional}>{item.nome}</Text>
              <Text style={styles.localizacao}>{item.cidade}</Text>
              <Text style={styles.profissao}>{item.profissao}</Text>
              <View style={styles.avaliacao}>
                <Ionicons name="star" size={16} color="#f57c00" />
                <Text style={{ marginLeft: 4 }}>{item.avaliacao}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.botaoWhatsApp} onPress={() => abrirWhatsApp(item)}>
              <FontAwesome name="whatsapp" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      {/* Menu Inferior */}
      <View style={styles.menu}>
        <TouchableOpacity>
          <Ionicons name="home-outline" size={28} color="#00A651" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="star-outline" size={28} color="#00A651" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  // Estilo do topo verde
  topArea: {
    backgroundColor: '#00A651',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,  // Aumentei o paddingTop para descer o conteúdo
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  avatar: { width: 50, height: 50, borderRadius: 25 },
  ola: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,  // Ajuste aqui se quiser mais espaço acima do "Olá, Maria"
  },
  tipo: { color: '#fff', fontSize: 14 },

  // Container que mantém os filtros dentro do topo verde
  filtroContainer: {
    backgroundColor: '#00A651',
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  buscaArea: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginBottom: 15,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
    elevation: 3,
  },
  inputBusca: {
    flex: 1,
    paddingHorizontal: 10,
  },
  botaoFiltro: {
    padding: 8,
    backgroundColor: "#e0f2f1",
    borderRadius: 8,
  },
  filtroCategorias: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  botaoCategoria: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginVertical: 4,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  categoriaSelecionada: {
    backgroundColor: "#00A651",
  },
  textoCategoria: {
    fontSize: 14,
    color: "#555",
  },
  textoCategoriaSelecionado: {
    color: "#fff",
  },

  // Restante dos estilos
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },

  fotoProfissional: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },

  nomeProfissional: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
  },

  localizacao: {
    color: '#777',
    fontSize: 13,
    marginTop: 2,
  },

  profissao: {
    backgroundColor: '#e0f2f1',
    color: '#00796B',
    alignSelf: 'flex-start',
    fontSize: 12,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 6,
  },

  avaliacao: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  botaoWhatsApp: {
    backgroundColor: '#25D366',
    padding: 8,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menu: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ddd',
    elevation: 10,
  },

});