import Cargo from "./Cargo";

export class Cliente {

  id: number = 0;
  nome: String = "";
  idade: String = "";
  telefone: string = "";
  senha: string = "";
  logado: Boolean = true;
  cargo!: Cargo;
}
