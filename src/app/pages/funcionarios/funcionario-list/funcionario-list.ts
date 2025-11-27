import { Component, OnInit, inject } from '@angular/core';
import { Funcionario } from '../../../model/funcionario.model';
import { FuncionarioService } from '../../../service/funcionarios/funcionario';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './funcionario-list.html',
  styleUrls: ['./funcionario-list.scss'],
})
export class FuncionarioListComponent implements OnInit {
  funcionarios: Funcionario[] = [];
  filtroForm: FormGroup;

  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  constructor() {
    this.filtroForm = this.fb.group({
      nome: [''],
      cargo: [''],
      ativo: ['todos']
    });
  }

  ngOnInit(): void {
    this.carregarFuncionarios();

    this.filtroForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(formValue => this.funcionarioService.getFuncionarios(formValue))
    ).subscribe(funcionarios => {
      this.funcionarios = funcionarios;
    });
  }

  carregarFuncionarios(): void {
    this.funcionarioService.getFuncionarios(this.filtroForm.value).subscribe(data => {
      this.funcionarios = data;
    });
  }

  editar(id: string): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }

  excluir(id: string): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.excluir(id).subscribe(() => {
        this.carregarFuncionarios();
      });
    }
  }

  limparFiltros(): void {
    this.filtroForm.reset({ nome: '', cargo: '', ativo: 'todos' });
  }
}

