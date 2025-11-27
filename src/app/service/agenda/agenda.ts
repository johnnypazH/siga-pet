import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Agenda } from '../../model/agenda.model';

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = 'http://localhost:3000/agendamentos';

  constructor(private http: HttpClient) { }

  listar(filtros?: { petNome?: string; status?: string }): Observable<Agenda[]> {
    // Sempre expande para trazer os dados do pet e do serviço junto com o agendamento.
    let params = new HttpParams().append('_expand', 'pet').append('_expand', 'servico');
    
    // A busca por status pode ser feita diretamente na API
    if (filtros?.status && filtros.status !== 'todos') {
      params = params.append('status', filtros.status);
    }

    return this.http.get<Agenda[]>(this.apiUrl, { params }).pipe(
      // O filtro por nome do pet é feito no lado do cliente (Angular)
      map(agendamentos => {
        if (!filtros?.petNome) {
          return agendamentos; // Se não há filtro de nome, retorna tudo
        }
        // Filtra os agendamentos cujo pet (se existir) tenha o nome que corresponde ao filtro
        return agendamentos.filter(ag => ag.pet?.nome.toLowerCase().includes(filtros.petNome!.toLowerCase()));
      })
    );
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
