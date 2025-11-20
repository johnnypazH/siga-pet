import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Fornecedor } from '../../model/fornecedor.model';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/fornecedores';

  findAll(): Observable<Fornecedor[]> {
    return this.http.get<Fornecedor[]>(this.apiUrl);
  }

  findById(id: string): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.apiUrl}/${id}`);
  }

  create(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.post<Fornecedor>(this.apiUrl, fornecedor);
  }

  update(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(`${this.apiUrl}/${fornecedor.id}`, fornecedor);
  }

  delete(fornecedor: Fornecedor): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${fornecedor.id}`);
  }
}
