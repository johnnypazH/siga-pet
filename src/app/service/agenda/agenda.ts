import { Injectable, signal, computed, effect, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, Subject, forkJoin } from 'rxjs';
import { switchMap, tap, map } from 'rxjs/operators';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Agenda, AgendaDetalhes } from '../../model/agenda.model';
import { PetService } from '../pets/pet.service';
import { ServicoPetService } from '../servico-pet/servico-pet';
import { Pet } from '../../model/pet.model';
import { Funcionario } from '../../model/funcionario.model';
import { FuncionarioService } from '../funcionarios/funcionario';
import { ServicoPet } from '../../model/servico-pet.model';

interface FiltrosAgenda {
  petNome?: string;
  status?: string;
}
interface AgendamentoCompleto extends Agenda {
  pet?: Pet;
  servico?: ServicoPet;
  funcionario?: Funcionario;
}

@Injectable({
  providedIn: 'root'
})
export class AgendaService {
  private apiUrl = 'http://localhost:3000/agendamentos';
  private http = inject(HttpClient);
  private petService = inject(PetService);
  private servicoPetService = inject(ServicoPetService);
  private funcionarioService = inject(FuncionarioService);

  // Signal para armazenar os filtros atuais
  private filtros = signal<FiltrosAgenda>({ petNome: '', status: 'todos' });

  // Transforma o signal de filtros em um Observable para reagir a mudanças
  private filtros$ = toObservable(this.filtros);
  
  // Signal principal que contém a lista de agendamentos
  // Ele é preenchido pela stream de filtros$
  private agendamentos$ = this.filtros$.pipe(
    // A cada mudança de filtro, busca os dados combinados
    switchMap(filtros => this.listarAgendamentosCompletos(filtros))
  );
  agendamentos = toSignal(this.agendamentos$, { initialValue: [] as AgendamentoCompleto[] });

  // Método para o componente atualizar os filtros
  definirFiltros(filtros: FiltrosAgenda) {
    this.filtros.set(filtros);
  }

  // Este método agora orquestra a busca e combinação dos dados
  private listarAgendamentosCompletos(filtros: FiltrosAgenda): Observable<AgendamentoCompleto[]> {
    return forkJoin({
      agendamentos: this.http.get<Agenda[]>(this.apiUrl), // Busca agendamentos simples
      pets: this.petService.listar(),
      servicos: this.servicoPetService.listar(),
      funcionarios: this.http.get<Funcionario[]>('http://localhost:3000/funcionarios') // Busca todos os funcionários
    }).pipe(
      map(({ agendamentos, pets, servicos, funcionarios}) => {
        const petsMap = new Map(pets.map(p => [p.id, p]));
        const servicosMap = new Map(servicos.map(s => [s.id, s]));
        const funcionariosMap = new Map(funcionarios.map(f => [f.id, f]));
        
        // Combina os dados
        let agendamentosCompletos: AgendamentoCompleto[] = agendamentos.map(agenda => ({
          ...agenda,
          pet: petsMap.get(agenda.petId),
          servico: servicosMap.get(agenda.servicoId),
          funcionario: funcionariosMap.get(agenda.funcionarioId)
        }));
        
        // Aplica os filtros no lado do cliente, agora que temos os dados completos
        return agendamentosCompletos.filter(ag => 
          (!filtros.status || filtros.status === 'todos' || ag.status === filtros.status) &&
          (!filtros.petNome || ag.pet?.nome.toLowerCase().includes(filtros.petNome.toLowerCase()))
        );
      })
    );
  }

  buscarPorId(id: string): Observable<Agenda> {
    return this.http.get<Agenda>(`${this.apiUrl}/${id}`);
  }

  getAgendaDetalhes(id: string): Observable<AgendaDetalhes> {
    return this.http.get<Agenda>(`${this.apiUrl}/${id}`).pipe(
      switchMap(agendamento => {
        return forkJoin({
          // Usamos os serviços existentes para buscar os dados completos
          pet: this.petService.getPetDetalhes(agendamento.petId),
          servico: this.servicoPetService.buscarPorId(agendamento.servicoId),
          funcionario: this.funcionarioService.getFuncionario(agendamento.funcionarioId)
        }).pipe(
          map(({ pet, servico, funcionario }) => {
            // Combina o agendamento original com os dados expandidos
            return { ...agendamento, pet, servico, funcionario };
          })
        );
      })
    );
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
