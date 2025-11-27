import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServicoPet } from '../../model/servico-pet.model';

@Injectable({
  providedIn: 'root'
})
export class ServicoPetService {
  private apiUrl = 'http://localhost:3000/servicos';

  constructor(private http: HttpClient) { }

  listar(filtros?: { nome?: string; ativo?: string }): Observable<ServicoPet[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.nome) {
        // Usa 'nome_like' para busca parcial no nome
        params = params.append('nome_like', filtros.nome);
      }
      if (filtros.ativo && filtros.ativo !== 'todos') {
        // Filtra por status 'ativo' (true/false)
        params = params.append('ativo', filtros.ativo === 'true');
      }
    }
    return this.http.get<ServicoPet[]>(this.apiUrl, { params });
  }

  buscarPorId(id: string): Observable<ServicoPet> {
    return this.http.get<ServicoPet>(`${this.apiUrl}/${id}`);
  }

  criar(servico: Omit<ServicoPet, 'id'>): Observable<ServicoPet> {
    return this.http.post<ServicoPet>(this.apiUrl, servico);
  }

  atualizar(id: string, servico: ServicoPet): Observable<ServicoPet> {
    return this.http.put<ServicoPet>(`${this.apiUrl}/${id}`, servico);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}