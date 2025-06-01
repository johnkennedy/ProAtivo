import "expo-constants";

declare module "expo-constants" {
  interface ExpoConfig {
    extra: {
      FIREBASE_API_KEY: string;
      FIREBASE_AUTH_DOMAIN: string;
      FIREBASE_PROJECT_ID: string;
      FIREBASE_STORAGE_BUCKET: string;
      FIREBASE_MESSAGING_SENDER_ID: string;
      FIREBASE_APP_ID: string;
      // adicione mais variáveis aqui se precisar
    };
  }
}
