import { PetDetalhes } from '../service/pets/pet.service';
import { Pet } from './pet.model';
import { ServicoPet } from './servico-pet.model';
import { Funcionario } from './funcionario.model';

export interface Agenda {
  id: string;
  petId: string;
  servicoId: string;
  data: string;
  status: string;
  observacoes?: string;
  pet?: Pet;
  servico?: ServicoPet;
  funcionarioId: string;
  funcionario?: Funcionario;
}

// Interface para o agendamento com todos os dados aninhados
export interface AgendaDetalhes extends Omit<Agenda, 'pet' | 'servico' | 'funcionario'> {
  pet: PetDetalhes; // Usa a interface PetDetalhes que já tem tutor e especie
  servico: ServicoPet;
  funcionario: Funcionario;
}