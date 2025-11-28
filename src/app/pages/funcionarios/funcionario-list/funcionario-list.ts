import { Component, OnInit, inject, Signal } from '@angular/core';
import { Funcionario } from '../../../model/funcionario.model';
import { FuncionarioService } from '../../../service/funcionarios/funcionario';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule],
  templateUrl: './funcionario-list.html',
  styleUrls: ['./funcionario-list.scss'],
})
export class FuncionarioListComponent implements OnInit {
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  funcionarios: Signal<Funcionario[]> = this.funcionarioService.funcionarios;
  filtroForm: FormGroup;

  constructor() {
    this.filtroForm = this.fb.group({
      nome: [''],
      cargo: [''],
      ativo: ['todos']
    });
  }

  ngOnInit(): void {
    this.filtroForm.valueChanges.subscribe(formValue => {
      this.funcionarioService.definirFiltros(formValue);
    });
  }

  editar(id: string): void {
    this.router.navigate(['/funcionarios/editar', id]);
  }

  excluir(id: string): void {
    if (confirm('Tem certeza que deseja excluir este funcionário?')) {
      this.funcionarioService.excluir(id).subscribe(() => {
        // Apenas redefine os filtros para forçar a recarga do signal
        this.funcionarioService.definirFiltros(this.filtroForm.value);
      });
    }
  }

  limparFiltros(): void {
    this.filtroForm.reset({ nome: '', cargo: '', ativo: 'todos' });
  }
}
