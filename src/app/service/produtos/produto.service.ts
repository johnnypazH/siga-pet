import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prod } from '../../model/prod.model';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private apiUrl = 'http://localhost:3000/prod';

  constructor(private http: HttpClient) { }

  listar(): Observable<Prod[]> {
    return this.http.get<Prod[]>(this.apiUrl);
  }

}
