import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Prontuario } from '../../model/Prontuario.mode';

@Injectable({
  providedIn: 'root'
})
export class ProntuarioService {
  private apiUrl = 'http://localhost:3000/prontuarios';
  private http = inject(HttpClient);

  /**
   * Busca todos os registros de prontuário para um pet específico.
   * O _expand=funcionario faz com que o json-server já inclua os dados do veterinário.
   * @param petId O ID do pet.
   */
  getProntuariosPorPet(petId: string): Observable<Prontuario[]> {
    // Filtra os prontuários pelo petId e expande para incluir os dados do funcionário (veterinário)
    return this.http.get<Prontuario[]>(`${this.apiUrl}?petId=${petId}&_expand=funcionario`);
  }
}
