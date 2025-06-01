// components/ServicosInput.tsx
import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

interface ServicosInputProps {
  servicos: string[];
  onAdd: (servico: string) => void;
  onRemove: (index: number) => void;
}

export default function ServicosInput({
  servicos,
  onAdd,
  onRemove,
}: ServicosInputProps) {
  const [inputServico, setInputServico] = useState("");

  const adicionarServico = () => {
    const novo = inputServico.trim();
    if (novo && !servicos.includes(novo)) {
      onAdd(novo);
      setInputServico("");
    }
  };

  return (
    <View>
      <View style={{ flexDirection: "row", marginBottom: 10 }}>
        <TextInput
          placeholder="Digite um serviço"
          value={inputServico}
          onChangeText={setInputServico}
          style={{ flex: 1, borderBottomWidth: 1, marginRight: 10 }}
        />
        <TouchableOpacity onPress={adicionarServico}>
          <Text style={{ color: "#00A651" }}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={servicos}
        horizontal
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={{
              backgroundColor: "#00A651",
              borderRadius: 20,
              paddingHorizontal: 12,
              paddingVertical: 6,
              marginRight: 8,
            }}
            onPress={() => onRemove(index)}
          >
            <Text style={{ color: "#fff" }}>{item} ✕</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
