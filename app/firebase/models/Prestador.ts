export interface Prestador {
  uid?: string;
  nome: string;
  email: string;
  senha: string;
  tipo: "prestador";
  telefone?: string;
  servicos: string[];         // ex: ["eletricista", "encanador"]
  descricao?: string;
  endereco?: string;
  criadoEm?: Date;
}
