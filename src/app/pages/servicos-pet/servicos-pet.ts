import { Component, OnInit, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ServicoPet } from '../../model/servico-pet.model';
import { ServicoPetService } from '../../service/servico-pet/servico-pet';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-servico-pet-list',
  standalone: true,
  imports: [CommonModule, RouterLink, ReactiveFormsModule, CurrencyPipe],
  templateUrl: '../../../app/pages/servicos-pet/servicos-pet.html',
  styleUrl: '../../../app/pages/servicos-pet/servicos-pet.scss'
})
export class ServicoPetListComponent implements OnInit {
  servicos: ServicoPet[] = [];
  filtroForm: FormGroup;

  private servicoPetService = inject(ServicoPetService);
  private fb = inject(FormBuilder);

  constructor() {
    this.filtroForm = this.fb.group({
      nome: [''],
      ativo: ['todos']
    });
  }

  ngOnInit(): void {
    this.carregarServicos();

    this.filtroForm.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(formValue => this.servicoPetService.listar(formValue))
    ).subscribe(servicos => {
      this.servicos = servicos;
    });
  }

  carregarServicos(): void {
    this.servicoPetService.listar(this.filtroForm.value).subscribe(data => {
      this.servicos = data;
    });
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este serviço?')) {
      this.servicoPetService.deletar(id).subscribe(() => {
        // Recarrega a lista para refletir a exclusão
        this.carregarServicos();
      });
    }
  }

  limparFiltros(): void {
    this.filtroForm.reset({ nome: '', ativo: 'todos' });
  }
}