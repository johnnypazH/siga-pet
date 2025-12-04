import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tutor } from '../../model/tutor.model';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class TutorService {
  private apiUrl = `${environment.apiUrl}/tutores`;

  constructor(private http: HttpClient) { }

  listar(): Observable<Tutor[]> {
    return this.http.get<Tutor[]>(this.apiUrl);
  }

  buscarPorId(id: string): Observable<Tutor> {
    return this.http.get<Tutor>(`${this.apiUrl}/${id}`);
  }

  criar(tutor: Omit<Tutor, 'id'>): Observable<Tutor> {
    return this.http.post<Tutor>(this.apiUrl, tutor);
  }

  atualizar(id: string, tutor: Tutor): Observable<Tutor> {
    return this.http.put<Tutor>(`${this.apiUrl}/${id}`, tutor);
  }

  deletar(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}