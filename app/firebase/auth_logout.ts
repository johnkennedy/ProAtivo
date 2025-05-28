
import { auth } from "@/FirebaseConfig";


export async function deslogar() {
  console.log(auth)
  if(auth) {
    auth.signOut();
  }
}
