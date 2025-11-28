export interface Pet {
  id: string;
  nome: string;
  especieId: string;
  raca: string;
  nascimento: string; // ou Date, se você for converter
  peso: number;
  sexo: string;
  observacoes: string;
  tutorId: string;

}