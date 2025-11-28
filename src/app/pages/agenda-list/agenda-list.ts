import { Component, OnInit, inject, Signal } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { Agenda } from '../../model/agenda.model';
import { AgendaService } from '../../service/agenda/agenda';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DatePipe],
  template: ` <main class="container mt-4"> <div class="d-flex justify-content-between align-items-center mb-4"> <h1>Agendamentos</h1> <a routerLink="/agendas/novo" class="btn btn-primary"> <i class="bi bi-plus-lg"></i> Novo Agendamento </a> </div> <!-- Filtros --> <form [formGroup]="filtroForm" class="row g-3 mb-4 p-3 bg-light border rounded"> <div class="col-md-6"> <label for="petNome" class="form-label">Filtrar por nome do Pet</label> <input type="text" id="petNome" class="form-control" formControlName="petNome" placeholder="Digite o nome do pet..." /> </div> <div class="col-md-4"> <label for="status" class="form-label">Filtrar por Status</label> <select id="status" class="form-select" formControlName="status"> <option value="todos">Todos</option> <option value="Agendado">Agendado</option> <option value="Concluído">Concluído</option> <option value="Cancelado">Cancelado</option> </select> </div> <div class="col-md-2 d-flex align-items-end"> <button type="button" class="btn btn-secondary w-100" (click)="limparFiltros()"> Limpar </button> </div> </form> <!-- Tabela de Agendamentos --> <div class="table-responsive"> <table class="table table-striped table-hover align-middle"> <thead class="table-dark"> <tr> <th scope="col">Pet</th> <th scope="col">Serviço</th> <th scope="col">Data e Hora</th> <th scope="col">Status</th> <th scope="col" class="text-center">Ações</th> </tr> </thead> <tbody> <tr *ngFor="let agendamento of agendamentos()"> <td>{{ agendamento.pet?.nome || 'Pet não encontrado' }}</td> <td>{{ agendamento.servico?.nome || 'Serviço não encontrado' }}</td> <td>{{ agendamento.data | date : 'dd/MM/yyyy HH:mm' }}</td> <td> <span class="badge" [ngClass]="{ 'bg-primary': agendamento.status === 'Agendado', 'bg-success': agendamento.status === 'Concluído', 'bg-danger': agendamento.status === 'Cancelado' }" > {{ agendamento.status }} </span > </td> <td class="text-center"> <a [routerLink]="['/agendas/info', agendamento.id]" class="btn btn-sm btn-outline-success me-2" title="Detalhes"> <i class="bi bi-eye"></i> </a> <a [routerLink]="['/agendas/editar', agendamento.id]" class="btn btn-sm btn-outline-secondary me-2" title="Editar" > <i class="bi bi-pencil"></i> </a> <button (click)="excluir(agendamento.id)" class="btn btn-sm btn-outline-danger" title="Excluir"> <i class="bi bi-trash"></i> </button> </td> </tr> <tr *ngIf="agendamentos().length === 0"> <td colspan="5" class="text-center">Nenhum agendamento encontrado.</td> </tr> </tbody> </table> </div> </main> `,
  // styleUrl: './agenda-list.scss' // Comentado para evitar possíveis conflitos
})
export class AgendaListComponent implements OnInit {
  private agendaService = inject(AgendaService);
  private fb = inject(FormBuilder);

  agendamentos: Signal<Agenda[]> = this.agendaService.agendamentos;
  filtroForm: FormGroup;

  constructor() {
    this.filtroForm = this.fb.group({
      petNome: [''],
      status: ['todos']
    });
  }

  ngOnInit(): void {
    // Conecta o formulário de filtro ao serviço.
    // Qualquer mudança no formulário atualizará os filtros no serviço.
    this.filtroForm.valueChanges.subscribe(formValue => {
      this.agendaService.definirFiltros(formValue);
    });
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      this.agendaService.deletar(id).subscribe(() => {
        // Após deletar, apenas redefinimos os filtros para o valor atual,
        // o que fará o signal no serviço recarregar os dados.
        this.agendaService.definirFiltros(this.filtroForm.value);
      });
    }
  }

  limparFiltros(): void {
    this.filtroForm.reset({ petNome: '', status: 'todos' });
  }
}