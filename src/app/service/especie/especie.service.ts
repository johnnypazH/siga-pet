import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especie } from '../../model/especie.model';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {
  private apiUrl = 'http://localhost:3000/especies';
  private http = inject(HttpClient);

  listar(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Especie> {
    return this.http.get<Especie>(`${this.apiUrl}/${id}`);
  }
}