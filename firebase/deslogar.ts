import { auth } from "@/FirebaseConfig";

export async function deslogar() {
  if (auth) {
    auth.signOut();
  }
}
