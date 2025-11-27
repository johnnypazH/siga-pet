export interface Prontuario {
  id: string;
  petid: string;
  data: string; // ou Date, se você for converter
  diagnostico: string;
  tratamento: string;
  observacoes: string;
  funcionarioid: string;
}