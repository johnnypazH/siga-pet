import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';

import { Agenda } from '../../model/agenda.model';
import { Pet } from '../../model/pet.model';
import { ServicoPet } from '../../model/servico-pet.model';

import { AgendaService } from '../../service/agenda/agenda';
import { PetService } from '../../service/pets/pet.service';
import { ServicoPetService } from '../../service/servico-pet/servico-pet';

interface AgendamentoCompleto extends Agenda {
  pet?: Pet;
  servico?: ServicoPet;
}

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DatePipe],
  templateUrl: './agenda-list.html',
  styleUrl: './agenda-list.scss'
})
export class AgendaListComponent implements OnInit {
  private agendamentos = signal<AgendamentoCompleto[]>([]);
  termoBusca = signal<string>('');

  agendamentosFiltrados = computed(() => {
    const agendamentos = this.agendamentos();
    const termo = this.termoBusca().toLowerCase();

    if (!termo) {
      return agendamentos;
    }

    return agendamentos.filter(agenda =>
      agenda.pet?.nome.toLowerCase().includes(termo) ||
      agenda.servico?.nome.toLowerCase().includes(termo) ||
      agenda.status.toLowerCase().includes(termo)
    );
  });

  constructor(
    private agendaService: AgendaService,
    private petService: PetService,
    private servicoPetService: ServicoPetService
  ) {}

  ngOnInit(): void {
    forkJoin({
      agendamentos: this.agendaService.listar(),
      pets: this.petService.listar(),
      servicos: this.servicoPetService.listar()
    }).subscribe(({ agendamentos, pets, servicos }) => {
      const petsMap = new Map(pets.map(p => [p.id, p]));
      const servicosMap = new Map(servicos.map(s => [s.id, s]));

      const agendamentosCompletos: AgendamentoCompleto[] = agendamentos.map(agenda => ({
        ...agenda,
        pet: petsMap.get(agenda.petid),
        servico: servicosMap.get(agenda.servicoId)
      }));

      this.agendamentos.set(agendamentosCompletos);
    });
  }

  buscar(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      this.agendaService.deletar(id).subscribe(() => {
        this.agendamentos.update(agendamentosAtuais => agendamentosAtuais.filter(a => a.id !== id));
      });
    }
  }
}