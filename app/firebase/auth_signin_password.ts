import { auth } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Alert } from "react-native";


export async function logarComEmailESenha(email: string, senha: string) {
  await signInWithEmailAndPassword(auth, email, senha)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        Alert.alert("Verificação pendente", "Por favor, verifique seu e-mail antes de continuar.");
        await auth.signOut(); // opcional: desloga automaticamente
        return;
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
}
