import { Stack } from 'expo-router';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';

export default function TabsLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>();

  const onAuthStateChanged = (user: FirebaseAuthTypes.User | null) => {
    console.log("logado", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, [])

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
}

