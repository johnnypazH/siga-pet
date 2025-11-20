import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Fornecedor } from '../../../model/fornecedor.model';
import { FornecedorService } from '../../../service/fornecedor/forncedor';

@Component({
  selector: 'app-forncedor-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './forncedor-list.html',
  styleUrl: './forncedor-list.scss'
})
export class ForncedorListComponent implements OnInit {
  private readonly service = inject(FornecedorService);

  fornecedores: Fornecedor[] = [];

  ngOnInit(): void {
    this.loadFornecedores();
  }

  loadFornecedores(): void {
    this.service.findAll().subscribe((data) => {
      this.fornecedores = data;
    });
  }

  delete(fornecedor: Fornecedor): void {
    if (
      confirm(
        `Tem certeza que deseja excluir o fornecedor "${fornecedor.nome}"?`
      )
    ) {
      this.service.delete(fornecedor).subscribe({
        next: () => this.loadFornecedores(),
        error: (err) => alert('Erro ao excluir fornecedor: ' + err.message),
      });
    }
  }
}
