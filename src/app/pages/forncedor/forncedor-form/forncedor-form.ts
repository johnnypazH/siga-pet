import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Fornecedor } from '../../../model/fornecedor.model';
import { FornecedorService } from '../../../service/fornecedor/forncedor';

@Component({
  selector: 'app-forncedor-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './forncedor-form.html',
  styleUrl: './forncedor-form.scss'
})
export class ForncedorFormComponent implements OnInit {
  private readonly service = inject(FornecedorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  fornecedor: Fornecedor = this.getEmptyFornecedor();
  isEdit = false;

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.service.findById(id).subscribe((data) => {
        this.fornecedor = data;
      });
    }
  }

  save(): void {
    // Garante que o ID seja um valor aleatório na criação
    if (!this.isEdit) {
      this.fornecedor.id = Math.random().toString(36).substring(2, 6);
    }

    const operation = this.isEdit
      ? this.service.update(this.fornecedor)
      : this.service.create(this.fornecedor);

    operation.subscribe({
      next: () => this.router.navigate(['/fornecedores']),
      error: (err) => alert('Erro ao salvar fornecedor: ' + err.message),
    });
  }

  private getEmptyFornecedor(): Fornecedor {
    return {
      id: '',
      nome: '',
      contato: '',
      telefone: '',
      email: '',
      endereco: '',
    };
  }
}
