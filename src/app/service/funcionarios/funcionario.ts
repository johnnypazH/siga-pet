import { Injectable, signal, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Funcionario } from '../../model/funcionario.model';

interface FiltrosFuncionario {
  nome?: string;
  cargo?: string;
  ativo?: string;
}

@Injectable({
  providedIn: 'root',
})
export class FuncionarioService {
  private apiUrl = 'http://localhost:3000/funcionarios';
  private http = inject(HttpClient);

  // Signal para armazenar os filtros atuais
  private filtros = signal<FiltrosFuncionario>({ nome: '', cargo: '', ativo: 'todos' });

  // Transforma o signal de filtros em um Observable para reagir a mudanças
  private filtros$ = toObservable(this.filtros);

  // Signal principal que contém a lista de funcionários
  private funcionarios$ = this.filtros$.pipe(
    switchMap(filtros => this.listarFuncionariosFiltrados(filtros))
  );
  funcionarios = toSignal(this.funcionarios$, { initialValue: [] as Funcionario[] });

  // Método para o componente atualizar os filtros
  definirFiltros(filtros: FiltrosFuncionario) {
    this.filtros.set(filtros);
  }

  private listarFuncionariosFiltrados(filtros: FiltrosFuncionario): Observable<Funcionario[]> {
    let params = new HttpParams();
    // A API só filtra por 'ativo', o resto é feito no cliente.
    if (filtros.ativo && filtros.ativo !== 'todos') {
      params = params.append('ativo', filtros.ativo === 'true');
    }
    return this.http.get<Funcionario[]>(this.apiUrl, { params }).pipe(
      map(funcionarios => {
        // Filtra por nome e cargo no lado do cliente
        const nomeFiltro = filtros.nome?.toLowerCase() || '';
        const cargoFiltro = filtros.cargo?.toLowerCase() || '';
        return funcionarios.filter(func => 
          func.nome.toLowerCase().includes(nomeFiltro) &&
          func.cargo.toLowerCase().includes(cargoFiltro)
        );
      })
    );
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