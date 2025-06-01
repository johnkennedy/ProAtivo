import { auth } from "@/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

export async function logarComEmailESenha(email: string, senha: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, senha);
    const user = userCredential ? userCredential.user : null;

    console.log(user);
    if (!user?.emailVerified) {
      await auth.signOut(); // opcional: desloga automaticamente
      throw new Error("Email não verificado");
    }

    return user;
  } catch (e) {
    let message = "Erro interno. Tente novamente.";

    if (e instanceof FirebaseError) {
      switch (e.code) {
        case "auth/invalid-email":
        case "auth/invalid-login-credentials":
          message = "Email ou senha incorretos.";
          break;

        case "auth/missing-password":
          message = "A senha não pode estar vazia.";
          break;

        case "auth/user-disabled":
          message = "Essa conta foi desativada.";
          break;

        case "auth/user-not-found":
          message = "Usuário não encontrado.";
          break;

        case "auth/wrong-password":
          message = "Senha incorreta.";
          break;

        default:
          message = `Erro ao fazer login: ${e.code}`;
      }
    } else if (e instanceof Error) {
      message = e.message;
    }

    throw new Error(message);
  }
}
