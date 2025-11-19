import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Produto } from '../../model/produto.model';
import { ProdutoService } from '../../service/produtos/produto.service';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, CurrencyPipe],
  templateUrl: './produto-list.html',
  styleUrl: './produto-list.scss'
})
export class ProdutoListComponent implements OnInit {
  private produtos = signal<Produto[]>([]);
  termoBusca = signal<string>('');

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

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe(data => this.produtos.set(data));
  }

  buscar(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.termoBusca.set(target.value);
  }

  excluir(id: string): void {
    if (confirm('Deseja realmente excluir este produto?')) {
      this.produtoService.deletar(id).subscribe(() => {
        this.produtos.update(produtosAtuais => produtosAtuais.filter(p => p.id !== id));
      });
    }
  }
}