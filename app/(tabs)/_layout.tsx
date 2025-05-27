import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth } from '../../FirebaseConfig';
import { User } from 'firebase/auth';

export default function TabsLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>();

  const onAuthStateChanged = (user: User | null) => {
    console.log("logado", user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
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

