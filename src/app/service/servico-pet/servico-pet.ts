import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { ServicoPet } from '../../model/servico-pet.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicoPetService {
  private apiUrl = `${environment.apiUrl}/servicos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<ServicoPet[]> {
    // A filtragem agora é feita no frontend com Signals, então buscamos todos.
    return this.http.get<ServicoPet[]>(this.apiUrl);
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