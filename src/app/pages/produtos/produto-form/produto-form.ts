import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Produto } from '../../../model/produto.model';
import { ProdutoService } from '../../../service/produtos/produto.service';

@Component({
  selector: 'app-produto-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './produto-form.html',
  styleUrl: './produto-form.scss'
})
export class ProdutoFormComponent implements OnInit {
  produto: Partial<Produto> = { nome: '', categoria: '', preco: 0, descricao: '', fotoUrl: '' };
  isEdit = false;
  titulo = 'Novo Produto';

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEdit = true;
      this.titulo = 'Editar Produto';
      this.produtoService.buscarPorId(id).subscribe(produto => {
        this.produto = produto;
      });
    }
  }

  salvar(): void {
    if (this.isEdit && this.produto.id) {
      this.produtoService.atualizar(this.produto.id, this.produto as Produto)
        .subscribe(() => this.router.navigate(['/produtos']));
    } else {
      this.produtoService.criar(this.produto as Omit<Produto, 'id'>)
        .subscribe(() => this.router.navigate(['/produtos']));
    }
  }
}
