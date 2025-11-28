import { Funcionario } from "./funcionario.model";

export interface Prontuario {
  id: string;
  petId: string;
  data: string; // ou Date, se você for converter
  diagnostico: string;
  tratamento: string;
  observacoes: string;
  funcionarioId: string;
  funcionario?: Funcionario; // Propriedade opcional para o objeto expandido
}