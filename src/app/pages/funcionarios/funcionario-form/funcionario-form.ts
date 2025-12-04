import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FuncionarioService } from '../../../service/funcionarios/funcionario';
import { Funcionario } from '../../../model/funcionario.model';

@Component({
  selector: 'app-funcionario-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './funcionario-form.html',
})
export class FuncionarioFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  funcionarioId: string | null = null;

  private fb = inject(FormBuilder);
  private funcionarioService = inject(FuncionarioService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  constructor() {
    this.form = this.fb.group({
      id: [null],
      nome: ['', Validators.required],
      cpf: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      endereco: [''],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', Validators.required],
      cargo: ['', Validators.required],
      salario: [0, [Validators.required, Validators.min(0)]],
      ativo: [true],
    });
  }

  ngOnInit(): void {
    this.funcionarioId = this.route.snapshot.paramMap.get('id');
    if (this.funcionarioId) {
      this.isEditMode = true;
      this.funcionarioService.buscarPorId(this.funcionarioId).subscribe(funcionario => {
        this.form.patchValue(funcionario);
      });
    }
  }

  salvar(): void {
    if (this.form.invalid) {
      // Marcar campos como tocados para exibir erros de validação
      this.form.markAllAsTouched();
      return;
    }

    const funcionario: Funcionario = this.form.value;
    const operacao = this.isEditMode && this.funcionarioId
      ? this.funcionarioService.atualizar(this.funcionarioId, funcionario)
      : this.funcionarioService.criar(funcionario);


    operacao.subscribe(() => {
      this.router.navigate(['/funcionarios']);
    });
  }

  cancelar(): void {
    this.router.navigate(['/funcionarios']);
  }
}
