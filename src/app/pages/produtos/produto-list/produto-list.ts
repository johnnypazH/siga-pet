import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Prod } from '../../../model/prod.model';
import { ProdutoService } from '../../../service/produtos/produto.service';

@Component({
  selector: 'app-produto-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: '../../../pages/produtos/produto-list/produto-list.html',
  styleUrl: '../../../pages/produtos/produto-list/produto-list.scss'
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
