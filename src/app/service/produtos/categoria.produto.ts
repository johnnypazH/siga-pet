import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaProduto } from '../../model/categoria-produto.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriaProdutoService {
  private readonly http = inject(HttpClient);
  private apiUrl = 'http://localhost:3000/categoriasProduto';

  findAll(): Observable<CategoriaProduto[]> {
    return this.http.get<CategoriaProduto[]>(this.apiUrl);
  }

  create(categoria: { nome: string }): Observable<CategoriaProduto> {
    return this.http.post<CategoriaProduto>(this.apiUrl, categoria);
  }
}
