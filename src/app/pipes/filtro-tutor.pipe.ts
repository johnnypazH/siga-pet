import { Pipe, PipeTransform } from '@angular/core';
import { Tutor } from '../model/tutor.model';

@Pipe({
  name: 'filtroTutor',
  standalone: true
})
export class FiltroTutorPipe implements PipeTransform {
  transform(items: Tutor[], searchText: string): Tutor[] {
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(it => it.nome.toLowerCase().includes(searchText));
  }
}