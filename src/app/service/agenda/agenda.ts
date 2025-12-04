import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Agenda } from '../../model/agenda.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = `${environment.apiUrl}/agendamentos`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Agenda[]> {
    // Para simplificar e evitar erros de índice no Firestore,
    // buscamos todos os agendamentos e expandimos os dados de pet e serviço.
    // A filtragem será feita no frontend com Signals.
    const params = new HttpParams().set('_expand', 'pet').set('_expand', 'servico');
    return this.http.get<Agenda[]>(this.apiUrl, { params });
  }

  buscarPorId(id: string): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.apiUrl}/${id}`);
  }

  criar(agenda: Omit<Agenda, 'id'>): Observable<Agenda> {
    return this.http.post<Agenda>(this.apiUrl, agenda);
  }

  atualizar(id: string, agenda: Agenda): Observable<Agenda> {
    return this.http.put<Agenda>(`${this.apiUrl}/${id}`, agenda);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
