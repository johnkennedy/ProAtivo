import React, { useState } from 'react';
import {
  View, Text, TextInput, StyleSheet, Image,
  TouchableOpacity, FlatList, Alert, Linking,
  Animated, TouchableWithoutFeedback
} from 'react-native';

import { Ionicons, MaterialIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function TelaCliente() {
  const navigation = useNavigation();

  const [categoriaSelecionada, setCategoriaSelecionada] = useState('Todos');
  const [busca, setBusca] = useState('');

  const profissionais = [
    {
      id: '1',
      nome: 'João da Silva',
      cidade: 'Recife - PE',
      profissao: 'Eletricista',
      avaliacao: 4.6,
      telefone: '5581991111111',
    },
    {
      id: '2',
      nome: 'Carlos Oliveira',
      cidade: 'Olinda - PE',
      profissao: 'Mecânico',
      avaliacao: 4.9,
      telefone: '5581992222222',
    },
    {
      id: '3',
      nome: 'Pedro Ferreira',
      cidade: 'Jaboatão - PE',
      profissao: 'Pedreiro',
      avaliacao: 4.8,
      telefone: '5581993333333',
    },
    {
      id: '4',
      nome: 'Lucas Santos',
      cidade: 'Paulista - PE',
      profissao: 'Eletricista',
      avaliacao: 4.7,
      telefone: '5581994444444',
    },
  ];

  const categorias = ['Todos', 'Eletricista', 'Mecânico', 'Pedreiro'];

  const handleLogoff = () => {
    Alert.alert(
      'Sair',
      'Deseja realmente sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Sair', onPress: () => navigation.navigate('TelaInicial') }
      ]
    );
  };

  const abrirWhatsApp = (profissional) => {
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

  // Botão do WhatsApp com animação
  const BotaoWhatsAppAnimado = ({ onPress }) => {
    const scale = new Animated.Value(1);

    const animarPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.9,
        useNativeDriver: true,
      }).start();
    };

    const animarPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        tension: 40,
        useNativeDriver: true,
      }).start();
    };

    return (
      <TouchableWithoutFeedback
        onPressIn={animarPressIn}
        onPressOut={animarPressOut}
        onPress={onPress}
      >
        <Animated.View style={{ transform: [{ scale }] }}>
          <FontAwesome name="whatsapp" size={26} color="#25D366" />
        </Animated.View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View style={styles.container}>
      {/* Topo */}
      <View style={styles.topArea}>
        <Image source={require('./assets/fotoPerfil.png')} style={styles.avatar} />
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

      {/* Área de busca */}
      <View style={styles.buscaArea}>
        <TextInput
          placeholder="Buscar profissional"
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

      {/* Lista de Profissionais */}
      <FlatList
        data={profissionaisFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={require('./assets/avatarPadrao.png')} style={styles.fotoProfissional} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.nomeProfissional}>{item.nome}</Text>
              <Text style={styles.localizacao}>{item.cidade}</Text>
              <Text style={styles.profissao}>{item.profissao}</Text>
              <View style={styles.avaliacao}>
                <Ionicons name="star" size={16} color="#f57c00" />
                <Text style={{ marginLeft: 4 }}>{item.avaliacao}</Text>
              </View>
            </View>
            <BotaoWhatsAppAnimado onPress={() => abrirWhatsApp(item)} />
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
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#00A651" },
  topArea: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  avatar: { width: 50, height: 50, borderRadius: 25 },
  ola: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  tipo: { color: '#fff', fontSize: 14 },
  buscaArea: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 10,
    padding: 5,
    alignItems: 'center',
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
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginVertical: 8,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  fotoProfissional: { width: 50, height: 50, borderRadius: 25 },
  nomeProfissional: { fontWeight: 'bold', fontSize: 16 },
  localizacao: { color: '#666', fontSize: 12 },
  profissao: { color: '#00A651', fontSize: 12 },
  avaliacao: { flexDirection: 'row', alignItems: 'center', marginTop: 4 },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
