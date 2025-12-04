import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Agenda } from '../../model/agenda.model';
import { AgendaService } from '../../service/agenda/agenda';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, DatePipe],
  templateUrl: './agenda-list.html',
  styleUrl: './agenda-list.scss'
})
export class AgendaListComponent implements OnInit {
  private agendamentos = signal<Agenda[]>([]);
  filtroPetNome = signal('');
  filtroStatus = signal('todos');

  private agendaService = inject(AgendaService);

  agendamentosFiltrados = computed(() => {
    const nome = this.filtroPetNome().toLowerCase();
    const status = this.filtroStatus();

    return this.agendamentos().filter(ag => {
      const matchNome = !nome || ag.pet?.nome.toLowerCase().includes(nome);
      const matchStatus = status === 'todos' || ag.status === status;
      return matchNome && matchStatus;
    });
  });

  ngOnInit(): void {
    this.carregarAgendamentos();
  }

  carregarAgendamentos(): void {
    this.agendaService.listar().subscribe(data => {
      this.agendamentos.set(data);
    });
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      this.agendaService.deletar(id).subscribe(() => {
        this.agendamentos.update(ags => ags.filter(a => a.id !== id));
      });
    }
  }

  limparFiltros(): void {
    this.filtroPetNome.set('');
    this.filtroStatus.set('todos');
  }
}