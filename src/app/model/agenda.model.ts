import { Pet } from './pet.model';
import { ServicoPet } from './servico-pet.model';

export interface Agenda {
  id: string;
  petId: string;
  servicoId: string;
  data: string;
  status: string;
  observacoes?: string;
  // Propriedades opcionais que serão preenchidas pelo _expand da API
  pet?: Pet;
  servico?: ServicoPet;
}