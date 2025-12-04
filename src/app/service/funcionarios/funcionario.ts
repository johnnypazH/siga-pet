import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../../model/funcionario.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = `${environment.apiUrl}/funcionarios`;

  constructor(private http: HttpClient) {}

  listar(): Observable<Funcionario[]> {
    // A filtragem agora é feita no frontend com Signals, então buscamos todos.
    return this.http.get<Funcionario[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  criar(funcionario: Omit<Funcionario, "id">): Observable<Funcionario> {
    return this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  atualizar(id: string, funcionario: Funcionario): Observable<Funcionario> {
    return this.http.put<Funcionario>(`${this.apiUrl}/${id}`, funcionario);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}