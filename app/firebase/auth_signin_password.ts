import { auth } from "@/FirebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";


export async function logarComEmailESenha(email: string, senha: string) {
  await signInWithEmailAndPassword(auth, email, senha)
    .then(async (userCredential) => {
      const user = userCredential.user;
      if (!user.emailVerified) {
        await auth.signOut(); // opcional: desloga automaticamente
        throw new Error("Email nao verificado");
      }
    })
    .catch((e) => {
      const error = e.code;
      let errorMessage = "Erro interno, não foi possível logar";

      if (error == "auth/invalid-email" || error == "auth/invalid-login-credentials") {
        errorMessage = "Email ou senha incorretos"
      }

      if (error == "auth/missing-password") {
        errorMessage = "Senha vazia"
      }

      throw new Error(errorMessage);
    });
}
