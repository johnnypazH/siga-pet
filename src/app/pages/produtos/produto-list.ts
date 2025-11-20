import { Component, OnInit, signal, computed, inject } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../service/produtos/produto.service';
import { FornecedorService } from '../../service/fornecedor/forncedor';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './produto-list.html',
  styleUrls: ['./produto-list.scss'],
})
export class ProdutoListComponent implements OnInit {
  private readonly produtoService = inject(ProdutoService);
  private readonly fornecedorService = inject(FornecedorService);

  private produtos = signal<Produto[]>([]);
  termoBusca = signal<string>('');
  fornecedorMap = new Map<string, string>();

  produtosFiltrados = computed(() => {
    const produtos = this.produtos();
    const termo = this.termoBusca().toLowerCase();

    if (!termo) {
      return produtos;
    }

    return produtos.filter(produto =>
      produto.nome.toLowerCase().includes(termo) ||
      produto.categoria.toLowerCase().includes(termo)
    );
  });

  ngOnInit(): void {
    forkJoin({
      produtos: this.produtoService.findAll(),
      fornecedores: this.fornecedorService.findAll(),
    }).subscribe(({ produtos, fornecedores }) => {
      this.produtos.set(produtos);
      fornecedores.forEach((f) => this.fornecedorMap.set(f.id, f.nome));
    });
  }

  getFornecedorNome(id: string | undefined): string {
    return id ? this.fornecedorMap.get(id) || 'N/A' : 'N/A';
  }

  buscar(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.delete(id).subscribe(() => {
        this.produtos.update(produtosAtuais => produtosAtuais.filter(p => p.id !== id));
      });
    }
  }
}