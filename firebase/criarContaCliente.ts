import { auth, db } from "@/FirebaseConfig";
import { FirebaseError } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  type User,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { Cliente } from "./models/Cliente";

export async function criarContaClienteComEmailESenha({
  nome,
  email,
  senha,
  tipo,
  endereco,
  telefone,
}: Cliente): Promise<User> {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      senha,
    );
    const user = userCredential.user;
    const uid = user.uid;

    const firstName = nome.trim().split(" ")[0];

    await updateProfile(user, {
      displayName: firstName,
    });

    // Salva o usuário no Firestore
    await setDoc(doc(db, "users", uid), {
      nome,
      email,
      tipo,
      endereco,
      telefone,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

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
