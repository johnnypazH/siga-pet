export interface Agenda {
  id: string;
  petid: string;
  data: string; // ou Date, se você for converter
  servicoId: string;
  status: 'Agendado' | 'Concluído' | 'Cancelado';
  observacoes: string;

}