import { createUserWithEmailAndPassword, getAuth } from "@firebase/auth";

const auth = getAuth();

export async function criarContaComEmailESenha(email: string, senha: string) {
  createUserWithEmailAndPassword(auth, email, senha)
    .then((userCredential) => {
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
    });
}
