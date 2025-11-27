import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Agenda } from '../../model/agenda.model';
import { AgendaService } from '../../service/agenda/agenda';

@Component({
  selector: 'app-agenda-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, DatePipe],
  templateUrl: './agenda-list.html',
  styleUrl: './agenda-list.scss'
})
export class AgendaListComponent implements OnInit {
  agendamentos: Agenda[] = [];
  filtroForm: FormGroup;

  private agendaService = inject(AgendaService);
  private fb = inject(FormBuilder);

  constructor() {
    this.filtroForm = this.fb.group({
      petNome: [''],
      status: ['todos']
    });
  }

  ngOnInit(): void {
    this.carregarAgendamentos();

    // Atualiza a lista reativamente conforme o usuário digita ou seleciona filtros
    this.filtroForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(formValue => this.agendaService.listar(formValue))
    ).subscribe(agendamentos => {
      this.agendamentos = agendamentos;
    });
  }

  carregarAgendamentos(): void {
    this.agendaService.listar(this.filtroForm.value).subscribe(data => {
      this.agendamentos = data;
    });
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este agendamento?')) {
      this.agendaService.deletar(id).subscribe(() => {
        this.carregarAgendamentos();
      });
    }
  }

  limparFiltros(): void {
    this.filtroForm.reset({ petNome: '', status: 'todos' });
  }
}