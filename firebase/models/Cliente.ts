export interface Cliente {
  uid?: string;                // ID do usuário (mesmo que o do Firebase Auth)
  nome: string;
  email: string;
  senha: string;
  telefone?: string;
  tipo: "cliente";            // usado para diferenciar no Firestore
  criadoEm?: Date;
  endereco: string;
}
