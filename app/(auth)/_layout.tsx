import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false, // ou true se quiser cabeçalhos
        animation: "fade", // ou 'slide_from_right', 'none', etc.
      }}
    />
  );
}
