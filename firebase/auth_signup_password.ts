import { auth, db } from "@/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import { createUserWithEmailAndPassword, type User } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Cliente } from "./models/Cliente";

export async function criarContaComEmailESenha(
  email: string,
  senha: string,
): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha,
    );
    const user = userCredential.user;
    const uid = user.uid;
    // Salva o tipo de usuário no Firestore
    // await setDoc(doc(db, "users", uid), {
    //   email,
    //   tipo,
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // });

    return user;
  } catch (error: unknown) {
    if (error instanceof FirebaseError) {
      console.log("Código de erro:", error.code);
      console.log("Mensagem do Firebase:", error.message);
      throw new Error("deu erro pai");
    }
    console.log("Erro inesperado:", error);
    throw new Error("deu erro pai");
  }
}
