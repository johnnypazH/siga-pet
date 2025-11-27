import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Funcionario } from '../../model/funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:3000/funcionarios';

  constructor(private http: HttpClient) {}

  getFuncionarios(filtros?: { nome?: string; cargo?: string; ativo?: string }): Observable<Funcionario[]> {
    let params = new HttpParams();
    if (filtros) {
      if (filtros.nome) {
        params = params.append('nome_like', filtros.nome);
      }
      if (filtros.cargo) {
        params = params.append('cargo_like', filtros.cargo);
      }
      if (filtros.ativo && filtros.ativo !== 'todos') {
        params = params.append('ativo', filtros.ativo === 'true');
      }
    }
    return this.http.get<Funcionario[]>(this.apiUrl, { params });
  }

  getFuncionario(id: string): Observable<Funcionario> {
    return this.http.get<Funcionario>(`${this.apiUrl}/${id}`);
  }

  salvar(funcionario: Funcionario): Observable<Funcionario> {
    return funcionario.id ? this.http.put<Funcionario>(`${this.apiUrl}/${funcionario.id}`, funcionario) : this.http.post<Funcionario>(this.apiUrl, funcionario);
  }

  excluir(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}