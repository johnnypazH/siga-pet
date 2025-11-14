import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProdutoService } from '../../service/produtos/produto.service';
import { Prod } from '../../model/prod.model';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../pages/produtos/produto-list.html',
  styleUrl: '../../pages/produtos/produto-list.scss'
})
export class ProdutoListComponent implements OnInit {
  produtos: Prod[] = [];

  constructor(private produtoService: ProdutoService) {}

  ngOnInit(): void {
    this.produtoService.listar().subscribe(dados => {
      this.produtos = dados;
    });
  }
}
