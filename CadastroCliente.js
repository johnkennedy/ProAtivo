import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CadastroCliente() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  const limparCampos = () => {
    setNome('');
    setEmail('');
    setSenha('');
    setEndereco('');
    setWhatsapp('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image source={require('./assets/logoProAtivo2.png')} style={styles.logo} resizeMode="contain" />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.titulo}>Cadastro Cliente</Text>

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
            placeholder="seuemail@email.com.br"
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
            placeholder="Whatsapp"
            style={styles.input}
            keyboardType="phone-pad"
            value={whatsapp}
            onChangeText={setWhatsapp}
            placeholderTextColor="#999"
          />
        </View>

        <TouchableOpacity style={styles.botaoCriar}>
          <Text style={styles.textoBotao}>Criar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLimpar} onPress={limparCampos}>
          <Text style={styles.textoBotaoLimpar}>Limpar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.botaoVoltar}
          onPress={() => navigation.navigate("EscolhaPerfil")}
        >
          <Text style={styles.textoBotaoVoltar}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#00A651',
    alignItems: 'center',
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
    backgroundColor: '#fff',
    width: '90%',
    borderRadius: 20,
    padding: 20,
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00A651',
    marginBottom: 20,
    textAlign: 'center',
  },
    botaoVoltar: {
    borderWidth: 2,
    borderColor: '#fff',
    color: '#00A651',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 10,
    alignItems: 'center',
    
  },
  textoBotaoVoltar: {
    color: '#00A651',
    fontSize: 16,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: 15,
    paddingBottom: 5,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  botaoCriar: {
    backgroundColor: '#f57c00',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
  },
  botaoLimpar: {
    backgroundColor: '#fff',
    borderColor: '#00A651',
    borderWidth: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  textoBotaoLimpar: {
    color: '#00A651',
    fontWeight: 'bold',
  },
});
