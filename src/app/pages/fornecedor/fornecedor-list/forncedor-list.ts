import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Fornecedor } from '../../../model/fornecedor.model';
import { FornecedorService } from '../../../service/fornecedor/fornecedor';

@Component({
  selector: 'app-fornecedor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forncedor-list.html',
  styleUrl: './forncedor-list.scss'
})
export class FornecedorListComponent implements OnInit { // O nome da classe foi corrigido
  private readonly service = inject(FornecedorService);

  fornecedores = signal<Fornecedor[]>([]);

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores(): void {
    this.service.listar().subscribe((data) => {
      this.fornecedores.set(data);
    });
  }

  deletar(fornecedor: Fornecedor): void {
    if (
      confirm(
        `Tem certeza que deseja excluir o fornecedor "${fornecedor.nome}"?`
      )
    ) {
      this.service.deletar(fornecedor.id).subscribe({
        next: () => this.loadFornecedores(),
        error: (err) => alert('Erro ao excluir fornecedor: ' + err.message),
      });
    }
  }
}
