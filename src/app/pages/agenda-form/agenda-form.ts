import { Component, OnInit, Signal, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Agenda } from '../../model/agenda.model';
import { AgendaService } from '../../service/agenda/agenda';
import { Pet } from '../../model/pet.model';
import { PetService } from '../../service/pets/pet.service';
import { ServicoPet } from '../../model/servico-pet.model';
import { ServicoPetService } from '../../service/servico-pet/servico-pet';
import { Funcionario } from '../../model/funcionario.model';
import { FuncionarioService } from '../../service/funcionarios/funcionario';

@Component({
  selector: 'app-agenda-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './agenda-form.html',
  styleUrl: './agenda-form.scss'
})
export class AgendaFormComponent implements OnInit {
  agendamento: Partial<Agenda> = {
    petId: undefined,
    servicoId: undefined,
    funcionarioId: undefined,
    data: '',
    status: 'Agendado',
    observacoes: ''
  };
  isEdit = false;
  titulo = 'Novo Agendamento';
  pets: Pet[] = [];
  servicos: ServicoPet[] = [];
  
  // Injeta os serviços
  private agendaService = inject(AgendaService);
  private petService = inject(PetService);
  private servicoPetService = inject(ServicoPetService);
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  // Signals para os dados
  funcionarios: Signal<Funcionario[]> = this.funcionarioService.funcionarios;
  funcionariosAtivos: Signal<Funcionario[]> = computed(() => this.funcionarios().filter(f => f.ativo));

  ngOnInit(): void {
    this.petService.listar().subscribe(data => this.pets = data);
    this.servicoPetService.listar().subscribe(data => this.servicos = data.filter(s => s.ativo));

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.titulo = 'Editar Agendamento';
      this.agendaService.buscarPorId(id).subscribe(data => {
        this.agendamento = data;
      });
    }
  }

  salvar(): void {
    // --- INÍCIO DA VALIDAÇÃO DE CONFLITO ---
    const { funcionarioId, data, id: agendamentoAtualId } = this.agendamento;

    // Busca na lista de agendamentos do serviço se há algum conflito
    const conflito = this.agendaService.agendamentos().find(ag => {
      // Verifica se o funcionário e a data/hora são os mesmos
      const mesmoHorario = ag.funcionarioId === funcionarioId && ag.data === data;

      // Se estiver editando, precisa ignorar o próprio agendamento na verificação
      if (this.isEdit) {
        return mesmoHorario && ag.id !== agendamentoAtualId;
      }

      // Se for um novo agendamento, a verificação é direta
      return mesmoHorario;
    });

    if (conflito) {
      alert('Este funcionário já possui um agendamento neste mesmo dia e horário. Por favor, escolha outro horário ou funcionário.');
      return; // Interrompe o salvamento
    }
    // --- FIM DA VALIDAÇÃO DE CONFLITO ---

    if (this.isEdit && this.agendamento.id) {
      this.agendaService.atualizar(this.agendamento.id, this.agendamento as Agenda)
        .subscribe(() => this.router.navigate(['/agendas']));
    } else {
      this.agendaService.criar(this.agendamento as Omit<Agenda, 'id'>)
        .subscribe(() => this.router.navigate(['/agendas']));
    }
  }
}
