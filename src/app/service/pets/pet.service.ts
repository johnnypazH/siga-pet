import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Pet } from '../../model/pet.model';
import { TutorService } from '../tutores/tutor.service';
import { EspecieService } from '../especie/especie.service';
import { Tutor } from '../../model/tutor.model';
import { Especie } from '../../model/especie.model';

// Interface para o objeto completo que vamos montar
export interface PetDetalhes extends Pet {
  tutor: Tutor;
  especie: Especie;
}

@Injectable({
  providedIn: 'root'
})
export class PetService {
  private apiUrl = 'http://localhost:3000/pets';
  private http = inject(HttpClient);
  private tutorService = inject(TutorService);
  private especieService = inject(EspecieService);

  listar(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  // NOVO MÉTODO: Busca o pet e seus dados relacionados
  getPetDetalhes(id: string): Observable<PetDetalhes> {
    return this.buscarPorId(id).pipe(
      switchMap(pet => {
        // Agora que temos o pet, buscamos o tutor e a espécie correspondentes
        return forkJoin({
          pet: of(pet), // re-emite o pet
          tutor: this.tutorService.buscarPorId(pet.tutorId),
          especie: this.especieService.buscarPorId(pet.especieId)
        });
      }),
      map(({ pet, tutor, especie }) => {
        // Combina tudo em um único objeto
        return {
          ...pet,
          tutor,
          especie
        } as PetDetalhes;
      })
    );
  }

  criar(pet: Omit<Pet, 'id'>): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  atualizar(id: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}